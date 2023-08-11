tinymce.PluginManager.add('mailTemplate', function(editor, url) {
    var pluginName='插入宏';
    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
    window.list =[]
    var doAct = function () {};
    var openDialog = function(api,value) {
        editor.execCommand('mceInsertContent', false, value);
    };
    var stateSelectorAdapter = function (editor, selector) {
      return function (buttonApi) {
        return editor.selection.selectorChangedWithUnbind(selector.join(','), buttonApi.setActive).unbind;
      };
    };
    editor.ui.registry.addSplitButton('mailTemplate', {
        text:pluginName,
        tooltip: pluginName,
        onAction: function () {
            doAct();
        },
        onItemAction: function (api, value) {
            openDialog(api,value);
        },
        fetch: function (callback) {
          // let objJson =  localStorage.getItem('strjson')
          // objJson 
          // localStorage.getItem("strstript")
            var items = [
              {
                type: 'choiceitem',
                text: '手抄报',
                value: '${手抄报}'
              },
              {
                type: 'choiceitem',
                text: '日期',
                value: '${日期}'
              },{
                type: 'choiceitem',
                text: '中经社',
                value: '${中经社}'
              },{
                type: 'choiceitem',
                text: '中国经济信息社',
                value: '${中国经济信息社}'
              },{
                type: 'choiceitem',
                text: '稿件标题',
                value: '${稿件标题}'
              },{
                type: 'choiceitem',
                text: '收件人',
                value: '${收件人}'
              },{
                type: 'choiceitem',
                text: '发件人',
                value: '${发件人}'
              }
            ];
            callback(items);
        },
        onSetup: stateSelectorAdapter(editor, [
          '*[style*="text-indent"]',
          '*[data-mce-style*="text-indent"]',
        ])
    });
    editor.ui.registry.addMenuItem('mailTemplate', {
        text: pluginName,
        onAction: function() {
            doAct();
        }
    });
    editor.addCommand('mailTemplate', doAct);
    return {};
});
