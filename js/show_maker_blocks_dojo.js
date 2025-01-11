const originalParse = JSON.parse;

JSON.parse = (...args) => {
  Turtle.level.startBlocks = () => Turtle.level.json.makerBlocks;
  return originalParse(...args);
}