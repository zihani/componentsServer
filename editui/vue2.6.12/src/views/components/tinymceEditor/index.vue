<template >
    <div>
        <div id="tinymce-editor"></div>
    </div>
</template>
<script>
import './import'
export default {
    props:{
        modelValue:{
            type:String,
            require:true
        },
        content:{
            type:String,
            default:""
        }
    },
    data() {
        return {
            show:false,
            content:''
        }
    },
    methods:{
    },
    mounted() {
        tinymce.init({
            readonly: false,//是否禁用
            selector:"#tinymce-editor",
            language:"zh_CN",
            plugins: 'code fileupload autolink autoresize link image lists charmap table fullscreen  preview indent2em example ',
            // menubar: 'file',
            // icons_url:'/icons/custom/icons.js',
            // icons:'custom',
            toolbar: 'code fileupload undo redo | autoresize formatselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent lists image | fullscreen | preview indent2em example',
            setup : (ed)=> {
                ed.on("init",(e)=>{
                    debugger
                    // 初始化放入值
                  ed.setContent(this.content)
                })
            },
            init_instance_callback : (editor)=>{
                editor.on("input",(e)=>{
                    this.content = e.target.innerHTML
                    debugger
                    this.$emit('text',e.target.innerText)
                    this.$emit('html',e.target.innerHTML)
                });
                editor.on("change",(e)=>{
                    console.log("change")
                    //  this.value = e.level.content
                });
            },
            paste_preprocess: function (plugin, args) {
                debugger
                args.content
                debugger
            }
        })
    },
}
</script>
<style scoped>
@import url('./skins/ui/oxide/skin.min.css');
</style>