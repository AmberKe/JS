

//这里我用原生js也写了一遍，麻烦老师也帮我看看js的问题哈，谢谢，辛苦啦！

$(document).ready(function(){
	var index = 0;
		timer = null,
		len = $(".slide-pics").length
		cart = $(".cart"),
		cartContent = $(".cart-content")
		bannerBox = $(".banner-box"),
		mainItem = $(".main-item"),
		subMenu = $(".sub-menu"),
		innerBox = $(".inner-box"),
		box1 = $("#f1 .content-box"),
		box2 = $("#f2 .content-box"),
		btn1 = $("#f1-right a"),
		btn2 = $("#f2-right a");

	//购物车显示
	cart.hover(function(){
		$(this).css({"background":"#fff","color":"red"}).find("img:first").attr("src","素材/icon/25.png");
		$(this).find("img:last").attr("src","素材/icon/24.png");
		cartContent.show();
	},function(){
		$(this).css({"background":"red","color":"#fff"}).find("img:first").attr("src","素材/icon/26.png");
		$(this).find("img:last").attr("src","素材/icon/23.png");
		cartContent.hide();
	})

	cartContent.hover(function(){
		$(this).show();
		cart.css({"background":"#fff","color":"red"}).find("img:first").attr("src","素材/icon/25.png");
		cart.find("img:last").attr("src","素材/icon/24.png");

	},function(){
		$(this).hide();
		cart.css({"background":"red","color":"#fff"}).find("img:first").attr("src","素材/icon/26.png");
		cart.find("img:last").attr("src","素材/icon/23.png");
	})

	//图片切换
	function changeImg(){
		$(".slide-pics").eq(index).addClass("slide-active").siblings().removeClass("slide-active");
		$(".dots span").eq(index).addClass("active").siblings().removeClass("active");
	}

	//定时器
	bannerBox.mouseleave(function(){
		timer = setInterval(function(){
			index++;
			if(index >= len){
				index = 0;
			}
			changeImg();
		}, 1000)
	})

	//进入网页自动轮播
	bannerBox.mouseleave();
	//清除定时器
	bannerBox.mouseenter(function(){
		clearInterval(timer);
	})

	//点击圆点切换图片
	$(".dots span").click(function(){
		index = $(this).index(); //实现index和span的绑定
		$(this).addClass("active").siblings().removeClass("active");
		changeImg();
	})

	//点击左箭头切换图片
	$("#prev").click(function(){
		index--;
		if(index < 0){
			index = len - 1;
		}
		changeImg();
	})

	//点击右箭头切换图片
	$("#next").click(function(){
		index++;
		if(index >= len){
			index = 0;
		}
		changeImg();
	})
	
	//主菜单展开
	mainItem.hover(function(){		
		//这里的index为什么是从1开始？
		var idx = $(this).index() - 1;
		$(this).css({"background":"#fff"}).find("a").css({"color":"red"});
		subMenu.removeClass("hide").find(".inner-box").eq(idx).css({"display":"block"}).siblings().css({"display":"none"});
	},function(){
		var idx = $(this).index() - 1;
		$(this).css({"background":"red"}).find("a").css({"color":"#fff"});
		subMenu.addClass("hide").find(".inner-box").eq(idx).css({"display":"none"});
	})

	//主菜单滑过子菜单，子菜单显示且主菜单背景颜色改变
	innerBox.mouseenter(function(){
		subMenu.removeClass("hide");
		$(this).css({"display":"block"}).siblings().css({"display":"none"});
		mainItem.eq($(this).index()).css({"background":"#fff"}).find("a").css({"color":"red"});
	})

	//鼠标离开子菜单，子菜单收起
	subMenu.mouseleave(function(){
		$(this).addClass("hide");
		mainItem.css({"background":"red"}).find("a").css({"color":"#fff"});
	})

	//楼层1F
	btn1.mouseenter(function(){
		$(this).addClass("on").siblings().removeClass("on");
		box1.eq($(this).index()).addClass("floorShow").siblings().removeClass("floorShow");
	})

	//楼层2F
	btn2.mouseenter(function(){
		$(this).addClass("on").siblings().removeClass("on");
		box2.eq($(this).index()).addClass("floorShow").siblings().removeClass("floorShow");
	})

})

