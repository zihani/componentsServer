(function () {
    'use strict';
    var Cell = function (initial) {
        var value = initial;
        var get = function () {
            return value;
        };
        var set = function (v) {
            value = v;
        };
        return {
            get: get,
            set: set
        };
    };
    var TEXT = 3;
    var type = function (element) {
      return element.dom.nodeType;
    };
    var isType = function (t) {
      return function (element) {
        return type(element) === t;
      };
    };
    var isText$1 = isType(TEXT);
    var NodeValue = function (is, name) {
        var get = function (element) {
          if (!is(element)) {
            throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
          }
          return getOption(element).getOr('');
        };
        var getOption = function (element) {
          return is(element) ? Optional.from(element.dom.nodeValue) : Optional.none();
        };
        var set = function (element, value) {
          if (!is(element)) {
            throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
          }
          element.dom.nodeValue = value;
        };
        return {
          get: get,
          getOption: getOption,
          set: set
        };
    };
    var api = NodeValue(isText$1, 'text')
    var doFind = function (api) {
        var data = api.getData();
        var last = currentSearchState.get();
        if (!data.findtext.length) {
          reset(api);
          return;
        }
        if (last.text === data.findtext && last.matchCase === data.matchcase && last.wholeWord === data.wholewords) {
          next(editor, currentSearchState);
        } else {
          var count = find(editor, currentSearchState, data.findtext, data.matchcase, data.wholewords, data.inselection);
          if (count <= 0) {
            notFoundAlert(api);
          }
          disableAll(api, count === 0);
        }
        updateButtonStates(api);
    };
    
    var global$3 = tinymce.util.Tools.resolve('tinymce.PluginManager');
    var register$1 = function (editor, currentSearchState) {
        editor.addCommand('SearchReplace', function () {
          open(editor, currentSearchState);
        });
      };

    function Plugin () {
        global$3.add('search', function (editor) {
          var currentSearchState = Cell({
            index: -1,
            count: 0,
            text: '',
            matchCase: false,
            wholeWord: false,
            inSelection: false
          });
          return get(editor, currentSearchState);
        });
      }
      Plugin();
    tinymce.PluginManager.add('search', function(editor, url) {
       

        var pluginName='搜索';
        var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
        window.text="";
        var doAct = function () {
            text = editor.selection.getContent();
            openDialog()
        };
        // const iframe1= tinymce.documentBaseURL + "automatic"
        var baseURL=tinymce.baseURL;
        var iframe1 = baseURL+'/plugins/search/index.html'
            var doFind = function (api) {
                var data = api.getData();
                var last = currentSearchState.get();
                if (!data.findtext.length) {
                reset(api);
                return;
                }
                if (last.text === data.findtext && last.matchCase === data.matchcase && last.wholeWord === data.wholewords) {
                next(editor, currentSearchState);
                } else {
                var count = find(editor, currentSearchState, data.findtext, data.matchcase, data.wholewords, data.inselection);
                if (count <= 0) {
                    notFoundAlert(api);
                }
                disableAll(api, count === 0);
                }
                updateButtonStates(api);
            };
            var openDialog = function() {
            return editor.windowManager.openUrl({
                title: "搜索",
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
                    {
                        type: 'custom',
                        name:"find",
                        text: 'find',
                        primary: true
                        
                    }
                ],
                onAction: function (api, details) {
                    switch (details.name) {
                        case 'save':
                            api.close();
                            break;
                        case 'find':
                            doFind();
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
      
    
        editor.ui.registry.addButton('search', {
            text:pluginName,
            icon: 'search',
            tooltip: pluginName,
            onAction: function () {
                doAct();
            }
          });
        editor.ui.registry.addMenuItem('search', {
            text: pluginName,
            icon: 'search',
            tooltip: pluginName,
            onAction: function() {
                doAct();
            }
        });
    
        editor.addCommand('search', doAct );
    
        return {
          
        };
    });

})
