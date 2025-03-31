window.addEventListener("load", () => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const intro = '#visual';
    if (window.location.hash  !== intro) {
        history.replaceState(null, null, window.location.pathname + window.location.search);
      }
});

document.addEventListener("DOMContentLoaded",()=>{
    setTimeout(fullpageEffect,4000)
    window.addEventListener("load",
        setTimeout(visualEffect,500)
    );
})

function swiperEffect(){
    fullpageSwiper()
}

function visualEffect() {
    const visual = document.querySelector('#visual');
    const wrap = document.querySelector('.change-word_wrap');
    const cw = document.querySelectorAll('.change-word');
    let word;
    let currentIndex = 0; 
    let timer;

    initEvent();
    
    function initEvent() {
        setWrapWidth();
        wordActive()
        timer = setInterval(wordChange, 1000);
        setTimeout(()=>{document.querySelector('.dark').classList.add('active')},4000)
    }

    function wordChange() {
        wordInactive()
        cw[currentIndex].classList.remove('active');             
        currentIndex++; 
        
        if (currentIndex < cw.length) {
            cw[currentIndex].classList.add('active');
            wordActive()
            
        }else{
            clearInterval(timer);
            cw[currentIndex -1].classList.add('active');
            cw[currentIndex -1].style.transform='translate(-50%,50%)';   
            word = cw[currentIndex -1].children;
            for(let i = 0; i < cw[currentIndex -1].children.length ; i++ ){
                word[i].style.color='#FF6347';
            }
            visual.classList.add('active');
            setTimeout(()=>{document.querySelector('#content01').scrollIntoView({ behavior: 'smooth' });},700);
        }
        setWrapWidth();
    }

    function setWrapWidth() {
        const activeWord = cw[currentIndex];
        const wordWidth = activeWord.offsetWidth;
        wrap.style.width = `${wordWidth}px`;      
        // console.log(activeWord.offsetWidth)
    }

    function wordActive(){
        word = cw[currentIndex].children;
            for(let i = 0; i < cw[currentIndex].children.length ; i++ ){
                word[i].classList.add('active');
                word[i].style.animationDelay=(i/50) + 's';
            }
    }

    function wordInactive(){
        cw[currentIndex].style.transform='translate(-50%,-100%)';
    }    
}

function fullpageEffect() {
    const swiper = new Swiper('.fullpage-swiper', {
        slidesPerView: 1,
        speed: 1000,
        mousewheel: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            slideChange: function () {
                const idx = this.activeIndex;
                const length = this.slides.length;
                if (idx !== 0 && idx !== length - 1) {
                    fullpage_api.setAllowScrolling(false);
                }
            },
            slideChangeTransitionEnd: function () {
                const idx = this.activeIndex;
                const length = this.slides.length;
                if (idx === 0 || idx === length - 1) {
                    fullpage_api.setAllowScrolling(true);
                }
            }
        }
    });

    const fp = document.getElementById('fullpage');

    const preventScroll = (event) => {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };

    new fullpage('#fullpage', {
        autoScrolling: true,
        navigation: true,
        // anchors: ['sec01', 'sec02', 'sec03'],
        // showActiveTooltip: true,
        slidesNavigation: true,
        controlArrows: false,
        onLeave: function (origin, destination, direction) {
            ['scroll', 'touchmove', 'mousewheel'].forEach(evt => {
                fp.addEventListener(evt, preventScroll, { passive: false });
            });
            swiper.mousewheel.disable();
        },
        afterLoad: function (origin, destination, direction) {
            ['scroll', 'touchmove', 'mousewheel'].forEach(evt => {
                fp.removeEventListener(evt, preventScroll, { passive: false });
            });

            const swiperElement = document.querySelector(".fullpage-swiper");
            if (swiperElement && !swiperElement.classList.contains("active")) {
                fullpage_api.setAllowScrolling(true);
            }

            swiper.mousewheel.enable();
        }
    });
}




// function visualBg(){
//     const canvas = document.querySelector("canvas");
//     const ctx = canvas.getContext("2d");

//     let mouseMoved = false;

//     const pointer = {
//         x: 0.5 * window.innerWidth,
//         y: 0.5 * window.innerHeight
//     };

