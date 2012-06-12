//Braeden is pro shit.
(function( $ ) {
    $.fn.editable = function(options) {
        
        var settings = $.extend({
            'nowrap' : true,
            'maxWidth' : '100%',
            'minWidth' : '10px',
            blur : function (el) {
            },
            focus: function (el) {
            }
        }, options);
        
        
        
        this.each(function(index, value) {
            var editable = $(value);


            //            //Convert maxWidth to a px value if it is a %
            //            if(settings.maxWidth.indexOf('%') >= 0) {
            //                settings.maxWidth = settings.maxWidth.substring(0, settings.maxWidth.length - 1); // Remove las char.
            //                settings.maxWidth = (settings.maxWidth / 100) * editable.parent().width(); //Get size in pixels
            //                settings.maxWidth += 'px';
            //            }
            
            //Make sure you can select all elements.
            editable.css( {
                "-webkit-touch-callout": "text",
                "-webkit-user-select": "text",
                "-khtml-user-select": "text",
                "-moz-user-select": "text",
                "-ms-user-select": "text",
                "user-select": "text",
                
                'display': 'inline-block',
                'max-width' : settings.maxWidth,
                'min-width' : settings.minWidth,
                'overflow' : 'hidden'
            });
            
            if(editable.width() > settings.maxWidth) {
                editable.css('width', settings.maxWidth);
            }
            
            
            
            if(settings.nowrap) {
                editable.css({
                    'white-space': 'nowrap'
                });
            }
            
            var old_css = {
                'outline': editable.css('outline'),
                'background-color' : editable.css('background-color'),
                'border-style' : editable.css('border-style'),
                'border-color' : editable.css('border-color'),
                'border-width' : editable.css('border-width'),
            //                'position' : editable.css('position'),
            //                'top' : editable.position().top,
            //                'left': editable.position().left

            };
            
            editable.click(function() {
                if(editable.attr('contenteditable') != 'true') {
                    editable.css({
                        'outline': 'none',
                        'overflow' :'hidden',
                        'border-style' : 'solid',
                        'border-color' : '#efc868',
                        'border-width' : '1px'
                    //                        'position': 'absolute',
                    //                        'top' : editable.position().top - 1, //Border
                    //                        'left': editable.position().left - 1 //border
                    });
            
                    editable.attr('contenteditable', 'true'); 
                    editable.focus();
                    settings.focus(editable);
                }
                
                editable.addClass('ui-state-hover');
                
            });

            //If you click outside the text element treat it as a submit.
            editable.blur(function() {
                //For some reason it adds <br> to end of it if it becomes empty at some point =/
                editable.html(editable.html().replace('<br>', ''));
                
                if(editable.html().length == 0) {
                    editable.html('&lt;empty&gt;');
                }
                editable.css(old_css);
                editable.attr('contenteditable', 'false');
                editable.removeClass('ui-state-hover');
                settings.blur(editable);
                

            });
            
            editable.on("keydown", function(event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    event.stopPropagation();
                    editable.blur();
                    return false;

                }
            });
            
        });
        
        return this;
      
    };
})( jQuery );