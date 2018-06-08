

/**
 * Created by Michael Movsesov on 2/14/16.
 */
 
document.addEventListener("DOMContentLoaded", function(){
    // Init Highlight.js
    hljs.initHighlightingOnLoad();

    // Header parallax
    window.addEventListener('scroll', function(e) {
        var articleHeroText = document.querySelector('.article__hero-text ');
        var heroHeight = document.querySelector('.article__hero').clientHeight;
        var scroll = window.scrollY;
      
        if(scroll <= heroHeight) {
          articleHeroText.style.transform = 'translate(0px, ' + (scroll/4) + '%)';
          articleHeroText.style.opacity = 1 - scroll / 250;
        }
        
      });

      // Make all article images 100% width
      var articleImages = document.querySelectorAll('#article-wrapper img');
      articleImages.forEach(function(image) { 
        if(image.parentElement.nodeName === 'P') {
          image.parentElement.style.width = '100%';
        }
      });
});




