//禁止页面拖动
document.documentElement.ontouchmove = function(e){
   e.preventDefault();    
}

/*--------图片预加载---------*/
var imgSrc="images/";//图片路径
var imgList=[
	  "barrage-1.png",
	  "barrage-2.png",
	  "barrage-3.png",
	  "barrage-4.png",
	  "barrage-5.png",
	  "barrage-6.png",
	  "barrage-7.png",
	  "bg.jpg",
	  "describe-1.png",
	  "describe-2.png",
	  "describe-3.png",
	  "describe-4.png",
	  "describe-5.png",
	  "describe-6.png",
	  "describe-7.png",
	  "do-game.png",
	  "do-sj.png",
	  "do-wh.png",
	  "do-ws.png",
	  "erweima.png",
	  "logo.png",
	  "man-3.png",
	  "man-4.png",
	  "man-5.png",
	  "man-6.png",
	  "man-7.png",
	  "man-8.png",
	  "man-9.png",
	  "man-10.png",
	  "man-11.png",
	  "man-body.png",
	  "man-body-2.png",
	  "man-body-3.png",
	  "man-head-2.png",
	  "man-head-3.png",
	  "photo-1.png",
	  "photo-2.png",
	  "photo-3.png",
	  "show-off-bg.png",
	  "tel-txt.png",
	  "style_z.png"
];

var loadImg=function(l,c){
	var tnum=l.length;
	var overnum=0;
	for(var i=0;i<tnum;i++){
		var img=new Image();
		img.onload=function(){
			overnum++;
			var loadingTxt=Math.round(overnum/tnum*100);
			overnum==tnum&&c();
			$("#loadingTxt").html(loadingTxt+"%");
		}
		img.src=imgSrc+l[i];
	}
}
loadImg(imgList,function(){
	$(".loading").hide();
	openPage(".p1");
});

/*------打开页面方法--------*/
var openPage=function(obj){
  	$(obj).addClass("show");
}

/*----------判断手机横竖屏状态-----------*/
function hengshuping() {
    if (window.screen.width< window.screen.height) {
        $('.tip').fadeOut();
    }
    if (window.screen.width > window.screen.height) {
        $('.tip').fadeIn();
    }
}
window.addEventListener("resize", hengshuping, false);
hengshuping();

/*---------我来试试-----------*/
$(".try-btn").on("touchend",function(){
	parentClose(this);
	$(this).closest(".p").next().addClass("show");
});

/*------关闭父级页面方法--------*/
var parentClose=function(obj){
  	$(obj).closest(".p").removeClass("show");
}

var flagT=true;
/*--------赚钱方式选择--------*/
$("#methodBtns a").on("touchend",function(){
    var index=$(this).index();
	if(flagT){
		parentClose(this);
		switch(index){
			case 0:
			   flagT=false;
			   openPage(".p3");//做网红
			   break;
			case 1:
			   flagT=false;
			   openPage(".p5");//做水军
			   break;
			case 2:
			   flagT=false;
			   openPage(".p7");//做水军
			   break;
			case 3:
			   flagT=false;
			   openPage(".p9");//玩口袋征服
			   break;
			default:
			   break;
		}	
	}
	
})

/*-------上传美照按钮-------*/
$("#uploadPhotosBtn").on("touchend",function(){
	parentClose(this);
	openPage("#wh");
});
/*-------卖面膜按钮--------*/
$("#sellMaskBtn").on("touchend",function(){
	parentClose(this);
	openPage("#ws");
});
/*-------炒话题按钮--------*/
$("#hypeTopicBtn").on("touchend",function(){
	parentClose(this);
	openPage("#sj");
});
/*-------玩《口袋征服》----------*/
$("#playGameBtn").on("touchend",function(){
   	parentClose(this);
	openPage("#game");
});

