{
  const interval1 = setInterval(() => {
    if(!window.Blockly || !Blockly.copy_) {
      return;
    }
    clearInterval(interval1);
    const copy_function = Blockly.copy_;
    Blockly.copy_ = function(a) {
      // console.log(a);
      const text = new XMLSerializer().serializeToString(Blockly.Xml.blockToDom(a));
      navigator.clipboard.writeText(text);
      return copy_function(a);
    };
  }, 200);

  const interval2 = setInterval(() => {
    if(!window.Blockly || !Blockly.clipboardSource_ || !Blockly.clipboardSource_.paste) {
      return;
    }
    clearInterval(interval2);
    const paste_function = Blockly.clipboardSource_.paste;
    Blockly.clipboardSource_.paste = function(a) {
      navigator.clipboard.readText().then((text) => {
        const xml = Blockly.Xml.textToDom(`<xml>${text}</xml>`);
        // console.log(xml.querySelector('block'));
        return paste_function.call(Blockly.clipboardSource_, xml.querySelector('block'));
      });
    };
  }, 200);
}