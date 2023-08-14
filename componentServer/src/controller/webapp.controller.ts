import { Body, Controller, Get ,Post } from '@midwayjs/core';
// import { Application, Context } from '@midwayjs/koa';
@Controller('app')
export class appController {
  @Get('/tinymce')
  async tinymce(): Promise<string> {
    return 'tinymce';
  };

  @Post('/onlyoffice')
  async onlyoffice(): Promise<string> {
    return 'onlyoffice!';
  };

  @Post('/office_config')
  async getUser(@Body() Body) {
     if(!Body.userid){
        return {
          code:400,
          msg:"清填写userid"
        }
     }
     const config  = {
      dataCompareFile: null,
      dataInsertImage: null,
      dataMailMergeRecipients: null,
      docserviceApiUrl: null,
      fileHistory:[
       "{\"history\":[{\"created\":\"2023-07-11 14:37:57\",\"version\":1,\"user\":{\"name\":\"yangzihan\",\"id\":\"1576\"},\"key\":\"478860460\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkIjoiMjAyMy0wNy0xMSAxNDozNzo1NyIsInZlcnNpb24iOjEsInVzZXIiOnsibmFtZSI6Inlhbmd6aWhhbiIsImlkIjoiMTU3NiJ9LCJrZXkiOiI0Nzg4NjA0NjAifQ.4Qbyuo2ucq3sZFHTBOXj_eFmUlrDsah5fc_EBzcJpQY\"}],\"currentVersion\":1}",
       "{\"0\":{\"version\":1,\"key\":\"478860460\",\"fileType\":\"docx\",\"url\":\"http://xxx.com/api/ability/office/download?filePath=ice%2Freport%2F103574350850154496.docx\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJrZXkiOiI0Nzg4NjA0NjAiLCJmaWxlVHlwZSI6ImRvY3giLCJ1cmwiOiJodHRwczovL2lkZWEtdGVzdC54aHN6anMuY29tL2FwaS9hYmlsaXR5L29mZmljZS9kb3dubG9hZD9maWxlUGF0aD1pY2UlMkZyZXBvcnQlMkYxMDM1NzQzNTA4NTAxNTQ0OTYuZG9jeCJ9.bBTgO0HDh_g1HYB1cQap2Fn4vswsdbPgp8fYHwsEMSU\"}}"
      ],
      height: "800px",
      model:{
       document: {
           directUrl: null,
           fileType: "docx",
           info: {
               owner: "Me",
               favorite: null,
               uploaded: "Mon Aug 14 2023"
           },
           key: "478860460",
           permissions: {
               chat: true,
               comment: true,
               commentGroups: {
                   view: "",
                   edit: [
                     "测试机构"
                   ],
                   remove: [
                     "测试机构"
                   ]
               },
               copy: true,
               deleteCommentAuthorOnly: false,
               download: true,
               edit: true,
               editCommentAuthorOnly: false,
               fillForms: true,
               modifyContentControl: true,
               modifyFilter: true,
               print: true,
               protect: true,
               review: true,
               reviewGroups: null,
               userInfoGroups: null,
           },
           urlUser: "http://xxx.com/api/ability/office/download?filePath=ice%2Freport%2F103574350850154496.docx",
           title: "103574350850154496.docx",
           url: "http://xxx.com/api/ability/office/download?filePath=ice%2Freport%2F103574350850154496.docx",
       },
       documentType: "word",
       editorConfig: {
           actionLink: null,
           callbackUrl: "http://xxx.com/api/ability/office/track?fileName=ice%2Freport%2F103574350850154496.docx",
           canCoAuthoring: true,
           createUrl: "http://xxx.com/api/ability/office/create?fileType=docx&templateName=ice/report/new.docx",
           customization: {
               comments: true,
               compatibleFeatures: false,
               feedback: {
                   visible: false,
                   url: "http://xxx.com/production/manuscript/personalManuscript"
               },
               forcesave: false,
               goback: {
                   url: "http://xxx.com/production/manuscript/personalManuscript",
                   blank: true,
                   text: "返回个人稿件"
               },
               help: false,
               logo: {
                   image: "http://xxx.com/office/check",
                   url: "",
                   imageDark: ""
               },
               submitForm: false,
           },
           embedded: {
               embedUrl: null,
               saveUrl: null,
               shareUrl: null,
               toolbarDocked: "top"
           },
           fileChoiceUrl: "",
           lang: "zh",
           location: "cn",
           mode: "edit",
           region: "zh-CN",
           templates: null,
           user: {
               id: "1576",
               name: "杨子汉",
               group: "测试机构"
           },
       },
       token: "",
       type: "desktop"
      },
      usersForMentions:null,
      width: null
    }
    //  const user = {id:1,name:"user"}
    //  await this.userService.getUser({ uid }); data: user ,
    return { success: true, message: '已获取到配置!', data:config, code:200};
  };
}
