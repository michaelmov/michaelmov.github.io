/**
 * Created by Michael Movsesov on 2/14/16.
 */

$(document).ready(function(){

    'use strict';

    var $page = $('#main'),
        options = {
            debug: true,
            prefetch: true,
            cacheLength: 4,
            onStart: {
                duration: 350, // Duration of our animation
                render: function ($container) {
                    // Add your CSS animation reversing class
                    $container.addClass('is-exiting');
                    // Restart your animation
                    smoothState.restartCSSAnimations();
                }
            },
            onReady: {
                duration: 0,
                render: function ($container, $newContent) {
                    // Remove your CSS animation reversing class
                    $container.removeClass('is-exiting');
                    // Inject the new content
                    $container.html($newContent);
                }
            }
        },
        smoothState = $page.smoothState(options).data('smoothState');

    $('#hamburger').click(function(){

        $('#hamburger').toggleClass('open');
        $('body').toggleClass('js-sidebar-open');
    });


    // Close sidebar navigation on vertical scroll.
    $(window).scroll(function(){
        if($(window).scrollTop() >= 100) {
            $('#hamburger').removeClass('open');
            $('body').removeClass('js-sidebar-open');
        }
    });

    // Close sidebar navigation when touching outside of the sidebar container on mobile devices.
    $(document).on('touchstart', function (e)
    {
        var sidebar = $('.sidebar');

        if (!sidebar.is(e.target) // if the target of the click isn't the container...
            && sidebar.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $('#hamburger').removeClass('open');
            $('body').removeClass('js-sidebar-open');
        }
    });


});
