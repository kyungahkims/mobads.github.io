const $pageWrap = document.querySelector('.fp_page_wrap');
const $pages = document.querySelectorAll('.fp_page');
const $menuWrap = document.querySelector('.fp_menu_wrap');
const $menus = document.querySelectorAll('.fp_menu_wrap > .fp_menu');
const $menuWrap2 = document.querySelector('.fp_menu_wrap2');
const $menus2 = document.querySelectorAll('.fp_menu_wrap2 > .fp_menu');
const $topBtn = document.querySelector('.fp_top_btn');
const $navWrap = document.querySelector('.fp_nav_wrap');
const $navs = document.querySelectorAll('.fp_nav');
export const pageWrapTime = Number(getComputedStyle($pageWrap).transition.split(" ")[1].replace('s', '') * 1000);
const pageLength = $pages.length;
// setting start page on class
$pages[0].classList.add('on');
$pages[0].classList.add('now');

function processMenu($menu, $menus) {
	if ($menu) {
			const fpnum = Number($menus[0].dataset.fpnum.replaceAll(',', '').split(' ').map(elm => Number(elm)).sort()[0]);
			if (fpnum === 0) {
					$menus[0].classList.add('on');
			}
	}
}
processMenu($menuWrap, $menus);
processMenu($menuWrap2, $menus2);
if ($navs[0]) $navs[0].classList.add('on');
// top button on / off
function topBtnOnOff(pageCount, pageLength) {
	if (!$topBtn) return;
	if (pageCount >= 1 /* === pageLength - 1 */ ) {
		$topBtn.classList.add('on');
	} else {
		$topBtn.classList.remove('on');
	}
}
// mobile height
setScreen();

