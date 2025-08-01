let WITH_ANIMATE = true;
{
  const interval = setInterval(() => {
    if (!window.Turtle || !window.Turtle.animate || !window.Turtle.execute) {
      return;
    }
    clearInterval(interval);

    window.Turtle.execute = function () {
      window.BlocklyApps.log = [];
      window.BlocklyApps.ticks = 1000000;

      window.Turtle.code = window.Blockly.JavaScript.workspaceToCode(window.Turtle.workspace);

      try {
        eval(window.Turtle.code);
      } catch (e) {
        // Null is thrown for infinite loop.
        // Otherwise, abnormal termination is a user error.
        if (e !== Infinity) {
          alert(e);
        }
        // When there is an Infinity error, it cannot be executed without animation.
        if (e === Infinity && !WITH_ANIMATE) {
          const result = window.confirm(`程式陷入無限循環，確定要執行？\n（執行 ${window.BlocklyApps.log.length} 個積木）`);
          if (!result) {
            window.BlocklyApps.log = [];
            WITH_ANIMATE = true;
          }
        }
      }

      // window.BlocklyApps.log now contains a transcript of all the user's actions.
      // Reset the graphic and animate the transcript.
      window.Turtle.reset();
      window.Turtle.pid = window.setTimeout(window.Turtle.animate, 100);
    };
    const withAnimate = window.Turtle.animate;
    const withoutAnimate = function () {
      // All tasks should be complete now.  Clean up the PID list.
      window.Turtle.pid = 0;
      window.BlocklyApps.log.forEach((tuple: any) => {
        const command = tuple.shift();
        window.Turtle.step(command, tuple);
        window.Turtle.display();
      });
      document.getElementById('spinner')!.style.visibility = 'hidden';
      if (window.Turtle.level.noCheck() && !window.Turtle.isScratchBlank()) {
        window.BlocklyApps.setSaveCode();
        document.getElementById('saveButton')!.style.display = 'inline';
      } else {
        // 原本在 window.Turtle.runButtonClick，改成畫完後才顯示
        const resetButton = document.querySelector<HTMLButtonElement>('#resetButton')!;
        resetButton.style.display = 'inline';
        // Prevent double-clicks or double-taps.
        resetButton.disabled = true;
        setTimeout(function () {
          resetButton.disabled = false;
        }, window.BlocklyApps.DOUBLE_CLICK_TIME);

        window.Turtle.checkAnswer();
      }
    };
    window.Turtle.animate = function () {
      if (WITH_ANIMATE) {
        withAnimate();
      } else {
        withoutAnimate();
      }
    };
  }, 200);

  const observer = new MutationObserver(function (mutationList, observer) {
    const runButton = document.querySelector('#runButton');
    if (!runButton) {
      return;
    }
    observer.disconnect();
    const parent = runButton.parentElement!;
    const speedupButton = runButton.cloneNode(false) as HTMLButtonElement;
    speedupButton.id = 'speedupButton';
    speedupButton.textContent = '加速';
    speedupButton.style.width = '72px';
    speedupButton.style.paddingLeft = '25px';
    speedupButton.style.whiteSpace = 'nowrap';

    speedupButton.addEventListener('click', () => {
      WITH_ANIMATE = false;
      window.Turtle.runButtonClick();
    });
    runButton.addEventListener('click', () => {
      WITH_ANIMATE = true;
    });
    parent.insertBefore(speedupButton, runButton);
  });
  observer.observe(document.documentElement, { attributes: false, childList: true, subtree: true });
}
