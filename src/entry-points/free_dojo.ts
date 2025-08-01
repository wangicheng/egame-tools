{
  const observer = new MutationObserver(function (mutationList, observer) {
    if(!location.hash.startsWith('#dojo/view/')) {
      return;
    }
    const playButton = document.querySelector('div[data-bind="click:play"]');
    if (playButton && !document.querySelector('#clone-play-button')) {
      // observer.disconnect();
      const parent = playButton.parentElement;
      const cloneButton = playButton.cloneNode(true);
      cloneButton.id = 'clone-play-button';
      cloneButton.querySelector('p').textContent = '免費闖關';
      cloneButton.addEventListener('click', () => {
        const dojoId = location.hash.split('/').at(-1);
        document.cookie = `dojoSn=${dojoId}; domain=.egame.kh.edu.tw; path=/`;
        location.href = '/auth/dotCode/apps/dojo/#play';
      });
      parent.appendChild(cloneButton);
      playButton.style.display = 'none';
    }
  });
  observer.observe(document.documentElement, { attributes: false, childList: true, subtree: true });
}