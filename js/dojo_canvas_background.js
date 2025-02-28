{
  const canvasBackground = document.createElement('div');
  canvasBackground.id = 'canvasBackground';

  const changeCanvasBackground = function(a) {
    if (!canvasBackground.parentElement) {
      const visualization = document.querySelector('#visualization');
      visualization.insertAdjacentElement('afterbegin', canvasBackground);
    }
    if (canvasBackground.style.display === 'inline') {
      canvasBackground.style.display = 'none';
    } else {
      canvasBackground.style.display = 'inline';
    }
  }

  const observer = new MutationObserver(function (mutationList, observer) {
    const pointerButton = document.querySelector("#pointerButton");
    if(!pointerButton) {
      return;
    }
    observer.disconnect();
    const changeCanvasBackgroundButton = document.createElement('button');
    changeCanvasBackgroundButton.id = 'changeCanvasBackgroundButton';
    changeCanvasBackgroundButton.classList.add('top-right-button-small');
    changeCanvasBackgroundButton.title = '開啟或關閉武館的背景圖。';

    changeCanvasBackgroundButton.addEventListener('click', () => changeCanvasBackground());
    pointerButton.parentElement.appendChild(changeCanvasBackgroundButton);
  });
  observer.observe(document.documentElement, { attributes: false, childList: true, subtree: true });
}