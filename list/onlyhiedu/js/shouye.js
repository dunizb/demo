$(function(){
	require('header.js');
	var footer = require('footer.js');

	if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
		window.location.href="/mobile/wap";
	}

	var $form = $("form");
	var $body = $("body");
	$body.on('click','#send_shouye', function(event) {
		event.preventDefault();
		/* Act on the event */
		var $shouye = $(".book_right");

		var name =$shouye.find(".name").val();
		var mobile = $shouye.find(".mobile").val();
		var grade = $shouye.find(".grade").val();
		if (!name || !mobile || !grade) {
			alert("请补充信息!");
			return ;
		}
		if (footer.isPhoneNumber(mobile)) {
			alert('请输入正确号码');
			return ;
		}
		$.ajax({
			url: location.origin+'/home/user/register',
			type: 'get',
			data: {username:name,phone:mobile,nianji:grade,laizi:0},
		})
		.done(function() {
			console.log("success");
			alert("预约成功！");
			$form[1].reset();
			$("#mask").hide();

		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
})
