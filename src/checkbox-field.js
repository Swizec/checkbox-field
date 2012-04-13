(function ($) {

    $.fn.checkboxField = function (options) {

        var settings = $.extend({
            template: "#checkbox-template",
            checkboxes: null,
            hide: true,
            show_select_all: true,
            select_all: "Select all",
            deselect_all: "Deselect all"
        }, options);

        return this.each(function () {

            var $multiselect = $(this);

            var template = Handlebars.compile($(settings.template).html());

            var Checkbox = Backbone.Model.extend({
                initialize: function () {
                    this.bind("change:selected", this.toggled);

                    this.attributes.id = this.cid;
                },

                toggled: function () {
                    var $opt = $multiselect.find("option[value="+this.get('value')+"]");

                    if (this.get('selected')) {
                        $opt.attr("selected", "1");
                    }else{
                        $opt.removeAttr("selected");
                    }
                }
            });

            var CheckboxView = Backbone.View.extend({
                tagName: "span",
                template: template,

                events: {
                    'change input[type=checkbox]': "toggle"
                },

                initialize: function () {
                    var _this = this;
                    this.model.bind("change", function () {
                        _this.render();
                    });
                },

                render: function () {
                    $(this.el).html(this.template(this.model.toJSON()));
                    if (this.model.get('selected')) {
                        $(this.el).find("input[type=checkbox]").attr("checked", "1");
                    }
                    return this;
                },

                toggle: function () {
                    this.model.set('selected', !this.model.get('selected'));
                }
            });

            var Checkboxes = Backbone.Collection.extend({});

            var CheckboxesView = Backbone.Collection.extend({
                initialize: function (checkboxes) {
                    if (settings.checkboxes) {
                        this.el = $(settings.checkboxes);
                    }else{
                        this.el = $("<p></p>");
                        $multiselect.after(this.el);
                    }

                    var _this = this;
                    checkboxes.bind("add", function (checkbox) {
                        _this.added(checkbox);
                    });
                },

                added: function (checkbox) {
                    var box = new CheckboxView({model: checkbox});
                    this.el.append(box.render().el);
                }
            });

            var SelectAllView = Backbone.View.extend({
                tagName: "a",
                template: Handlebars.compile('<a href="#">{{label}}</a>'),
                selected: false,

                events: {
                    'click': "toggle"
                },

                initialize: function (checkboxes) {
                    this.checkboxes = checkboxes;
                },

                place: function ($after) {
                    this.container = $("<p></p>").append(this.render().el);
                    $after.after(this.container);
                },

                render: function () {
                    $(this.el).html(this.template({label: (!this.selected) ?
                                                   settings.select_all : settings.deselect_all}));
                    return this;
                },

                toggle: function (event) {
                    event.preventDefault();
                    var selected = this.selected = !this.selected;

                    this.checkboxes.map(function (checkbox) {
                        // not sure why this doesn't work automagically
                        if (checkbox.get("selected") != selected) {
                            checkbox.set("selected", selected);
                        }
                    });

                    this.render();
                }
            });

            _.bindAll(Checkbox);
            _.bindAll(CheckboxView);
            _.bindAll(Checkboxes);
            _.bindAll(CheckboxesView);
            _.bindAll(SelectAllView);

            var checkboxes = new Checkboxes();
            var checkboxes_view = new CheckboxesView(checkboxes);

            if (settings.show_select_all) {
                var select_all = new SelectAllView(checkboxes);
                select_all.place(checkboxes_view.el);
            }

            if (settings.hide) {
                $multiselect.css("display", "none");
            }

            $multiselect.find("option").each(function (i, el) {
                var $el = $(el);
                checkboxes.add(new Checkbox({value: $el.val(),
                                             label: $el.html(),
                                             selected: $el.attr('selected')}));
            });
        });

    };

})(jQuery);
