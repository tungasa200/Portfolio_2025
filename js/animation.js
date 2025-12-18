// DOMContentLoaded 이벤트 제거 - main.js의 startAllAnimations()에서 호출
// document.addEventListener('DOMContentLoaded',()=>{
//   animationActiveScrollEffect()
// })

function animationActiveScrollEffect(){
	const trigger = document.querySelectorAll("[class*='ani_']")/*ani_가 포함된 모든 클래스를 선택*/

	initEvent()
  
	function initEvent(){
		window.addEventListener('scroll',aniActive)
	}
	
	function aniActive(){
		let wSY =  window.scrollY + (window.innerHeight/1.1) ;/*나누는 값을 조정해서 애니메이션 동작 위치 제어*/
		for(const item of trigger){
			if(wSY>item.getBoundingClientRect().top + window.pageYOffset){
				item.classList.add('active')/*active 클래스를 줘서 동작*/
			}
		}
	}
}