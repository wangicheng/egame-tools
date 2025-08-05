{
  const observer = new MutationObserver(function (mutationList, observer) {
    if(!location.hash.startsWith('#dojo/myDojo/create/new/')) {
      return;
    }
    /** @type {HTMLInputElement} */
    const agreeCheckBox = document.querySelector('input#agree');
    if (agreeCheckBox && !agreeCheckBox.checked) {
      agreeCheckBox.click();
    }
  });
  observer.observe(document.body, { attributes: false, childList: true, subtree: true });
}