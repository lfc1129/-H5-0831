// JavaScript Document

/************************************
Use for:         kdzf.99.com
Version:         1.0
Date:            2016-08-31 9:30:00
Author:          php
Employee number: 206742
Update:  
*************************************/

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

var audioMusic=document.querySelector("#audioMusic"); 
var whMusic,
    wsMusic,
	sjMusic,
	gameMusic; 
$(function(){
   audioMusic.play();
   var engine = new jWebAudio.SoundEngine();
   whMusic = engine.addSoundSource({
	   'url':'music/whMusic.wav',
	   'volume':1500,
	   'preLoad':true
   });
   wsMusic = engine.addSoundSource({
	   'url':'music/wsMusic.mp3',
	   'volume':1500,
	   'preLoad':true
   });
   sjMusic = engine.addSoundSource({
	   'url':'music/sjMusic.mp3',
	   'volume':1500,
	   'preLoad':true
   });	
   gameMusic = engine.addSoundSource({
	   'url':'music/gameMusic.wav',
	   'volume':1500,
	   'preLoad':true
   });
})
/*--------背景音乐-----------*/
var $music=$("#music");
$music.on("touchend",function(){
	  if($music.hasClass("on")){
	    audioMusic.pause(); 
	    $music.removeClass("on");
	  }else{
		audioMusic.play();
		$music.addClass("on");
	  }
});


/*------关闭父级页面方法--------*/
var parentClose=function(obj){
  	$(obj).closest(".p").removeClass("show");
}
/*------打开页面方法--------*/
var openPage=function(obj){
  	$(obj).addClass("show");
}

/*---------我来试试-----------*/
$(".try-btn").on("touchend",function(){
	parentClose(this);
	$(this).closest(".p").next().addClass("show");
});


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

/*-------上传美照按钮-------*/
$("#uploadPhotosBtn").on("touchend",function(){
	parentClose(this);
	openPage("#wh");
});

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

var earnMoney=0;
var addMoney=0;
var flag={
	'wh':false,
	'ws':false,
	'sj':false,
	'game':false
}
var t2=0;
/*-----------遮罩层-------------*/
$(".pop-box").on("touchend",function(){	
	$(this).fadeOut(300);
	var page=$(this).closest(".p").attr("id");
	switch(page){
		case 'wh':   //做网红
			  addMoney=109;
			  bar("wh");
			  var moveAction = function(endPos,startPos){
				  if ( endPos.y-startPos.y < -100){ //上滑
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
					whMusic.sound.seek(0);
				    whMusic.sound.play();
				  }
			  }
			  if(!flag.wh){
				 slideEvent("wh",moveAction);
				 flag.wh=true;
			  }
			  break;
		case 'ws':    //做微商
			  addMoney=111;
			  var startPosY=0,
				  endPosY=0;
			  bar("ws");
			  var moveAction = function(){
					 var $ws = $('#ws'),
					 $wsEarnI = $ws.find('.earn i');
					 $ws.on('touchstart', function(event) {
						event.stopPropagation();
						event.preventDefault();
						
						var touch = event.targetTouches[0];
						startPosY = touch.pageY;
						endPosY=0;
						$ws.removeClass("on");	
					 });
					 $ws.on('touchmove', function(event) {
						  event.preventDefault();
						  if (event.targetTouches.length ==1){
						    var touch = event.targetTouches[0];
						        endPosY = touch.pageY;					   
						    if(endPosY - startPosY > 100){ //下滑
							    $ws.addClass("on"); 
						    }  
						 }
					  });
					 $ws.on('touchend', function(event) {
						 event.stopPropagation();
						 if(getTimeN()-t2 > 500){
							 if(endPosY!=0&&(endPosY - startPosY > 100)){
								wsMusic.sound.seek(0);
								wsMusic.sound.play();
								earnMoney = earnMoney + addMoney;	
								$wsEarnI.text(earnMoney);		
							 }
							  t2 = getTimeN();
						 }
						
					 }); 	
				  }  
				 if(!flag.ws){
				    moveAction();
					flag.ws=true;
				 }
			  break;
		case 'sj':    //做水军
			  addMoney=56;
			  var randomN=0;
			  var $sj = $('#sj'),
				  $sjEarnI = $sj.find('.earn i'),
				  $barrage=$('#barrage');
			  bar("sj");
			  var moveAction = function(){
				  $sj.find(".content").on('touchstart', function(event) {
					     event.preventDefault();	
					     sjMusic.sound.seek(0);
						 sjMusic.sound.play();
						 $sj.addClass("on");
				  });
				  $sj.find(".content").on('touchend', function() {
						 earnMoney = earnMoney + addMoney;	
						 $sjEarnI.text(earnMoney);
						 randomN=Math.ceil(Math.random()*7);
						 if(!$barrage.find("img").eq(randomN-1).hasClass("on")){
							 $barrage.find("img").eq(randomN-1).addClass("on");
						 }
						  $barrage.find(".on").on("webkitAnimationEnd", function(){
						   $(this).removeClass("on");
						 });
						 $sj.removeClass("on");
				  });
				} 
			  if(!flag.sj){
				    moveAction();
					flag.sj=true;
			   }	
			  break;
		case 'game':   //玩口袋征服
		      addMoney=57;
		      var $game = $('#game'),
			      $gameEarnI = $game.find('.earn i');
			  bar("game");
		      var moveAction = function(){
			    $game.find(".content").on('touchstart', function(event) {
					event.preventDefault();	
				    gameMusic.sound.seek(0);
					gameMusic.sound.play();
				});
			    $game.find(".content").on('touchmove', function(event) {
				    event.preventDefault();	
				});
				$game.find(".content").on('touchend', function() {
					earnMoney = earnMoney + addMoney;	
					$gameEarnI.text(earnMoney);
					$game.addClass("on");
					$game.on("webkitAnimationEnd", function(){
					    $(this).removeClass("on");
					});
					$game.on("animationend", function(){
						$(this).removeClass("on");
					});
				});		
				
			  }
			  if(!flag.game){
				moveAction();
				flag.game=true;
			  }		
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
/*---------结果页（我知道了 按钮）-----------*/
$(".know-btn").on("touchend",function(){
	parentClose(this);
	openPage("#ordered");
	
});

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
	$barrage=$('#barrage');
	$barrageImg=$('#barrage img');
	for(var i=0;i<$barrageImg.size();i++){
	   $barrageImg.eq(i).removeClass("on");
	}
	$ws=$("#ws");
	$game=$("#game");
	$ws.removeClass("on");
	$game.removeClass("on");
    $giftCon=$("#giftCon");
    $giftCon.removeClass("hide");
	$erweimaCon=$("#erweimaCon");
	$erweimaCon.addClass("hide");	
	$tel=$("#tel");
	$tel.val("");
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