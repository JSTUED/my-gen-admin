import { baseUrl } from "@/config/env";

export default {
    data(){
        return {
            refleshEditor: true,
            config: {
                height: 500,
                // toolbar: [
                //     ['Styles', 'Format'],
                // ],
                // fontDefaultLabel: "'黑体', 'Microsoft Yahei', Helvetica, Arial, sans-serif",
                // filebrowserBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html',
                // filebrowserImageBrowseUrl: '/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
                filebrowserUploadUrl: baseUrl + '/admin/file/ckeditorUpload?command=QuickUpload&type=Files',
                filebrowserImageUploadUrl: baseUrl + '/admin/file/ckeditorUpload?command=QuickUpload&type=Images', // 弹框 上传图片
                // extraPlugins: 'codesnippet',
            },
        }
    },

    created() {
        this.$nextTick(()=>{

        })
    },

    activated(){
        this.$nextTick(()=>{
            //this.init();
            this.refleshEditor = false;
            setTimeout(()=>{
                this.refleshEditor = true;
            }, 0)
        })
    },

    methods: {
        onBlur(evt) {
            console.log(evt);
        },
        onFocus(evt) {
            console.log(evt);
        },
        onContentDom(evt) {
            console.log(evt);
        },
        onDialogDefinition(evt) {
            console.log(evt);
        },
        onFileUploadRequest(evt) {
            console.log(evt);
        },
        onFileUploadResponse(evt) {
            console.log(evt);
        }
    }
}
