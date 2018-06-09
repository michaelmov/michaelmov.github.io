import hljs from 'highlight.js';
 
document.addEventListener("DOMContentLoaded", function(){

    const articleHeroSection = document.querySelector('.article__hero');
    const articleHeroText = document.querySelector('.article__hero-text ');
    const heroHeight = articleHeroSection.clientHeight;

    // Init Highlight.js
    hljs.initHighlightingOnLoad();

    // Header parallax
    window.addEventListener('scroll', e => {
        var scroll = window.scrollY;
      
        if(scroll <= heroHeight) {
          articleHeroText.style.transform = `translate(0px, ${scroll/4}%)`;
          articleHeroText.style.opacity = 1 - scroll / 250;    
        }
        
      });

      // Make all article images 100% width
      var articleImages = document.querySelectorAll('#article-wrapper img');
      articleImages.forEach(image => { 
        if(image.parentElement.nodeName === 'P') {
          image.parentElement.style.width = '100%';
        }
      });
});
 
