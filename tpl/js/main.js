$(function() {
    
    if ($('html').hasClass('handheld')) {
        var animate_intro = function() {
            var intro_interval = setInterval(function() {
                var elm = $('#intro_section .bg-container > div:first');
                var next_elm = elm.next();
                next_elm.addClass('active');
                if (next_elm.hasClass('slower')) {
                    clearInterval(intro_interval);
                    setTimeout(function() {
                        elm.removeClass('active');
                        setTimeout(function() {
                            next_elm.end().appendTo('#intro_section .bg-container');
                            animate_intro();
                        }, 2000);
                    }, 2000);
                } else {
                    setTimeout(function() {
                        elm.removeClass('active');
                        next_elm.end().appendTo('#intro_section .bg-container');
                    }, 2000);
                }
            },  5000);        
        };
        
        animate_intro();
    }
    
    $('#fullpage').fullpage({
        anchors: ['intro', 'about', 'trust', 'sample', 'service', 'contact', 'blog'],
        navigation: true,
        scrollOverflow: true,
        navigationPosition: 'left',
        navigationTooltips: section_names,
        afterLoad: function(anchorLink, index) {
            animations.destroy_animations();
            if ($.isFunction(animations[anchorLink])) {
                animations[anchorLink]();
            }
        },
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {
            var idx = Math.abs(index - nextSlideIndex)*.2;
            $.fn.fullpage.setScrollingSpeed(idx*700);
        },
        onLeave: function(index, nextIndex, direction){
        },
        
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
            if ($.isFunction(animations.slides[anchorLink])) {
                animations.slides[anchorLink](slideIndex);
            }
        }
    });
    
    $(document).on("click", ".fotorama-next, .fotorama-prev", function(e) {
        e.preventDefault();
        var elm = $(this);
        var direction = '>';
        if (elm.hasClass('fotorama-prev')) {
            direction = '<';
        }
        blog_fotorama.show(direction);
    });
    
    $(document).on("click", ".slide-to", function(e) {
        e.preventDefault();
        $.fn.fullpage.moveTo($(this).attr('data-to'), 0);  
    })
    
    var animations = {};
    
    animations.intro = function() {
        if ($("html").hasClass('desktop')) {
            $("#intro_section video").get(0).play();
        }
        $("#intro_section .top-menu").addClass('visible');
        setTimeout(function() {
            $("#intro_section h1").addClass('visible');
            setTimeout(function() {
                $("#intro_section .description").addClass('visible');
            }, 500);
            setTimeout(function() {
                $("#intro_section .btn-red").addClass('visible');
            }, 700);
        }, 500);
    };
    
    animations.about = function() {
        $("#about_section .heading.animate").addClass('visible');
        setTimeout(function() {
            $("#about_section .descr.animate").addClass('visible');
        }, 200);
        setTimeout(function() {
            $("#about_section .count-on-table-container").addClass('visible');
        }, 400);
        setTimeout(function() {
            $("#about_section .bottom-descr.animate").addClass('visible');
        }, 600);
    };

    animations.trust = function() {
        $("#trust_section .heading.animate").addClass('visible');

        setTimeout(function() {
            $("#trust_section .how-we-work .item").each(function(i, v) {
                setTimeout(function() {
                    $(v).addClass('visible');
                }, i * 300);
            });
        }, 600);
    };

    animations.service = function() {
        $("#service_section .animate").each(function(i, v) {
            setTimeout(function() {
                $(v).addClass('visible');
            }, i * 200);
        });
        
        setTimeout(function() {
            $("#service_section .how-we-work .item").each(function(i, v) {
                setTimeout(function() {
                    $(v).addClass('visible');
                }, i * 300);
            });            
        }, 600);
    }

    
    animations.contact = function() {
        $("#contact_section .heading.animate").addClass('visible');
        setTimeout(function() {
            $("#contact_section #name_input").addClass('visible');
        }, 300);
        setTimeout(function() {
            $("#contact_section #phone_input").addClass('visible');
        }, 400);
        setTimeout(function() {
            $("#contact_section .orwhere").addClass('visible');
        }, 500);
        setTimeout(function() {
            $("#contact_section #email_input").addClass('visible');
        }, 600);
        setTimeout(function() {
            $("#contact_section #mess_area").addClass('visible');
        }, 700);
        setTimeout(function() {
            $("#contact_section #send_button").addClass('visible');
        }, 800);
        setTimeout(function() {
            $("#contact_section .descr.animate").addClass('visible');
        }, 1000);
    };
    
    animations.destroy_animations = function() {
        $("#service_section .animate").removeClass('visible');
        $("#service_section .how-we-work .item").removeClass('visible');
        $("#intro_section .top-menu").removeClass('visible');
        $("#intro_section h1").removeClass('visible');
        $("#intro_section .description").removeClass('visible');
        $("#intro_section .btn-red").removeClass('visible');
        $("#about_section .animate").removeClass('visible');
        $("#about_section .count-on-table-container").removeClass('visible');
        $("#trust_section .animate").removeClass('visible');
        $("#trust_section .how-we-work .item").removeClass('visible');
        $("#contact_section .animate").removeClass('visible');
        $("#contact_section #name_input").removeClass('visible');
        $("#contact_section #send_button").removeClass('visible');
        $("#contact_section #email_input").removeClass('visible');
        $("#contact_section #phone_input").removeClass('visible');
        $("#contact_section .orwhere").removeClass('visible');
        $("#contact_section #mess_area").removeClass('visible');
        if ($("html").hasClass('desktop')) {
            $("#intro_section video").get(0).pause();
        }
        
    };
    
    animations.slides = {};
    
    $('#intro_section video').coverVid(1280, 720);


});