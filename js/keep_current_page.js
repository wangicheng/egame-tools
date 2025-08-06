{
  const match = document.cookie.match(/chapterId=(\d+)/);
  if(match) {
    const chapterId = match[1];
    const button = document.querySelector(`div#chapter_${chapterId}`);
    if(button) {
      button.click();
    }
  }
}