/* tab */
$(".tab2 > .tablinks").click(function () {
	$(".tab2 > .tablinks").removeClass("active");
	$(this).addClass("active");
	$(".tab_wrap2 > .tabcontent").hide();
	$(".tab_wrap2 > .tabcontent").eq($(this).index()).show();
});
$(".tab2 > .tablinks").eq(0).trigger("click");

const wrapperSwipers = [];

function initializeSwipers() {
	$('.wrapper .swiper-group').each(function (t) {
		$(this).find('.swiper, .swiper-button-next, .swiper-button-prev, .swiper-pagination').addClass('type' + t);

		const isSmallScreen = window.innerWidth < 768;
		const isSmallScreen2 = 767 < window.innerWidth < 1025;
		const isSmallScreen3 = window.innerWidth < 1025;
		let wrapperSwiper = new Swiper('.wrapper .swiper.type' + t, {
			effect: 'slide',
			autoHeight: (t === 1) ? true : false,
			fadeEffect: {
				crossFade: true
			},
			slidesPerView: !isSmallScreen3 && (t === 2) ? 3 : 'auto',
			spaceBetween: isSmallScreen || isSmallScreen2 ? 10 : (t === 2) ? 24 : (t === 3) ? 22 : 100,
			observer: true,
			observeParents: true,
			loop: true,
			initialSlide: 0,
			centeredSlidesBounds: true,
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

		if (isSmallScreen2 && (t === 0)) {
			wrapperSwiper.autoplay.start();
		} else if (!isSmallScreen2 && (t === 0)) {
			wrapperSwiper.autoplay.stop();
		} else if (isSmallScreen && (t == 3)) {
			wrapperSwiper.autoplay.start();
		} else if (!isSmallScreen && (t == 3)) {
			wrapperSwiper.autoplay.stop();
		}

		wrapperSwipers.push(wrapperSwiper);
	});
}

/* mobile wing */
function fixShow(show) {
	if (show) {
		$('.fix-wrap').css('display', 'block');
		setTimeout(function () {
			$('.fix-wrap').addClass('active');
			$('.fix-wrap > div').addClass('active');
		}, 0);
	} else {
		$('.fix-wrap').removeClass('active');
		$('.fix-wrap > div').removeClass('active');
		setTimeout(function () {
			$('.fix-wrap').css('display', 'none');
		}, 100);
	}
}

function onBarClick() {
	if ($(this).hasClass('default')) {
		$(this).removeClass('default').addClass('active');
		fixShow(true);
	} else if ($(this).hasClass('active')) {
		$(this).removeClass('active').addClass('default');
		fixShow(false);
	} else {
		$(this).addClass('active');
		fixShow(true);
	}
}

$('.navi-bars').click(onBarClick);

/* mobile wing hide */
$('.fix-wrap .link').click(function () {
	setTimeout(() => {
		$('.navi-bars').removeClass('active').addClass('default');
		fixShow(false);
	}, 100);
});

/* onResize */
function onResize() {
	wrapperSwipers.forEach(swiper => swiper.destroy());
	wrapperSwipers.length = 0;

	initializeSwipers();

	if ($(window).innerWidth() > 1024) {
		$('.navi-bars').removeClass('active').addClass('default');
		fixShow(false);

		/* tab */
		$(".tab > .tablinks").click(function () {
			$(".tab > .tablinks").removeClass("active");
			$(this).addClass("active");
			$(".tab_wrap .tabcontent").hide();
			$(".tab_wrap .tabcontent").eq($(this).index()).show();
		});
		$(".tab > .tablinks").eq(0).trigger("click");
	}
}

initializeSwipers();
$(window).resize(onResize).trigger('resize');

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

/* fix-wrap */
$('.fix-wrap').click(function (e) {
	$('.navi-bars').removeClass('active').addClass('default');
	fixShow(false);
	wrapperSwipers.forEach(swiper => swiper.autoplay.start());
});

$('.pop, .fix-wrap > div').click(function (e) {
	e.stopPropagation();
});

/* 동영상 */
let player = $(".youtube").YTPlayer({
	videoURL: 'https://www.youtube.com/watch?v=MQCFyj4DZ3Q',
	mute: true,
	showControls: false,
	useOnMobile: true,
	mobileFallbackImage: null,
	optimizeDisplay: true,
	containment: 'self',
	loop: true,
	autoplay: true,
	stopMovieOnBlur: false,
	startAt: 0,
});

console.clear();