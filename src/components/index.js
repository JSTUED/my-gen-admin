
// 第三方依赖
// import Element from 'element-ui'; // element
import VCalendar from 'v-calendar'; // 日历
import vSelectPage from 'v-selectpage';
import VueCropper from 'vue-cropper';
import VXETable from 'vxe-table';

// 全局指令
import clipboard from "../directive/module/clipboard";
import vdraggable from "../directive/module/draggable"

// 需注册第三方插件
import VueCkeditor from 'vue-ckeditor2';
import draggable from 'vuedraggable';
import splitPane from 'vue-splitpane';

// 全局方法
import handleClipboard from "../util/clipboard";


import basicBlock from "./basic-block/basic-block";
import basicContainer from "./basic-container/main";
import formDesignUsual from "./form-design/form-design-usual";
import formDesignList from "./form-design/form-design-list";
import formDesignDynamics from "./form-design/form-design-dynamics";
import uRemoteSelect from "./form-design/usual/u-remote-select";
import RemoteSelect from "./form-design/components/remote-select";
import g6MesEditor from "./g6-editor/g6-mes-editor";
import gantt from "./gantt/index";
import iconChoose from "./icon/icon-choose";
import factoryCalendar from "./jst-components/factory-calendar";
import scrollTop from "./jst-components/scroll-top";
import sticky from "./sticky/index";
import searchBox from "./template/search-box";


const components = [
    basicBlock,
    basicContainer,
    formDesignUsual,
    formDesignList,
    formDesignDynamics,
    uRemoteSelect,
    RemoteSelect,
    g6MesEditor,
    gantt,
    iconChoose,
    factoryCalendar,
    scrollTop,
    sticky,
    searchBox
];

let components_use = components.map((item)=>{
    return function () {
        Vue.component(item.name, item);
    }
});

const install = function(Vue) {
    if (install.installed) return;
    components_use.map(component => {
        Vue.use(component);
    });

    // 注册第三方依赖
    Vue.use(VCalendar, {
        componentPrefix: 'v',
    });
    Vue.use(vSelectPage);
    Vue.use(VueCropper);
    Vue.use(VXETable);
    VXETable.setup({
        size: 'mini',
        stripe: true,
        border: true,
        resizable: true,
        pager: {
            background: true,
            layouts: ['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']
        },
        icon: {
            sortAsc: 'iconfont icon-caret-up',
            sortDesc: 'iconfont icon-caret-down'
        },
    })

    Vue.component("VueCkeditor", VueCkeditor);
    Vue.component("draggable", draggable);
    Vue.component('split-pane', splitPane);

    // 复制、剪切指令
    Vue.directive('clipboard', clipboard);
    // 拖拽
    Vue.directive('draggable', vdraggable);

    Vue.prototype.clipboard = handleClipboard;
    Vue.prototype.$ELEMENT = { size: 'small'}; //设置element大小
};



//  全局引用可自动安装
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const version = '1.0.0';

import '../styles/common.scss';

export {
    install,
    version,

    basicBlock,
    basicContainer,
    formDesignUsual,
    formDesignList,
    formDesignDynamics,
    uRemoteSelect,
    RemoteSelect,
    g6MesEditor,
    gantt,
    iconChoose,
    factoryCalendar,
    scrollTop,
    sticky,
    searchBox
}

export default {
    install,
    version
};
