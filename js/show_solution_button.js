{
  const observer = new MutationObserver(function (mutationList, observer) {
    const solutionButton = document.querySelector("#solutionButton");
    if (!solutionButton) {
      return;
    }
    observer.disconnect();
    solutionButton.style.display = 'inline-block';
  });
  observer.observe(document.documentElement, { attributes: false, childList: true, subtree: true });
}