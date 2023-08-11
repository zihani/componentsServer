setTimeout(function() {
    // var iobj = document.createElement("iframe");
    // debugger;
    // iobj
    let title = decodeURIComponent(GetQueryString("title"))
    let strUrl = GetQueryString("url").split("/");
    //   console.log(GetQueryString("url"))
    let key = strUrl[strUrl.length - 3] + "/" + strUrl[strUrl.length - 2] + "/" + strUrl[strUrl.length - 1];
    // let url = GetQueryString("url")
    // let fileType = 'docx'
    // var deCode = decodeURIComponent(GetQueryString("userinfo")) // 解码
    // const userInfo = deCode.split("/")
    // const orgName = userInfo[0]
    // const realName = userInfo[1]
    // const userId = userInfo[2]
    // const baseid = userInfo[3]
    let _url = localStorage.getItem('_url')
    let token = Cookies.get("Admin-Token")
    if(!token){
        window.location.href = _url
    } 
    function Methods(docEditor) {
        docEditor.downloadAs('docx');
        docEditor.denyEditingRights('消息');
    }
    axios.get(_url + 'api/ability/office/editor', {
        params: {
            filePath: key,
        },
        headers: {
            Authorization: token
        }
    }).then(res => {
        if (res.data.code === 200) {
            let docEditor
            var config = res.data.data.model
            config.height = "100%"
            const hist = res.data.data.fileHistory[0]
            const historyData = res.data.data.fileHistory[1]
            debugger
            config.events = {
                onRequestHistory: function() {
                    debugger
                    docEditor.refreshHistory(JSON.parse(hist));
                },
                onRequestHistoryData: function(event) {
                    debugger
                    const ver = event.data
                    docEditor.setHistoryData(JSON.parse(historyData)[ver - 1])
                },
                onAppReady: function() {
                    // axios.get(_url+"api/ability/office/check",{  
                    //     headers: {
                    //         Authorization: token
                    //     }
                    // }).then(res =>{
                    //     res.data
                    // })
                },
                onReady: function(){
                },
                onRequestHistoryClose: function() {
                    document.location.reload();
                },
                onInfo: function(){
                },
                onPluginsReady:function(){
                }
            }
            config.document.title = title
            config.editorConfig.lang = "zh-CN"
            config.editorConfig.region = "zh-CN"
            config.editorConfig.location = "cn"
            if (typeof DocsAPI === 'object') {
                docEditor = new DocsAPI.DocEditor("placeholder", config);
                new Methods(docEditor);
                console.log(config)
            }
        }
    })
}, 2000)