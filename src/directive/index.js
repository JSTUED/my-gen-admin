// 指令
import permission from "./module/permission";
import clipboard from "./module/clipboard"
import draggable from "./module/draggable"

const installDirective = function(Vue) {
    // 权限指令
    Vue.directive('permission', permission);
    // 复制、剪切指令
    Vue.directive('clipboard', clipboard);
    // 拖拽
    Vue.directive('draggable', draggable);
};

export default installDirective


