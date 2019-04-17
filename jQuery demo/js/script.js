
var index = 0,
	timer = null;

function byId(n){
	return typeof(n) === "string"?document.getElementById(n):n
}

//购物车：这部分效果能用纯css实现吗？自己写只能实现一部分，且代码量增加，怎样的写法比较合理优化？
function showCart(){
	var cart = byId("cart"),
	    cartImg1 = cart.getElementsByTagName("img")[0],
	    cartImg2 = cart.getElementsByTagName("img")[1],
	    cartContent = byId("cart-content");
	cart.onmouseover = function(){
		cartContent.style.display = "block";
		cartImg1.src = "素材/icon/25.png";
		cartImg2.src = "素材/icon/24.png";
		this.style.background = "#fff";
		this.style.color = "red";
	}	
	cart.onmouseout = function(){
		cartContent.style.display = "none";
		cartImg1.src = "素材/icon/26.png";
		cartImg2.src = "素材/icon/23.png";
		this.style.background = "red";
		this.style.color = "#fff";
	}	
	cartContent.onmouseover = function(){
		this.style.display = "block";
		cartImg1.src = "素材/icon/25.png";
		cartImg2.src = "素材/icon/24.png";
		cart.style.background = "#fff";
		cart.style.color = "red";
	}
	cartContent.onmouseout = function(){
		this.style.display = "none";
		cartImg1.src = "素材/icon/26.png";
		cartImg2.src = "素材/icon/23.png";
		cart.style.background = "red";
		cart.style.color = "#fff";
	}
}

//轮播特效
function slideImg(pics,dots){
	var banner = byId("banner"),
		next = byId("next"),
		prev = byId("prev"),
		mainMenu = byId("main-menu"),
		mainItems = mainMenu.getElementsByClassName("main-item"),
		subMenu = byId("sub-menu"),
		innerBox = subMenu.getElementsByClassName("inner-box"),
		font = mainMenu.getElementsByTagName("a");

	//鼠标滑过清除定时器
	banner.onmouseover = function(){
		if(timer) clearInterval(timer); 
	}
	//鼠标移出开启定时器
	banner.onmouseout = function(){
		timer = setInterval(function(){
			index ++;
			if(index >= pics.length) {
				index = 0;
			}
			changeImg(pics, dots);
		},1000)
	}

	//进入网页时，轮播图自动切换
	banner.onmouseout();

	//圆点切换图片
	for(var d=0; d<pics.length; d++){
		dots[d].id = d; 
		dots[d].onclick = function(){
			index = this.id;
			changeImg(pics,dots);
		}
	}

	//箭头切换图片
	next.onclick = function(){
		index++;
		if(index >= pics.length) index = 0;
		changeImg(pics,dots);
	}
	prev.onclick = function(){
		index--;
		if(index < 0 ) index = pics.length - 1;
		changeImg(pics,dots);
	}

	//主菜单展开
	for(var m=0; m<mainItems.length; m++){
		mainItems[m].setAttribute("data-index",m);
		mainItems[m].onmouseover = function(){
			subMenu.className = "sub-menu"; 
			var idx = this.getAttribute("data-index");
			for(var j=0; j<innerBox.length; j++){
				innerBox[j].style.display = "none"; 
				mainItems[j].style.background = "red";
				font[j].style.color = "#fff";
			}
			innerBox[idx].style.display = "block"; 
			mainItems[idx].style.background = "#fff";
			font[idx].style.color = "red";
		}
	}

	//离开主菜单时，子菜单收起
	mainMenu.onmouseout = function(){
		subMenu.className = "sub-menu hide";
		for(var n=0; n<mainItems.length; n++){
			mainItems[n].style.background = "red";
			font[n].style.color = "#fff";
		}
	}

	//离开主菜单时，子菜单收起，但从主菜单滑到子菜单时要显示出来
	subMenu.onmouseover = function(){
		this.className = "sub-menu";
	}

	//离开子菜单本身时，也要隐藏
	subMenu.onmouseout = function(){
		this.className = "sub-menu hide";
		for(var n=0; n<mainItems.length; n++){
			mainItems[n].style.background = "red";
			font[n].style.color = "#fff";
		}
	}
}

//切换图片
function changeImg(pics,dots){
	for(var i = 0; i < pics.length; i++){
		pics[i].style.display = "none";
		dots[i].className = "";
	}
	pics[index].style.display = "block";
	dots[index].className = "active";
}

window.onload = function(){
	var pics = byId("slide").getElementsByTagName("div"),
		dots = byId("dots").getElementsByTagName("span");

	showCart();
	slideImg(pics,dots);
}

