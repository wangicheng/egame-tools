var WITH_ANIMATE = true;
{
  const interval = setInterval(() => {
    if(!window.Turtle || !Turtle.animate) {
      return;
    }
    clearInterval(interval);
    const with_animate = Turtle.animate;
    const without_animate = function () {
      // All tasks should be complete now.  Clean up the PID list.
      Turtle.pid = 0;
      BlocklyApps.log.forEach(tuple => {
        var command = tuple.shift();
        Turtle.step(command, tuple);
        Turtle.display();
      });
      document.getElementById('spinner').style.visibility = 'hidden';
      if (Turtle.level.noCheck() && !Turtle.isScratchBlank()) {
        BlocklyApps.setSaveCode();
        document.getElementById("saveButton").style.display = "inline";
      } else {
        // 原本在 Turtle.runButtonClick，改成畫完後才顯示
        var resetButton = document.getElementById('resetButton');
        resetButton.style.display = 'inline';
        // Prevent double-clicks or double-taps.
        resetButton.disabled = true;
        setTimeout(function () { resetButton.disabled = false; }, BlocklyApps.DOUBLE_CLICK_TIME);

        Turtle.checkAnswer();
      }
    }
    Turtle.animate = function() {
      if (WITH_ANIMATE) {
        with_animate();
      } else {
        without_animate();
      }
    }
  }, 200);

  const observer = new MutationObserver(function (mutationList, observer) {
    const runButton = document.querySelector("#runButton");
    if(!runButton) {
      return;
    }
    observer.disconnect();
    const parent = runButton.parentElement;
    const speedupButton = runButton.cloneNode(false);
    speedupButton.id = 'speedupButton';
    speedupButton.textContent = '加速';
    speedupButton.style.width = '72px';
    speedupButton.style.paddingLeft = '25px';
    speedupButton.style.whiteSpace = 'nowrap';

    speedupButton.addEventListener('click', () => {
      WITH_ANIMATE = false;
      Turtle.runButtonClick();
    })
    runButton.addEventListener('click', () => { WITH_ANIMATE = true; });
    parent.insertBefore(speedupButton, runButton);
  });
  observer.observe(document.documentElement, { attributes: false, childList: true, subtree: true });
}