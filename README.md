
Checkbox-field
=======================

This is a simple javascript thing for turning awkward multiselects
into something users can understand and you can work with.

It depends on Backbone, Handlebars and jQuery.

Installation
----------------------

* Get the source
* Add Backbone -> http://backbonejs.org/
* Add Handlebars -> http://handlebarsjs.com/
* Add a template for checkboxes

    &lt;div id="checkbox-template"
         style="display:none"&gt;
      &lt;div style="display:inline-block"&gt;
        &lt;input type="checkbox"
               id="checkbox_{{value}}" /&gt;
        &lt;label for="checkbox_{{value}}"&gt;
           {{label}}
        &lt;/label&gt;
      &lt;/div&gt;
    &lt;/div&gt;

* You're done!

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
