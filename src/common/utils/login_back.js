const defaultOptions = {
    // How fast the background moves
    movementFactor: 50,
    // How much to dampen the movement (higher is slower)
    dampenFactor: 36
};
const setImageBackground = (el, options) => {
     // To avoid scope issues, use 'base' instead of 'this'
      // to reference this class from internal events and functions.
      var base = {};
      base.width = el.getBoundingClientRect().width
      base.height = el.getBoundingClientRect().height
      // Access to jQuery and DOM versions of element
      base.el = el;
  
      // Add a reverse reference to the DOM object
    //   base.$el.data("iosParallax", base);
  
      var centerCoordinates = {x: 0, y: 0};
      var targetCoordinates = {x: 0, y: 0};
      var transitionCoordinates = {x: 0, y: 0};
  
      function getBackgroundImageUrl(){
        var backgroundImage = base.el.style.backgroundImage.match(/url\(.*\)/ig);
        if ( ! backgroundImage || backgroundImage.length < 1) {
          throw 'No background image found';
        }
        return backgroundImage[0].replace(/url\(|'|"|'|"|\)$/ig, "");
      }
  
      function getBackgroundImageSize(){
        var img = new Image;
        img.src = getBackgroundImageUrl();
        return {width: img.width, height: img.height};
      }
  
      function setCenterCoordinates(){
        var bgImgSize = getBackgroundImageSize();
        centerCoordinates.x = -1 * Math.abs(bgImgSize.width - base.width) / 2;
        centerCoordinates.y = -1 * Math.abs(bgImgSize.height - base.height) / 2;
        targetCoordinates.x = centerCoordinates.x;
        targetCoordinates.y = centerCoordinates.y;
        transitionCoordinates.x = centerCoordinates.x;
        transitionCoordinates.y = centerCoordinates.y;
      }
  
      function bindEvents(){
        base.addEventListener('mousemove', function(e){
            var width = base.options.movementFactor / base.width;
            var height = base.options.movementFactor / base.height;
            var cursorX = e.pageX - (document.body.clientWidth / 2);
            var cursorY = e.pageY - (document.body.clientWidth / 2);
            targetCoordinates.x = width * cursorX * -1 + centerCoordinates.x;
            targetCoordinates.y = height * cursorY * -1 + centerCoordinates.y;
        })
        // Slowly converge the background image position to the target coordinates in 60 FPS
        var loop = setInterval(function(){
          transitionCoordinates.x += ((targetCoordinates.x - transitionCoordinates.x) / base.options.dampenFactor);
          transitionCoordinates.y += ((targetCoordinates.y - transitionCoordinates.y) / base.options.dampenFactor);
          base.el.style.backgroundPosition = transitionCoordinates.x+"px "+transitionCoordinates.y+"px"
        }, 16);
        window.addEventListener('resize', function () {
            setCenterCoordinates();
        })
  
        // There's a problem with getting image height and width when the image isn't loaded.
        var img = new Image;
        img.src = getBackgroundImageUrl();
        img.onload = function () {
            setCenterCoordinates();
        }
      };
  
      base.init = function(){
        base.options = {...defaultOptions, ...options}
        bindEvents();
      };
  
      base.init();
}
  
  