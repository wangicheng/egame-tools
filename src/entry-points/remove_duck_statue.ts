const interval = setInterval(() => {
  if (window.Turtle && window.Turtle.drawStatus) {
    clearInterval(interval);
    window.Turtle.drawStatus = function () {
      window.Turtle.ctxStatusImage = new Image();
      window.Turtle.ctxStatusImage.src =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABGSURBVFhH7dKrEQAgDETBQA1IJP1XhETSA8wwweCIOfPWXEw+IgYAgFry/DZrW14eZfTQrFDTu/yKHJE9ZThA/oQAAIiZbRd3DAqKWHKTAAAAAElFTkSuQmCC';

      window.Turtle.ctxStatusImage.onload = function () {
        window.Turtle.ctxStatus.drawImage(window.Turtle.ctxStatusImage, 200 - 16, 200 - 16);
        window.Turtle.display();
      };

      window.Turtle.ctxStatus.globalCompositeOperation = 'copy';
      window.Turtle.ctxStatus.globalCompositeOperation = 'source-over';
    };
  }
});
