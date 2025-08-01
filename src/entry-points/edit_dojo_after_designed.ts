const observer = new MutationObserver(function (mutationList, observer) {
  if (!location.hash.startsWith('#dojo/myDojo/view/')) {
    return;
  }
  const playButton = document.querySelector<HTMLDivElement>('div[data-bind="visible:!myDojo.isOpen(),click:edit"]');
  if (playButton && playButton.style.display === 'none') {
    playButton.style.display = 'block';
  }
});
observer.observe(document.documentElement, { attributes: false, childList: true, subtree: true });
