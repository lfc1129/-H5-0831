//禁止页面拖动
document.documentElement.ontouchmove = function(e){
   e.preventDefault();	
}

/*--------图片预加载---------*/
var imgSrc="images/";//图片路径
var imgList=["equip-1.png","equip-2.png","equip-3.png","equip-4.png","equip-5.png","equip-6.png","equip-7.png","equip-8.png","equip-9.png","equip-bg.png","gray-bg.png","hero-bg.png","page-bg-1.jpg","person-1.png","person-2.png","person-3.png","person-4.png","person-5.png","person-6.png","pop-bg.png","problem-page-bg.jpg","result-page-bg.jpg","result-tit-detail-bg.png","select.png","selected.png","slogan-bg.png","share-icon.png","style_z.png"];

var loadImg=function(l,c){
	var tnum=l.length;
	var overnum=0;
	for(var i=0;i<tnum;i++){
		var img=new Image();
		 img.onload=function(){
		 	overnum++;
		 	overnum==tnum&&c();
		 }
		img.src=imgSrc+l[i];
	}

}
loadImg(imgList,function(){
	$(".loading").hide();
	$(".p1").show();
});

/*--------点击答题-----------*/
$(".answer-click-btn").on("touchend",function(){
	$(".p1").hide();
	$("#box .problem-page:first-child").show();
});

/*---------产生1~n的随机数-----------*/
var randomNum=function(n){
     var num=new Array();
	 for(var i=0;i<n;i++){
		 var val=Math.ceil(Math.random()*n);
		 var isEqu=false;
		 for(var ids in num){
			 if(num[ids]==val){
			    isEqu=true;
				break;
			 }
		 }
		 if(isEqu)
		   i--;
		 else
		   num[num.length]=val;
	 }
	 return num;	
}


var html="";
var numArr; //存放随机数
var questionHtml=[];
var totalNum=3;//总题数
var commonHtml=' <span class="flag"></span><span class="num"><i></i></span>';//公用html
var endHtml='<a href="javascript:;" class="prev-question-btn">上一题</a><a href="javascript:;" class="next-question-btn">下一题</a>';//上一题、下一题

/*------第一题html文本------*/
numArr=randomNum(data.q1.answerItems.length);
html+=commonHtml;
html+='<span class="tit-con">'+data.q1.questionTitle+'</span>';
html+='<div class="answer">';
for(var i=0;i<data.q1.answerItems.length;i++){
	html+='<a href="javascript:;" class="answer-btn"  data-rel="'+data.q1.answerItems[numArr[i]-1]+'">'+data.q1.answerItems[numArr[i]-1]+'</a>';
}
html+='</div>';
html+=endHtml;
questionHtml[0]=html;

/*------第二题html文本------*/
numArr=randomNum(data.q2.answerItems.length);
html="";
html+=commonHtml;
html+='<span class="tit-con">'+data.q2.questionTitle+'</span>';
html+=' <img src="'+imgSrc+data.q2.questionImg+'" class="person-img"/>';
html+='<div class="answer">';
for(var i=0;i<data.q2.answerItems.length;i++){
	html+='<a href="javascript:;" class="answer-btn"  data-rel="'+data.q2.answerItems[numArr[i]-1]+'">'+data.q2.answerItems[numArr[i]-1]+'</a>';
}
html+='</div>';
html+=endHtml;
questionHtml[1]=html;

/*------第三题html文本------*/
numArr=randomNum(data.q3.answerItems.length);
html="";
html+=commonHtml;
html+='<span class="tit-con">'+data.q3.questionTitle+'</span>';
html+='<div class="answer">';
for(var i=0;i<data.q3.answerItems.length;i++){
	html+='<a href="javascript:;" class="select" data-rel="'+numArr[i]+'"><img src="'+imgSrc+data.q3.answerItems[numArr[i]-1]+'"/></a>';
} 
html+='</div>';
html+=endHtml;
questionHtml[2]=html;

/*---------随机生成题目-----------*/
numArr=randomNum(totalNum);

html="";
var $obj;
for(var i=0;i<numArr.length;i++){
	$obj=$('<div class="page problem-page p'+(numArr[i]+1)+' hide" data-rel="'+numArr[i]+'"></div>');
	$obj.html(questionHtml[numArr[i]-1]);
	$obj.find(".flag").html((i+1)+"/"+totalNum);
	$obj.find(".num i").attr("class","num-"+(i+1));

	if(i==0){
	   $obj.find(".prev-question-btn").remove();
	   $obj.find(".next-question-btn").addClass("next-question");
	}
	else if(i==numArr.length-1){
	   $obj.find(".next-question-btn").addClass("assignment-btn").html("交卷");
	}

	$obj.appendTo("#box");
}

