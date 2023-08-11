tinymce.PluginManager.add('automatic', function(editor, url) {
    var pluginName='自动排版';
    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
    var doAct = function () {
        const radio = JSON.parse(localStorage.getItem('radio')).radio
        const radl = JSON.parse(localStorage.getItem('radio')).radl
        const automatic = JSON.parse(localStorage.getItem('automatic'))
        if(automatic.length > 0){
            for (const item of automatic) {
                switch(item) {
                    case '2em':
                        indent(item);
                        break;
                    case 'eliminate':
                        eliminate();
                        break;
                    case 'clearstyle':
                        clearStyle();
                        break;
                    case 'fontfamily':
                        fontfamily();
                        break;
                    case 'clearClass':
                        clearclass();
                        break;
                    case 'clearfont':
                        clearfont()
                        break;
                    case 'clearHTML':
                        clearHTML();
                        break;
                    case 'merge':
                        clearHTML();
                        break;
                    case 'clearSize':
                        clearSize();
                        break;
                }
            }
        }
        if(radio){
           align(radio);
        }
        if(radl){
            comma(radl)  
              
        }
        // var indent2em_val = editor.getParam('indent2em_val', radio);
    };
    // 缩进
    const indent = (value)=>{
        var indent2em_val = editor.getParam('indent2em_val', value);
        var dom = editor.dom;
        var blocks = editor.selection.getSelectedBlocks();
        var act = '';
        global$1.each(blocks, function (block) {
            if(act==''){
                act = dom.getStyle(block,'text-indent')==indent2em_val ? 'remove' : 'add';
            }
            if( act=='add' ){
                dom.setStyle(block, 'text-indent', indent2em_val);
            }else{
                var style=dom.getAttrib(block,'style');
                var reg = new RegExp('text-indent:[\\s]*' + indent2em_val + ';', 'ig');
                style = style.replace(reg, '');
                dom.setAttrib(block,'style',style);
            }
        });

    }
    // 左中右 布局
    const align = (radio)=> {
        var align_val = editor.getParam('align_val', radio);
        var dom = editor.dom;
        var blocks = editor.selection.getSelectedBlocks();
        var act = '';
        global$1.each(blocks, function (block) {
            if(act==''){
                act = dom.getStyle(block,'text-align')==align_val ? 'remove' : 'add';
            }
            if( act=='add' ){
                dom.setStyle(block, 'text-align', align_val);
            }else{
                var style=dom.getAttrib(block,'style');
                var reg = new RegExp('text-align:[\\s]*' + align_val + ';', 'ig');
                style = style.replace(reg, '');
                dom.setAttrib(block,'style',style);
            }
        });
    }
    // 如果有清空格式 就先执行清空格式 如果有对齐最后执行对齐
    // 清除空
    const eliminate = ()=>{
        //清空三种
        var blocks = editor.selection.getSelectedBlocks();
            //清除所有html空格
        global$1.each(blocks, function (block) {
            block.innerHTML = block.innerHTML.replace(/&nbsp;/ig,"")
            let text = block.innerText.replace(/ /ig,"")
            // let text = html.replace(/(?<=\>[^<]*?) /g,"")
            block.innerText = text;
        });
    }
    // 清空样式
    const clearStyle = ()=>{
        //清空三种
        var dom = editor.dom;
        var blocks = editor.selection.getSelectedBlocks();
        global$1.each(blocks, function (block) {
            var style = dom.getAttrib(block,'style');
            style = ''
            dom.setAttrib(block,'style',style);
              //清除所有strong
            const text = block.innerHTML.replace(/<(\/strong|strong).*?>/ig,"");
            block.innerHTML = text
            if(block.children.length > 0){
                 for (const item of block.children) {
                     dom.setAttrib(item,'style',style)
                     if(item.children.length >0){
                         for (const chi of item.children) {
                             dom.setAttrib(chi,'style',style)
                             if(chi.children.length >0){
                                 for (const chil of chi.children) {
                                     dom.setAttrib(chil,'style',style)
                                 }
                             }
                         }
                     }
                 }
            }
        });
    }
    //清除class
    const clearclass =()=>{
        //清除所有class，为防止有些class不加引号，因此强制规定只清除元素内的class，这种写法最笨和直观，聪明的看下一个
        var dom = editor.dom;
        var blocks = editor.selection.getSelectedBlocks();
        global$1.each(blocks, function (block) {
            // var lei = dom.getAttrib(block,'class');
            // lei
            // 除样式外合并字符串后拼接进style 
            dom.setAttrib(block,'class',"");
        });
    }
    //清除字体样式
    const clearfont = ()=>{
        var dom = editor.dom;
        var blocks = editor.selection.getSelectedBlocks();
        global$1.each(blocks, function (block) {  
            //清除所有strong
            const text = block.innerHTML.replace(/<(\/strong|strong).*?>/ig,"");
            block.innerHTML = text
            var style=dom.getAttrib(block,'style');
            style
            if(block.children.length >0){
                for (const item of  block.children) {
                    const styles =  dom.getAttrib(item,'style'); 
                    let arrStyle  = styles.split(";");
                    let stylestr =''
                    for (const chi of arrStyle) {
                         if(chi.indexOf("font-family") === -1 && chi){
                            stylestr+= chi+';'  
                         } 
                    }
                    // 除样式外合并字符串后拼接进style 
                    dom.setAttrib(item,'style',stylestr);
                }
            }
        });
    }
    //清除冗余HTML代码
    const clearHTML =()=>{
        editor.selection
        editor
        var blocks = editor.selection.getSelectedBlocks();
        for (const item of blocks) {
           if(item.innerText === '\n'  || ''){
              item.remove();
           } 
        }
    }
    //清除字号
    const clearSize = ()=>{
        var dom = editor.dom;
        var blocks = editor.selection.getSelectedBlocks();
        global$1.each(blocks, function (block) {
            //清除所有strong
            if(block.children.length >0){
                for (const item of  block.children) {
                    const styles = dom.getAttrib(item,'style'); 
                    let arrStyle  = styles.split(";");
                    let stylestr =''
                    for (const chi of arrStyle) {
                         if(chi.indexOf("font-size") === -1 && chi){
                            stylestr+= chi+';'  
                         }
                    }
                    // 除样式外合并字符串后拼接进style 
                    dom.setAttrib(item,'style',stylestr);
                }
            }
        });
    }
     //中英文逗号互转
    const comma = (value)=>{
        var blocks = editor.selection.getSelectedBlocks();
        global$1.each(blocks, function (block) {
            if(value === 'quanjiao'){
               //全角
               block.innerText =  block.innerText.replace(/，/ig,',') 
            }
            if(value === 'banjiao'){
               //半角
               block.innerText =  block.innerText.replace(/,/ig,'，')
            }
        });
    }
    const iframe1= tinymce.documentBaseURL + "automatic"
        var openDialog = function() {
        return editor.windowManager.openUrl({
            title: "排版设置",
            size: 'large',
            width: 800,
            height: 500,
            url:iframe1,
            buttons: [
                {
                    type: 'cancel',
                    text: 'Close'
                },
                {
                    type: 'custom',
                    text: 'Save',
                    name: 'save',
                    primary: true
                },
            ],
            onAction: function (api, details) {
                switch (details.name) {
                    case 'save':
                        //   editor.insertContent();
                        api.close();
                        break;
                    default:
                        break;
                }
            }
        });
        };
    editor.ui.registry.getAll().icons.indent2em || editor.ui.registry.addIcon('indent2em','<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M170.666667 563.2v-102.4H887.466667v102.4zM170.666667 836.266667v-102.4H887.466667v102.4zM512 290.133333v-102.4H887.466667v102.4zM238.933333 341.333333V136.533333l204.8 102.4z" fill="#2c2c2c" p-id="5210"></path></svg>');

    var stateSelectorAdapter = function (editor, selector) {
      return function (buttonApi) {
        return editor.selection.selectorChangedWithUnbind(selector.join(','), buttonApi.setActive).unbind;
      };
    };
  
    // addToggleButton
    editor.ui.registry.addSplitButton('automatic', {
        text:pluginName,
        icon: 'info',
        tooltip: pluginName,
        onAction: function () {
            doAct();
        },
        onItemAction: function (api, value) {
            api,
            value
            openDialog();
        //   editor.insertContent(value);
        },
        fetch: function (callback) {
            var items = [
              {
                type: 'choiceitem',
                icon: 'notice',
                text: '排版设置',
                value: '&nbsp;<em>You clicked menu item 1!</em>'
              }
            ];
            callback(items);
        },
        onSetup: stateSelectorAdapter(editor, [
          '*[style*="text-indent"]',
          '*[data-mce-style*="text-indent"]',
        ])
    });
  

    editor.ui.registry.addMenuItem('automatic', {
        text: pluginName,
        onAction: function() {
            doAct();
        }
    });

    editor.addCommand('automatic', doAct  );

    return {
      
    };
});
