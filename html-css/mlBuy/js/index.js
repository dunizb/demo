window.onload = function() {
	nextLi();
}
function nextLi(){
	var aLis = document.querySelectorAll("#lunboUl li");
	var aImg = document.getElementById("lunboDiv").getElementsByTagName("img");
	for(var i=0; i<aLis.length; i++){
		aLis[i].onmouseover = function(){
			var num = parseInt(this.innerText) - 1;
			for(var j=0; j<aImg.length; j++){
				if(j !== num){
					aImg[j].style.width = "0";
				}else{
					aImg[j].style.width = "520px";
				}
			}
			removeSiblingClass(this);
		}
	}
}

function removeSiblingClass(obj){
	var aLis = document.querySelectorAll("#lunboUl li");
	var num = parseInt(obj.innerText);
	for(var i=0; i<aLis.length; i++){
		if(aLis[i].className === "active"){
			aLis[i].className = "";
		}
	}
	obj.className = "active";
}