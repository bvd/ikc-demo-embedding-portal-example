var fixed_menu = true;
window.jQuery = window.$ = jQuery;


/*-----------------------------------------------------------------------------------*/
/*	PRELOADER
/*-----------------------------------------------------------------------------------*/
jQuery(window).load(function () {
	//Preloader
	setTimeout("jQuery('#preloader').animate({'opacity' : '0'},300,function(){jQuery('#preloader').hide()})",800);
	setTimeout("jQuery('.preloader_hide, .selector_open').animate({'opacity' : '1'},500)",800);
	setTimeout("jQuery('footer').animate({'opacity' : '1'},500)",2000);

});



/*-----------------------------------------------------------------------------------*/
/*	NICESCROLL
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	jQuery("body").niceScroll({
		cursorcolor:"#333",
		cursorborder:"0px",
		cursorwidth :"8px",
		zindex:"9999"
	});
});





/*-----------------------------------------------------------------------------------*/
/*	MENU
/*-----------------------------------------------------------------------------------*/
function calculateScroll() {
	var contentTop      =   [];
	var contentBottom   =   [];
	var winTop      =   $(window).scrollTop();
	var rangeTop    =   200;
	var rangeBottom =   700;
	$('.navmenu').find('.scroll_btn a').each(function(){
		contentTop.push( $( $(this).attr('href') ).offset().top );
		contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
	})
	$.each( contentTop, function(i){
		if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
			$('.navmenu li.scroll_btn')
			.removeClass('active')
			.eq(i).addClass('active');			
		}
	})
};

jQuery(document).ready(function() {
	//MobileMenu
	if ($(window).width() < 768){
		jQuery('.menu_block .container').prepend('<a href="javascript:void(0)" class="menu_toggler"><span class="fa fa-align-justify"></span></a>');
		jQuery('header .navmenu').hide();
		jQuery('.menu_toggler, .navmenu ul li a').click(function(){
			jQuery('header .navmenu').slideToggle(300);
		});
	}
		
	// if single_page
	if (jQuery("#page").hasClass("single_page")) {			
	}
	else {
		$(window).scroll(function(event) {
			calculateScroll();
		});
		$('.navmenu ul li a, .mobile_menu ul li a, .btn_down').click(function() {  
			$('html, body').animate({scrollTop: $(this.hash).offset().top - 80}, 1000);
			return false;
		});
	};
	
	// contact form
	$("#contact-form-face .contact_btn").click(function() {
		
		function guid() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		}
		
		var postdata = {};
		postdata.guid = guid();
		postdata.message = $("#contact-form-face textarea").first().val();
		postdata.email = $("#contact-form-face input.email").first().val();
		postdata.recaptcha = grecaptcha.getResponse();
		var apiurl = "https://ikc-embeddemo-contactform-web-dev.azurewebsites.net/api/CreateContactRequest";
		
		// the first request (store the form to be processed on the server) 
		// it should next to always succeed as it has no dependencies
		$.post( apiurl, postdata).done(function( data ) {
			
			// show the user that the form validation is running on the server
			$("#contact-form-face").hide();
			$(".contact-form-msg-identifier").text(postdata.guid);
			$("#contact-form-waiting").show();
			
			//
			// follow the process by polling it here ...
			//
			var retryCodes = [
				404, // not found (i.e. not created yet)
				403  // the resource is locked because it is still being validated
			];
			
			$.ajax({
				url : "https://ikcomponeer-demo-contactform-status.azurewebsites.net/api/GetStatus?code=aojit9klufl0k1idjpk9d494qq0ty6yi4w&guid=" + postdata.guid,
				type : 'GET'
			}).retry({
				times:3, 
				timeout:3000, 
				statusCodes: retryCodes
			}).then(function(data){
				//
				// the form was processed and now we present the outcome to the user
				//
				
				$("#contact-form-waiting").hide();
				
				// show the form as it was submitted but with disabled submit button
				$(".contact_btn").first().disabled = true;
				
				var aha = false;
				
				$("#contact-form-face input.email").css({"border-color": "white"});
				$("#contact-form-face textarea").css({"border-color": "white"});
				
				if(data.messageForwarded){
					aha = true;
					$("#contact-form-thankyou").show();
				}
				if(data.missingEmail){
					aha = true;
					$("#contact-form-face").show();
					$("#contact-form-face input.email").css({"border-color": "red"});
				}
				if(data.missingMessage){
					aha = true;
					$("#contact-form-face").show();
					$("#contact-form-face textarea").css({"border-color": "red"});
				}
				if(data.invalidRecaptcha){
					aha = true;
					$("#contact-form-face").show();
					grecaptcha.reset();
				}
				if(!aha){
					$("#contact-form-could-not-retrieve-status").show();
				}
				
			}).fail(function($xhr){
				//
				// retrieval of result failed or the retry count exceeded
				//
				$("#contact-form-waiting").hide();
				$("#contact-form-could-not-retrieve-status").show();
			});
			
		}).fail(function($xhr) {
			// TECHNICAL ERROR WHEN SENDING
			$("#contact-form-face").hide();
			$("#contact-form-could-not-send").show();
		});
	});
	
	
});