function setScreen() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}
// element height save
const pageHeights = [];
$pages.forEach(elm => pageHeights.push(elm.clientHeight));
export let pageCount = 0;
let pagePos = 0;
// full page
let time = new Date();
let fullFlag = true;
let startFlag = true;
let topDetect = false;
let bottomDetect = false;
// flag
export let menuFlag = false;
export let navFlag = false;
export let topBtnFlag = false;
export let specificFlag = false;
let scrollFlag = false;
export function fullPageEffect(value, event, touchStartY, touchEndY) {
	if (bottomDetect || topDetect || scrollFlag) {
		time = new Date().setSeconds(new Date().getSeconds() + pageWrapTime / 1000) - new Date();
		scrollFlag = false;
	}
	if (new Date() - time > pageWrapTime || startFlag) {
		fullFlag = true;
		time = new Date();
		if (value === 'wheel') {
			fullPC(event, fullFlag);
		} else if (value === 'touch') {
			fullMB(touchStartY, touchEndY, fullFlag);
		}
		startFlag = false;
	} else {
		fullFlag = false;
	}
}
// value reset
function valueReset() {
	topBtnFlag = true;
	pageCount = 0;
	pagePos = 0;
	bottomDetect = false;
	fPNavigation(pageCount);
	let numFlag = false;
	function processMenus($menus) {
    let numFlag = false;
    $menus.forEach(elm => {
        const menuArr = elm.dataset.fpnum.replaceAll(',', '').split(' ').map(elm => Number(elm)).sort();
        menuArr.forEach(num => {
            if (num === 0) {
                numFlag = true;
                $menus.forEach(elm => elm.classList.remove('on'));
                elm.classList.add('on');
            }
        });
    });
    if (!numFlag) {
        $menus.forEach(elm => elm.classList.remove('on'));
    }
}
processMenus($menus);
processMenus($menus2);

	$pageWrap.style.transform = `translateY(${pagePos}px)`;
	$pages.forEach((elm, idx) => {
		elm.classList.remove('now');
		if (idx === pageCount) {
			elm.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		} else {
			setTimeout(() => elm.scrollTop = 0, pageWrapTime);
		}
	});
	setTimeout(() => $pages[0].classList.add('now'), pageWrapTime - 300);
	setTimeout(() => topBtnFlag = false, pageWrapTime);
}
// specific page move
export function specificMove(idx) {
	if (topBtnFlag || menuFlag || navFlag || specificFlag) return;
	const specificNum = Number(idx);
	specificFlag = true;
	function toggleOnClass($menus, specificNum) {
    $menus.forEach(elm => {
        elm.classList.remove('on');
        if (elm.dataset.fpnum == specificNum) {
            elm.classList.add('on');
        }
    });
}
toggleOnClass($menus, specificNum);
toggleOnClass($menus2, specificNum);

	pagePos = 0;
	if (specificNum === 0) {
		pageCount = 0;
		pagePos = 0;
	} else if (specificNum > 0) {
		for (let i = 1; i <= specificNum; i++) {
			pageCount = specificNum;
			pagePos += pageHeights[i];
			if (!$pages[i].classList.contains('on')) $pages[i].classList.add('on');
		}
	}
	$pages[pageCount].classList.add('on');
	$pages.forEach(elm => elm.classList.remove('now'));
	setTimeout(() => {
		$pages[pageCount].classList.add('now')
	}, pageWrapTime - 300);
	topBtnOnOff(pageCount, pageLength);
	$pageWrap.style.transform = `translateY(-${pagePos}px)`;
	setTimeout(() => specificFlag = false, pageWrapTime);
}
// menu wheel
function fPMenu(pageCount) {
	let numFlag = false;
	if (!$menuWrap) return;
	if (!$menuWrap2) return;
	function toggleOnClassByPageCount($menus, pageCount) {
    $menus.forEach(elm => {
        const menuArr = elm.dataset.fpnum.replaceAll(',', '').split(' ').map(elm => Number(elm)).sort();
        let numFlag = false;
        menuArr.forEach(num => {
            if (pageCount === num) {
                numFlag = true;
                $menus.forEach(elm => elm.classList.remove('on'));
                elm.classList.add('on');
            }
        });
        if (!numFlag) {
            elm.classList.remove('on');
        }
    });
}
toggleOnClassByPageCount($menus, pageCount);
toggleOnClassByPageCount($menus2, pageCount);
}
// menu item click event
function menusClickEvent(menu) {
	// update 24/06/24 =========
	topDetect = false;
	bottomDetect = false;
	// =========================
	if (topBtnFlag || menuFlag || navFlag || specificFlag) return;
	let menuNum = Number(menu.dataset.fpnum);
	if (!menuNum) {
		menuNum = menu.dataset.fpnum.replaceAll(',', '').split(' ').map(elm => Number(elm)).sort()[0];
	}
	if (!menu.classList.contains('on')) {
		menuFlag = true;
		$menus.forEach(elm => elm.classList.remove('on'));
		$menus2.forEach(elm => elm.classList.remove('on'));
		menu.classList.add('on');
		pagePos = 0;
		if (menuNum === 0) {
			pageCount = 0;
			pagePos = 0;
		} else if (menuNum > 0) {
			for (let i = 1; i <= menuNum; i++) {
				pageCount = menuNum;
				pagePos += pageHeights[i];
				if (!$pages[i].classList.contains('on')) $pages[i].classList.add('on');
			}
		}
		$pages[pageCount].classList.add('on');
		$pages.forEach((elm, idx) => {
			elm.classList.remove('now');
			if (idx === pageCount) {
				elm.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			} else {
				setTimeout(() => elm.scrollTop = 0, pageWrapTime);
			}
		});
		setTimeout(() => {
			$pages[pageCount].classList.add('now')
		}, pageWrapTime - 300);
		topBtnOnOff(pageCount, pageLength);
		$pageWrap.style.transform = `translateY(-${pagePos}px)`;
		setTimeout(() => menuFlag = false, pageWrapTime);
	}
}
// navigation wheel
function fPNavigation(pageCount) {
	if (!$navWrap) return;
	if (!$navs[pageCount]) return;
	if (!$navs[pageCount].classList.contains('on')) {
		$navs.forEach(elm => elm.classList.remove('on'));
		$navs[pageCount].classList.add('on');
	}
}
// navigation item click event
function navsClickEvent(navNum) {
	// update 24/06/24 =========
	topDetect = false;
	bottomDetect = false;
	// =========================
	if (topBtnFlag || menuFlag || navFlag || specificFlag) return;
	if (!$navs[navNum].classList.contains('on')) {
		navFlag = true;
		$navs.forEach(elm => elm.classList.remove('on'));
		$navs[navNum].classList.add('on');
		pagePos = 0;
		if (navNum === 0) {
			pageCount = 0;
			pagePos = 0;
		} else if (navNum > 0) {
			for (let i = 1; i <= navNum; i++) {
				pageCount = navNum;
				pagePos += pageHeights[i];
				if (!$pages[i].classList.contains('on')) $pages[i].classList.add('on');
			}
		}
		$pages[pageCount].classList.add('on');
		$pages.forEach((elm, idx) => {
			elm.classList.remove('now');
			if (idx === pageCount) {
				elm.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			} else {
				setTimeout(() => elm.scrollTop = 0, pageWrapTime);
			}
		});
		setTimeout(() => {
			$pages[pageCount].classList.add('now')
		}, pageWrapTime - 300);
		topBtnOnOff(pageCount, pageLength);
		$pageWrap.style.transform = `translateY(-${pagePos}px)`;
		setTimeout(() => navFlag = false, pageWrapTime);
	}
}
// detect scroll box
function scrollBoxDetect(pageCount) {
	const $scrollBox = $pages[pageCount];
	if (!$scrollBox) return;
	let scrollPos = Math.ceil($scrollBox.scrollTop);
	let scrollBottom = $scrollBox.scrollHeight - $scrollBox.clientHeight;
	if (scrollBottom - scrollPos <= 1) scrollPos = scrollBottom;
	if (scrollBottom === 0) {
		return 'null';
	}
	if (scrollBottom !== 0 && scrollPos === 0 || scrollPos < 0) {
		return 'top';
	} else if (scrollBottom !== 0 && scrollPos === scrollBottom || scrollPos > scrollBottom) {
		return 'bottom';
	}
}
// wheelUp event
function wheelUp() {
	let prevCount = pageCount;
	if (pageCount > 0) {
		if ($pages[pageCount]) {
			const scrollState = scrollBoxDetect(pageCount);
			if (scrollState !== 'null' && scrollState !== 'top') {
				scrollFlag = true;
				return;
			}
		}
		pagePos -= pageHeights[pageCount];
		pageCount -= 1;
		fPMenu(pageCount);
		fPNavigation(pageCount);
		if (!$pages[pageCount].classList.contains('on')) $pages[pageCount].classList.add('on');
		$pages.forEach(elm => elm.classList.remove('now'));
		setTimeout(() => {
			$pages[pageCount].classList.add('now')
		}, pageWrapTime - 300);
	}
	if (prevCount === pageCount) {
		topDetect = true;
		return;
	}
	if (bottomDetect) bottomDetect = false;
	topBtnOnOff(pageCount, pageLength);
	$pageWrap.style.transform = `translateY(-${pagePos}px)`;
}
// wheelDown event
function wheelDown() {
	let prevCount = pageCount;
	if (pageCount < pageLength - 1) {
		if ($pages[pageCount]) {
			const scrollState = scrollBoxDetect(pageCount);
			if (scrollState !== 'null' && scrollState !== 'bottom') {
				scrollFlag = true;
				return;
			}
		}
		pageCount += 1;
		pagePos += pageHeights[pageCount];
		fPMenu(pageCount);
		fPNavigation(pageCount);
		if (!$pages[pageCount].classList.contains('on')) $pages[pageCount].classList.add('on');
		$pages.forEach(elm => elm.classList.remove('now'));
		setTimeout(() => {
			$pages[pageCount].classList.add('now')
		}, pageWrapTime - 300);
	}
	if (prevCount === pageCount) {
		bottomDetect = true;
		return;
	}
	if (topDetect) topDetect = false;
	topBtnOnOff(pageCount, pageLength);
	$pageWrap.style.transform = `translateY(-${pagePos}px)`;
}
// pc fullPage
function fullPC(e, fullFlag) {
	if (!fullFlag) return;
	if (e.wheelDeltaY > 0) {
		wheelUp();
	} else if (e.wheelDeltaY < 0) {
		wheelDown();
	}
}
// mobile fullPage
function fullMB(touchStartY, touchEndY, fullFlag) {
	if (!fullFlag) return;
	if (touchStartY - touchEndY < -20) {
		wheelUp();
	} else if (touchStartY - touchEndY > 20) {
		wheelDown();
	}
}
// resize
export function fullResize() {
	setScreen();
	pageHeights.length = 0;
	$pages.forEach(elm => pageHeights.push(elm.clientHeight));
	pagePos = 0;
	$pageWrap.style.transition = '0s';
	if (pageCount === 0) {
		$pageWrap.style.transform = `translateY(-${pagePos}px)`;
	} else if (pageCount === 1) {
		pagePos = pageHeights[1];
		$pageWrap.style.transform = `translateY(-${pagePos}px)`;
	} else if (pageCount > 1) {
		for (let i = 1; i <= pageCount; i++) {
			pagePos += pageHeights[i];
		}
		$pageWrap.style.transform = `translateY(-${pagePos}px)`;
	}
	setTimeout(() => $pageWrap.style.transition = '', 100);
}
// menu button click event
$menus.forEach(elm => {
	if (elm) elm.addEventListener('click', () => menusClickEvent(elm));
})
$menus2.forEach(elm => {
	if (elm) elm.addEventListener('click', () => menusClickEvent(elm));
})
// nav button click event
$navs.forEach((elm, idx) => {
	if (elm) elm.addEventListener('click', () => navsClickEvent(idx));
})
// top button click event
if ($topBtn) {
	$topBtn.addEventListener('click', () => {
		if (pageCount === 0) return;
		valueReset();
		$topBtn.classList.remove('on');
	});
}