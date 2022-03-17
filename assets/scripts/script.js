// Header
var app = document.querySelector('.app');

//Handle HEADER SEARCH
//1. Handle input box
var searchInput = document.querySelector('.header__input');
var searchInputWrap = document.querySelector('.header__input-wrap');
var handleSearchInput = function(){
    var clearInputBtn = document.querySelector('.header__input-close');
    //Hanle box shadow CSS
    searchInput.onclick = function(e){
        setTimeout(function(){
            searchInputWrap.style.boxShadow = '0 0 0 2px rgb(0 0 0 / 14%)';
        }, 200);
    }
    //Hanle when user input
    searchInput.oninput = function(){
        setTimeout(function(){
            if(this.value != ''){
                document.querySelector('.header__input-close').classList.add('display');
            }else{
                document.querySelector('.header__input-close').classList.remove('display');
            }
            document.querySelector('.history-box').style.display = 'block';
        }, 600);
    }
    clearInputBtn.onclick = function(){
        searchInput.value = '';
        document.querySelector('.header__input-close').classList.remove('display');
    }
    searchInput.onblur = function(){
        document.querySelector('.history-box').style.display = 'none';
        searchInputWrap.style.boxShadow = 'none';
    }
}
handleSearchInput();
//2. Handle calendar box
var calendarInput = document.querySelector('.header__calendar-wrap');

//3. Handle booking box
var guestInput = document.querySelector('.header__guest-wrap');

function getParentElementWithClass(element, parentClass) {
    element = element.parentElement;
    if(element === null) return null;
    while(!element.matches(parentClass)){
        element = element.parentElement;
    }
    return element;
}

var handleBooking = function(){
    var bookingBox = document.querySelector('.booking-box');
    bookingBox.onclick = function(e){
        e.stopPropagation();
    }
    guestInput.onclick = function(){
        setTimeout(function(){
            guestInput.style.boxShadow = '0 0 0 2px rgb(0 0 0 / 14%)';
            bookingBox.style.display = 'block';
        }, 400);
    };
    window.onclick = function(e){
        if(!e.target.closest('.' + guestInput.className, '.' + bookingBox.className)){
            guestInput.style.boxShadow = 'none';
            bookingBox.style.display = 'none';
        }
    }
    
    var bookingDescreaBtns = document.querySelectorAll('.booking-item__btn--descrease');
    var bookingIncreaseBtns = document.querySelectorAll('.booking-item__btn--increase');

    var bookingAdult = bookingBox.querySelector('input[name="adult"]');
    var bookingChild = bookingBox.querySelector('input[name="child"]');
    var bookingInfant = bookingBox.querySelector('input[name="infant"]');

    var currentGuestAmount = document.querySelector('.header__guest-wrap span');
    currentGuestAmount.innerText = 'Số khách'
    Array.from(bookingDescreaBtns).forEach(function(btn){
        if(!btn.classList.contains('disable')){
            btn.onclick = function(e){
                if(this.name === 'adult'){
                    var numberAdult = Number(bookingAdult.value);
                    if(numberAdult !== 0){
                        numberAdult = numberAdult - 1;
                        if(numberAdult === 0){
                            this.classList.remove('active')
                            this.classList.add('disabled');
                            bookingChild.value = 0;
                            bookingInfant.value = 0;
                        }
                        bookingAdult.value = numberAdult;
                    }
                }else if(this.name === 'child'){
                    if(Number(bookingChild.value) !== 0){
                        bookingChild.value = Number(bookingChild.value) - 1;
                    }
                }else{
                    if(Number(bookingInfant.value) !== 0){
                        bookingInfant.value = Number(bookingInfant.value) - 1;
                    }
                }
                if(bookingChild.value == 0){
                    var parentChild = getParentElementWithClass(bookingChild, '.booking-item__control');
                    parentChild.querySelector('.booking-item__btn--descrease').classList.add('disabled');
                    parentChild.querySelector('.booking-item__btn--descrease').classList.remove('active');
                }else if(bookingInfant.value == 0){
                    var parentInfant = getParentElementWithClass(bookingInfant, '.booking-item__control');
                    parentInfant.querySelector('.booking-item__btn--descrease').classList.add('disabled');
                    parentInfant.querySelector('.booking-item__btn--descrease').classList.remove('active');
                }
                // Xử lý hiển thị số lượng khách booking
                if(Number(bookingAdult.value) + Number(bookingChild.value) + Number(bookingInfant.value) <= 0){
                    currentGuestAmount.innerText = 'Số khách'
                }else{
                    var guestAmount = Number(bookingAdult.value) + Number(bookingChild.value);
                    var infantAmount = Number(bookingInfant.value);
                    if(infantAmount === 0){
                        currentGuestAmount.innerText = guestAmount + ' Khách';
                    }else{
                        currentGuestAmount.innerText = guestAmount + ' Khách, ' + infantAmount + 'Trẻ sơ sinh'
                    }
                    
                }
            }
            
        }
        

    });
    Array.from(bookingIncreaseBtns).forEach(function(btn){
        btn.onclick = function(e){
            var parentElement = e.target.parentElement;
            var bookingAmount = parentElement.querySelector('.booking-item__amount-input');

            if(this.name === 'child' || this.name === 'infant'){
                bookingAmount.value = Number(bookingAmount.value) + 1;
                if(bookingAdult.value <= 0){
                    bookingAdult.value = Number(bookingAdult.value) + 1;
                    var parent = getParentElementWithClass(bookingAdult, '.booking-item__control');
                    parent.querySelector('.booking-item__btn--descrease').classList.remove('disabled');
                    parent.querySelector('.booking-item__btn--descrease').classList.add('active');
                }
            }else{
                bookingAmount.value = Number(bookingAmount.value) + 1;
            }

            if(bookingAmount.value > 0){
                parentElement.querySelector('.booking-item__btn--descrease').classList.remove('disabled');
                parentElement.querySelector('.booking-item__btn--descrease').classList.add('active');
            }
            // Xử lý hiển thị số lượng khách booking
            if(Number(bookingAdult.value) + Number(bookingChild.value) + Number(bookingInfant.value) <= 0){
                currentGuestAmount.innerText = 'Số khách'
            }else{
                var guestAmount = Number(bookingAdult.value) + Number(bookingChild.value);
                var infantAmount = Number(bookingInfant.value);
                if(infantAmount === 0){
                    currentGuestAmount.innerText = guestAmount + ' Khách';
                }else{
                    currentGuestAmount.innerText = guestAmount + ' Khách, ' + infantAmount + 'Trẻ sơ sinh'
                }
                
            }
        }
        
    });
    
};
handleBooking();

