const tracker = document.querySelector('.carousel__track');
const slides = Array.from(tracker.children);
const nextButton = document.querySelector('.carousel__button--right');
const previousButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav')
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// arrrange the sliders next to one another 
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition); 

const moveToSlide = (tracker, currentSlide, targetSlide ) => {
  tracker.style.transform = 'translateX(-' + targetSlide.style.left+ ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('carousel__active');
    targetDot.classList.add('carousel__active');
}

const showHiddenArrow = (slides, previousButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        previousButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        previousButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        previousButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

// When I click left, move sliders to the left
previousButton.addEventListener('click', e => {
    const currentSlide = tracker.querySelector('.current-slide')
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.carousel__active');
    const preDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slides => slides === prevSlide);


    moveToSlide(tracker, currentSlide, prevSlide);
    updateDots(currentDot, preDot);
    showHiddenArrow(slides, previousButton, nextButton, prevIndex);

});

// When I click right, move sliders to the right
nextButton.addEventListener('click', e => {
    const currentSlide = tracker.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.carousel__active');
    const nextDot = currentDot.nextElementSibling;  
    const nextIndex = slides.findIndex(slides => slides === nextSlide);

    moveToSlide(tracker, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    showHiddenArrow(slides, previousButton, nextButton, nextIndex);

 });
// When I click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button') 

    if(!targetDot) return;

    const currentSlide = tracker.querySelector('.current-slide')
    const currentDot = dotsNav.querySelector('.carousel__active');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex]; 


    moveToSlide(tracker, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    showHiddenArrow(slides, previousButton, nextButton, targetIndex);
});
  