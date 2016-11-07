define('footer.js', function(require, exports, module){ 
	$(function(){
		$('.ft_submit').on('click', function(event){
			event.preventDefault();
			var name = $(".ft_name").val();
			var mobile = $(".ft_mobile").val();
			var grade = $(".ft_grade").val();
			var subject = $('.ft_subject').val();
			if (!name || !mobile || !grade) {
				alert("请补充信息!");
			}else if (isPhoneNumber(mobile)) {
				alert('请输入正确号码');
			}else{
				$.ajax({
					url: location.origin+'/home/user/register',
					type: 'get',
					data: {username:name,phone:mobile,nianji:grade,kemu:subject,laizi:1},
				})
				.done(function() {
					alert("预约成功！");
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
	})

	//判断是否手机号
	function isPhoneNumber(value){
	    if(!(/^1[34578]\d{9}$/.test(value))){ 
	        return true; 
	    }
	    return false; 
	}

	exports.isPhoneNumber = isPhoneNumber;
 
});