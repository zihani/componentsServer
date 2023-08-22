const createScript = (url,data)=>{
    return new Promise(function (resolve, reject) {
        var s = document.createElement('script')
        s.setAttribute('src', url)
        if (data) {
            s.setAttribute('data', data)
        }
        document.head.appendChild(s)
        s.onload = resolve
        s.onerror = reject
    })
}
const fileDownLoad = (data,type)=>{
    var linkElement = document.createElement('a');//创建点击下载的元素
    //判断浏览器是否支持blob对象
    try{
        //该实例化的方式第一个参数必须是数组的格式
         // application/jpeg
        var blob = new Blob([data], {type:type});
    }catch(e){
        //旧版本浏览器下的blob创建对象
        window.BlobBuilder = window.BlobBuilder ||
                             window.WebKitBlobBuilder ||
                             window.MozBlobBuilder ||
                             window.MSBlobBuilder;
        if(e.name == 'TypeError' && window.BlobBuilder){
            var blobbuilder = new BlobBuilder();
            BlobBuilder.append(data);
            var blob = blobbuilder.getBlob("image/jpeg");
        }else{
            alert("浏览器版本较低，暂不支持该文件类型下载");
        }
    }
    var url 
    url = URL.createObjectURL(blob);
    linkElement.setAttribute('href',url);
    linkElement.setAttribute('downLoad','download');
    linkElement.click();
}
export { createScript,fileDownLoad }