//4. Handle languages and currency box
var handleLanguage = function() {
    var languageBox = document.querySelector('.languages');
    const popOverBox = document.querySelector('.popover');

    languageBox.onclick = function(e) {
        popOverBox.classList.toggle('popover--open');
        e.stopPropagation();
    }
    document.onclick = function(e){
        if(!popOverBox.contains(e.target)){
            popOverBox.classList.remove('popover--open');
        }
    }
   
}
handleLanguage();
// 2. Big Banner

var banner = document.querySelector('.banner-frames')
var bannerSlide = banner.querySelectorAll('.banner-slide');
var bannerNav = banner.querySelectorAll('.btn');
let currentSlide = 1;
//2.1. Banner with manual buttons
var manualNav = function(manual) {
    bannerSlide.forEach((slide) => {
        slide.classList.remove('active');
        bannerNav.forEach((btn) => {
            btn.classList.remove('active');
        });
    });
    bannerSlide[manual].classList.add('active');
    bannerNav[manual].classList.add('active');
}
bannerNav.forEach((btn, i) => {
    btn.onclick = () => {
        manualNav(i);
        currentSlide = i;
    }
});
//2.2. Banner with auto-play 
var repeatBanner = function() {
    var i = 0;
    var repeater = () => {
        setTimeout(function(){
            manualNav(i);
            i++;
            if(i >= bannerSlide.length) {
                i = 0;
            }
            if(i > bannerSlide.length) return;
            repeater();
        }, 3000);
    }

    repeater();

}
repeatBanner();

// Content
//3.2. Slider

var handleSlide = function(nameSlider, slideWidth, coeffcient){
    var sliderBox = document.querySelector(nameSlider);
    var carouselBox = sliderBox.querySelector('.carousel');

    var preBtn = sliderBox.querySelector('.carousel-btn--prev');
    var nextBtn = sliderBox.querySelector('.carousel-btn--next');

    var posX = 0;
    preBtn.onclick = () => {
        posX = posX + slideWidth;
        if(!preBtn.classList.contains('disabled')) {
            carouselBox.style.transform  = `translateX(${posX}px)`;
            nextBtn.classList.add('active');
            nextBtn.classList.remove('disabled');

            if(posX === 0) {
                preBtn.classList.add('disabled');
                preBtn.classList.remove('active');
            }
        }
        
    }

    nextBtn.onclick = () => {
        posX = posX - slideWidth;
        if(!nextBtn.classList.contains('disabled')) {
            if(posX >= -slideWidth*coeffcient) {
                carouselBox.style.transform  = `translateX(${posX}px)`;
                preBtn.classList.add('active');
                preBtn.classList.remove('disabled');
            }
            if(posX === -slideWidth*coeffcient){
                nextBtn.classList.add('disabled');
                nextBtn.classList.remove('active');
            }
        }
    }
}
handleSlide('.slider-place', 238, 3);
handleSlide('.slider-offer', 392, 2);
handleSlide('.slider-suggest', 292, 3);
handleSlide('.slider-discover', 397, 5);
handleSlide('.slider-guide', 397, 2);