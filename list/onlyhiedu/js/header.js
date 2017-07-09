define('header.js', function(require, exports, module){ $(function(){

	require('book.js');
	var footer = require('footer.js');

	var $dialog = $(".dialog");
	var $form = $("#book");
	var $submit = $("#send");
	var $body = $("body");
	var $mask = $("#mask");
	/*
	var $close = $(".close");
	$close.click(function(event) {
		$(mask).hide();
	});
	*/
	$body.on('click','#send', function(event) {
		event.preventDefault();
		/* Act on the event */
		var name = $("#name").val();
		var mobile = $("#mobile").val();
		var grade = $("#grade").val();
		if (!name || !mobile || !grade) {
			alert("请补充信息!");
		}else if (footer.isPhoneNumber(mobile)) {
			alert('请输入正确号码');
		}else{
			$.ajax({
				url: location.origin+'/home/user/register',
				type: 'get',
				data: {username:name,phone:mobile,nianji:grade,laizi:0},
			})
			.done(function() {
				alert("预约成功！");
				$form[0].reset();
				$("#mask").hide();

			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		}
	});

	$body.blur(function(){
		$mask.hide();
	});

	var $booknow = $(".booknow");
	$booknow.on('click',  function(event) {
		event.preventDefault();
		$mask.show();
	});
})
 
});