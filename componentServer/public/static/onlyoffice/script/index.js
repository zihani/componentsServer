const GetQueryString = function(name) {
    this
    debugger
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
const createScript = (text)=>{
        switch(text)
            {
                case "onlyoffice":
                    return new Promise(function (resolve, reject) {
                        var s = document.createElement('script')
                        s.setAttribute('type', "text/javascript")
                         // uat 
                        // let _url = localStorage.getItem('_url')
                        // let uat = _url.indexOf("uat")
                        // let dev = _url.indexOf("test")
                        // let y = _url.indexOf("y-idea")
                        // // debugger;
                        // if(uat !== -1){
                        //     s.setAttribute('src', "https://ixxx/web-apps/apps/api/documents/api.js")
                        // }
                        // if(dev !== -1){         
                        //     s.setAttribute('src',"https://ixxx/web-apps/apps/api/documents/api.js")
                        // }
                        // if(y !== -1){
                        //     s.setAttribute('src', "http://ixxx/web-apps/apps/api/documents/api.js")
                        // }
                        // if(dev === -1 && uat === -1 && y === -1){
                        //     s.setAttribute('src',"https://ixxx/web-apps/apps/api/documents/api.js")
                        // }
                        s.setAttribute('src',"http://192.168.127.132/web-apps/apps/api/documents/api.js")
                        document.head.appendChild(s)
                        s.onload = resolve
                        s.onerror = reject
                    })
            }
}
GetQueryString("nb")
createScript("onlyoffice")