window.addEventListener("load", () => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const intro = '#visual';
    if (window.location.hash  !== intro) {
        history.replaceState(null, null, window.location.pathname + window.location.search + intro);
    }
});

document.addEventListener("DOMContentLoaded",()=>{
    cardFlipEffect();
    mousePointerEffect()
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

function cardFlipEffect(){
    const card = document.querySelector('.card');
    let flipped = false;
    const flipTimeline = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
    const link = card.querySelectorAll('a');

    flipTimeline
    .to(card, { rotateX: 180, rotateY: 360, rotateZ: 180, duration: 2 })  
    
    init()
    initEvent()

    function init(){
        link.forEach((l)=>{
            l.addEventListener('click', (event) => {                
                event.stopPropagation();    
            });            
        })
    }

    function initEvent(){
        card.addEventListener('click',()=>{
            if(!flipped){
                flipTimeline.play();
            }else{
                flipTimeline.reverse();
            }
            flipped = !flipped;
        })
    }
}

function mousePointerEffect(){
	const pointer = document.querySelector(".pointer_wrap");
    const cir = pointer.querySelector(".pointer");
    const imgContainer = pointer.querySelector('.img');
    const hArea = document.querySelectorAll(".hover-img");
    const card = document.querySelector(".card");

    const imgList = [
        {type: 'svg', content:'<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" preserveAspectRatio="xMidYMid" viewBox="0 0 256 361" class="SkillContext_svg__1dGYg"><path fill="#E44D26" d="m255.555 70.766-23.241 260.36-104.47 28.962-104.182-28.922L.445 70.766z"></path><path fill="#F16529" d="m128 337.95 84.417-23.403 19.86-222.49H128z"></path><path fill="#EBEBEB" d="M82.82 155.932H128v-31.937H47.917l.764 8.568 7.85 88.01H128v-31.937H85.739zM90.018 236.542h-32.06l4.474 50.146 65.421 18.16.147-.04V271.58l-.14.037-35.568-9.604z"></path><path d="M24.18 0h16.23v16.035h14.847V0h16.231v48.558h-16.23v-16.26H40.411v16.26h-16.23V0M92.83 16.103H78.544V0h44.814v16.103h-14.295v32.455h-16.23V16.103zM130.47 0h16.923l10.41 17.062L168.203 0h16.93v48.558h-16.164V24.49l-11.166 17.265h-.28L146.35 24.49v24.068h-15.88zM193.21 0h16.235v32.508h22.824v16.05h-39.06z"></path><path fill="#FFF" d="M127.89 220.573h39.327l-3.708 41.42-35.62 9.614v33.226l65.473-18.145.48-5.396 7.506-84.08.779-8.576H127.89zM127.89 155.854v.078h77.143l.64-7.178 1.456-16.191.763-8.568H127.89z"></path></svg>'},
        {type: 'svg', content: '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" preserveAspectRatio="xMidYMid" viewBox="0 0 256 361" class="SkillContext_svg__1dGYg"><path fill="#264DE4" d="M127.844 360.088 23.662 331.166.445 70.766h255.11l-23.241 260.36z"></path><path fill="#2965F1" d="m212.417 314.547 19.86-222.49H128V337.95z"></path><path fill="#EBEBEB" d="m53.669 188.636 2.862 31.937H128v-31.937zM47.917 123.995l2.903 31.937H128v-31.937zM128 271.58l-.14.037-35.568-9.604-2.274-25.471h-32.06l4.474 50.146 65.421 18.16.147-.04z"></path><path d="M60.484 0h38.68v16.176H76.66v16.176h22.506v16.175H60.484zM106.901 0h38.681v14.066h-22.505v2.813h22.505v32.352h-38.68V34.46h22.505v-2.813H106.9zM153.319 0H192v14.066h-22.505v2.813H192v32.352h-38.681V34.46h22.505v-2.813H153.32z"></path><path fill="#FFF" d="m202.127 188.636 5.765-64.641H127.89v31.937h45.002l-2.906 32.704H127.89v31.937h39.327l-3.708 41.42-35.62 9.614v33.226l65.473-18.145.48-5.396 7.506-84.08z"></path></svg>'},
        {type: 'svg', content: '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256" class="SkillContext_svg__1dGYg"><path fill="#F7DF1E" d="M0 0h256v256H0z"></path><path d="m67.312 213.932 19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"></path></svg>'},
        {type: 'img', src:'./images/icon_react.png'},
        {type: 'svg', content: '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" preserveAspectRatio="xMidYMid" viewBox="0 0 512 75" class="SkillContext_svg__1dGYg"><path fill="#5A29E4" d="M254.114 9.182v60.165l-6.557 5.282v-50.05h-12.343zM481.537 0q8.237 0 15.297 2.484 6.792 2.347 11.717 5.275l.573.347-6.799 12.943q-.93-.761-2.627-1.741l-.643-.364-.693-.378-.743-.393q-3.138-1.7-7.453-2.876a30.5 30.5 0 0 0-8.89-1.308q-12.29 0-12.29 6.93 0 4.052 4.445 5.752l.676.245.717.249.76.253.804.256.846.261.888.265q.228.068.46.134l.953.27.995.276 1.038.278 1.08.283 1.124.287 1.765.438 1.23.297q7.714 1.96 13.336 4.445 5.513 2.38 8.504 6.322l.255.346Q512 45.629 512 52.296q0 8.106-4.184 13.075-4.053 4.837-10.72 7.06-6.669 2.091-14.382 2.091-8.89 0-17.65-2.484-8.342-2.365-14.906-6.391l-.652-.407 7.06-13.728q1.7 1.7 5.622 3.791 4.053 2.093 9.413 3.53 5.36 1.44 11.375 1.439 12.028 0 12.028-6.407 0-4.314-5.622-6.144l-.901-.317-.947-.321-.991-.326-1.037-.332-1.082-.336-1.127-.342-.58-.172-1.195-.349-1.24-.354-1.286-.359-1.33-.364-2.08-.555-.716-.188q-11.244-2.876-16.735-7.321-5.36-4.577-5.36-13.075 0-7.582 3.79-12.681 3.923-5.1 10.46-7.714Q473.693 0 481.537 0M360.292.13q8.298 0 15.146 3.023l.545.246q7.06 3.138 12.028 8.498 5.098 5.23 7.842 11.898 2.746 6.667 2.748 13.597 0 7.19-2.876 13.859-2.877 6.537-8.109 11.766-5.097 5.1-12.156 8.106t-15.427 3.007q-8.629 0-15.689-3.007-7.061-3.137-12.162-8.367-5.099-5.36-7.844-12.028c-1.828-4.446-2.746-9.022-2.746-13.728q0-7.191 2.877-13.859a36.4 36.4 0 0 1 7.638-11.3l.47-.467c3.487-3.486 7.58-6.232 12.287-8.236Q351.924.13 360.292.13M44.844.524l31.77 73.084H59.88L52.558 56.48H24.187l-7.321 17.127H0L31.9.523zm93.58 0L158.56 26.41 178.693.523h17.127l-28.894 37 27.979 36.084h-17.127l-19.22-24.84-19.087 24.84h-17.389l28.11-36.084-29.025-37zM266.106.188v48.905h12.689L259.56 64.877V4.744zm93.928 14.063q-7.192 0-12.292 3.399-4.969 3.399-7.583 8.629-2.616 5.23-2.615 10.852.002 5.883 2.748 11.243 2.743 5.23 7.711 8.498 5.1 3.27 12.159 3.269 7.191 0 12.159-3.4c3.315-2.353 5.84-5.273 7.583-8.76q2.616-5.36 2.617-10.981 0-5.883-2.745-11.113t-7.847-8.368q-4.968-3.268-11.895-3.268M38.438 19.74 27.717 42.753h21.05z"></path></svg>'},
        {type: 'svg', content: '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" preserveAspectRatio="xMidYMid" viewBox="0 0 256 346" class="SkillContext_svg__1dGYg"><path fill="#5382A1" d="M82.554 267.473s-13.198 7.675 9.393 10.272c27.369 3.122 41.356 2.675 71.517-3.034 0 0 7.93 4.972 19.003 9.279-67.611 28.977-153.019-1.679-99.913-16.517M74.292 229.659s-14.803 10.958 7.805 13.296c29.236 3.016 52.324 3.263 92.276-4.43 0 0 5.526 5.602 14.215 8.666-81.747 23.904-172.798 1.885-114.296-17.532"></path><path fill="#E76F00" d="M143.942 165.515c16.66 19.18-4.377 36.44-4.377 36.44s42.301-21.837 22.874-49.183c-18.144-25.5-32.059-38.172 43.268-81.858 0 0-118.238 29.53-61.765 94.6"></path><path fill="#5382A1" d="M233.364 295.442s9.767 8.047-10.757 14.273c-39.026 11.823-162.432 15.393-196.714.471-12.323-5.36 10.787-12.8 18.056-14.362 7.581-1.644 11.914-1.337 11.914-1.337-13.705-9.655-88.583 18.957-38.034 27.15 137.853 22.356 251.292-10.066 215.535-26.195M88.9 190.48s-62.771 14.91-22.228 20.323c17.118 2.292 51.243 1.774 83.03-.89 25.978-2.19 52.063-6.85 52.063-6.85s-9.16 3.923-15.787 8.448c-63.744 16.765-186.886 8.966-151.435-8.183 29.981-14.492 54.358-12.848 54.358-12.848M201.506 253.422c64.8-33.672 34.839-66.03 13.927-61.67-5.126 1.066-7.411 1.99-7.411 1.99s1.903-2.98 5.537-4.27c41.37-14.545 73.187 42.897-13.355 65.647 0 .001 1.003-.895 1.302-1.697"></path><path fill="#E76F00" d="M162.439.371s35.887 35.9-34.037 91.101c-56.071 44.282-12.786 69.53-.023 98.377-32.73-29.53-56.75-55.526-40.635-79.72C111.395 74.612 176.918 57.393 162.439.37"></path><path fill="#5382A1" d="M95.268 344.665c62.199 3.982 157.712-2.209 159.974-31.64 0 0-4.348 11.158-51.404 20.018-53.088 9.99-118.564 8.824-157.399 2.421.001 0 7.95 6.58 48.83 9.201"></path></svg>'},
        {type: 'img', src:'./images/icon_Spring.svg'},
        {type: 'img', src:'./images/icon_Jpa.svg'},
        {type: 'img', src:'./images/icon_mybatis.svg'},     
        {type: 'svg', content:'<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" preserveAspectRatio="xMidYMid" viewBox="0 0 256 252" class="SkillContext_svg__1dGYg"><path fill="#00546B" d="M235.648 194.212c-13.918-.347-24.705 1.045-33.752 4.872-2.61 1.043-6.786 1.044-7.134 4.35 1.392 1.392 1.566 3.654 2.784 5.567 2.09 3.479 5.741 8.177 9.047 10.614 3.653 2.783 7.308 5.566 11.134 8.002 6.786 4.176 14.442 6.611 21.053 10.787 3.829 2.434 7.654 5.568 11.482 8.177 1.914 1.39 3.131 3.654 5.568 4.523v-.521c-1.219-1.567-1.567-3.828-2.784-5.568-1.738-1.74-3.48-3.306-5.22-5.046-5.045-6.784-11.308-12.7-18.093-17.571-5.567-3.828-17.747-9.047-20.008-15.485 0 0-.175-.173-.348-.347 3.827-.348 8.35-1.74 12.005-2.784 5.915-1.567 11.308-1.218 17.398-2.784 2.783-.696 5.567-1.566 8.35-2.436v-1.565c-3.13-3.132-5.392-7.307-8.698-10.265-8.873-7.657-18.617-15.137-28.707-21.4-5.394-3.48-12.354-5.742-18.095-8.699-2.086-1.045-5.567-1.566-6.784-3.306-3.133-3.827-4.873-8.872-7.134-13.396-5.044-9.57-9.917-20.182-14.267-30.272-3.13-6.786-5.044-13.572-8.872-19.834-17.92-29.577-37.406-47.497-67.33-65.07-6.438-3.653-14.093-5.219-22.27-7.132-4.348-.175-8.699-.522-13.048-.697-2.784-1.218-5.568-4.523-8.004-6.089C34.006 4.573 8.429-8.996 1.122 8.924c-4.698 11.308 6.96 22.442 10.96 28.185 2.96 4.001 6.786 8.524 8.874 13.048 1.218 2.956 1.565 6.09 2.783 9.221 2.785 7.653 5.393 16.18 9.048 23.314 1.914 3.653 4.001 7.48 6.437 10.786 1.392 1.913 3.827 2.784 4.35 5.915-2.435 3.48-2.61 8.7-4.003 13.049-6.263 19.66-3.826 44.017 5.046 58.457 2.783 4.348 9.395 13.92 18.268 10.265 7.83-3.131 6.09-13.048 8.35-21.747.524-2.09.176-3.48 1.219-4.872v.349c2.436 4.87 4.871 9.569 7.133 14.44 5.394 8.524 14.788 17.398 22.617 23.314 4.177 3.13 7.482 8.524 12.702 10.438v-.523h-.349c-1.044-1.566-2.61-2.261-4.001-3.48-3.131-3.13-6.612-6.958-9.047-10.438-7.306-9.744-13.745-20.53-19.486-31.665-2.783-5.392-5.22-11.308-7.481-16.701-1.045-2.09-1.045-5.22-2.784-6.263-2.61 3.827-6.437 7.133-8.351 11.83-3.304 7.481-3.653 16.702-4.871 26.27-.696.176-.349 0-.697.35-5.566-1.394-7.48-7.134-9.569-12.006-5.22-12.352-6.09-32.186-1.565-46.452 1.218-3.654 6.438-15.136 4.35-18.616-1.044-3.306-4.525-5.22-6.438-7.829-2.261-3.306-4.698-7.48-6.263-11.135-4.176-9.743-6.264-20.53-10.787-30.273-2.088-4.524-5.74-9.22-8.699-13.396-3.305-4.697-6.959-8.004-9.569-13.571-.869-1.913-2.088-5.045-.696-7.133.348-1.392 1.043-1.913 2.436-2.261 2.262-1.915 8.7.521 10.96 1.565 6.438 2.608 11.831 5.046 17.225 8.699 2.435 1.74 5.045 5.046 8.176 5.916h3.654c5.568 1.217 11.83.348 17.05 1.913 9.222 2.957 17.572 7.307 25.054 12.005 22.792 14.44 41.58 34.97 54.282 59.501 2.088 4 2.957 7.656 4.871 11.83 3.655 8.526 8.178 17.225 11.83 25.576 3.654 8.176 7.133 16.528 12.353 23.314 2.61 3.652 13.048 5.567 17.746 7.481 3.48 1.565 8.874 2.958 12.005 4.871 5.915 3.652 11.83 7.83 17.398 11.83 2.784 2.088 11.482 6.438 12.005 9.917"></path><path fill="#00546B" d="M58.186 43.022c-2.957 0-5.044.35-7.132.871v.348h.348c1.393 2.784 3.827 4.698 5.566 7.133 1.393 2.783 2.61 5.568 4.003 8.352.173-.175.347-.348.347-.348 2.437-1.741 3.654-4.524 3.654-8.7-1.044-1.217-1.218-2.435-2.088-3.653-1.043-1.741-3.306-2.61-4.698-4.003"></path></svg>'},
        {type: 'img', src:'./images/icon_Figma.svg'},
        {type: 'img', src:'./images/icon_Photoshop.svg'},
        {type: 'img', src:'./images/icon_Illustrator.svg'},
        {type: 'img', src:'./images/icon_github.svg'},
        {type: 'img', src:'./images/icon_intellij.svg'},
    ]

	let sH = window.pageYOffset;
    let vh = window.innerHeight;
    console.log(vh)

	initEvent()

	function initEvent(){
		windowWidth=window.document.body.offsetWidth		
        document.addEventListener("mousemove", pointerFollow)
        window.addEventListener("scroll", pointerScroll)

        hArea.forEach((item,index)=>{
            item.addEventListener('mouseenter',()=>showImg(index));
            item.addEventListener('mouseleave',hideImg)
        })

        card.addEventListener('mouseenter', showClick);
        card.addEventListener('mouseleave', hideClick);
	}

	function pointerFollow(e){
		sH = window.pageYOffset;
		const mouseX = e.clientX;
		const mouseY = e.clientY;

		pointer.style.left = mouseX + 'px';
		pointer.style.top = (mouseY + sH + vh) + 'px';
    }
    function pointerScroll(){
	    wSY = window.scrollY
	    let pT = pointer.style.top;
	    pointer.style.top = pT+wSY + 'px';
    }

    function showImg(index){
        // console.log('test');
        cir.classList.add('active');
        const img = imgList[index];
        if(!img) return;
        imgContainer.innerHTML = ''; 

        if (img.type === 'img') {
            const element = document.createElement('img');
            element.src = img.src;
            imgContainer.appendChild(element);
        } else if (img.type === 'svg') {
            imgContainer.innerHTML = img.content;
        }
    }
    function hideImg(){
        console.log('test')
        cir.classList.remove('active');
        imgContainer.innerHTML = ''; 
    }

    function showClick(){
        cir.classList.add('click','active');
    }

    function hideClick(){
        cir.classList.remove('click','active');
    }

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