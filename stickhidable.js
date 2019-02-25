/*
 * stickable.js:
 * jQuery plugin that sticks a div at the top of viewport while scrolling
 * Usage: $( '#myDiv' ).stickable();
*/
( function( $ ) {
   
   if( ! $( '#stickhidable-css' ).length ) {
      $( 'head' ).append( '<style id="stickhidable-css">.stick {margin-top:0!important;position:fixed;top: 0;z-index:10000;transition:top 0.5s;}</style' );
   }

   $.fn.stickhidable = function() {
      return this.each( function() {
      
         var $element = $( this ),
             stickyHeight = $element.outerHeight();
         
         $element
         .outerHeight( stickyHeight )
         .before( '<div />');

         var $anchor = $element.prev();
         
         var previousScroll = 0;
         $( window ).on( 'scroll', function( e ) {
            var scrollTop = $( this ).scrollTop(),
                stickyTop = $anchor.offset().top,
                hidableHeight = 30,
                isStick = $element.hasClass( 'stick' );

            if ( scrollTop > stickyTop && ! isStick ) {
                $element.width( $element.width() ).addClass( 'stick' );
                $anchor.height( stickyHeight )
            }

            if( scrollTop < previousScroll ) {
               $element.css({ top: 0 });
            }
            else if( scrollTop > previousScroll && isStick ) {
               $element.css({ top: - stickyHeight + 'px' });
            }
            previousScroll = scrollTop;

            if( scrollTop < stickyTop ) {
               $element.removeClass( 'stick' );
               $element.css({ top: '' });
               $anchor.height( 0 );
            }

         }).trigger( 'scroll' )
         
         $( window).on( 'resize', function() {
            if( $element.hasClass( 'stick' ) ) {
               $element.removeClass( 'stick' );
               $element.outerWidth( $anchor.width() );
               $element.addClass( 'stick' );
            }
            else {
               $element.css({ width: '' });
            }
         }).trigger( 'resize' );
      });
   }
})(jQuery);
