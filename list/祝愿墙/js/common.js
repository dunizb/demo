/**
 * Created by jiaoshou on 2016/6/6.
 */
/**
 * 根据字符串参数获取对象
 * @param {string} str
 * @returns {node}
 */
function $(str){
    // 如果传的是字符串
    if(typeof(str) === "string"){
        if(str[0] === "#"){         // 传的是ID
            return document.getElementById(str.substr(1));
        }else if(str[0] === "."){   // 如果是class
            return document.getElementsByClassName(str.substr(1));
        }else{                      // 标签
            return document.getElementsByTagName(str.substr(1));
        }
    }else{
        console.error("$()参数非法！");
    }
}

/**
 * 获dom对象的innerText的取值
 * @param {element}
 * @returns {string}
 */
function getInnerText(element) {
    //判断当前浏览器是否支持innerText
    if(typeof element.innerText  === "string") {
        return element.innerText;
    }else{
        return element.textContent;
    }
}

/**
 * 设置dom对象的innerText
 * @param {element}
 * @param {string} content
 */
function setInnerText(element, content) {
    if(typeof element.innerText === "string") {
        element.innerText = content;
    }else{
        element.textContent = content;
    }
}
/**
 * 兼容浏览器   获取下一个兄弟元素
 * @param {Node} element
 * @returns {Node}
 */
function getNextElementSibling(element) {
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

/**
 * 获取第一个子元素  屏蔽浏览器的差异
 * @param {Node} element
 * @returns {Node}
 */
function getFirstElementChild(element){
    if(element.firstElementChild){
        return element.firstElementChild;
    }else{
        //获取第一个子节点
        var node = element.firstChild;
        while(node && node.type !== 1){
            node = element.nextSibling;
        }
        return node;
    }
}