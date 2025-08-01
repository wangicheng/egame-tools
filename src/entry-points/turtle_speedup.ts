let WITH_ANIMATE = true;
{
  const interval = setInterval(() => {
    if (!window.Turtle || !Turtle.animate || !Turtle.execute) {
      return;
    }
    clearInterval(interval);

    Turtle.execute = function () {
      BlocklyApps.log = [];
      BlocklyApps.ticks = 1000000;

      Turtle.code = Blockly.JavaScript.workspaceToCode(Turtle.workspace);

      try {
        eval(Turtle.code);
      } catch (e) {
        // Null is thrown for infinite loop.
        // Otherwise, abnormal termination is a user error.
        if (e !== Infinity) {
          alert(e);
        }
        // When there is an Infinity error, it cannot be executed without animation.
        if (e === Infinity && !WITH_ANIMATE) {
          const result = window.confirm(`程式陷入無限循環，確定要執行？\n（執行 ${BlocklyApps.log.length} 個積木）`);
          if (!result) {
            BlocklyApps.log = [];
            WITH_ANIMATE = true;
          }
        }
      }

      // BlocklyApps.log now contains a transcript of all the user's actions.
      // Reset the graphic and animate the transcript.
      Turtle.reset();
      Turtle.pid = window.setTimeout(Turtle.animate, 100);
    };
    const withAnimate = Turtle.animate;
    const withoutAnimate = function () {
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
    Turtle.animate = function () {
      if (WITH_ANIMATE) {
        withAnimate();
      } else {
        withoutAnimate();
      }
    }
  }, 200);

  const observer = new MutationObserver(function (mutationList, observer) {
    const runButton = document.querySelector("#runButton");
    if (!runButton) {
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