/* Superfish */
jQuery(document).ready(function() {
	if ($(window).width() >= 768){
		$('.navmenu ul').superfish();
	}
});







	


/*-----------------------------------------------------------------------------------*/
/*	FLEXSLIDER
/*-----------------------------------------------------------------------------------*/
jQuery(window).load(function(){
	//Top Slider
	$('.flexslider.top_slider').flexslider({
		animation: "fade",
		controlNav: false,
		directionNav: true,
		animationLoop: false,
		slideshow: false,
		prevText: "",
		nextText: ""
	});
	
	
	homeHeight();
	
	
	jQuery('.flexslider.top_slider .flex-direction-nav').addClass('container');
	
	
	//Vision Slider
	$('.flexslider.portfolio_single_slider').flexslider({
		animation: "fade",
		controlNav: true,
		directionNav: true,
		animationLoop: false,
		slideshow: false,
	});
	
	
});

jQuery(window).resize(function(){
	homeHeight();
	
});

jQuery(document).ready(function(){
	homeHeight();
	
});

function homeHeight(){
	var wh = jQuery(window).height() - 80;
	jQuery('.top_slider, .top_slider .slides li').css('height', wh);
}









/*-----------------------------------------------------------------------------------*/
/*	OWLCAROUSEL
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
	
	//WORKS SLIDER
    var owl = $(".owl-demo.projects_slider");

    owl.owlCarousel({
		navigation: true,
		pagination: false,
		items : 4,
		itemsDesktop : [1000,4],
		itemsDesktop : [600,3]
	});
	
	
	//TEAM SLIDER
    var owl = $(".owl-demo.team_slider");

    owl.owlCarousel({
		navigation: true,
		pagination: false,
		items : 3,
		itemsDesktop : [600,2]
	});
	
	
	
	jQuery('.owl-controls').addClass('container');
	
	
	//TESTIMONIALS SLIDER
    var owl = $(".owl-demo.testim_slider");

    owl.owlCarousel({
		itemsCustom : [
			[0, 1]
        ],
		navigation: false,
		pagination: true,
		items : 1
	});
	
	
	
	jQuery('.owl-controls').addClass('container');
	
	
});








/*-----------------------------------------------------------------------------------*/
/*	IFRAME TRANSPARENT
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	$("iframe").each(function(){
		var ifr_source = $(this).attr('src');
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
		var getQString = ifr_source.split('?');
		var oldString = getQString[1];
		var newString = getQString[0];
		$(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else $(this).attr('src',ifr_source+'?'+wmode);
	});
});







/*-----------------------------------------------------------------------------------*/
/*	BLOG MIN HEIGHT
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	blogHeight();
});

jQuery(window).resize(function(){
	blogHeight();
});

function blogHeight(){
	if ($(window).width() > 991){
		var wh = jQuery(window).height() - 80;
		jQuery('#blog').css('min-height', wh);
	}
	
}







/*-----------------------------------------------------------------------------------*/
/*	FOOTER HEIGHT
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	contactHeight();
});

jQuery(window).resize(function(){
	contactHeight();
});

function contactHeight(){
	if ($(window).width() > 991){
		var wh = jQuery('footer').height() + 70;
		jQuery('#contacts').css('min-height', wh);
	}
}





/*-----------------------------------------------------------------------------------*/
/*	FOOTER MAP
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	jQuery('.map_show').click(function(){
		jQuery('#map').addClass('showed');
	});
	
	jQuery('.map_hide').click(function(){
		jQuery('#map').removeClass('showed');
	});
});







