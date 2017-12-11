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

   var sr = ScrollReveal();
   if(window.location.pathname === '/') {
       sr.reveal('.avatar', { 
           duration: 800, 
           scale: 1,
           origin: 'left',
           distance: '30px'
        });

       sr.reveal('.site-title', { 
           duration: 800, 
           scale: 1,
           origin: 'left',
           distance: '30px',
           delay: 300
        });

       sr.reveal('.site-description', { 
           duration: 800, 
           scale: 1,
           origin: 'left',
           distance: '30px',
           delay: 300
        });

       sr.reveal('.sidebar-nav ul li', { 
           duration: 1200, 
           scale: 1,
           origin: 'left',
           distance: '30px',
           delay: 300
        }, 100);

       sr.reveal('.social-nav a', { 
           duration: 1200, 
           scale: 1,
           origin: 'bottom',
           distance: '30px',
           delay: 300
        }, 100);
   }
   
});


