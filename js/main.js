const TypeWriter = function(txtElement,words,waitTime = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.waitTime = parseInt(waitTime,10);
    this.txt = '';
    this.wordIndex = 0;
    this.type();
    this.isDeleting = false;
}

//Type method
TypeWriter.prototype.type = function() {
    //Current Index of word

    const current = this.wordIndex % this.words.length;
    //Get full text
    const fulltxt = this.words[current];
    //Check if deleting
    if(this.isDeleting){
        //Remove character
        this.txt = fulltxt.substring(0,this.txt.length-1);
    }
    else{
        //Add
        this.txt = fulltxt.substring(0,this.txt.length+1);
    }

    //Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`
    //Initial Type speed
    let typeSpeed = 200;

    if(this.isDeleting){
        typeSpeed /= 2;
    }

    //Check if word is complete
    if(!this.isDeleting && this.txt == fulltxt){
        //Pause at end
        typeSpeed = this.waitTime;
        //Set isDeleting to true
        this.isDeleting = true;
    }
    else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        //Move to next word
        this.wordIndex++;
        //Pause before start typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed)
}
//Init on DOM
document.addEventListener('DOMContentLoaded',init);

//Init
function init()
{
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Typewriter
    new TypeWriter(txtElement,words,wait);

}
$(document).ready(function(){
// Smooth scroll for links with hashes
$('a.smooth-scroll')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});
});
