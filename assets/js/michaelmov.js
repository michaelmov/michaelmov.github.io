/**
 * Created by Michael Movsesov on 2/14/16.
 */

$(document).ready(function(){

    'use strict';

    var hamburger = $('#hamburger'),
        link = $('a'),
        sidebar = $('.sidebar');

    bindClickEvents();

    // Close sidebar navigation on vertical scroll.
    $(window).scroll(function(){
        if($(window).scrollTop() >= 100) {
            closeSidebar();
        }
    });

    // Close sidebar navigation when touching outside of the sidebar container on mobile devices.
    $(document).on('touchstart', function (e) {
        if (!sidebar.is(e.target) // if the target of the click isn't the container...
            && sidebar.has(e.target).length === 0) // ... nor a descendant of the container
        {
            closeSidebar();
        }
    });

    function bindClickEvents() {
        $(hamburger).on('click', function() {
            hamburger.toggleClass('open');
            $('body').toggleClass('js-sidebar-open');
        });

        $(link).on('click', function() {
            closeSidebar();
        })
    }

    function closeSidebar() {
        $(hamburger).removeClass('open');
        $('body').removeClass('js-sidebar-open');
    }


});


var page = $('#main'),
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
        },
        onAfter: function ($container, $newContent) {
            bindClickEvents();
        }
    },

    smoothState = page.smoothState(options).data('smoothState');