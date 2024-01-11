'use strict'

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i)
  },
  any: function () {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
  },
}
//=========================
if (isMobile.any()) {
  document.body.classList.add('_touch')

  let menuArrows = document.querySelectorAll('.menu__arrow')
  if (menuArrows.length > 0) {
    for (let i = 0; i < menuArrows.length; i++) {
      const menuArrow = menuArrows[i]
      menuArrow.addEventListener('click', function (e) {
        menuArrow.parentElement.classList.toggle('_active')
      })
    }
  }
} else {
  document.body.classList.add('_pc')
}

// Menu burger
const iconMenu = document.querySelector('.menu__icon')
const menuBody = document.querySelector('.menu__body')
if (iconMenu) {
  iconMenu.addEventListener('click', function (e) {
    document.body.classList.toggle('_lock')
    iconMenu.classList.toggle('_active')
    menuBody.classList.toggle('_active')
  })
}

//прокрутка при клике

const menuLinks = document.querySelectorAll('.menu__link[data-goto]')

if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', onMenuLinkClick)
  })

  function onMenuLinkClick(e) {
    const menuLink = e.target
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto)
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight

      if (iconMenu.classList.contains('_active')) {
        document.body.classList.remove('_lock')
        iconMenu.classList.remove('_active')
        menuBody.classList.remove('_active')
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth',
      })
      e.preventDefault()
    }
  }
}

//Parallax // main-block__photo

let parallaxedPhoto = document.querySelector('.main-block__photo')
window.addEventListener('mousemove', function (e) {
  let x = e.clientX / window.innerWidth
  let y = e.clientY / window.innerHeight  
  parallaxedPhoto.style.transform = 'translate(-' + x * 10 + 'px, -' + y * 10 + 'px)'
})

//Vendor. slickSlider init
$(document).ready(function () {
  $('.review__body').slick({
    dots: true,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  })
})
