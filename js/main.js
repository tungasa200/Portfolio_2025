document.addEventListener("DOMContentLoaded",()=>{
    visualEffect();
    progressBar()
})

// window.addEventListener("load", () => {
//     history.scrollRestoration = 'manual';
//     window.scrollTo(0, 0);
// });

function visualEffect() {
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
            // setTimeout(()=>{document.querySelector('#content01').scrollIntoView({ behavior: 'smooth' });},500);
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

function progressBar(){
    $('.cir01').circleProgress({
        value: 0.8,
        size: 80,
        fill: { color: '#FF6347' },
        startAngle: -Math.PI / 2
        }).on('circle-animation-progress', function(event, progress, stepValue) {
        $(this).find('strong').text(Math.round(stepValue * 100) + '%');
    });
    $('.cir02').circleProgress({
        value: 0.75,
        size: 80,
        fill: { color: '#FF6347' },
        startAngle: -Math.PI / 2
        }).on('circle-animation-progress', function(event, progress, stepValue) {
        $(this).find('strong').text(Math.round(stepValue * 100) + '%');
    });
    $('.cir03').circleProgress({
        value: 0.85,
        size: 80,
        fill: { color: '#FF6347' },
        startAngle: -Math.PI / 2
        }).on('circle-animation-progress', function(event, progress, stepValue) {
        $(this).find('strong').text(Math.round(stepValue * 100) + '%');
    });
    $('.cir04').circleProgress({
        value: 0.9,
        size: 80,
        fill: { color: '#FF6347' },
        startAngle: -Math.PI / 2
        }).on('circle-animation-progress', function(event, progress, stepValue) {
        $(this).find('strong').text(Math.round(stepValue * 100) + '%');
    });
    $('.cir05').circleProgress({
        value: 0.99,
        size: 80,
        fill: { color: '#FF6347' },
        startAngle: -Math.PI / 2
        }).on('circle-animation-progress', function(event, progress, stepValue) {
        $(this).find('strong').text(Math.round(stepValue * 100) + '%');
    });
    $('.cir06').circleProgress({
        value: 0.95,
        size: 80,
        fill: { color: '#FF6347' },
        startAngle: -Math.PI / 2
        }).on('circle-animation-progress', function(event, progress, stepValue) {
        $(this).find('strong').text(Math.round(stepValue * 100) + '%');
    });
}