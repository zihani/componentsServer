/*版本：2.0（2023-8-20）
  zihan
*/
(function(){
    "use strict"
     debugger
     var onlyoffice = function(){
       return "fun"
     }
     var exportToWindowGlobal = function (onlyoffice) {
        window.onlyoffice = onlyoffice;
      };
      exportToWindowGlobal(onlyoffice);
}())