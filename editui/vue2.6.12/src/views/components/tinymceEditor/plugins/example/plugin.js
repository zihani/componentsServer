tinymce.PluginManager.add('example', function(editor, url) {
    // 注册一个工具栏按钮名称
    editor.ui.registry.addButton('example', {
      text: '插入一段文字',
      onAction: function () {
        editor.insertContent('这是段文字');
      }
    });
});
