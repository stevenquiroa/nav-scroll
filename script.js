jQuery(function($){	
	var yLastPos = 0;
	var currentContainer= 0;
	var noContainers = $(document).find('.container').length - 1;
	var element = $('html, body');		
	var duration_original_scroll = 500;
	var duration_scroll = duration_original_scroll;
	function scrollY(evt){
		disable_scroll();
		var orY = parseInt(evt.deltaY);
	    if(orY > 0){
			if (currentContainer < noContainers) 
				currentContainer += 1;				
			else{
				currentContainer = 0;
				duration_scroll = 700;
			}
	    } else if(orY < 0){
			if (currentContainer > 0) 
				currentContainer -= 1;
			else{
				currentContainer = noContainers;
				duration_scroll = 700;
			}
		}
		
		yLastPos = currentContainer * $('.container').height();
		console.log(currentContainer);

		$('html, body').stop(false, false).animate({scrollTop: yLastPos}, {duration: duration_scroll});
		setTimeout(function(){
			enable_scroll();
			$(document).one('mousewheel', function(){scrollY(event);});	
		}, duration_scroll);
		duration_scroll = duration_original_scroll;
	}

	putTheFuckingEventOn = function(){
		$(document).one('mousewheel', function(){scrollY(event);});
	}

	$(document).one('mousewheel', function(){scrollY(event);});
	var keys = [37, 38, 39, 40];

	function preventDefault(e) {
	  e = e || window.event;
	  if (e.preventDefault)
	      e.preventDefault();
	  e.returnValue = false;  
	}

	function keydown(e) {
	    for (var i = keys.length; i--;) {
	        if (e.keyCode === keys[i]) {
	            preventDefault(e);
	            return;
	        }
	    }
	}

	function wheel(e) {
	  preventDefault(e);
	}

	function disable_scroll() {
	  if (window.addEventListener) {
	      window.addEventListener('DOMMouseScroll', wheel, false);
	  }
	  window.onmousewheel = document.onmousewheel = wheel;
	  document.onkeydown = keydown;
	}

	function enable_scroll() {
	    if (window.removeEventListener) {
	        window.removeEventListener('DOMMouseScroll', wheel, false);
	    }
	    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
	}
});