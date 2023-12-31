tinymce.PluginManager.add('images', function(editor, url) {
    var pluginName='插入百度地图';
    var baseURL=tinymce.baseURL;
    var iframe1 = baseURL+'/plugins/images/index.html';
    var bdmap_width = function (editor) {
        return editor.getParam('bdmap_width', 560);
    };
    var bdmap_height = function (editor) {
        return editor.getParam('bdmap_height', 362);
    };
    window.tinymceLng='';
    window.tinymceLat='';
    var openDialog = function() {
        return editor.windowManager.openUrl({
            title: pluginName,
            size: 'large',
            //width: 800,
            //height: 500,
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
                        html='<iframe src="'+baseURL+'/plugins/images/bd.html?center='+tinymceLng+'%2C'+tinymceLat+'&zoom=14&width='+(bdmap_width(editor)-2)+'&height='+(bdmap_height(editor)-2)+'" frameborder="0" style="width:'+bdmap_width(editor)+'px;height:'+bdmap_height(editor)+'px;">';
                        editor.insertContent(html);
                        api.close();
                        break;
                    default:
                        break;
                }
                
            }
        });
    };

    editor.ui.registry.getAll().icons.bdmap || editor.ui.registry.addIcon('images','<svg t="1645601441193" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1260" width="200" height="200"><path d="M70 657.54a27 27 0 0 1-24.32-38.64c1.15-2.38 28.62-59 73.67-116.17 27-34.23 54.78-61.6 82.61-81.35 36.92-26.2 74.22-39.2 110.94-38.75 146 1.91 278.91 159.32 284.49 166A27 27 0 1 1 556 583.16c-1.2-1.43-122.65-145-243.79-146.63-58.7-0.76-113.92 53.33-149.94 98.85-41.56 52.54-67.74 106.38-68 106.92A27 27 0 0 1 70 657.54z" fill="#FF9600" p-id="1261"></path><path d="M512 679.09a26.95 26.95 0 0 1-23.4-40.26c3.79-6.66 94.37-163.14 234.62-169.33 88.42-3.9 173.53 52.35 253 167.19a26.95 26.95 0 1 1-44.32 30.67c-68.17-98.49-137.5-147-206.13-144-110.47 4.72-189.57 140.78-190.36 142.15A27 27 0 0 1 512 679.09z" fill="#FF9600" p-id="1262"></path><path d="M954 684.5H80.75a27 27 0 0 1 0-53.91H954a27 27 0 0 1 0 53.91z" fill="#142E4F" p-id="1263"></path><path d="M786.92 441.92a91.64 91.64 0 1 1 91.64-91.64 91.74 91.74 0 0 1-91.64 91.64z m0-129.37a37.74 37.74 0 1 0 37.74 37.73 37.77 37.77 0 0 0-37.74-37.73z" fill="#FF9600" p-id="1264"></path><path d="M889.34 857H134.66A91.74 91.74 0 0 1 43 765.36V258.64A91.74 91.74 0 0 1 134.66 167h754.68A91.74 91.74 0 0 1 981 258.64v506.72A91.74 91.74 0 0 1 889.34 857zM134.66 220.91a37.77 37.77 0 0 0-37.74 37.73v506.72a37.77 37.77 0 0 0 37.74 37.73h754.68a37.77 37.77 0 0 0 37.74-37.73V258.64a37.77 37.77 0 0 0-37.74-37.73z" fill="#142E4F" p-id="1265"></path></svg>');
    
    editor.ui.registry.addButton('images', {
        icon: 'images',
        tooltip: pluginName,
        onAction: function() {
            openDialog();
        }
    });
    editor.ui.registry.addMenuItem('images', {
        text: pluginName,
        onAction: function() {
            openDialog();
        }
    });
    return {
        getMetadata: function() {
            return  {
                name: pluginName,
                url: "http://tinymce.ax-z.cn/more-plugins/bdmap.php",
            };
        }
    };
});
