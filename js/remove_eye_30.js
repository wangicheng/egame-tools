{
  const observer = new MutationObserver(function (mutationList, observer) {
    if(!location.hash.startsWith('#islands')) {
      return;
    }
    const expressEye30 = document.querySelector('div#expressEye30');
    if (expressEye30 && expressEye30.style.display !== 'none') {
      expressEye30.style.display = 'none';
    }
  });
  observer.observe(document.documentElement, { attributes: false, childList: true, subtree: true });
}