//     const params = {
//         pointsNumber: 40,
//         widthFactor: 10,
//         mouseThreshold: 0.5,
//         spring: 0.1,
//         friction: 0.5
//     };

//     const trail = new Array(params.pointsNumber);
//     for (let i = 0; i < params.pointsNumber; i++) {
//         trail[i] = {
//             x: pointer.x,
//             y: pointer.y,
//             dx: 0,
//             dy: 0
//         };
//     }

//     window.addEventListener("click", (e) => {
//         updateMousePosition(e.pageX, e.pageY);
//     });
//     window.addEventListener("mousemove", (e) => {
//         mouseMoved = true;
//         updateMousePosition(e.pageX, e.pageY);
//     });

//     function updateMousePosition(eX, eY) {
//         pointer.x = eX;
//         pointer.y = eY;
//     }

//     setupCanvas();
//     update(0);
//     window.addEventListener("resize", setupCanvas);

//     function update(t) {
//         if (!mouseMoved) {
//             pointer.x =
//                 (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) * window.innerWidth;
//             pointer.y =
//                 (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.sin(0.01 * t)) *
//                 window.innerHeight;
//         }

//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         trail.forEach((p, pIdx) => {
//             const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
//             const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
//             p.dx += (prev.x - p.x) * spring;
//             p.dy += (prev.y - p.y) * spring;
//             p.dx *= params.friction;
//             p.dy *= params.friction;
//             p.x += p.dx;
//             p.y += p.dy;
//         });

//         var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//         gradient.addColorStop(0, "rgba(252, 90, 3, 0.1)");
//         gradient.addColorStop(1, "rgba(252, 202, 3, 0.5)");

//         ctx.strokeStyle = gradient;
//         ctx.lineCap = "round";
//         ctx.beginPath();
//         ctx.moveTo(trail[0].x, trail[0].y);

//         for (let i = 1; i < trail.length - 1; i++) {
//             const xc = 0.5 * (trail[i].x + trail[i + 1].x);
//             const yc = 0.5 * (trail[i].y + trail[i + 1].y);
//             ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
//             ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
//             ctx.stroke();
//         }

//         ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
//         ctx.stroke();

//         window.requestAnimationFrame(update);
//     }

//     function setupCanvas() {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//     }
// }

// function progressBar(){
//     $('.cir01').circleProgress({
//         value: 0.8,
//         size: 80,
//         fill: { color: '#FF6347' },
//         startAngle: -Math.PI / 2
//         }).on('circle-animation-progress', function(event, progress, stepValue) {
//         $(this).find('strong').text(Math.round(stepValue * 100) + '%');
//     });
//     $('.cir02').circleProgress({
//         value: 0.75,
//         size: 80,
//         fill: { color: '#FF6347' },
//         startAngle: -Math.PI / 2
//         }).on('circle-animation-progress', function(event, progress, stepValue) {
//         $(this).find('strong').text(Math.round(stepValue * 100) + '%');
//     });
//     $('.cir03').circleProgress({
//         value: 0.85,
//         size: 80,
//         fill: { color: '#FF6347' },
//         startAngle: -Math.PI / 2
//         }).on('circle-animation-progress', function(event, progress, stepValue) {
//         $(this).find('strong').text(Math.round(stepValue * 100) + '%');
//     });
//     $('.cir04').circleProgress({
//         value: 0.9,
//         size: 80,
//         fill: { color: '#FF6347' },
//         startAngle: -Math.PI / 2
//         }).on('circle-animation-progress', function(event, progress, stepValue) {
//         $(this).find('strong').text(Math.round(stepValue * 100) + '%');
//     });
//     $('.cir05').circleProgress({
//         value: 0.99,
//         size: 80,
//         fill: { color: '#FF6347' },
//         startAngle: -Math.PI / 2
//         }).on('circle-animation-progress', function(event, progress, stepValue) {
//         $(this).find('strong').text(Math.round(stepValue * 100) + '%');
//     });
//     $('.cir06').circleProgress({
//         value: 0.95,
//         size: 80,
//         fill: { color: '#FF6347' },
//         startAngle: -Math.PI / 2
//         }).on('circle-animation-progress', function(event, progress, stepValue) {
//         $(this).find('strong').text(Math.round(stepValue * 100) + '%');
//     });
// }