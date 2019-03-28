// getElementById等获取DOM元素的方法，一定要等到html结构加载完成以后才能获取到，否则为null
	
var index = 0,
	timer = null;

function byId(n){
	return typeof(n) === "string"?document.getElementById(n):n;
}

function slideImg(pics, main, lis){
	
	//鼠标滑过时清除定时器
	main.onmouseover = function(){
		if(timer) clearInterval(timer);
	}
	//鼠标移出时，图片自动轮播
	main.onmouseout = function(){
		timer = setInterval(function(){
			index++;
			if(index >= pics.length){
				index = 0;
			}
			changeImg(pics,lis);
		},1000)
	}
	main.onmouseout();

	//点击导航栏，切换图片且导航栏高亮
	for(var j = 0; j < lis.length; j++){
		lis[j].id = j;
		lis[j].onclick = function(){
			index = this.id;
			changeImg(pics,lis);
		}
	}
}

function changeImg(pics,lis){
	for(var i = 0; i < pics.length; i++){
		pics[i].style.display = "none";
		lis[i].className = "";
	}
	pics[index].style.display = "block";
	lis[index].className = "active";
}

window.onload = function(){
	var pics = byId('pic').getElementsByTagName('div'),
		main = byId('main'),
		lis = byId('nav').getElementsByTagName('li');
		console.log(lis)
	slideImg(pics, main, lis);
}
