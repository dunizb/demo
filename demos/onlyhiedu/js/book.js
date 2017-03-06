define('book.js', function(require, exports, module){ 
    var $mask = $("#mask");
    var $close = $(".close");
    $close.click(function(event) {
	   $(mask).hide();
    });
});