// import axios from "../../../utils/axios/dist/axios.min.js"; 
(function () {
    'use strict';
    tinymce.PluginManager.add('material', function(editor, url) {
        var pluginName = "素材";
        window.urlImage="";
        window.pluginName = ""
        var openDialog = function(name) {
        const iframe1= tinymce.baseURL + "/plugins/material/page/index.html"
        return editor.windowManager.openUrl({
                title:"素材",
                size: 'large',
                width: 1150,
                height: 600,
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
                            api.close();
                            // editor.insertContent(`<img style="width: 166px; height: 40px;" src=${window.urlImage} alt="">`);
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
        editor.ui.registry.addButton('material', {
            text:pluginName,
            tooltip: pluginName,
            onAction: function () {
                openDialog();
            }
            // onItemAction: function (api, value) {
            //     // switch(value){
            //     //     case "image":
            //     //         openDialog(value);
            //     //         break;
            //     //     case "video":
            //     //         openDialog(value);
            //     //         break;
            //     //     // case "audio":
            //     //     //     openDialog(value);
            //     //     //     break;
            //     //     // case "file":
            //     //     //     openDialog(value);
            //     //     //     break;
            //     // }
            // },
            // fetch: function (callback) {
            //     //     var items = [
            //     //     {
            //     //         type: 'choiceitem',
            //     //         icon: 'edit-image',
            //     //         text: '图片素材',
            //     //         value: 'image'
            //     //     },{
            //     //         type: 'choiceitem',
            //     //         icon: 'embed',
            //     //         text: '视频素材',
            //     //         value: 'video'
            //     //     }
            //     //     // {
            //     //     //     type: 'choiceitem',
            //     //     //     icon: 'notice',
            //     //     //     text: '音频',
            //     //     //     value: 'audio'
            //     //     // },{
            //     //     //     type: 'choiceitem',
            //     //     //     icon: 'notice',
            //     //     //     text: '文',
            //     //     //     value: 'file'
            //     //     // }
            //     // ];
            //     // callback(items);
            // },
            // onSetup: stateSelectorAdapter(editor, [
            // '*[style*="text-indent"]',
            // '*[data-mce-style*="text-indent"]',
            // ])
        });
        editor.addCommand('material');
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