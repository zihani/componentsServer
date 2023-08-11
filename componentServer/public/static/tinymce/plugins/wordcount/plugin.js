/**
  (2023-1-11)
 */
(function () {
    'use strict';

    var global$2 = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var identity = function (x) {
      return x;
    };

    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };

    var zeroWidth = '\uFEFF';
    var removeZwsp$1 = function (s) {
      return s.replace(/\uFEFF/g, '');
    };
    var findWords = function (chars, sChars) { 
      var words = [];
      for (const item of chars) {
        words.push([item])
      }
      return words;
    };
    var getDefaultOptions = function () {
      return {
        includeWhitespace: false,
        includePunctuation: false
      };
    };
    var getWords$1 = function (chars, extract, options) {
      var filteredChars = [];
      var extractedChars = [];
      for (var i = 0; i < chars.length; i++) {
        var ch = extract(chars[i]);
        if (ch !== zeroWidth) {
          filteredChars.push(chars[i]);
          extractedChars.push(ch);
        }
      }
      return findWords(filteredChars, extractedChars);
    };

    var getWords = getWords$1;

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.TreeWalker');

    var getText = function (node, schema) {
      var blockElements = schema.getBlockElements();
      var shortEndedElements = schema.getShortEndedElements();
      var isNewline = function (node) {
        return blockElements[node.nodeName] || shortEndedElements[node.nodeName];
      };
      var textBlocks = [];
      var txt = '';
      var treeWalker = new global$1(node, node);
      while (node = treeWalker.next()) {
        if (node.nodeType === 3) {
          txt += removeZwsp$1(node.data);
        } else if (isNewline(node) && txt.length) {
          textBlocks.push(txt);
          txt = '';
        }
      }
      if (txt.length) {
        textBlocks.push(txt);
      }
      return textBlocks;
    };

    var removeZwsp = function (text) {
      return text.replace(/\u200B/g, '');
    };
    var strLen = function (str) {
      return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '_').length;
    };
    var countWords = function (node, schema) {

      var text = removeZwsp(getText(node, schema).join('\n'));
      return getWords(text.split(''), identity).length;
    };
    var countCharacters = function (node, schema) {
      var text = getText(node, schema).join('');
      return strLen(text);
    };
    var countCharactersWithoutSpaces = function (node, schema) {
      var text = getText(node, schema).join('').replace(/\s/g, '');
      return strLen(text);
    };

    var createBodyCounter = function (editor, count) {
      return function () {
        return count(editor.getBody(), editor.schema);
      };
    };
    var createSelectionCounter = function (editor, count) {
      return function () {
        return count(editor.selection.getRng().cloneContents(), editor.schema);
      };
    };
    var createBodyWordCounter = function (editor) {
      return createBodyCounter(editor, countWords);
    };
    var get = function (editor) {
      return {
        body: {
          getWordCount: createBodyWordCounter(editor),
          getCharacterCount: createBodyCounter(editor, countCharacters),
          getCharacterCountWithoutSpaces: createBodyCounter(editor, countCharactersWithoutSpaces)
        },
        selection: {
          getWordCount: createSelectionCounter(editor, countWords),
          getCharacterCount: createSelectionCounter(editor, countCharacters),
          getCharacterCountWithoutSpaces: createSelectionCounter(editor, countCharactersWithoutSpaces)
        },
        getCount: createBodyWordCounter(editor)
      };
    };

    var open = function (editor, api) {
      editor.windowManager.open({
        title: 'Word Count',
        body: {
          type: 'panel',
          items: [{
              type: 'table',
              header: [
                'Count',
                'Document',
                'Selection'
              ],
              cells: [
                [
                  'Words',
                  String(api.body.getWordCount()),
                  String(api.selection.getWordCount())
                ],
                [
                  'Characters (no spaces)',
                  String(api.body.getCharacterCountWithoutSpaces()),
                  String(api.selection.getCharacterCountWithoutSpaces())
                ],
                [
                  'Characters',
                  String(api.body.getCharacterCount()),
                  String(api.selection.getCharacterCount())
                ]
              ]
            }]
        },
        buttons: [{
            type: 'cancel',
            name: 'close',
            text: 'Close',
            primary: true
        }]
      });
    };

    var register$1 = function (editor, api) {
      editor.addCommand('mceWordCount', function () {
        return open(editor, api);
      });
    };

    var global = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var fireWordCountUpdate = function (editor, api) {
      editor.fire('wordCountUpdate', {
        wordCount: {
          words: api.body.getWordCount(),
          characters: api.body.getCharacterCount(),
          charactersWithoutSpaces: api.body.getCharacterCountWithoutSpaces()
        }
      });
    };

    var updateCount = function (editor, api) {
      fireWordCountUpdate(editor, api);
    };
    var setup = function (editor, api, delay) {
      var debouncedUpdate = global.debounce(function () {
        return updateCount(editor, api);
      }, delay);
      editor.on('init', function () {
        updateCount(editor, api);
        global.setEditorTimeout(editor, function () {
          editor.on('SetContent BeforeAddUndo Undo Redo ViewUpdate keyup', debouncedUpdate);
        }, 0);
      });
    };

    var register = function (editor) {
      var onAction = function () {
        return editor.execCommand('mceWordCount');
      };
      editor.ui.registry.addButton('wordcount', {
        tooltip: 'Word count',
        icon: 'character-count',
        onAction: onAction
      });
      editor.ui.registry.addMenuItem('wordcount', {
        text: 'Word count',
        icon: 'character-count',
        onAction: onAction
      });
    };

    function Plugin (delay) {
      if (delay === void 0) {
        delay = 300;
      }
      global$2.add('wordcount', function (editor) {
        var api = get(editor);
        register$1(editor, api);
        register(editor);
        setup(editor, api, delay);
        return api;
      });
    }
    Plugin();
}());