/*------上一题-------*/
$(".prev-question-btn").on("touchend",function(){
   var objParent = $(this).closest(".page");
   goforward(objParent);
});
/*--------回到上一页-------*/
var goforward=function(obj){
	obj.hide();
	obj.prev().show();
}
/*------下一题-------*/
$(".next-question-btn").on("touchend",function(){
	var objParent=$(this).closest(".page");
	if(objParent.find(".answer-on-btn").size()>0){
		goto(objParent);
	}else if(objParent.find(".selected").size()==2){
		goto(objParent);
	}else{
		if(objParent.index()==2){
			 alert("亲！没做完不能交卷哦！");  
		}else{
			alert("亲！没做完不能进入下一题！");
		}
	}
});
var $popbox = $(".pop-box");
/*---------跳转下一页--------*/
var goto=function(obj){
	if(obj.index()==2){
		$popbox.show();
	}else{
		obj.hide();
		obj.next().show();
	}
}

$(".answer-btn").on("touchend",function(){
	var $this=$(this);
	$this.addClass("answer-on-btn").siblings().removeClass("answer-on-btn");
	$this.closest(".page").attr("data-answer",$this.attr("data-rel"));	
})

$(".select").on("touchend",function(){
	$this=$(this);
	$this.toggleClass("selected");
	if($(".selected").size()>2){
		$this.removeClass("selected");
		alert("最多选择两件！");
	}else if($(".selected").size()==2){
		var tmepArr = [];
		$(".selected").each(function(){
			tmepArr.push($(this).attr("data-rel"));
		})
		$this.closest(".page").attr("data-answer",tmepArr.sort().join(""));
	}
})

/*--------弹窗相关函数-------*/

/*-----------再想一想-------------*/
$(".think-again-btn").on("touchend",function(){ 
   $popbox.hide();	
});

/*----------确定交卷-------------*/
$(".confirm-btn").on("touchend",function(){ 
	checkResult(); 
});

var checkResult=function(){
	var checkNum=0;
	$("#box .page").each(function(){
		var $this=$(this);
		var checkAnswer=$this.attr("data-answer");

		var checkRel = $this.attr("data-rel");

		var rightAnswer =  data["q"+checkRel].rightAnswer; //正确答案
		if(rightAnswer.indexOf(checkAnswer)>=0){ //对比答案是否正确
		     checkNum+=30;	
		}
	})
	$("#box,.pop-box").hide(); 
	if(checkNum>=0&&checkNum<=40){//0~40分弱智儿童
		resultDetail=result.r1; 
	}else if(checkNum>=60 && checkNum<=80){//60~80分马马虎虎
	   resultDetail=result.r3;
	}else if(checkNum>80){//100分顶尖大神
	   resultDetail=result.r2;
	}	
	$(".result-tit-detail").html(resultDetail.resultTitle);
	$(".result-page img").attr("src",imgSrc+resultDetail.resultImg);
	$(".result-page p").html('<span>'+checkNum+'分！</span>'+resultDetail.resultCon);
	$(".result-page").show();	
}

/*-----------再试一次------------*/
$(".one-more-btn").on("touchend",function(){
	var browser=checkMobile();
	if(browser.ios){
		window.location.reload(); //重新加载
	}
	if(browser.android){
        var url =window.location.href;
		if(url.lastIndexOf("?")>0){
			url=url.replace(url.lastIndexOf("?")+1,Math.random());
		}else{
			url+="?"+Math.random();	
		}
		window.location.href=url;
	 }
});
/*-----------判断是否是微信打开----------------*/
var is_weixin=function(){  
    var ua = navigator.userAgent.toLowerCase();  
    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
        return true;  
    } else {  
        return false;  
    }  
} 

/*-----------炫耀一下-----------*/
$(".show-off-btn").on("touchend",function(){
   if(is_weixin){
	   //weixin.initShare(sharedata); 
   }else{
	  if(typeof window.CosBox.share=='undefind'){
	   $(".update").addClass('show');	
	   }else{
		   var title='我在掌上英魂之刃的答题活动中获得了"'+name+'"称号',
			   desc=resultDetail.resultCon,
			   url='http://answer.php.millylee.cn/index.shtml';
		 CosBox.share(title,desc,url);
	   } 
   } 
});

/*------------微信分享弹窗关闭--------------*/
$(".share-box").on("touchend",function(){
	$(this).hide();
});


