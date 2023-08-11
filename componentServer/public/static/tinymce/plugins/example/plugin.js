tinymce.PluginManager.add('example', function(editor, url) {
    // 注册一个工具栏按钮名称
    editor.ui.registry.addButton('example', {
      text: '插入一段文字',
      icon: 'images',
      onAction: function () {
        // editor.insertContent('这是段文字');
        editor.focus(); 
        editor.selection.setContent('<strong>Hello world!</strong>'); 
      }  
      // menu: [
      //   {text: 'Menu item 1', onclick: function() {editor.insertContent('Menu item 1');}}, 
      //   {text: 'Menu item 2', onclick: function() {editor.insertContent('Menu item 2');}} 
      //  ] 
    });
});
  