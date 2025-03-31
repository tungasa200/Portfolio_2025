document.addEventListener("DOMContentLoaded", function() {
  const loader = document.getElementById('loader');
  const loaderNumber = document.getElementById('loader-number');
  const content = document.getElementById('content');

  let percent = 0;
  
  function animateLoader() {
    if (percent < 100) {
      percent++;
      loaderNumber.textContent = percent + '%';
      
      // 숫자 증가 속도를 여기서 조정 (현재 20ms마다 1%씩 증가)
      setTimeout(animateLoader, 50);
    } else {
      loader.style.display = 'none';
      content.style.display = 'block';
    }
  }

  animateLoader();
});
