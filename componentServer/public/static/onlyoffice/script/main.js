/*版本：2.0（2023-8-20）
  zihan
*/
(function(){
    "use strict"
     debugger
     var onlyoffice = function(text){
       switch (text){
          case "open":
            window.open("http://127.0.0.1:7001/public/static/onlyoffice/index.html")
            break;
          case "config":
            window.open("http://127.0.0.1:7001/public/static/onlyoffice/index.html")
            break;
          default:
            return null
       }
     }
     var exportToWindowGlobal = function (onlyoffice) {
        window.onlyoffice = onlyoffice;
      };
      exportToWindowGlobal(onlyoffice);
}())