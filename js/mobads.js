/* 탭 */
$(".tab > .tablinks").click(function () {
	$(".tab > .tablinks").removeClass("active");
	$(this).addClass("active");
	$(".tab_wrap > .tabcontent").hide();
	$(".tab_wrap > .tabcontent").eq($(this).index()).show();
});
$(".tab > .tablinks").eq(0).trigger("click");

$(".tab2 > .tablinks").click(function () {
	$(".tab2 > .tablinks").removeClass("active");
	$(this).addClass("active");
	$(".tab_wrap2 > .tabcontent").hide();
	$(".tab_wrap2 > .tabcontent").eq($(this).index()).show();
});
$(".tab2 > .tablinks").eq(0).trigger("click");


/* slide */
const wrapperSwipers = [];

$('.wrapper .swiper-group').each(function (t) {
	$(this).find('.swiper, .swiper-button-next, .swiper-button-prev, .swiper-pagination').addClass('type' + t);

	const wrapperSwiper = new Swiper('.wrapper .swiper.type' + t, {
		effect: (t === 0) ? 'slide' : 'slide',
		fadeEffect: {
			crossFade: true
		},
		slidesPerView: (t === 1) ? 3 : 'auto',
		spaceBetween: (t === 1) ? 24 : 100,
		observer: true,
		observeParents: true,
		loop: true,
		initialslide: 1,
		centeredSlides: (t === 1),
		centeredSlidesBounds: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		navigation: {
			nextEl: '.swiper-button-next.type' + t,
			prevEl: '.swiper-button-prev.type' + t,
		},
		pagination: {
			el: '.swiper-pagination.type' + t,
			clickable: true,
		},
	});
	wrapperSwipers.push(wrapperSwiper);
});

/* modal slide */
$('.modal_wrap').each(function (tt) {
	$(this).find('.swiper, .swiper-button-next, .swiper-button-prev, .swiper-pagination').addClass('type' + tt);

	const modalSwiper = new Swiper('.modal_wrap .swiper.type' + tt, {
		effect: 'slide',
		fadeEffect: {
			crossFade: true
		},
		slidesPerView: 1,
		observer: true,
		observeParents: true,
		loop: true,
		initialslide: 1,
		centeredSlidesBounds: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		navigation: {
			nextEl: '.swiper-button-next.type' + tt,
			prevEl: '.swiper-button-prev.type' + tt,
		},
		pagination: {
			el: '.swiper-pagination.type' + tt,
			clickable: true,
		},
	});
});


/* modal_wrap */
$('[class^="modal_"]').click(function (e) {
	let className = $(this).attr('class').split(' ')[0];
	let modalNumber = className.split('_')[1];
	$('.modal_wrap' + modalNumber).css('display', 'flex');
	wrapperSwipers.forEach(swiper => swiper.autoplay.stop());
});

/* bt_close */
$('.bt_close, .modal_wrap').click(function (e) {
	$('.modal_wrap').css('display', 'none');
	wrapperSwipers.forEach(swiper => swiper.autoplay.start());
});

$('.pop').click(function (e) {
	e.stopPropagation();
});

/* 동영상 */
var player = $(".youtube").YTPlayer({
	videoURL: 'https://www.youtube.com/watch?v=MQCFyj4DZ3Q',
	mute: true,
	showControls: false,
	useOnMobile: true,
	mobileFallbackImage: null,
	optimizeDisplay: true,
	quality: 'highres',
	containment: 'self',
	loop: true,
	autoplay: true,
	stopMovieOnBlur: false,
	startAt: 0,
});

/* console.clear(); */