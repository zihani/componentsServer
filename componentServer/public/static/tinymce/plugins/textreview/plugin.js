tinymce.PluginManager.add('textreview', function(editor, url) {
    var pluginName='文档纠错/安全审核';
    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
    window.text="";
    var doAct = function () {
        // text = editor.selection.getContent();
        openDialog()
    };
    var find = function(){
        var escapeSearchText = function (text, wholeWord) {
            var escapedText = text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&').replace(/\s/g, '[^\\S\\r\\n\\uFEFF]');
            var wordRegex = '(' + escapedText + ')';
            return wholeWord ? '(?:^|\\s|' + punctuation() + ')' + wordRegex + ('(?=$|\\s|' + punctuation() + ')') : wordRegex;
          };
    }
    // const iframe1= tinymce.documentBaseURL + "automatic"
    var baseURL=tinymce.baseURL;
	var iframe1 = baseURL+'/plugins/textreview/index.html'
        var openDialog = function() {
        return editor.windowManager.openUrl({
            title: "内容审核",
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

                        // api.close();
                        break;
                    default:
                        break;
                }
            }
        });
     };

    // editor.ui.registry.getAll().icons.indent2em || editor.ui.registry.addIcon('','<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M170.666667 563.2v-102.4H887.466667v102.4zM170.666667 836.266667v-102.4H887.466667v102.4zM512 290.133333v-102.4H887.466667v102.4zM238.933333 341.333333V136.533333l204.8 102.4z" fill="#2c2c2c" p-id="5210"></path></svg>');

    var stateSelectorAdapter = function (editor, selector) {
      return function (buttonApi) {
        return editor.selection.selectorChangedWithUnbind(selector.join(','), buttonApi.setActive).unbind;
      };
    };
    editor.ui.registry.addButton('textreview', {
        text:pluginName,
        // icon: 'textreview',
        tooltip: pluginName,
        onAction: function () {
            doAct();
        }
    });
    editor.ui.registry.addMenuItem('textreview', {
        text: pluginName,
        // icon: 'textreview',
        tooltip: pluginName,
        onAction: function() {
            doAct();
        }
    });

    editor.addCommand('textreview', doAct );

    return {
      
    };
});
