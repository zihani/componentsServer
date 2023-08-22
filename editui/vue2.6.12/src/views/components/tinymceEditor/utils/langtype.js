const textlangcss = (that,text)=>{
    const editor  = tinymce.activeEditor
    let children = editor.contentDocument.children[0];
    let langtype = that.$franc(children.innerText)
    if(text === "阿拉伯" &&  langtype === "arb" ){
        let align_val = editor.getParam("align_val", "right");
        let dom = editor.dom;
        let blocks = editor.selection.getSelectedBlocks();
        let global$1 = tinymce.util.Tools.resolve("tinymce.util.Tools");
        global$1.each(blocks, function (block) {
          dom.setStyle(block, "fontFamily", "times new roman,times");
          dom.setStyle(block, "font-size", "18pt");
          dom.setStyle(block, "line-height", "");
          dom.setStyle(block, "text-align", align_val);
          dom.setStyle(block, "direction", "rtl");
        });
        return editor.contentDocument.activeElement.innerHTML;
    }
    if(text !== "阿拉伯") {
        let dom = editor.dom;
        let blocks = editor.selection.getSelectedBlocks();
        let global$1 = tinymce.util.Tools.resolve("tinymce.util.Tools");
        global$1.each(blocks, function (block) {
        //   debugger
        //   if(block.children.length > 0 && block.children[0].localName === "img" && block.innerHTML.substr(0, 1) === "<"){
        //     var style=dom.getAttrib(block,'style');
        //     var reg = new RegExp('text-indent:[\\s]*' + '2em'+ ';', 'ig');
        //     style = style.replace(reg, '');
        //     debugger
        //     dom.setAttrib(block,'style',style);
        //     return
        // }
          // let children = editor.contentDocument.children;
          dom.setStyle(block, "text-align", "");
          dom.setStyle(block, "direction", "");
          dom.setStyle(block, "fontFamily", "times new roman,times");
          dom.setStyle(block, "font-size", "18pt");
          dom.setStyle(block, "line-height", "1.5");
        });
        return editor.contentDocument.activeElement.innerHTML;
    }
}
export const selectfun =(that,text)=>{
    textlangcss(that,text)
  //  return textlangcss(that)
}