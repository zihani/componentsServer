tinymce.PluginManager.add('clearformat', function(editor, url) {
    var pluginName='清除格式';
    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
    // window.list =[]
    // window.radio = "justify"
    // window.radl = "quanjiao"
    // const arr = ["2em","clearstyle","merge","clearSize","clearClass","clearfont","clearHTML"]
    // localStorage.setItem("automatic", JSON.stringify(arr));
    // const radio = {radio:"justify",radl:"quanjiao"}
    // localStorage.setItem("radio", JSON.stringify(radio));
    // const imgFloat = "center";
    // localStorage.setItem("imageFloat",imgFloat);
    // const em2 = "2em"
    // localStorage.setItem("indent",em2);
    
    var doAct = function (editor) {
        eliminate();
        clearclass();
        clearfont();
        clearHTML();
        clearSizefun();
        clearStyle();
        onDefault();
    };
    const onDefault = ()=> {
        try{
			var text = editor.selection.getContent();
            var blocks = editor.selection.getSelectedBlocks();
            // 全部元素
            var nodes
            let documents = editor.contentDocument.activeElement.childNodes
            if(text && blocks){
                nodes = blocks
            }
            if(!text){
                nodes = documents
            }
            for (const item of nodes) {
                if(item.innerHTML){
                    item.innerHTML = item.innerHTML.replace(/^\^/g,'').replace(/^\^/g,'').replace(/^\^/g,'').replace(/^\^/g,'').replace(/^\^/g,'')
                    item.innerHTML = item.innerHTML.replace(/^\|/g,'').replace(/^\|/g,'').replace(/^\|/g,'').replace(/^\|/g,'').replace(/^\|/g,'')
                    item.innerHTML = item.innerHTML.replace(/^\s+/, '').replace(/\s+$/, '').replace(/&nbsp;/gi, "");
                    // ||^^
                    item.innerHTML = item.innerHTML.replace(/^\^/g,'').replace(/^\^/g,'').replace(/^\^/g,'').replace(/^\^/g,'').replace(/^\^/g,'')
                    item.innerHTML = item.innerHTML.replace(/^\|/g,'').replace(/^\|/g,'').replace(/^\|/g,'').replace(/^\|/g,'').replace(/^\|/g,'')
                    var regex1 = new RegExp("(i?)(\<img)(?!(.*?style=['\"](.*)['\"])[^\>]+\>)", 'gmi')
                    item.innerHTML = item.innerHTML.replace(regex1, '$2 style=""$3')
                }
                //（  ||^^）特殊符号清除
            }
            let html = editor.getContent()  
            // let textHtml =  editor.getContent({ format: "text" }) 
            //清除所有div标签
            // html = html.replace(/(<p>&nbsp;<\/p>)/gi,'<p><br /></p>');
            html = html.replace(/<(\/div|div).*?>/gi, "");
            editor.focus();
            editor.undoManager.transact(function () {
                editor.setContent(html);
            });
            editor.selection.setCursorLocation();
            editor.nodeChanged();
		}
		catch(err)
		{
			console.log(err);
		}
    }
    // 缩进
    const indent = (value)=>{
        try{
			var indent2em_val = editor.getParam('indent2em_val', value);
            var dom = editor.dom;
            // 选择的元素
            var text = editor.selection.getContent();
            var blocks = editor.selection.getSelectedBlocks();
            // 全部元素
            var nodes
            let documents = editor.contentDocument.activeElement.childNodes
            if(text && blocks){
                nodes = blocks
            }
            if(!text){
                nodes = documents
            }
            var act = '';
            global$1.each(nodes, function (block) {
                if(block.children.length > 0 && block.children[0].localName === "img" && block.innerHTML.substr(0, 1) === "<"){
                    var style=dom.getAttrib(block,'style');
                    var reg = new RegExp('text-indent:[\\s]*' + '2em'+ ';', 'ig');
                    style = style.replace(reg, '');
                    dom.setAttrib(block,'style',style);
                    return
                }
                if(indent2em_val === "2em"){
                    if(act==''){
                        act = dom.getStyle(block,'text-indent')==indent2em_val ? 'remove' : 'add';
                    }
                    if( act=='add' ){
                        dom.setStyle(block, 'text-indent', indent2em_val);
                    }
                }
                if(indent2em_val === "no2em"){
                    var style=dom.getAttrib(block,'style');
                    var reg = new RegExp('text-indent:[\\s]*' + '2em'+ ';', 'ig');
                    style = style.replace(reg, '');
                    dom.setAttrib(block,'style',style);
                }
                // else{
                //     var style=dom.getAttrib(block,'style');
                //     var reg = new RegExp('text-indent:[\\s]*' + indent2em_val + ';', 'ig');
                //     style = style.replace(reg, '');
                //     dom.setAttrib(block,'style',style);
                // }
            });
		}
		catch(err)
		{
            debugger
			console.log(err);
		}
    }
     //清除class
     const clearclass =()=>{
        try{
			//清除所有class，为防止有些class不加引号，因此强制规定只清除元素内的class
            var dom = editor.dom;
            var text = editor.selection.getContent();
            var blocks = editor.selection.getSelectedBlocks();
            // 全部元素
            var nodes
            let documents = editor.contentDocument.activeElement.childNodes
            if(text && blocks){
                nodes = blocks
            }
            if(!text){
                nodes = documents
            }
            
            for (const item of nodes) {
                if(item.innerHTML){
                    item.innerHTML =  item.innerHTML.replace(/class\s*?=\s*?([‘"])[\s\S]*?\1/ig, '');
                }
            }
            global$1.each(nodes, function (block) {
                // 除样式外合并字符串后拼接进style 
                dom.setAttrib(block,'class',"");
                if(block.children && block.children.length > 0){
                    for (const item of block.children) {
                        dom.setAttrib(item,'class','')
                        if(item.children && item.children.length >0){
                            for (const chi of item.children) {
                                dom.setAttrib(chi,'class','')
                                if(chi.children && chi.children.length >0){
                                    for (const chil of chi.children) {
                                        dom.setAttrib(chil,'class','')
                                    }
                                }
                            }
                        }
                    }
               }
            });
		}
		catch(err)
		{
			console.log(err);
		}
    }
    // 清空样式
    const clearStyle = function(){
        try{
			 //清空三种
            // const texts  = editor.getContent();
            // texts
            // 选择的元素
            var text = editor.selection.getContent();
            var blocks = editor.selection.getSelectedBlocks();
            // 全部元素
            var nodes
            let documents = editor.contentDocument.activeElement.childNodes
            if(text && blocks){
                nodes = blocks
            }
            if(!text){
                nodes = documents
            }
            global$1.each(nodes, function (block) {
                if(block.innerHTML){
                   //清除所有strong
                    const strong = block.innerHTML.replace(/<(\/strong|strong).*?>/ig,"");
                    if(strong){
                        block.innerHTML = strong
                    }
                    //清除所有a标签
                    const a =  block.innerHTML.replace(/<(\/a|a).*?>/ig,"");
                    if(a){
                        block.innerHTML = a
                    }
                    // 清除span
                    const span = block.innerHTML.replace(/<(\/span|span).*?>/ig,"");
                    if(span){
                        block.innerHTML = span 
                    }
                    // 清除em
                    const em = block.innerHTML.replace(/<(\/em|em).*?>/ig,"");
                    if(em){
                        block.innerHTML = em 
                    }
                }
                if(block.children && block.children.length > 0){
                    for (const chil1 of block.children) {
                        chil1.setAttribute('style','')
                        // chil1.setAttribute('style','font-family:times new roman,times; font-size:18pt; line-height:1.5;')
                        if(chil1.children && chil1.children.length >0){
                            for (const chil2 of chil1.children) {
                                chil2.setAttribute('style','')
                                // chil2.setAttribute('style','font-family:times new roman,times; font-size:18pt; line-height:1.5;')
                                if(chil2.children && chil2.children.length >0){
                                    for (const chil3 of chil2.children) {
                                        chil3.setAttribute('style','')
                                        // chil3.setAttribute('style','font-family:times new roman,times; font-size:18pt; line-height:1.5;')
                                        if(chil3.children && chil3.children.length >0){
                                            for (const chil4 of chil3.children) {
                                                chil4.setAttribute('style','')
                                                // chil4.setAttribute('style','font-family:times new roman,times; font-size:18pt; line-height:1.5;')
                                                if(chil4.children && chil4.children.length >0){
                                                    for (const chil5 of chil4.children) {
                                                        chil5.setAttribute('style','')
                                                        // chil5.setAttribute('style','font-family:times new roman,times; font-size:18pt; line-height:1.5;')
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
		}
		catch(err)
		{
			console.log(err);
		}
    }
    //清除字体样式
    const clearfont = ()=>{
        try{
            var dom = editor.dom;
            var blocks = editor.selection.getSelectedBlocks();
            global$1.each(blocks, function (block) {  
                //清除所有strong
                const text = block.innerHTML.replace(/<(\/strong|strong).*?>/ig,"");
                block.innerHTML = text
              
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
		catch(err)
		{
			console.log(err);
		}
    }
    //清除冗余HTML代码
    const clearHTML =()=>{
        try{
            let getContent = editor.getContent()  
      
            getContent.replace(/<(?!\/?strong|\/?em|\/?p|\/?u)[^<>]*>/ig,'')
    
            editor.focus();
            editor.undoManager.transact(function () {
                editor.setContent(cleardom(getContent));
            });
            editor.selection.setCursorLocation();
            editor.nodeChanged(); 
		}
		catch(err)
		{
			console.log(err);
		}
    }
    //清除字号
    const clearSizefun = ()=>{
        try{
            var dom = editor.dom;
            // 选择的元素
            var text = editor.selection.getContent();
            var blocks = editor.selection.getSelectedBlocks();
            // 全部元素
            var nodes
            let documents = editor.contentDocument.activeElement.childNodes
            if(text && blocks){
                nodes = blocks
            }
            if(!text){
                nodes = documents
            }
            global$1.each(nodes, function (block) {
                //清除所有strong
                if(block.children && block.children.length >0){
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
		catch(err)
		{
			console.log(err);
		}
    }
    //全角半角切换
    const comma = (value)=>{
        try{
			// 选择的元素
            var text = editor.selection.getContent();
            var blocks = editor.selection.getSelectedBlocks();
            // 全部元素
            var nodes
            let documents = editor.contentDocument.activeElement.childNodes
            if(text && blocks){
                nodes = blocks
            }
            if(!text){
                nodes = documents
            }
            for (const item of nodes) {
                if(item.innerHTML){
                    item.innerHTML = symbol(item.innerHTML)
                }
            } 
            // if(value === 'quanjiao'){
            //     let html = editor.getContent()
            //     html = symbol(html)
    
    
            //     editor.focus();
            //     editor.undoManager.transact(function () {
            //         editor.setContent(html);
            //     });
            //     editor.selection.setCursorLocation();
            //     editor.nodeChanged();
            // }
            global$1.each(nodes, function (block) {
                if(value === 'quanjiao'){
                    //    全角
                    //     block.innerHTML =  block.innerHTML.replace(/全角/ig,'半角')
                    //        block.innerHTML = ToCDB(block.innerHTML)
                    //        block.innerHTML =  block.innerHTML.replace(/＜/ig,'&lt;')
                    //        block.innerHTML =  block.innerHTML.replace(/＞/ig,'&gt;')
                    //        block.innerHTML =  block.innerHTML.replace(/（/ig,'(')
                    //        block.innerHTML =  block.innerHTML.replace(/）/ig,')')
                    //        block.innerHTML =  block.innerHTML.replace(/：/ig,':')
                    //        block.innerHTML =  block.innerHTML.replace(/／/ig,'/')
                    //        block.innerHTML =  block.innerHTML.replace(/＾/ig,'^')
                    //        block.innerHTML =  block.innerHTML.replace(/｜/ig,'|')
                    //        block.innerHTML =  block.innerHTML.replace(/～/ig,'~')
                    //     symbol(block.innerHTML)
                    // block.innerHTML
                    // console.log(symbol(block.innerHTML))
                    // block.innerHTML = symbol(block.innerHTML)
                }
                if(value === 'banjiao'){
                   //半角
                   // block.innerHTML =  block.innerHTML.replace(/半角/ig,'全角')
                   block.innerHTML =  block.innerHTML.replace(/&lt;/ig,'＜')
                   block.innerHTML =  block.innerHTML.replace(/&gt;/ig,'＞')
                   block.innerHTML =  block.innerHTML.replace(/,/ig,'，')
                   block.innerHTML =  block.innerHTML.replace(/!/ig,'！')
                   block.innerHTML =  block.innerHTML.replace(/'/ig,"＇")
                   block.innerHTML =  block.innerHTML.replace(/\(/ig,'（')
                   block.innerHTML =  block.innerHTML.replace(/\)/ig,'）')
                   block.innerHTML =  block.innerHTML.replace(/:/ig,'：')
                   block.innerHTML =  block.innerHTML.replace(/;/ig,'；')
                   block.innerHTML =  block.innerHTML.replace(/\//ig,'／')
                   block.innerHTML =  block.innerHTML.replace(/\?/ig,'？')
                   block.innerHTML =  block.innerHTML.replace(/\^/ig,'＾')
                   block.innerHTML =  block.innerHTML.replace(/\|/ig,'｜')
                   block.innerHTML =  block.innerHTML.replace(/~/ig,'～')
                   block.innerHTML =  block.innerHTML.replace(/、/ig,'、')
                }
            });
		}
		catch(err)
		{
            debugger
			console.log(err);
		}
    }
    const media=()=>{
        var value = 'center'
        var align_val = editor.getParam('align_val', value);
        var dom = editor.dom;
        var text = editor.selection.getContent();
        var blocks = editor.selection.getSelectedBlocks();
        // 全部元素
        var nodes
        let documents = editor.contentDocument.activeElement.childNodes
        if(text && blocks){
            nodes = blocks
        }
        if(!text){
            nodes = documents
        }
        global$1.each(nodes, function (block) {
               if(block.children.length > 0){
                   for (const chil1 of block.children) {
                        if(chil1.localName === "video"){
                            if(align_val ==="center"){
                                var divNode = editor.getDoc().createElement('div');
                                // block.insertNode(divNode)
                                dom.setStyle(block, 'text-align', align_val);
                                // chil1.setAttribute('style',' ')
                                // chil1.style["float"] = null;
                                dom.setAttrib(chil1,'style','')

                            }else{
                                dom.setStyle(chil1, 'float', align_val)
                            }
                        }
                        if(chil1.localName === "audio"){
                            if(align_val ==="center"){
                                var divNode = editor.getDoc().createElement('div');
                                // block.insertNode(divNode)
                                dom.setStyle(block, 'text-align', align_val);
                                // chil1.setAttribute('style',' ')
                                // chil1.style["float"] = null;
                                dom.setAttrib(chil1,'style','')

                            }else{
                                dom.setStyle(chil1, 'float', align_val)
                            }
                        }
                        if(chil1.children.length > 0){
                            for (const chil2 of chil1.children) {
                                if(chil2.localName === "video"){
                                    if(align_val ==="center"){
                                        dom.setStyle(chil1, 'text-align', align_val);
                                        // chil2.setAttribute('style',' ')
                                        dom.setAttrib(chil2,'style','')
                                        // chil2.style["float"] = null;
                                        // let  tag = function style (){}
                                        // chil2.attributes.splice(chil2.attributes.indexOf(tag), 1);
                                    }else{
                                        dom.setStyle(chil2, 'float', align_val)
                                    }
                                }
                                if(chil2.localName === "audio"){
                                    if(align_val ==="center"){
                                        dom.setStyle(chil1, 'text-align', align_val);
                                        // chil2.setAttribute('style',' ')
                                        dom.setAttrib(chil2,'style','')
                                        // chil2.style["float"] = null;
                                        // let  tag = function style (){}
                                        // chil2.attributes.splice(chil2.attributes.indexOf(tag), 1);
                                    }else{
                                        dom.setStyle(chil2, 'float', align_val)
                                    }
                                }
                                if(chil2.children.length > 0){
                                    for (const chil3 of chil2.children) {
                                        if(chil3.localName === "video"){
                                            if(align_val ==="center"){
                                                dom.setStyle(chil2,'text-align', align_val);
                                                // chil3.setAttribute('style',' ')
                                                // chil3.style["float"] = null;
                                                dom.setAttrib(chil3,'style','')
                                            }else{
                                                dom.setStyle(chil3, 'float', align_val)
                                            }
                                        }
                                        if(chil3.localName === "audio"){
                                            if(align_val ==="center"){
                                                dom.setStyle(chil2,'text-align', align_val);
                                                // chil3.setAttribute('style',' ')
                                                // chil3.style["float"] = null;
                                                dom.setAttrib(chil3,'style','')
                                            }else{
                                                dom.setStyle(chil3, 'float', align_val)
                                            }
                                        }
                                        // if(chil3.children.length > 0){
                                        //     for (const chil4 of chil3.children) {

                                        //     }
                                        // }
                                    }
                                }
                            }
                        }
                   } 
               }
        });
    }
    // 图片浮动左中右
    const imageFloat=(value)=>{
        // var value = 'center'
        try{
            var align_val = editor.getParam('align_val', value);
            var dom = editor.dom;
            var text = editor.selection.getContent();
            var blocks = editor.selection.getSelectedBlocks();
            // 全部元素
            var nodes
            let documents = editor.contentDocument.activeElement.childNodes
            if(text && blocks){
                nodes = blocks
            }
            if(!text){
                nodes = documents
            }
            global$1.each(nodes, function (block) {
                   if(block.children  && block.children.length > 0){
                       for (const chil1 of block.children) {
                            if(chil1.localName === "img"){
                                if(align_val ==="center"){
                                    chil1.style["marginLeft"] = "auto";
                                    chil1.style["marginRight"] = "auto";
                                    chil1.style["display"] = "block";
                                    dom.setStyle(block, 'text-align', align_val);
                                    // chil1.setAttribute('style',' ')
                                    // chil1.style["float"] = null;
                                    dom.setAttrib(chil1,'style','')
    
                                }else{
                                    dom.setStyle(chil1, 'float', align_val)
                                }
                            }
                            if(chil1.children && chil1.children.length > 0){
                                for (const chil2 of chil1.children) {
                                    if(chil2.localName === "img"){
                                        if(align_val ==="center"){
                                            chil2.style["marginLeft"] = "auto";
                                            chil2.style["marginRight"] = "auto";
                                            chil2.style["display"] = "block";
                                            dom.setStyle(chil1, 'text-align', align_val);
                                            // chil2.setAttribute('style',' ')
                                            dom.setAttrib(chil2,'style','')
                                            // chil2.style["float"] = null;
                                            // let  tag = function style (){}
                                            // chil2.attributes.splice(chil2.attributes.indexOf(tag), 1);
                                        }else{
                                            dom.setStyle(chil2, 'float', align_val)
                                        }
                                    }
                                    if(chil2.children && chil2.children.length > 0){
                                        for (const chil3 of chil2.children) {
                                            if(chil3.localName === "img"){
                                                if(align_val ==="center"){
                                                    chil3.style["marginLeft"] = "auto";
                                                    chil3.style["marginRight"] = "auto";
                                                    chil3.style["display"] = "block";
                                                    dom.setStyle(chil2,'text-align', align_val);
                                                    // chil3.setAttribute('style',' ')
                                                    // chil3.style["float"] = null;
                                                    dom.setAttrib(chil3,'style','')
                                                }else{
                                                    dom.setStyle(chil3, 'float', align_val)
                                                }
                                            }
                                            // if(chil3.children.length > 0){
                                            //     for (const chil4 of chil3.children) {
    
                                            //     }
                                            // }
                                        }
                                    }
                                }
                            }
                       } 
                   }
            });
		}
		catch(err)
		{
            debugger
			console.log(err);
		}
    }
    // 清除标签
    const cleardom = (html)=>{
       // 只保留  p.img.video.audio.table.pre.thead.tbody.tr.td
        // 清除可能出现的标签
       return  html.replace(/<(?!\/?p|\/?img|\/?video|\/?audio|\/?table|\/?pre|\/?thead|\/?tbody|\/?tr|\/?td)[^<>]*>/ig,'')
    }
    const symbol = (text) =>{
        try{
		    //全角转半角
            let ToCDB = function (str) {
                var tmp = "";
                for (var i = 0; i < str.length; i++) {
                    if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
                        tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
                    }else {
                        tmp += String.fromCharCode(str.charCodeAt(i));
                    }
                }
                return tmp
            }
            //半角转全角
            let ToDBC = function (txtstring) {
                var tmp = "";
                for (var i = 0; i < txtstring.length; i++) {
                    if (txtstring.charCodeAt(i) == 32) {
                        tmp = tmp + String.fromCharCode(12288);
                    }
                    if (txtstring.charCodeAt(i) < 127) {
                        tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
                    }
                }
                return tmp?tmp:txtstring;
            }
            text = text.replace(/&quot;/gi,'"');
            text = text.replace(/&lt;/gi,'<');
            text = text.replace(/&gt;/gi,'>');
            text = text.replace(/&#39;/gi,"'");
            text = text.replace(/&amp;lt;/gi,'<');
            text = text.replace(/&amp;gt;/gi,'>');
            text = text.replace(/&lsquo;/gi,'‘')
            text = text.replace(/&ldquo;/gi,'“')
            text = text.replace(/&rdquo;/gi,'”')
            text = text.replace(/&hellip;/gi,'…')
            // "‘",

            let exclude  = ["<","（","）","，","。","？","、","；","“","”","《","》","…","！"]

            var reg2 = /(<\/?p.*?>)/gi;
            let str = text.replace(reg2, '')
            var imgReg = /<[img-video].*?(?:>|\/>)/gi;
            // let  aa = str.match(/<a>(.*?)<\/a>/gi)
            // aa

            let imgs = text.match(imgReg); 
            str = str.split(/<[img-video].*?(?:>|\/>)/gi)
            let arr = str
            // 全角  ＜＞，！＇（）：；／？＾｜～、＂．
            // 半角  &lt;&gt;,!():/?^|~、'".
            //全角
            let symbolQ = ["＜","＞","，","！","＇","（","）","：","；","／","？","＾","｜","～","、","＂","．"]
            //半角
            let symbolB = ["<",">",",","!","(",")",":",";","/","?","^","|","~","、","'","\"","."]
            for (const key in arr) {
                let _item = arr[key].split('')
                let filtered = _item.map((val,i,all)=>{
                    if(symbolQ.includes(val) || symbolB.includes(val)){
                        return {val:val,key:i,front:all[i -1]}
                    }
                })
                filtered=filtered.filter(Boolean);
                function regzh(str){
                    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
                    return reg.test(str);
                }
                let regen =  new RegExp("[a−b−c−d−e−f−g−h−i−j−k−|−m−n−o−p−q−r−s−t−u−v−w−x−y−zA−B−C−D−E−F−G−H−I−J−K−L−M−N−O−P−Q−R−S−T−U−V−W−X−Y−Z0−9]+");
                for (const filitem of filtered) {
                    if(filitem){
                        debugger
                            // 排除 <>p img  video audio table pre thead tbody tr td
                            //上一个字段
                            if(regzh(filitem.front)){
                                //全角
                                _item[filitem.key] =  exclude.includes(filitem.val) ? filitem.val:ToDBC(filitem.val) 
                                // ToDBC(filitem.val) || filitem.val
                            }
                            if(regen.test(filitem.front)){
                                _item[filitem.key] =  exclude.includes(filitem.val) ? filitem.val:ToCDB(filitem.val)
                            }
                    }
                }
                let _string =_item.join("--")
                var _reg = new RegExp("--","g"); 
                arr[key] = _string.replace(_reg,"");
                if(imgs && imgs.length > 0 && imgs[key]){
                    if(imgs[key].indexOf("video") !=-1){
                        imgs[key] = imgs[key] + "</video>"
                    }
                    arr[key] = arr[key] + imgs[key]
                }
            }
            //追加图片
            // for (const key in arr) {
            //    if(imgs && imgs.length > 0 && imgs[key]){
            //     if(imgs[key].indexOf("video") !=-1){
            //         imgs[key]
            //     }
            //     arr[key] = arr[key] + imgs[key]
            //    }
            // }
            let toString = arr.join("--")
            var reg = new RegExp("--","g"); 
            return toString.replace(reg,"");
		}
		catch(err)
		{
            debugger
			console.log(err);
		}
    }
     // 如果有清空格式 就先执行清空格式 如果有对齐最后执行对齐
    // 清除空行
    const eliminate = ()=>{
        try{
			//清空三种
            // 选择的元素
            var text = editor.selection.getContent();
            var blocks = editor.selection.getSelectedBlocks();
            // 全部元素
            var nodes
            let documents = editor.contentDocument.activeElement.childNodes
            if(text && blocks){
                nodes = blocks
            }
            if(!text){
                nodes = documents
            }
            function clear(innerHTML) {
                let arr
                if(innerHTML){
                    let isnbsp =  innerHTML.split("&nbsp;")
                    if(isnbsp.length > 0) {
                        for (const key in isnbsp) {
                            isnbsp[key] = isnbsp[key].trim();
                        }
                    }
                    arr = isnbsp.filter(Boolean);
                }
                if(arr && arr.length > 0) return innerHTML ?? ""
                return ""
            }
            for (const item of nodes) {
                item.innerHTML = clear(item.innerHTML)
            }
            let html = editor.getContent()
            html = html.replace(/(<p>&nbsp;<\/p>)/gi,'')
            editor.focus();
            editor.undoManager.transact(function () {
                editor.setContent(html);
            });
            editor.selection.setCursorLocation();
            editor.nodeChanged();
		}
		catch(err)
		{
			console.log(err);
		}
      
    }
    editor.ui.registry.addButton('clearformat', {
        text:pluginName,
        tooltip: pluginName,
        onAction: function (api) {
            doAct(editor);
        }
    });
    editor.addCommand('clearformat', doAct  );
    return {};
});