var earnMoney=0;
var addMoney=0;
/*-----------遮罩层-------------*/
$(".pop-box").on("touchend",function(){	
	$(this).fadeOut(300);
	var page=$(this).closest(".p").attr("id");
	switch(page){
		case 'wh': 
			 bar("wh");
			  addMoney=109;
			 var moveAction=function(endPos,startPos){
			 	 if ( endPos.y-startPos.y < -100){//上滑
			 	 	var $wh = $('#wh'),
					$whEarnI = $wh.find('.earn i');
					earnMoney = earnMoney + addMoney;
					$whEarnI.text(earnMoney);	
					$photo=$("#photo");
					  $photoOnSize=$("#photo .on").size();
					  $photoSpan=$("#photo span");
					  if($photoOnSize<3){
						  $photoSpan.eq($photoOnSize).addClass("on");
					  }else{
						  $photoSpan.eq(0).appendTo($photo);
					  }
			 	 } 
			 }

			 slideEvent("wh",moveAction);
		break;

		default:
		  break;
	}
});

/*----------进度条方法------------*/
var $barType;
var bar=function(id){
	$barType=$("#"+id).find(".progress-bar");
	$barType.addClass("on");
	$barType.on("webkitAnimationEnd", function(){
			   $(this).removeClass("on");
			   $("#"+id).removeClass("show");
			   $("#do"+id).addClass("show");
			   $("#do"+id).find(".earn-money").text(earnMoney);
			   
	});
}

/*----------滑动事件-------------*/
var startPos=0,
	  endPos=0;
var slideEvent=function(id,callback){
    var obj = document.getElementById(id);
	obj.addEventListener('touchstart', function(event) {
		var touch = event.targetTouches[0];
		startPos = { x: touch.pageX, y: touch.pageY };
		endPos = { x:touch.pageX,y:touch.pageY};
	}, false);
	
	//触屏移动
	obj.addEventListener('touchmove', function(event) {
		event.preventDefault();
		if (event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
		var touch = event.targetTouches[0];
		endPos = { x: touch.pageX - startPos.x, y: touch.pageY - startPos.y };
	}, false);
	//触屏结束
	obj.addEventListener('touchend', function() {
		return callback(endPos,startPos);
	}, false);	
}

/*---------结果页（我知道了 按钮）-----------*/
$(".know-btn").on("touchend",function(){
	parentClose(this);
	openPage("#ordered");
	
});

var getTimeN=function(){  
   	var t=new Date();
	return t.getTime();
}

var t1=0;
/*----------------预约页面按钮------------------*/
$("#ordered a").on("touchend",function(event){
	if(getTimeN()-t1 > 500){
		if($(this).attr("id")=="wantOrderBtn"){  //我要预约按钮
			if($("#tel").val()!=""){
			  $("#giftCon").addClass("hide");
			  $("#erweimaCon").removeClass("hide");	//显示二维码
			}else{
			  alert("亲！输入手机号才能预约哟~");
			}   	
		}else if($(this).attr("id")=="continueBtn"){  //继续赚钱按钮
			  parentClose(this);
			  resetFn();
			  openPage(".p2");
		}else if($(this).attr("id")=="showOffBtn"){  //炫耀一下按钮
			  $(this).closest(".p").find(".pop-box").fadeIn(300);
		}
	}
	t1 = getTimeN();
})

/*-------------重置----------------*/
var resetFn=function(){
    flagT=true;	
    addMoney=0;
	earnMoney=0;
	startPos=0;
	endPos=0;
	$gameType=$(".game-type");
	$progressBar=$(".game-type .progress-bar");
	$popBox=$(".game-type .pop-box");
	$earnI=$(".game-type .earn i");
	for(var i=0;i<$gameType.size();i++){
		$progressBar.eq(i).css("width",364);
		$popBox.eq(i).show();
		$earnI.eq(i).text(0);
	}
	$photo=$("#photo span");
	for(var i=0;i<$photo.size();i++){
		$photo.eq(i).removeClass("on");
		$photo.eq(i).attr("class","photo-"+parseInt(i+1));
	}
	$resultEarnMoney=$(".result .earn-money");
	for(var i=0;i<$resultEarnMoney.size();i++){
	   $resultEarnMoney.eq(i).text(0);
	}
}