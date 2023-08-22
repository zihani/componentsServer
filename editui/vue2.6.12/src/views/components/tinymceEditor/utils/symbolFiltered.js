// import {postlocalImage,uploadImg } from "@/api/manuscript/article";
import axios from "axios";
export function symbol(text){
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
            return tmp;
        }
        // & 打头 ;结尾的符号  
        text = text.replace(/&quot;/gi,'"');
        text = text.replace(/&lt;/gi,'<');
        text = text.replace(/&gt;/gi,'>');
        text = text.replace(/&#39;/gi,"'"); 
        text = text.replace(/&amp;lt;/gi,'<');
        text = text.replace(/&amp;gt;/gi,'>');
        // text.replace(/＜/p&gt;/gi,'');
        let arr = text.split('');
        // if(text.indexOf('&quot;') == 1){
        //     for (const item of text.split('&quot;')) {
        //         item
                
        //     }
        // }
        // text.indexOf("&")
        // 全角  ＜＞，！＇（）：；／？＾｜～、＂．
        // 半角  &lt;&gt;,!():/?^|~、'".
        let exclude  = ["<","、","，","！","：","？","；","（","）","。","“","”"]
        //全角
        let symbolQ = ["＜","＞","，","！","＇","（","）","：","；","／","？","＾","｜","～","、","＂","．"]
        //半角
        let symbolB = ["<",">",",","!","(",")",":",";","/","?","^","|","~","、","'","\"",".","“","”"]
        let value = ""
        let sub = false
        let filtered = arr.map((val,i,all)=>{
            if(symbolQ.includes(val) || symbolB.includes(val)){
                return {val:val,key:i,front:all[i -1]}
            }
        })
        filtered=filtered.filter(Boolean);
        function regzh(str){
            var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
            return reg.test(str);
        }
        // function isFullwidthChar(str){
        //     var reg = /[\uFF00-\uFFEF]/;
        //     return reg.test(str);
        // }
        // isFullwidthChar()
        let regen =  new RegExp("[a−b−c−d−e−f−g−h−i−j−k−|−m−n−o−p−q−r−s−t−u−v−w−x−y−zA−B−C−D−E−F−G−H−I−J−K−L−M−N−O−P−Q−R−S−T−U−V−W−X−Y−Z0−9]+");
        for (const item of filtered) {
            if(item){
                //上一个字段
                if(regzh(item.front)){
                    //全角   
                    arr[item.key] = exclude.includes(item.val) ? item.val:ToDBC(item.val)
                }
                if(regen.test(item.front)){
                    arr[item.key] = exclude.includes(item.val) ? item.val:ToCDB(item.val)
                }
            }
        }
        // arr
        let toString = arr.join("--")
        var reg = new RegExp("--","g"); 
        return toString.replace(reg,"");
    }
    catch(err)
    {
        console.log(err);
    }
}
export function eliminate(text){
    try{
        text = text.replace(/\r\r/gi,'<br>');
        const strong = text.replace(/<(\/strong|strong).*?>/gi,"");
        if (strong) {
            text = strong;
        }
        //清除所有a标签
        const a = text.replace(/<(\/a|a).*?>/gi, "");
        if (a) {
           text = a;
        }
        // 清除span
        const span = text.replace(/<(\/span|span).*?>/gi,"");
        if (span) {
            text = span;
        }
        // 清除em
        const em = text.replace(/<(\/em|em).*?>/gi, "");
        if (em) {
            text = em;
        }
        text = text.trim();
        text = text.replace(/&nbsp;/gi, "")
        text = text.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/gi, '')
        text = text.replace(/pre/ig,'p')
        // const p = text.replace(/<(\/p|p).*?>/gi, "");
        // let p = text.replace("<p>","").replace("<\/p>","<br>");
        // p
        // console.log("pppppppppppppppppppppppppppp")
        // console.log(p)
        // console.log("pppppppppppppppppppppppppppp")
        // if (p) {
        //     text = p;
        // }
        let arrbr  = []
        if(text.split("<br>").length > 1){
            arrbr = text.split("<br>");
        }
        if(text.split("<br >").length > 1){
            arrbr = text.split("<br >");
        }
        if(text.split("<br />").length > 1){
            arrbr = text.split("<br />");
        }
        if(arrbr.length > 0){
            let stradd  = ""
            for (const item of arrbr) {
                if(item){
                   stradd += `<p>${item}</p>`
                }
            }
            text = stradd 
        }
        text = text.replace(/<(?!\/?p|\/?img|\/?video|\/?audio|\/?table|\/?pre|\/?thead|\/?tbody|\/?tr|\/?td)[^<>]*>/ig,'')
        return text
    }
    catch(err)
    {
        console.log(err);
    }
}
export function imageDownload(content){
    var patt = /<img[^>]+src=['"]([^'"]+)['"]+/g;
    var result = [],
      temp;
    while ((temp = patt.exec(content)) != null) {
      result.push(temp[1]);
    }
    let _url = localStorage.getItem('_url')
     return new Promise((req,rej) =>{
        if(result[0] && result[0].indexOf("file/icmp-testb-fb/ice/") >= 0){
            let name = result[0].split("/")
            axios.get(_url+result[0],{params: {}, responseType: 'blob'}).then(res=>{
                if(res.data){
                    let blob = new Blob([res.data]); 
                    let dfl = new File([blob],name[7],{type:res.data.type})
                    req({file:dfl,type:"file"});
                }
            })
        }else{
            // postlocalImage({urls:[result[0]],type:1}).then(res =>{
            //     if(res.code != 200){
            //         this.$message.error(res.msg);
            //     }
            //     if(res.code == 200){
            //        req({dataList:res.data,type:"json"})
            //     }
            // })
        }
     })
 
    // https://idea-test.xhszjs.com/file/icmp-testb-fb/ice/2023/05/24/1f5c26a9995a4123984d65e4f532b73b.jpeg
    // postlocalImage({type:1,urls:result[0]}))
    // /file/icmp-testb-fb/ice
    // debugger
    // result[0].indexOf("file")
    // result[0].indexOf("icmp-testb-fb")
    // result[0].indexOf("ice")
    // debugger
    // axios.get(result[0],{params: {}, responseType: 'blob'}).then(res=>{
    //     res
    //     debugger
    // })

    // return new Promise((resolve,reject)=>{
    //     var patt = /<img[^>]+src=['"]([^'"]+)['"]+/g;
    //     var result = [],
    //       temp;
    //     while ((temp = patt.exec(content)) != null) {
    //       result.push(temp[1]);
    //     }
    //     // 判断是否外部的url 地址

    //     // function base64ToFile(base64, filename, contentType){
    //     //     var arr = base64.split(',')  //去掉base64格式图片的头部
    //     //     var bstr = atob(arr[0])   //atob()方法将数据解码
    //     //     var leng = bstr.length
    //     //     var u8arr = new Uint8Array(leng)
    //     //     while(leng--){
    //     //         u8arr[leng] =  bstr.charCodeAt(leng) //返回指定位置的字符的 Unicode 编码
    //     //     }
    //     //     return new File([u8arr], filename, {type:contentType}) 
    //     // }
    //     // url 转base64 
    //       /**
    //      * [getBase64 转换成base64]
    //      * @param  {[String]} imgUrl [图片地址]
    //      */
    //     //   function addList(files) {
    //     //     var files_sum = files.length;
    //     //     var vDom = document.createDocumentFragment();
    //     //     for (let i = 0; i < files_sum; i++) {
    //     //         let file = files[i];
    //     //         let blobUrl = window.URL.createObjectURL(file)
    //     //         const image = new Image();
    //     //         image.src = blobUrl;
    //     //         image.addEventListener("load", function () {
    //     //         let [sizeRatio, maxWidth, maxHeight] = [0, 1920, 1920]; // 图片压缩宽高比例和最大宽高
    //     //         let [imageWidth, imageHeight] = [this.naturalWidth, this.naturalHeight]; // 图片实际宽高
    //     //         let compressFlag = false; // 图片是否需要压缩
    //     //         let canvasWidth = this.naturalWidth
    //     //         let canvasHeight = this.naturalHeight
    //     //         // imageWidth // 图片实际宽度
    //     //         // imageHeight // 图片实际高度
    //     //          //如果 大于 1920 宽度的按照 1500 压缩
    //     //          if(imageWidth > 1920){
    //     //             maxWidth = 1500
    //     //          }
    //     //          if(imageHeight > 1920){
    //     //             maxHeight = 1500
    //     //          }
    //     //         // 如果图片宽度大于最大宽度就等比压缩图片的高度
    //     //         if (imageWidth > maxWidth) {
    //     //             compressFlag = true;
    //     //             sizeRatio = imageWidth / maxWidth;
    //     //             maxHeight = imageHeight / sizeRatio;
    //     //         }

    //     //         // 如果图片高度大于最大高度就等比压缩图片的宽度
    //     //         if (imageHeight > maxHeight) {
    //     //             compressFlag = true;
    //     //             sizeRatio = imageHeight / maxHeight;
    //     //             maxWidth = imageWidth / sizeRatio;
    //     //         }
    //     //         // 如果不需要压缩
    //     //         if (!compressFlag) {
    //     //             maxWidth = imageWidth;
    //     //             maxHeight = imageHeight;
    //     //         }
    //     //         // 使用canvas压缩图片
    //     //         const canvas = document.createElement("canvas");
    //     //         const ctx = canvas.getContext("2d");
    //     //         canvas.setAttribute("id", "canvas");
    //     //         canvas.width = maxWidth //canvasWidth;
    //     //         canvas.height = maxHeight //canvasHeight;
    //     //         // canvas.style.d11isplay = "none"; 
    //     //         // document.body.appendChild(canvas); // canvas预览
    //     //         ctx.clearRect(0, 0, maxWidth, maxHeight); // 清除画布内所有像素
    //     //         ctx.drawImage(image, 0, 0, maxWidth, maxHeight); // canvas绘制当前图片
    //     //         const compressImage = canvas.toDataURL("image/jpeg", 1); // 设置压缩类型和压缩比例获取压缩后的文件
    //     //         // let base64file =  base64ToBlob(compressImage)
    //     //         let basefile = base64ToFile(compressImage,file.name,file.type)
    //     //         // file.size = base64file.size
    //     //         basefile
    //     //         blobUrl
    //     //         file
    //     //         // // axupimgs.res.push({ file: file, blobUrl: blobUrl, url: '',basefile:basefile });
    //     //         // let li = document.createElement('li');
    //     //         // li.setAttribute('class', 'up-no');
    //     //         // li.setAttribute('data-time', file.lastModified);
    //     //         // li.innerHTML = '<div class="picbox"><img src="' + blobUrl + '"></div><div class="namebox"><span>' + file.name + '</span></div><div class="tools"><a class="remove"></a></div>';
    //     //         // vDom.appendChild(li);
    //     //         // document.querySelector('#file_list').appendChild(vDom);
    //     //         });
    //     //     }
            
    //     // }
    //     // 下载图片
    //     axios.get(result[0],{params: {}, responseType: 'blob'}).then(res=>{
    //         // debugger
    //         // let formData = new FormData()
    //         // formData.append('files',res.data)
    //         // debugger
    //         // formData
    //         // let blobUrl = window.URL.createObjectURL(res.data)
    //         // debugger
    //         // function base64ToFile(base64, filename, contentType){
    //         //     var arr = base64.split(',')  //去掉base64格式图片的头部
    //         //     var bstr = atob(arr[0])   //atob()方法将数据解码
    //         //     var leng = bstr.length
    //         //     var u8arr = new Uint8Array(leng)
    //         //     while(leng--){
    //         //         u8arr[leng] =  bstr.charCodeAt(leng) //返回指定位置的字符的 Unicode 编码
    //         //     }
    //         //     return new File([u8arr], filename, {type:contentType}) 
    //         // }
    //         // let base=  base64ToFile(blobUrl, "url",res.data)
    //         // // addList([])  
    //         // debugger
    //         return "上传"
    //         resolve("上传")
    //     })
    //     // if(result.length > 0){
    //     //     postlocalImage({urls:result,type:1}).then(res =>{
    //     //         if(res.data.code == 200){
    //     //             res.data.type === "image"
    //     //             resolve(res)
    //     //         }
    //     //     })
    //     // }
    // })
}
export function isLt1MandCompress(file){ 
    const isLt1M = file.size / 1024 / 1024 < 1;
    debugger
    if(!isLt1M){
       // 压缩图片大小
       debugger
    }
}
export function filteraten (text){
    try{ 
        debugger
        // const editor  = tinymce.activeEditor
        let arrbr  = []
        if(text.split("</p>").length > 1){
            arrbr = text.split("</p>");
        }
        debugger
        arrbr
        let stradd  = ""
        for (const item of arrbr) {
            if(item){
stradd += `${item}</p>
`
            }
        }
        text = stradd 
        // editor.contentDocument.activeElement.innerHTML;
        return text
    }
    catch(err)
    {
        console.log(err);
    }
}