const interval = setInterval(() => {
  if(window.Turtle && window.Turtle.drawStatus) {
    clearInterval(interval);
    Turtle.drawStatus = function () {
      Turtle.ctxStatusImage = new Image;
      Turtle.ctxStatusImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABGSURBVFhH7dKrEQAgDETBQA1IJP1XhETSA8wwweCIOfPWXEw+IgYAgFry/DZrW14eZfTQrFDTu/yKHJE9ZThA/oQAAIiZbRd3DAqKWHKTAAAAAElFTkSuQmCC';

      Turtle.ctxStatusImage.onload = function () {
          Turtle.ctxStatus.drawImage(Turtle.ctxStatusImage, 200 - 16, 200 - 16);
          Turtle.display();
      };

      Turtle.ctxStatus.globalCompositeOperation = 'copy';
      Turtle.ctxStatus.globalCompositeOperation = 'source-over';
    };
  }
});