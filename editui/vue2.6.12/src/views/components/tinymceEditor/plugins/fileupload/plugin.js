(function () {
    'use strict';
    tinymce.PluginManager.add('fileupload', function(editor, url) {
        var pluginName='文件上传';
        var openDialog = function(url) {
            // tinymce.documentBaseURL
        const iframe1=tinymce.baseURL +`/plugins/fileupload/page/${url}.html`;
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
                        // editor.insertConten();
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
    editor.ui.registry.addSplitButton('fileupload', {
            text:pluginName,
            icon: 'info',
            tooltip: pluginName,
            onAction: function () {
                // doAct();
                openDialog();
            },
            onItemAction: function (api, value) {
                switch(value){
                    case "fimage":
                        editor.insertContent(`<audio  controls="controls" src="http://127.0.0.1:3000/1.mp3" > </audio>`);
                        break;
                    case "video":
                        openDialog(value);
                        break;
                    case "audio":
                        openDialog(value);
                        break;
                    case "file":
                        openDialog(value);
                        break;
                }
            },
            fetch: function (callback) {
                    var items = [
                    {
                        type: 'choiceitem',
                        icon: 'edit-image',
                        text: '图片',
                        value: 'fimage'
                    },{
                        type: 'choiceitem',
                        icon: 'embed',
                        text: '视频',
                        value: 'video'
                    },{
                        type: 'choiceitem',
                        icon: 'notice',
                        text: '音频',
                        value: 'audio'
                    },{
                        type: 'choiceitem',
                        icon: 'notice',
                        text: '文件',
                        value: 'file'
                    }
                ];
                callback(items);
            },
            onSetup: stateSelectorAdapter(editor, [
            '*[style*="text-indent"]',
            '*[data-mce-style*="text-indent"]',
            ])
    });
        editor.addCommand('fileupload');
        return {
            // getMetadata: function () {
            //     return  {
            //         name: pluginName,
            //         url: "http://tinymce.ax-z.cn/more-plugins/indent2em.php",
            //     };
            // }
        };
    });
}())
