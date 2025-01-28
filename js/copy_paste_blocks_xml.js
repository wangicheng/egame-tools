{
  const interval1 = setInterval(() => {
    if(!window.Blockly || !Blockly.copy_) {
      return;
    }
    clearInterval(interval1);
    const copyFunction = Blockly.copy_;
    Blockly.copy_ = function(a) {
      // console.log(a);
      const text = new XMLSerializer().serializeToString(Blockly.Xml.blockToDom(a));
      navigator.clipboard.writeText(text);
      return copyFunction(a);
    };
  }, 200);

  const interval2 = setInterval(() => {
    if(!window.Blockly || !Blockly.clipboardSource_ || !Blockly.clipboardSource_.paste) {
      return;
    }
    clearInterval(interval2);
    const pasteFunction = Blockly.clipboardSource_.paste;
    Blockly.clipboardSource_.paste = function(a) {
      navigator.clipboard.readText().then((text) => {
        const xml = Blockly.Xml.textToDom(`<xml>${text}</xml>`);
        // console.log(xml.querySelector('block'));
        return pasteFunction.call(Blockly.clipboardSource_, xml.querySelector('block'));
      });
    };
  }, 200);
}