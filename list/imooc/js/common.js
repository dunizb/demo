/**
 * Created by jiaoshou on 2016/6/8.
 */
function my$(id) {
    return document.getElementById(id);
}

//获dom对象的innerText的取值
function getInnerText(element) {
    //判断当前浏览器是否支持innerText
    if(typeof element.innerText  === "string") {
        return element.innerText;
    }else{
        return element.textContent;
    }
}

//设置dom对象的innerText
function setInnerText(element, content) {
    if(typeof element.innerText === "string") {
        element.innerText = content;
    }else{
        element.textContent = content;
    }
}

//兼容浏览器   获取下一个兄弟元素
function getNextElementSibling(element) {
    //
    if(element.nextElementSibling){
        return element.nextElementSibling;
    }else{
        //获取下一个兄弟节点
        var node = element.nextSibling;
        //如果没有下一个节点，此时null
        while(node && node.nodeType !== 1) {
            node = node.nextSibling;
        }
        return node;
    }
}



//获取第一个子元素  屏蔽浏览器的差异
function getFirstElementChild(element) {
    if(element.firstElementChild) {
        return element.firstElementChild;
    }else{
        //获取第一个子节点
        var node = element.firstChild;
        while(node && node.nodeType !== 1) {
            node = node.nextSibling;
        }
        return node;
    }
}

function getDate(date) {
    //判断date是否是日期对象
    if( !(date instanceof Date)) {
        return;
    }

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
//        if(month < 10) {
//            month = "0" + month;
//        }
    //补0
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    return year + "-"  + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}


var  EventTools = {
    addEventListener: function (element, eventName, handler) {
        if(element.addEventListener) {
            element.addEventListener(eventName, handler, false);
        }else if(element.attachEvent) {
            element.attachEvent("on" + eventName, handler);
        }else{
            element["on" + eventName] = handler;
        }
    },
    removeEventListener: function (element, eventName, handler) {
        if(element.removeEventListener) {
            element.removeEventListener(eventName, handler, false);
        }else if(element.detachEvent) {
            element.detachEvent("on" + eventName, handler);
        }else{
            element["on" + eventName] = null;
        }
    },
    //获取事件对象，兼容浏览器
    getEvent: function (e) {
        return e || window.event;
    },
    //让target兼容浏览器
    getTarget: function (e) {
        return e.target || e.srcElement;
    },
    //阻止事件冒泡，兼容浏览器
    stopPropagation: function (e) {
        if(e.stopPropagation) {
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
    },
    //取消后续内容的执行，兼容浏览器
    preventDefault: function (e) {
        if(e.preventDefault) {
            e.preventDefault();
        }else{
            e.returnValue = false;
        }
    },
    getPageX: function (e) {
        if(e.pageX) {
            return e.pageX;
        }else{
            //鼠标在窗口的位置 + 页面滚动出去的距离
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            return e.clientX + scrollLeft;
        }
    },
    getPageY: function (e) {
        if(e.pageY) {
            return e.pageY;
        }else{
            //鼠标在窗口的位置 + 页面滚动出去的距离
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            return e.clientY + scrollTop;
        }
    },
};