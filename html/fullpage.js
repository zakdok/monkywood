$(document).ready(function(){

	/* 풀페이지 설정 */

	$('#fullpage').fullpage({
		/* 단 추가 및 삭제 설정을 원하시면 문의하시기 바랍니다. : js/myoyoun_common 연동 */

//		anchors: ['brandmovie', 'newgoods', 'mdpick', 'timesale', 'lookbook', 'brand', 'info'],
//		anchors: ['mkmov', 'mkbest', 'mktime', 'mkpromotion', 'mkbrand', 'mksponsor', 'mkreview', 'mkinfo'],
		verticalCentered: true,
//		navigation: true,
//		navigationPosition: 'right',
//		navigationPosition: 'right',

		afterLoad: function(anchorLink, index){
            // 가이드 타이틀 스티키
            if( index > 2 && index < 8){
            	$('.guide-info-section .top-title-area.sticky').addClass('fixed');
            }
		},
        onLeave: function(origin, destination, direction, trigger){
            // 띠 배너 토글
            if(origin == 1 && direction == 'down'){
                $('.hd-area .vertical-rolling').addClass('hide');
            } else if (origin == 2 && direction == "up"){
            	$('.hd-area .vertical-rolling').removeClass('hide');
            }
            // 가이드 타이틀 스티키
			if( destination <= 2 || destination >= 8){
				$('.guide-info-section .top-title-area.sticky').removeClass('fixed');
			}
            // 맞춤 식탁 nav 토글
            if(origin == 1 && direction == 'down'){
                $('.recommend-tab').addClass('active');
            } else if (origin == 2 && direction == "up"){
            	$('.recommend-tab').removeClass('active');
            }
        }


	});




	/* 상품 스와이프 설정 */
	//메인 비주얼 영역 설정
	var swiperVisual = new Swiper('.swiper-container-visual', {
		slidesPerGroup: 1,
		slidesPerView: 1,
		spaceBetween: 0,
		speed: 1000,
		parallax: true,

		breakpoints: { 900: { slidesPerView: 1,slidesPerGroup: 1, spaceBetween: 5 } },
//		breakpoints: { 900: { spaceBetween: 0 } },

		pagination: {
			el: '.swiper-pagination-visual',
			clickable: false,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

	});


	//메인 브랜드 소개 영역 설정
	var swiperBrand = new Swiper('.swiper-container-brand', {
		slidesPerGroup: 1,
		slidesPerView: 1,
		spaceBetween: 0,
		speed: 1000,
//		parallax: true,

		breakpoints: { 900: { spaceBetween: 0 } },

		pagination: {
			el: '.swiper-pagination-brand',
			clickable: false,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

	});


	//best sellers 스와이프 설정

	var swiperBest = new Swiper('.swiper-container-best', {
		slidesPerGroup: 1,
		slidesPerView: 1,
		spaceBetween: 30,
		speed: 1000,
		breakpoints: { 900: { spaceBetween: 0 } },
		pagination: {
			el: '.swiper-pagination-best',
			clickable: false,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		on: {
			init: function () { //처음 로드시 읽어 드림
				$('.newgoods_wrap .newgoods_gd_txt .info_gd_name').text($('.swiper_best .swiper-wrapper .swiper-slide-active').attr('data-pr-name'));
				$('.newgoods_wrap .newgoods_gd_txt .info_gd_price').text($('.swiper_best .swiper-wrapper .swiper-slide-active').attr('data-prm-price'));
				
				if (matchMedia("screen and (min-width: 900px)").matches) {
					$('.newgoods_wrap .newgoods_gd_txt .info_gd_sale').text($('.swiper_best .swiper-wrapper .swiper-slide-active #mx_sale_price').html());
					if($('.swiper_best .swiper-wrapper .swiper-slide-active #mx_sale_price').html() != ''){
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_price').addClass('through');
					} else {
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_price').removeClass('through');
					};
					
				} else {
					if($('.swiper_best .swiper-wrapper .swiper-slide-active #mx_sale_price').html() != ''){
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_price').addClass('through');
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_sale').css('display','block');
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_sale').text($('.swiper_best .swiper-wrapper .swiper-slide-active #mx_sale_price span').html());
					} else {
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_price').removeClass('through');
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_sale').css('display','none');
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_sale').text($('.swiper_best .swiper-wrapper .swiper-slide-active #mx_sale_price span').html());
					};
					
				};

			},
			slideChangeTransitionStart: function(){
				$('.newgoods_wrap .newgoods_gd_txt .info_gd_name').text($('.swiper_best .swiper-wrapper .swiper-slide-active').attr('data-pr-name'));
				$('.newgoods_wrap .newgoods_gd_txt .info_gd_price').text($('.swiper_best .swiper-wrapper .swiper-slide-active').attr('data-prm-price'));
				
				if (matchMedia("screen and (min-width: 900px)").matches) {
					$('.newgoods_wrap .newgoods_gd_txt .info_gd_sale').text($('.swiper_best .swiper-wrapper .swiper-slide-active #mx_sale_price').html());
					if($('.swiper_best .swiper-wrapper .swiper-slide-active #mx_sale_price').html() != ''){
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_price').addClass('through');
					} else {
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_price').removeClass('through');
					};
					
				} else {
					
					if($('.swiper_best .swiper-wrapper .swiper-slide-active #mx_sale_price').html() != ''){
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_price').addClass('through');
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_sale').css('display','block');
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_sale').text($('.swiper_best .swiper-wrapper .swiper-slide-active #mx_sale_price span').html());
					} else {
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_price').removeClass('through');
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_sale').css('display','none');
						$('.newgoods_wrap .newgoods_gd_txt .info_gd_sale').text($('.swiper_best .swiper-wrapper .swiper-slide-active #mx_sale_price span').html());
					};
					
				}
			}
			
		}
	});


	//timesale 스와이프 설정

	//var mql = window.matchMedia("screen and (max-width: 900px)");
	var swiperTime = new Swiper('.swiper-container-time', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 30,
		speed: 1000,
		centeredSlides: true, //가운데 정의
		
		breakpoints: { 900: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 0 } },
		pagination: {
			el: '.swiper-pagination-time',
			clickable: false,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		on: {
			init: function () { //처음 로드시 읽어 드림
				//모바일 상품이름&가격 초기화
				$('.times_wrap .times_gd_txt .info_gd_name').text($('.swiper_time .swiper-wrapper .swiper-slide-active').attr('data-pr-name'));
				$('.times_wrap .times_gd_txt .info_gd_price').text($('.swiper_time .swiper-wrapper .swiper-slide-active').attr('data-prm-price'));
				
				if (matchMedia("screen and (min-width: 900px)").matches) {
					$('.times_wrap .times_gd_txt .info_gd_sale').text($('.swiper_time .swiper-wrapper .swiper-slide-active #mx_sale_price').html());
					if($('.swiper_time .swiper-wrapper .swiper-slide-active #mx_sale_price').html() != ''){
						$('.times_wrap .times_gd_txt .info_gd_price').addClass('through');
					} else {
						$('.times_wrap .times_gd_txt .info_gd_price').removeClass('through');
					};
					
				} else {
					if($('.swiper_time .swiper-wrapper .swiper-slide-active #mx_sale_price').html() != ''){
						$('.times_wrap .times_gd_txt .info_gd_price').addClass('through');
						$('.times_wrap .times_gd_txt .info_gd_sale').css('display','block');
						$('.times_wrap .times_gd_txt .info_gd_sale').text($('.swiper_time .swiper-wrapper .swiper-slide-active #mx_sale_price span').html());
					} else {
						$('.times_wrap .times_gd_txt .info_gd_price').removeClass('through');
						$('.times_wrap .times_gd_txt .info_gd_sale').css('display','none');
						$('.times_wrap .times_gd_txt .info_gd_sale').text($('.swiper_time .swiper-wrapper .swiper-slide-active #mx_sale_price span').html());
					};
					
				};
				
				
				//모바일 타임세일 초기화
				$('#promodate_e').val($('.swiper_time .swiper-wrapper .swiper-slide-active').attr('data-prm-time'));
				$('#promodate_s').val($('.swiper_time .swiper-wrapper .swiper-slide-active').attr('data-prm-time-start'));
				
				//pc 타임세일 리스트 초기화
				count_down('#defaultCountdown', $('#promodate_e').val(), $('#promodate_s').val());	
			},
			slideChangeTransitionStart: function(){
				$('.times_wrap .times_gd_txt .info_gd_name').text($('.swiper_time .swiper-wrapper .swiper-slide-active').attr('data-pr-name'));
				$('.times_wrap .times_gd_txt .info_gd_price').text($('.swiper_time .swiper-wrapper .swiper-slide-active').attr('data-prm-price'));
				
				if (matchMedia("screen and (min-width: 900px)").matches) {
					$('.times_wrap .times_gd_txt .info_gd_sale').text($('.swiper_time .swiper-wrapper .swiper-slide-active #mx_sale_price').html());
					if($('.swiper_time .swiper-wrapper .swiper-slide-active #mx_sale_price').html() != ''){
						$('.times_wrap .times_gd_txt .info_gd_price').addClass('through');
					} else {
						$('.times_wrap .times_gd_txt .info_gd_price').removeClass('through');
					};
					
				} else {
					if($('.swiper_time .swiper-wrapper .swiper-slide-active #mx_sale_price').html() != ''){
						$('.times_wrap .times_gd_txt .info_gd_price').addClass('through');
						$('.times_wrap .times_gd_txt .info_gd_sale').css('display','block');
						$('.times_wrap .times_gd_txt .info_gd_sale').text($('.swiper_time .swiper-wrapper .swiper-slide-active #mx_sale_price span').html());
					} else {
						$('.times_wrap .times_gd_txt .info_gd_price').removeClass('through');
						$('.times_wrap .times_gd_txt .info_gd_sale').css('display','none');
						$('.times_wrap .times_gd_txt .info_gd_sale').text($('.swiper_time .swiper-wrapper .swiper-slide-active #mx_sale_price span').html());
					};
					
				};
				
				//모바일 타임세일 초기화
				$('#promodate_e').val($('.swiper_time .swiper-wrapper .swiper-slide-active').attr('data-prm-time'));
				$('#promodate_s').val($('.swiper_time .swiper-wrapper .swiper-slide-active').attr('data-prm-time-start'));
			
				count_down('#defaultCountdown', $('#promodate_e').val(), $('#promodate_s').val());
			}
		}
	});


	//promotion 스와이프 설정

	var swiperPromo = new Swiper('.swiper-container-promo', {
		slidesPerGroup: 1,
		slidesPerView: 1,
		spaceBetween: 30,
		speed: 1000,
		breakpoints: { 900: { spaceBetween: 0 } },
		pagination: {
			el: '.swiper-pagination-promo',
			clickable: false,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		on: {
			init: function () { //처음 로드시 읽어 드림
				$('.promotion_wrap .promo_gd_txt .info_gd_name').text($('.swiper_promo .swiper-wrapper .swiper-slide-active').attr('data-pr-name'));
				$('.promotion_wrap .promo_gd_txt .info_gd_price').text($('.swiper_promo .swiper-wrapper .swiper-slide-active').attr('data-prm-price'));
				
				if (matchMedia("screen and (min-width: 900px)").matches) {
					$('.promotion_wrap .promo_gd_txt .info_gd_sale').text($('.swiper_promo .swiper-wrapper .swiper-slide-active #mx_sale_price').html());
					if($('.swiper_promo .swiper-wrapper .swiper-slide-active #mx_sale_price').html() != ''){
						$('.promotion_wrap .promo_gd_txt .info_gd_price').addClass('through');
					} else {
						$('.promotion_wrap .promo_gd_txt .info_gd_price').removeClass('through');
					};
					
				} else {
					if($('.swiper_promo .swiper-wrapper .swiper-slide-active #mx_sale_price').html() != ''){
						$('.promotion_wrap .promo_gd_txt .info_gd_price').addClass('through');
						$('.promotion_wrap .promo_gd_txt .info_gd_sale').css('display','block');
						$('.promotion_wrap .promo_gd_txt .info_gd_sale').text($('.swiper_promo .swiper-wrapper .swiper-slide-active #mx_sale_price span').html());
					} else {
						$('.promotion_wrap .promo_gd_txt .info_gd_price').removeClass('through');
						$('.promotion_wrap .promo_gd_txt .info_gd_sale').css('display','none');
						$('.promotion_wrap .promo_gd_txt .info_gd_sale').text($('.swiper_promo .swiper-wrapper .swiper-slide-active #mx_sale_price span').html());
					};
					
				};

			},
			slideChangeTransitionStart: function(){
				$('.promotion_wrap .promo_gd_txt .info_gd_name').text($('.swiper_promo .swiper-wrapper .swiper-slide-active').attr('data-pr-name'));
				$('.promotion_wrap .promo_gd_txt .info_gd_price').text($('.swiper_promo .swiper-wrapper .swiper-slide-active').attr('data-prm-price'));
				
				if (matchMedia("screen and (min-width: 900px)").matches) {
					$('.promotion_wrap .promo_gd_txt .info_gd_sale').text($('.swiper_promo .swiper-wrapper .swiper-slide-active #mx_sale_price').html());
					if($('.swiper_promo .swiper-wrapper .swiper-slide-active #mx_sale_price').html() != ''){
						$('.promotion_wrap .promo_gd_txt .info_gd_price').addClass('through');
					} else {
						$('.promotion_wrap .promo_gd_txt .info_gd_price').removeClass('through');
					};
					
				} else {
					if($('.swiper_promo .swiper-wrapper .swiper-slide-active #mx_sale_price').html() != ''){
						$('.promotion_wrap .promo_gd_txt .info_gd_price').addClass('through');
						$('.promotion_wrap .promo_gd_txt .info_gd_sale').css('display','block');
						$('.promotion_wrap .promo_gd_txt .info_gd_sale').text($('.swiper_promo .swiper-wrapper .swiper-slide-active #mx_sale_price span').html());
					} else {
						$('.promotion_wrap .promo_gd_txt .info_gd_price').removeClass('through');
						$('.promotion_wrap .promo_gd_txt .info_gd_sale').css('display','none');
						$('.promotion_wrap .promo_gd_txt .info_gd_sale').text($('.swiper_promo .swiper-wrapper .swiper-slide-active #mx_sale_price span').html());
					};
					
				};

			}
		}
	});


	//Sponsorship 스와이프 설정

	var swiperLook = new Swiper('.swiper-container-look', {
		slidesPerGroup: 1,
		slidesPerView: 1,
		spaceBetween: 20,
		speed: 1000,
//		loop: true,
//		loopFillGroupWithBlank: true,
		
		breakpoints: { 
			900: { spaceBetween: 0}  
		},
		pagination: {
			el: '.swiper-pagination-look',
			clickable: false,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		on: {
			init: function () { //처음 로드시 읽어 드림
				$('.lookb_wrap .look_gd_txt .info_gd_name').text($('.swiper_look .swiper-wrapper .swiper-slide-active').attr('data-pr-name'));
			},
			slideChangeTransitionStart: function(){
				$('.lookb_wrap .look_gd_txt .info_gd_name').text($('.swiper_look .swiper-wrapper .swiper-slide-active').attr('data-pr-name'));
			},
		},
	});


	//Best review 스와이프 설정

	var swiperLook = new Swiper('.swiper-container-breview', {
		slidesPerGroup: 1,
		slidesPerView: 1,
		spaceBetween: 20,
		speed: 1000,
		
		breakpoints: { 
			900: { spaceBetween: 0}  
		},
		pagination: {
			el: '.swiper-pagination-breview',
			clickable: false,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		on: {
			init: function () { //처음 로드시 읽어 드림
				$('.breview_wrap .breview_gd_txt .info_gd_name').text($('.swiper_breview .swiper-wrapper .swiper-slide-active').attr('data-pr-name'));
			},
			slideChangeTransitionStart: function(){
				$('.breview_wrap .breview_gd_txt .info_gd_name').text($('.swiper_breview .swiper-wrapper .swiper-slide-active').attr('data-pr-name'));
			},
		},
	});

});