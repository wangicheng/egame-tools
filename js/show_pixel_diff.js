{
  const visualization = document.querySelector('#visualization');
  visualization.style.position = 'relative';
  const canvas1 = document.createElement('canvas');
  canvas1.width = 400;
  canvas1.height = 400;
  visualization.style.position = 'absolute';
  visualization.appendChild(canvas1);
}