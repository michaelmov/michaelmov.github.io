/**
 * Created by Michael Movsesov on 2/14/16.
 */

$(document).ready(function(){

    var pathname = window.location.pathname;

    ajaxify();

    if(pathname !== '/') {
        $('.sidebar').removeClass('sidebar-full-width');
        $('footer').removeClass('hidden');
    }


    $('.sidebar-nav a').click(function() {
       $('.sidebar').removeClass('sidebar-full-width');
       $('footer').removeClass('hidden');
       $('body').removeClass('js-sidebar-open');
    });

    $('.avatar').click(function() {
        $('.sidebar').addClass('sidebar-full-width');
        $('footer').addClass('hidden');
    });


    // Toggle sidebar navigation on mobile.
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


    function ajaxify() {
        var siteUrl = 'http://'+(document.location.hostname||document.location.host);

        //	Catch all internally-focused links and push a new state.
        //	Note: External links will not be affected by this behavior.
        $(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
            e.preventDefault();
            History.pushState({}, "", this.pathname);
        });

        History.Adapter.bind(window, 'statechange', function(){
            var state = History.getState();
            $.get(state.url, function(data){	// Use AJAX to get the new content.
                document.title = data.match(/<title>(.*?)<\/title>/)[1];
                $('.inner-wrap').parent().html($(data).find('.inner-wrap')); 	// Pull the post we want out of the .content class.
                // If you change the class of the post container,
                // you must change it here!!!
                // _gaq.push(['_trackPageview', state.url]);	// This updates Google Analytics with a visit to the new page.
                // If you don't use Google Analytics, you can safety comment or
                // remove that line.
            });
        });
    }

});
