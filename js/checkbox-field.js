$(document).ready(function () {
    var template = Handlebars.compile($("#checkbox-template").html());

    console.log($("#checkbox-template").html());

    var Checkbox = Backbone.Model.extend({
        initialize: function () {
            this.bind("change:selected", this.toggled);
        },

        toggled: function () {
            var $opt = $("#id_employees option[value="+this.get('value')+"]");

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
            this.el = $("#checkboxes");

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
        template: Handlebars.compile($("#all-template").html()),
        selected: false,

        events: {
            'click': "toggle"
        },

        initialize: function (checkboxes) {
            this.checkboxes = checkboxes;
        },

        render: function () {
            $(this.el).html(this.template({label: (!this.selected) ?
                                           "Select all" : "Deselect all"}));
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
    var select_all = new SelectAllView(checkboxes);

    $("#select_all").append(select_all.render().el);

    $("#id_employees option").each(function (i, el) {
        var $el = $(el);
        checkboxes.add(new Checkbox({value: $el.val(),
                                     label: $el.html(),
                                     selected: $el.attr('selected')}));
    });
});
