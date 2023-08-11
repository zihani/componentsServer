tinymce.PluginManager.add('axupimgs', function(editor, url) {
	var pluginName='多图片上传';
	window.axupimgs={}; //扔外部公共变量，也可以扔一个自定义的位置
	var baseURL=tinymce.baseURL;
	var iframe1 = baseURL+'/plugins/axupimgs/upfiles.html';
	axupimgs.images_upload_handler = editor.getParam('images_upload_handler', undefined, 'function');
    axupimgs.images_upload_base_path = editor.getParam('images_upload_base_path', '', 'string');
    axupimgs.axupimgs_filetype = editor.getParam('axupimgs_filetype', '.png,.gif,.jpg,.jpeg', 'string');
	axupimgs.res=[];
	function getCookie(cname) {
		let name = cname + "=";
		let ca = document.cookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i].trim();
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
	}
//    const compressImg = function(files,callback){
// 		const COMPRESSRATIO = .5; // 压缩比例 0 - 1
// 		const afterCompression = []
// 		function base64ToFile(base64, filename, contentType){
// 			var arr = base64.split(',')  //去掉base64格式图片的头部
// 			var bstr = atob(arr[1])   //atob()方法将数据解码
// 			var leng = bstr.length
// 			var u8arr = new Uint8Array(leng)
// 			while(leng--){
// 				u8arr[leng] =  bstr.charCodeAt(leng) //返回指定位置的字符的 Unicode 编码
// 			}
// 			return new File([u8arr], filename, {type:contentType}) 
// 		}
//    	   //将图片文件转为base64
//         debugger
// 		files.map(file =>{
// 			return 
// 		})
//         for (const file of files) {
			
// 		}
// 		debugger
// 		callback(afterCompression)
//    }
	var openDialog = function() {
	    localStorage.removeItem('_imageList')		
		return editor.windowManager.openUrl({
			title: pluginName,
			size: 'large',
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
						tinymce._vuethis.$modal.loading("上传中...");
						if (axupimgs.res.length > 0) {
							// let files = axupimgs.res.map(item=>{
							// 	return item.file
							// })
							let body = []
							axupimgs.res = axupimgs.res.reverse()
							let files = axupimgs.res.map(item=>{
								return { name:item.filename ,basefile:item.basefile}
							})
							let formData = new FormData()
							for (const item of files) {
								// let dfl = new File([item],"3333",{type:item.type})
								// 	let reader = new FileReader();
								// 	reader.readAsDataURL(item);
								// 	debugger
								// 	reader.result
								// 	debugger
								// 	reader.onload=function(){
								// 		debugger
								// 		reader.result
								// 		// let obj = binaryFun(reader.result);
								// 		// let blob = new Blob([obj.u8arr],{type:obj.mime});
								// 		// let url = URL.createObjectURL(blob)
								// 		// url
										
								// 		debugger
								// 	}
								// 	// const binaryFun = binary => {
								// 	// 	let arr = binary.split(','), mime = arr[0].match(/:(.*?);/)[1],
								// 	// 		  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
								// 	// 	while(n--){
								// 	// 	   u8arr[n] = bstr.charCodeAt(n);
								// 	// 	}
								// 	// 	return {u8arr,mime}
								// 	// }
								// formData.append('files',item)
								formData.append("files",item.basefile)
								// body.push({name:"6",file:formData})
							}
							// return
						    let token = getCookie("Admin-Token")
               				let url = localStorage.getItem('_url')
							//    /file/upload/many/img/rich/text
							//    api/ability/file/upload/many/img
							axios.post(url+"api/ability/file/upload/many/img",formData,{
									headers:{
										// 'content-type': 'multipart/form-data',
										'content-type':"application/json; multipart/form-data;",
										'Authorization': token
									},
									onUploadProgress:function(progressEvent){
									// console.log(parseInt((progressEvent.loaded / progressEvent.total) * 100));
									}
						 	}).then(res =>{
								// /file/upload/many/img/rich/text
								// document.querySelectorAll('#file_list li.up-no').forEach((el, i) => {
								// e.target.innerText = '全部上传';
								    let inserts =[]
									if(res.data.code == 200){
										tinymce._vuethis.$modal.closeLoading();
										inserts = res.data.data.map((item) =>{
											return {
												fileHashValue:item.fileHashValue,
												name : item.fileName,
												fileSize:item.fileSize,
												originalName:item.fileName,
												path:item.objectUrl,
												suffix:item.fileSuffix,
												type:1,
												uploadType:2
											}
										})
										for (const item of inserts) {
											axios.post(url+"api/platform/material/materialadd",item,{
												headers:{
													'Authorization': token
												},
											}).then(res1 =>{
												res1 
											})
										}
									}
									let imageList = JSON.parse(localStorage.getItem('imageList'))
									let _imglist = res.data.data.map(item =>{
											item.type = "image"
											// item.objectUrl = "/"+item.objectUrl
											return item
									})
									localStorage.setItem("_imageList",JSON.stringify(_imglist));
									if(imageList && imageList.length > 0){
										let imglist = res.data.data.map(item =>{
											item.type = "image"
											return item
										})
										let concatList = imageList.concat(imglist)
										localStorage.setItem("imageList",JSON.stringify(concatList));
									}else{
										let imglist = res.data.data.map(item =>{
											item.type = "image"
											// item.objectUrl = "/"+item.objectUrl
											return item
										})
										localStorage.setItem("imageList",JSON.stringify(imglist));
									}
									let imgList = JSON.parse(localStorage.getItem('_imageList'))
									if(imgList && imgList.length > 0){
										for (const item of imgList) {
											item.type = 'image'
											editor.file.imageList.push(item)
											const range = editor.selection.getRng();
											const pNode = editor.getDoc().createElement('p');
											pNode.style.textAlign = "center"
											const imgNode = editor.getDoc().createElement('img');
											const realStr =document.location.origin+"/"+ item.objectUrl; //document.location.origin +"/"+ 
											// imgNode.style.width = item.width + "px";
											imgNode.style.width = "100%";
											imgNode.style.height = item.height + "px";
											imgNode.title = files.filter(row => row.basefile.name === item.fileName)[0].name || item.fileName; 
											imgNode.alt = files.filter(row => row.basefile.name === item.fileName)[0].name || item.fileName;
											imgNode.style["marginLeft"] =  "auto";
											imgNode.style["marginRight"] = "auto";
											imgNode.style["display"] = "block";
											imgNode.src = realStr;
											pNode.appendChild(imgNode)
											// divNode.setAttribute("imagerela","2233");
											range.insertNode(pNode);
										}
									}
								api.close();
						   })
						}
						


						// -------------------------
					    // let imageList = JSON.parse(localStorage.getItem('_imageList'))
						// if(imageList && imageList.length > 0){
						// 	for (const item of imageList) {
						// 		item.type = 'image'
						// 		editor.file.imageList.push(item)
						// 		var range = editor.selection.getRng();
						// 		var divNode = editor.getDoc().createElement('img');
						// 		const realStr =document.location.origin+"/"+ item.objectUrl; //document.location.origin +"/"+ 
						// 		divNode.style.width = item.width + "px";
						// 		divNode.style.height = item.height + "px";
						// 		divNode.src = realStr;
						// 		range.insertNode(divNode);
						// 	}
						// }
						// api.close();
						break;
					default:
						break;
				}
			}
		});
	};

	editor.ui.registry.getAll().icons.axupimgs || editor.ui.registry.addIcon('axupimgs','<svg viewBox="0 0 1280 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M1126.2,779.8V87.6c0-24-22.6-86.9-83.5-86.9H83.5C14.7,0.7,0,63.7,0,87.7v692c0,36.2,29.2,89.7,83.5,89.7l959.3-1.3c51.7,0,83.5-42.5,83.5-88.3zm-1044,4V86.3h961.6V783.7H82.2v0.1z" fill="#53565A"/><path d="M603,461.6L521.1,366.3,313,629.8,227.2,546.8,102.4,716.8H972.8v-170L768.2,235.2,603.1,461.6zM284.6,358.4a105.4,105.4,0,0,0,73.5-30c19.5-19.1,30.3-45,30.2-71.8,0-56.8-45.9-103-102.4-103-56.6,0-102.4,46.1-102.4,103C183.4,313.5,228,358.4,284.6,358.4z" fill="#9598A0"/><path d="M1197.7,153.6l-0.3,669.3s13.5,113.9-67.4,113.9H153.6c0,24.1,23.9,87.2,83.5,87.2h959.3c58.3,0,83.6-49.5,83.6-89.9V240.8c-0.1-41.8-44.9-87.2-82.3-87.2z" fill="#53565A"/></svg>');
	
	editor.ui.registry.addButton('axupimgs', {
		icon: 'axupimgs',
        tooltip: pluginName,
		onAction: function() {
			openDialog();
		}
	});
	editor.ui.registry.addMenuItem('axupimgs', {
		icon: 'axupimgs',
		text: '图片批量上传...',
		onAction: function() {
			openDialog();
		}
	});
});
