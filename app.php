<?php 
    header('Content-Type:application/json;charset=utf-8');
    /*以json格式传输数据的时候要求响应内容格式是   application/json*/

	//获取回调函数名
	$jsoncallback = htmlspecialchars($_REQUEST ['jsoncallback']);

    $json = file_get_contents('app.json');

    /*试用json_decode方法解析json字符串  转化成php数组 数组当中是php对象*/
    $json_obj = json_decode($json);

    /*把php对象转化成json字符串  json_encode*/
    $json_str = json_encode($json_obj);

	//输出jsonp格式的数据
	echo $jsoncallback . "(" . $json_str . ")";


?>