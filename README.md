
Checkbox-field
=======================

This is a simple javascript thing for turning awkward multiselects
into something users can understand and you can work with.

It depends on Backbone, Handlebars and jQuery.

Installation
----------------------

* Get the source
* Add [Backbone] [1]
* Add [Handlebars] [2]
* Add a template for checkboxes
      <div id="checkbox-template" style="display:none">
        <div style="display:inline-block">
          <input type="checkbox" id="checkbox_{{value}}" />
          <label for="checkbox_{{value}}">{{label}}</label>
        </div>
      </div>
* You're done!

[1] http://backbonejs.org/
[2] http://handlebarsjs.com/

Usage
-----------------------
    $("#my_selector").checkboxField();

    // there are also some options
    $("#my_selector").checkboxField({
        // a handlebars template for the checkboxes (default: #checkbox-template)
        template: $("#checkbox-template"),

        // display "select all" (default: true)
        select_all: true

        // placeholder for checkboxes (default: one is created)
        checkboxes: null,

        // hide the original multiselect or not (default: yup)
        hide: true
    });
