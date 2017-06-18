/**
 * Created by Michael Movsesov on 2/14/16.
 */

var Site = {
    init: function () {
        // Cache UI elements.
        Site.hamburger = $('#hamburger');
        Site.link = $('a');
        Site.sidebar = $('.sidebar');
        Site.page = $('#main');

        // Close sidebar navigation on vertical scroll.
        $(window).scroll(function(){
            if($(window).scrollTop() >= 100) {
                Site.closeSidebar();
            }
        });

        this.bindClickEvents();
        this.ajaxify();
    },

    bindClickEvents: function () {
        // Turn hamburger icon to "X" and open sidebar on click.
        this.hamburger.on('click', function(e) {
            $(this).toggleClass('open');
            $('body').toggleClass('js-sidebar-open');
        });

        this.link.on('click', function() {
            // If mobile sidebar is open, then close it on any link click.
            Site.closeSidebar();
            // Also, animate splash page into sidebar when a link is clicked on homepage.
            this.sidebar.addClass('scene_element--width');
        }.bind(this));

        // Close mobile sidebar navigation when touching outside of the sidebar container on mobile devices.
        $('.page-content-wrapper').on('touchstart', function (e) {
            Site.closeSidebar();
        });
    },

    // Close sidebar and animate "X" back into hamburger symbol.
    closeSidebar: function () {
        $('body').removeClass('js-sidebar-open');
        this.hamburger.removeClass('open');
    },

    // Smooth page transitions without a refresh :)
    ajaxify: function () {
        var options = {
            debug: true,
            prefetch: true,
            cacheLength: 4,
            onStart: {
                duration: 350, // Duration of our animation
                render: function ($container) {
                    // Add your CSS animation reversing class
                    $container.addClass('is-exiting');
                    // Restart your animation
                    Site.smoothState.restartCSSAnimations();
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
        };

        Site.smoothState = this.page.smoothState(options).data('smoothState');
    }
};


$(document).ready(function () {
   Site.init();
});


