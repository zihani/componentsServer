tinymce.PluginManager.add('layoutsettings', function(editor, url) {
	var pluginName='排版设置';
	window.axupimgs={}; //扔外部公共变量，也可以扔一个自定义的位置
	var baseURL=tinymce.baseURL;
	var iframe1 = baseURL+'/plugins/automatic/index.html';
	var openDialog = function() {
		return editor.windowManager.openUrl({
			title: pluginName,
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
						api.close();
				}
			}
		});
	};

	editor.ui.registry.getAll().icons.layoutsettings || 
	editor.ui.registry.addIcon('layoutsettings','<svg width="10" height="10" focusable="false"><path d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 010-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z" fill-rule="nonzero"></path></svg>');
	editor.ui.registry.addButton('layoutsettings', {
		icon: 'layoutsettings',
        tooltip: pluginName,
		onAction: function() {
			openDialog();
		}
	});
	editor.ui.registry.addMenuItem('layoutsettings', {
		icon: 'layoutsettings',
		text: '图片批量上传...',
		onAction: function() {
			openDialog();
		}
	});
});
