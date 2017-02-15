/**
 * Created by Administrator on 2016/11/8 0008.
 */
;(function(){
    'use strict'

    var $content = $("#task_content"),
        $window = $(window),
        $body = $('body'),
        $addTaskBtn = $("#add_task_btn"),
        $task_detail = $(".task_detail"),
        $task_detail_mask = $(".task_detail_mask"),
        task_list = [],
        current_index,
        $update_form,
        $task_detail_content,
        $task_detail_content_input,
        $delete_task_btn,
        $checkbox_complete,
        $msg = $(".msg"),
        $msg_content = $msg.find('.msg-content'),
        $msg_confirm = $msg.find('.comfirmed'),
        $alter = $(".alert"),
        $detail_task_btn;

    init();
        
    $addTaskBtn.on("click", function(e){
        var new_task = {};
        /* 获取新Task的值 */
        new_task.content = $content.val();
        /* 如果新Task的值为空则直接返回，否则继续执行 */
        if(!new_task.content) return;
        /* 存入新Task */
        if(addTask(new_task)){
            $content.val(null);
        }
    });

    $task_detail_mask.on("click" ,hideTaskDetail);
    /**
     * 自定义Alert
     * @param  {[type]} arg [description]
     * @return {[type]}     [description]
     */
    function pop(arg){
        if(!arg){
            console.error('pop title is required');
        }

        var conf = {}
        , $box
        , $mask
        , $title
        , $content
        , $confirm
        , $cancel
        , confirmed
        , timer
        , dfd
        ;

        dfd = $.Deferred();


        if(typeof arg == "string"){
            conf.content = arg;
        }else{
            conf = $.extend(conf, arg);
        }  
        conf.title = "提示";
        conf.width = 350;
        conf.height = 200;
        conf.okText = "确定";
        conf.cancelText = "取消";

        $box = $(`<div class="modal-confirm">
            <div class="pop-title">${conf.title}</div>
            <div class="pop-content">${conf.content}</div>
            <div class="btn">
                <button class="cancel">${conf.cancelText}</button>
                <button class="primary confirm">${conf.okText}</button>
            </div>
            </div>`)
            .css({
                position: 'fixed',
                width: conf.width,
                height: conf.height,
                color: '#444',
                background: '#fff',
                'border-radius': 3,
                'box-shadow': '0 1px 2px rgba(0,0,0,0.5)'
            });

        $title = $box.find('.pop-title').css({
            padding: '5px 10px',
            'font-weight': 900,
            'font-size': 20,
            'text-align': 'center'
        });    

        $content = $box.find('.pop-content').css({
            padding: '5px 10px',
            'text-align': 'center'
        });

        $confirm = $box.find('button.confirm');
        $cancel = $box.find('button.cancel');

        $mask = $('<div></div>')
            .css({
                position: 'fixed',
                background: 'rgba(0,0,0,0.5)',
                top: 0,
                buttom: 0,
                left: 0,
                right: 0,
                width: '100%',
                height: '100%'
            });    
        
        timer = setInterval(function(){
            if(confirmed !== undefined){
                dfd.resolve(confirmed);
                clearInterval(timer);
                deismissPop();
            }
        }, 50);

        $confirm.on('click', open);
        $cancel.on('click', close);
        $mask.on('click', close);

        //关闭弹窗
        function close(){
            confirmed = false;
        }
        //开启
        function open(){
            confirmed = true;
        }

        //销毁弹窗
        function deismissPop(){
            $mask.remove();
            $box.remove();
        }
        //调整box位置
        function adjustBoxPosition(){
            var window_width = $window.width()
            ,window_height = $window.height()
            ,box_width = $box.width()
            ,box_height = $box.height()
            ,move_x
            ,move_y
            ;

            move_x = (window_width - box_width) / 2;
            move_y = ((window_height - box_height) / 2) - 20;

            $box.css({
                left: move_x,
                top: move_y
            });
        }

        $mask.appendTo($body);
        $box.appendTo($body);

        adjustBoxPosition();
        $window.on('resize', function() {
            adjustBoxPosition();
        });

        return dfd.promise();
    }

    function listenMsgEvent(){
        $msg_confirm.on('click', function(){
            hideMsg();
        });
    }

    /**
     * 添加Task
     * @param {String} 任务内容
     */
    function addTask(new_task){
        /* 将新Task推入TaskList */
        task_list.push(new_task);
        /* 更新LocalStorege */
        refreshTaskList();
        return true;
    }

    /**
     * 渲染全部的Task
     */
    function renderTaskList(){
        var $task_list = $(".task_list");
        $task_list.html('');
        var complete_items = [];
        for(var i=0; i<task_list.length; i++){
            var item = task_list[i];
            if(item && item.complete){
                complete_items[i] = item;
            }else{
                var $task = renderTaskItem(task_list[i],i);
                $task_list.prepend($task);
            }
        }

        for(var j=0; j<complete_items.length; j++){
            $task = renderTaskItem(complete_items[j], j);
            if(!$task) continue;
            $task.addClass("completed");
            $task_list.append($task);
        }
        
        $delete_task_btn = $(".task_list").find(".del");
        $detail_task_btn = $(".task_list").find(".detail");
        $checkbox_complete = $(".task_list").find(".complete[type='checkbox']");
        listenTaskDelete();
        listenTaskDetail();
        listenCheckboxComplete();
    }

    /**
     * 渲染单条Task模版
     * @param  {Object} data  task
     * @param  {Int} index 序号
     * @return {jQuery}    task对象
     */
    function renderTaskItem(data,index){
        if(!data || (!index && index != 0)) return;
        var task_item_tpl = `
        <div class="task_item" data-index="${index}">
            <div class="task_item_content">
                <span><input class="complete" ${data.complete ? 'checked' : ''} type="checkbox"/></span>
                <span class="task-content">${data.content}</span>
            </div>
            <div class="task_item_operation">
                <span class="del">删除</span>
                <span class="detail">详细</span>
            </div>
        </div>`;

        return $(task_item_tpl);
    }

    /**
     * 刷新localStorage数据并渲染模版
     */
    function refreshTaskList(){
        store.set("task_list",task_list);
        renderTaskList();
    }

    /**
     * 查找并监听所有删除按钮的点击事件
     */
    function listenTaskDelete(){
        $delete_task_btn.on("click", function(){
            var $this = $(this);
            var index = $this.parent().parent().data("index");
            pop("确认删除？").then(function(r){
                r ? deleteTask(index) : null;
            });
        });
    }

    /**
     * 删除Task
     * @param  {int} index TaskId
     */
    function deleteTask(index){
        if((!index && index != 0) || !task_list[index]) return;
        delete task_list[index];
        /*更新localStorage*/
        refreshTaskList();
    }

    /**
     * 查找并监听所有详细按钮的点击事件
     */
    function listenTaskDetail(){
        var index;
        $('.task_item').on('dblclick',function(){
            index = $(this).data("index");
            showTaskDetail(index);
        });

        $detail_task_btn.on("click", function(){
            var $this = $(this);
            var $item = $this.parent().parent();
            index = $item.data("index");
            showTaskDetail(index);
        });
    }

    function listenCheckboxComplete(){
        $checkbox_complete.on('click', function(){
            var $this = $(this);
            // var isComplete = $this.is(":checked");
            var index = $this.parent().parent().parent().data("index");
            var item = store.get('task_list')[index];
            if(item.complete){
                updateTask(index, {complete: false});
            }else{
                updateTask(index, {complete: true});
            }
        });        
    }

    /**
     * 显示Task详细信息
     * @param  {int} index
     */
    function showTaskDetail(index){
        if(!index && index != 0) return;
        //生成详情模版
        renderTaskDetai(index);
        current_index = index;
        //显示详情模版，默认隐藏
        $task_detail_mask.show();
        $task_detail.show();
    }

    /**
     * 渲染指定Task的详细信息
     */
    function renderTaskDetai(index){
        var item = task_list[index];
        console.log("item",item);
        if(!item) return;
        var content = item.content;
        var desc = item.desc;
        if(content === undefined) content = "";
        if(desc === undefined) desc= "";
        var tpl = `
        <form>
        <div class="content" >${content}</div>
        <div class="input_item"><input type="text" name="content" value="${content}" style="display:none;"></div>
        <div>
            <div class="desc input_item">
                <textarea placeholder="添加描述" name="desc">${desc}</textarea>
            </div>
            <div class="remind input_item">
                <label>提醒时间</label>
                <input class="datetime" name="remind_date" type="text" value="${item.remind_date || ''}"/>
            </div>
        </div>
        <div class="input_item"><button type="submit">更新</button></div>
        </form>`;
        //清空Task详情模版
        $task_detail.html(null);
        //替换旧模板
        $task_detail.html(tpl);
        $('.datetime').datetimepicker();
        //选中其中的from元素，因为之后会使用其监听submit事件
        $update_form = $task_detail.find("form");
        //选中显示Task内容元素
        $task_detail_content = $task_detail.find(".content");
        //选中显示Task input内容元素
        $task_detail_content_input = $task_detail.find("[name='content']");

        //双击内容元素显示input，隐藏自己
        $task_detail_content.on("dblclick", function(){
            $task_detail_content_input.show();
            $task_detail_content.hide();
        });    
        //获取表单中各个input的值
        $update_form.on("submit", function(e){
            e.preventDefault();
            var data = {};
            data.content = $(this).find("[name='content']").val();
            data.desc = $(this).find("[name='desc']").val();
            data.remind_date = $(this).find("[name='remind_date']").val();
            updateTask(index,data);
            hideTaskDetail();
        });

    }

    /**
     * 更新Task
     * @param  {[type]} index [description]
     * @param  {[type]} data  [description]
     * @return {[type]}       [description]
     */
    function updateTask(index,data){
        if(!index || !task_list[index]) return;

        task_list[index] = $.extend({}, task_list[index], data);
        refreshTaskList();
    }


    /**
     * 隐藏Task详细信息
     */
    function hideTaskDetail(){
        $task_detail_mask.hide();
        $task_detail.hide();
    }

    function init(){
        task_list = store.get("task_list") || [];
        listenMsgEvent();
        if(task_list.length) renderTaskList();
        TaskRemindCheck();
    }

    function TaskRemindCheck(){
        var currentTimestamp;
        var timerId = setInterval(function(){
            for(var i=0; i<task_list.length; i++){
                var item = task_list[i], task_timestamp;
                if(!item || !item.remind_date || item.informed) {
                    continue;
                }
                currentTimestamp = new Date().getTime();
                task_timestamp = new Date(item.remind_date).getTime();

                if(currentTimestamp - task_timestamp >= 1){
                    updateTask(i, {informed: true});
                    showMsg(item.content);
                }
            }
        },500);
    }

    function showMsg(msg){
        if(!msg) return;
        $msg_content.text(msg);
        $alter.get(0).play();
        $msg.show();
    }

    function hideMsg(){
        $msg.hide();
    }
    /**
     * 相应Enter键
     */
    $content.keyup(function(e){
        if(e.key === "Enter"){
            $addTaskBtn.trigger("click");
        }
    });
    

})();
