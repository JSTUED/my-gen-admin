import { validatenull } from './validate';
import config from "@/config/website";
//表单序列化
export const serialize = data => {
    let list = [];
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`)
    })
    return list.join('&');
};
export const getObjType = obj => {
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
};

// 拓展对象
export const extendObjDeep = function() {
    /*
    　　*target被扩展的对象
    　　*length参数的数量
    　　*deep是否深度操作
    　　*/
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // target为第一个参数，如果第一个参数是Boolean类型的值，则把target赋值给deep
    // deep表示是否进行深层面的复制，当为true时，进行深度复制，否则只进行第一层扩展
    // 然后把第二个参数赋值给target
    if ( typeof target === "boolean" ) {
        deep = target;
        target = arguments[1] || {};

        // 将i赋值为2，跳过前两个参数
        i = 2;
    }

    // target既不是对象也不是函数则把target设置为空对象。
    if (getObjType(target) !== "object") {
        target = {};
    }

    // 如果只有一个参数，则把jQuery对象赋值给target，即扩展到jQuery对象上
    if ( length === i ) {
        target = this;

        // i减1，指向被扩展对象
        --i;
    }

    // 开始遍历需要被扩展到target上的参数

    for ( ; i < length; i++ ) {
        // 处理第i个被扩展的对象，即除去deep和target之外的对象
        if ( (options = arguments[ i ]) != null ) {
            // 遍历第i个对象的所有可遍历的属性
            for ( name in options ) {
                // 根据被扩展对象的键获得目标对象相应值，并赋值给src
                src = target[ name ];
                // 得到被扩展对象的值
                copy = options[ name ];

                // 这里为什么是比较target和copy？不应该是比较src和copy吗？
                if ( target === copy ) {
                    continue;
                }

                // 当用户想要深度操作时，递归合并
                // copy是纯对象或者是数组
                // if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                if ( deep && copy && ( getObjType(copy)=="object" || (copyIsArray = getObjType(copy)=="array") ) ) {
                    // 如果是数组
                    if ( copyIsArray ) {
                        // 将copyIsArray重新设置为false，为下次遍历做准备。
                        copyIsArray = false;
                        // 判断被扩展的对象中src是不是数组
                        // clone = src && jQuery.isArray(src) ? src : [];
                        clone = src && (getObjType(src)=="array") ? src : [];
                    } else {
                        // 判断被扩展的对象中src是不是纯对象
                        // clone = src && jQuery.isPlainObject(src) ? src : {};
                        clone = src && (getObjType(src)=="object") ? src : {};
                    }

                    // 递归调用extend方法，继续进行深度遍历
                    // target[ name ] = jQuery.extend( deep, clone, copy );
                    target[ name ] = extendObjDeep( deep, clone, copy );

                    // 如果不需要深度复制，则直接把copy（第i个被扩展对象中被遍历的那个键的值）
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // 原对象被改变，因此如果不想改变原对象，target可传入{}
    return target;
};

/**
 * 对象深拷贝
 */
export const deepClone = data => {
    var type = getObjType(data);
    var obj;
    if (type === 'array') {
        obj = [];
    } else if (type === 'object') {
        obj = {};
    } else {
        //不再具有下一层次
        return data;
    }
    if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === 'object') {
        for (var key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
};
/**
 * 设置灰度模式
 */
export const toggleGrayMode = (status) => {
    if (status) {
        document.body.className = document.body.className + ' grayMode';
    } else {
        document.body.className = document.body.className.replace(' grayMode', '');
    }
};
/**
 * 设置主题
 */
export const setTheme = (name) => {
    document.body.className = name;
}

/**
 * 加密处理
 */
export const encryption = (params) => {
    let {
        data,
        type,
        param,
        key
    } = params;
    let result = JSON.parse(JSON.stringify(data));
    if (type == 'Base64') {
        param.forEach(ele => {
            result[ele] = btoa(result[ele]);
        })
    } else if (type == 'Aes') {
        param.forEach(ele => {
            result[ele] = window.CryptoJS.AES.encrypt(result[ele], key).toString();
        })

    }
    return result;
};


/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
    if (fullscreenEnable()) {
        exitFullScreen();
    } else {
        reqFullScreen();
    }
};
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
    function listen() {
        callback()
    }
    document.addEventListener("fullscreenchange", function () {
        listen();
    });
    document.addEventListener("mozfullscreenchange", function () {
        listen();
    });
    document.addEventListener("webkitfullscreenchange", function () {
        listen();
    });
    document.addEventListener("msfullscreenchange", function () {
        listen();
    });
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
    var isFullscreen = document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
    return isFullscreen;
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    }
};
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.exitFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.mozCancelFullScreen();
    }
};
/**
 * 递归寻找子类的父类
 */

export const findParent = (menu, id) => {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].children.length != 0) {
            for (let j = 0; j < menu[i].children.length; j++) {
                if (menu[i].children[j].id == id) {
                    return menu[i];
                } else {
                    if (menu[i].children[j].children.length != 0) {
                        return findParent(menu[i].children[j].children, id);
                    }
                }
            }
        }
    }
};
/**
 * 判断2个对象属性和值是否相等
 */

/**
 * 动态插入css
 */

export const loadStyle = url => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
};
/**
 * 判断路由是否相等
 */
export const diff = (obj1, obj2) => {
    delete obj1.close;
    var o1 = obj1 instanceof Object;
    var o2 = obj2 instanceof Object;
    if (!o1 || !o2) { /*  判断不是对象  */
        return obj1 === obj2;
    }

    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
        //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    }

    for (var attr in obj1) {
        var t1 = obj1[attr] instanceof Object;
        var t2 = obj2[attr] instanceof Object;
        if (t1 && t2) {
            return diff(obj1[attr], obj2[attr]);
        } else if (obj1[attr] !== obj2[attr]) {
            return false;
        }
    }
    return true;
}
/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
    let result = '';
    if (validatenull(dic)) return value;
    if (typeof (value) == 'string' || typeof (value) == 'number' || typeof (value) == 'boolean') {
        let index = 0;
        index = findArray(dic, value);
        if (index != -1) {
            result = dic[index].label;
        } else {
            result = value;
        }
    } else if (value instanceof Array) {
        result = [];
        let index = 0;
        value.forEach(ele => {
            index = findArray(dic, ele);
            if (index != -1) {
                result.push(dic[index].label);
            } else {
                result.push(value);
            }
        });
        result = result.toString();
    }
    return result;
};
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
    for (let i = 0; i < dic.length; i++) {
        if (dic[i].value == value) {
            return i;
        }
    }
    return -1;
};
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
    let random = '';
    random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len ? len : 4);
    if (date) random = random + Date.now();
    return random;
};
/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
    // Fixes dual-screen position                            Most browsers       Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

    const left = ((width / 2) - (w / 2)) + dualScreenLeft
    const top = ((height / 2) - (h / 2)) + dualScreenTop
    const newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus()
    }
}



/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
    const ua = window.navigator.userAgent
    const isExplorer = (exp) => {
        return ua.indexOf(exp) > -1
    }
    if (isExplorer('MSIE')) return 'IE'
    else if (isExplorer('Firefox')) return 'Firefox'
    else if (isExplorer('Chrome')) return 'Chrome'
    else if (isExplorer('Opera')) return 'Opera'
    else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler)
            }
        }
    }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler)
            }
        }
    }
})()

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
    if (key) return key in obj
    else {
        let keysArr = Object.keys(obj)
        return keysArr.length
    }
}


/*
* 菜单/路由数据映射
* */
export const mapRoutesSource = (data)=>{
    // console.log(data);
    const propsConfig = config.menu.props;

    const propsDefault = {
        id: propsConfig.id || 'id',
        parentId: propsConfig.parentId || 'parentId',
        label: propsConfig.label || 'label',
        name: propsConfig.name || 'name',
        path: propsConfig.path || 'path',
        icon: propsConfig.icon || 'icon',
        children: propsConfig.children || 'children',
        meta: propsConfig.meta || 'meta',
        component: propsConfig.component || 'component',
        redirect: propsConfig.redirect || 'redirect',
    };
    // console.log(propsDefault);

    function eachMenu(menu){
        let data = _.cloneDeep(menu);
        return data.map((item, index)=>{
            var temp = {
                id: item[propsDefault.id],
                parentId: item[propsDefault.parentId],
                label: item[propsDefault.label],
                name: item[propsDefault.name],
                path: item[propsDefault.path],
                icon: item[propsDefault.icon] || config.menu.iconDefault,
                children: item[propsDefault.children],
                meta: item[propsDefault.meta],
                component: item[propsDefault.component],
                redirect: item[propsDefault.redirect]
            };
        // || (item[propsDefault.children] && item[propsDefault.children].length> 0 ? item[propsDefault.children][0].path : "")
            if(temp.children && temp.children.length>0){
                //temp.path = ""; // 有子路由时 path 情况 防止出现意外
                temp.children = eachMenu(temp.children);
            }

            return temp;
        });
    }

    //console.log(eachMenu(data));
    return eachMenu(data);

}

/**
 *  @desc  获取url参数
 *  @param  {String} url为穿过来的链接
 *  @param  {String} id为参数名
 */
export const getParam  = function (url, name) {
    url = url+ "";
    let regstr = "/(\\?|\\&)" + name + "=([^\\&]+)/";
    let reg = eval(regstr);
    //eval可以将 regstr字符串转换为 正则表达式
    let result = url.match(reg);
    if (result && result[2]) {
        return result[2];
    }
    return ""
}


