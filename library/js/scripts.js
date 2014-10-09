/*
Bones Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/

// IE8 ployfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}

// as the page loads, call these scripts
jQuery(document).ready(function($) {

    /*
    Responsive jQuery is a tricky thing.
    There's a bunch of different ways to handle
    it, so be sure to research and find the one
    that works for you best.
    */
    
    /* getting viewport width */
    var responsive_viewport = $(window).width();
    
    /* if is below 481px */
    if (responsive_viewport < 481) {
    
    } /* end smallest screen */
    
    /* if is larger than 481px */
    if (responsive_viewport > 481) {
        
    } /* end larger than 481px */
    
    /* if is above or equal to 768px */
    if (responsive_viewport >= 768) {
    
        /* load gravatars */
        $('.comment img[data-gravatar]').each(function(){
            $(this).attr('src',$(this).attr('data-gravatar'));
        });
        
    }
    
    /* off the bat large screen actions */
    if (responsive_viewport > 1030) {
        
    }
    
	// Myna 1.0
	$('#container').mCustomScrollbar({
		advanced:{
			updateOnBrowserResize: true,
			updateOnContentResize: true				
		},
		/*set_height: $(window).height(),*/
		autoHideScrollbar: true,
		mouseWheelPixels: 250,
		callbacks:{
			whileScrolling:function(){ WhileScrolling(); } 
		}
	});
	
	var header = document.querySelector( '.header' );
	var condense = false;
	
	function WhileScrolling(){
		if(mcs.top < -60) {
			classie.add( header, 'shrink' );
			condense = true;				
		}
		if(mcs.top > -60 && condense == true) {
			classie.remove( header, 'shrink' );
			condense = false;
		}
	}
	
	//Home Myna Slider
	/*var sw = $('.slide').width();
	$('.slide').height( sw*2/3 );
	
	$('.slide .inner li').each(function(i) {
		setTimeout(function() {  
		   
		   var loop = jQuery.runloop();
	
			loop.addMap({
				'15%': function(){
					$('.slide .inner li').find('img').animate( { opacity:1 }, { duration:500, queue:false, complete: function() {
						$(this).animate( { height: '110%' }, { duration:5000, queue:false } );
					} })					
				},
			  '30%': function(){
				 // This demo shows that you can even pause and continue the runloop from inside keyframe calls
				 loop.pause();
				 
				 loop.play();
			  },
			  '40%': function(){ $("#box").animate({ height:'34.6em' }, { duration:1500, queue:false } ) },
			  '50%': function(){ 
				 $("#intro h1").animate({ bottom:'-2.3em' }, { duration:1000, queue:false } );
				 $("#box h1").animate({ top:0 }, { duration:1000, queue:false } );
			  },
			  '55%': function(){  $("p.a").animate( { opacity:1, left:0 }, { duration:500, queue:false } );  },
			  '70%': function(){  $("p.b").animate( { opacity:1, left:0 }, { duration:500, queue:false } ); },
			  '85%': function(){  $("p.c").animate( { opacity:1, left:0 }, { duration:500, queue:false } );  },
			  '100%': function(){ 
				$('.slide .inner li').find('img').animate( { opacity:0 }, { duration:500, queue:false})			  
			  }
		   });
		   
		}, i*5000);
		
		loop.play(5000);
			
	});*/
	
	//End Myna Slider
	
 
}); /* end of as page load scripts */


/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
    var doc = w.document;
    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;
    if( !meta ){ return; }
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true; }
    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false; }
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){ disableZoom(); } }
		else if( !enabled ){ restoreZoom(); } }
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );
})( this );

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

//End Classie