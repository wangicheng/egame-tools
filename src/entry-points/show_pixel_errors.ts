const interval = setInterval(() => {
  if (window.Turtle && window.Turtle.isCorrect) {
    // const container = document.createElement('div');
    const tableElement = document.getElementById('functionBar');
    if (!tableElement) {
      return;
    }
    clearInterval(interval);
    const tbodyElement = tableElement.querySelector('tbody')!;
    const newRow = tbodyElement.insertRow();
    const newCell = newRow.insertCell();
    newCell.textContent = 'PixelErrors / permittedErrors: ';
    newCell.setAttribute('colspan', '3');
    // newCell.style.width = '300px';
    // document.querySelector('#page').insertAdjacentElement('beforeend', container);
    window.Turtle.isCorrect = function (pixelErrors: number, permittedErrors: number) {
      newCell.textContent = `PixelErrors / permittedErrors: [${pixelErrors}/${permittedErrors}]`;
      if (pixelErrors >= permittedErrors) {
        newCell.style.color = 'red';
      } else {
        newCell.style.color = 'green';
      }
      return pixelErrors < permittedErrors && !window.Turtle.isAnswerBlank();
    };
  }
}, 200);
