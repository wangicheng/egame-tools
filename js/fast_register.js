{
  function generateRandomString() {
    const uuid = crypto.randomUUID();
    return uuid.substring(0, 8) + uuid.substring(9, 13) + uuid.substring(14, 17);
  }

  const observer = new MutationObserver(function (mutationList, observer) {
    if(window.location.hash !== '') {
      return;
    }
    const registerButton = document.querySelector('div:has(> img[alt="註冊"])');
    if(!registerButton) {
      return;
    }
    if(document.querySelector('#fastRegisterButton')) {
      return;
    }
    // observer.disconnect();
    const fastRegisterButton = document.createElement('div');
    fastRegisterButton.id = 'fastRegisterButton';
    fastRegisterButton.style.position = 'relative';
    fastRegisterButton.style.margin = '0 auto';
    fastRegisterButton.style.width = '24%';
    fastRegisterButton.style.height = '100%';
    fastRegisterButton.style.cursor = 'pointer';
    const child_p = registerButton.querySelector('p').cloneNode(true);
    const child_img = registerButton.querySelector('img').cloneNode(true);
    child_p.textContent = '瞬間註冊';
    child_img.setAttribute('alt', '瞬間註冊');
    fastRegisterButton.appendChild(child_p);
    fastRegisterButton.appendChild(child_img);
    fastRegisterButton.addEventListener('click', (event) => {
      // fast resgiter
      const username = generateRandomString();
      const password = generateRandomString();
      const name = 'guest-' + generateRandomString().substring(6);
      document.querySelector('#username').value = username;
      document.querySelector('#password').value = password;
      document.querySelector('#passConfirm').value = password;
      document.querySelector('#nick_name').value = name;
      document.querySelector('#name').value = name;
      window.register.onInSchoolChange(false);
      setTimeout(() => { registerButton.click(); }, 100);
    });
    registerButton.parentElement.appendChild(fastRegisterButton);
  });
  observer.observe(document.documentElement, { attributes: false, childList: true, subtree: true });
}