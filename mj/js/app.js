window.onload = function () {
	init();
    
    //获取音频元素
    var musicBgm = document.getElementById('music-bgm'),
        musicBtn = document.getElementById('music-btn'),
        musicChick0 = document.getElementById('music-chick0'),
        musicChick1 = document.getElementById('music-chick1'),
        musicChick5 = document.getElementById('music-chick5'),
        musicWin = document.getElementById('music-win'),
        musicFail = document.getElementById('music-fail'),
        musicStart = document.getElementById('music-start');
   //musicBtn.play();
    $('.btn-music').on('click', function () {
        if (musicBgm.muted == true) {
            musicBgm.muted = false;
            musicBtn.muted = false;
            musicChick0.muted = false;
            musicChick1.muted = false;
            musicChick5.muted = false;
            musicWin.muted = false;
            musicFail.muted = false;
            musicStart.muted = false;
            $(this).addClass('on');
        } else {
            musicBgm.muted = true;
            musicBtn.muted = true;
            musicChick0.muted = true;
            musicChick1.muted = true;
            musicChick5.muted = true;
            musicWin.muted = true;
            musicFail.muted = true;
            musicStart.muted = true;
            $(this).removeClass('on');
        }
    });
	 

    //首屏slogan动画
    $('#slogan.in').on("webkitAnimationEnd", function () {
        $(this).attr('class', 'act');
    }, false);
    //首屏小鸡一号入场动画
    $('.door').on("webkitAnimationEnd", function () {
        $('.chickOne').addClass('in');
        $('.chickTwo').addClass('in');
        $('.chickThree').addClass('in');
        $('.left-things').addClass('in');
        $('.right-things').addClass('in');
    }, false);
    //首屏小鸡一号动作动画
    $('.chickOne').on("webkitAnimationEnd", function () {
        $('.chickOne .eyes').addClass('act');
        $('.chickOne .wings').addClass('act');
        //首屏文字出现
        $('.words').addClass('in');
    }, false);
    //首屏文字动效
    var changeWordsAct = function () {
        $('.words').removeClass('in');
        $('.words').addClass('act');
        $('.words').off(changeWordsAct);
    };
    $('.words').on("webkitAnimationEnd", changeWordsAct, false);
    //首屏小鸡二号眨眼
    $('.chickTwo').on('webkitAnimationEnd', function () {
        $('.chickTwo .eyes').addClass('act');
    });
    //首屏小鸡三号眨眼
    $('.chickThree').on('webkitAnimationEnd', function () {
        $('.chickThree .eyes').addClass('act');
        //开始按钮进入
        $('.start-btn').addClass('in');
    });
    //首屏开始按钮动画
    $('.start-btn').on('webkitAnimationEnd', function () {
        $('.start-btn').removeClass('in');
        $('.start-btn').addClass('act');
    });
    //小鸡冒头函数
    var scoreAdd = ['0', '1', '5'],
        gameScore = 0,
        gameSec = 15,
        timeChickOut = 1500;

    //随机小鸡冒头
    function chickShow(num) {
        var objEgg = $('.egg' + num + ' i');
        if (!objEgg.hasClass('act')) {
            objEgg.addClass('act').addClass('chick-score-' + scoreAdd[parseInt(3 * Math.random())]);
            return true;
        }                                                                                           
        return false;
    }

    //游戏定时句柄
    function chickShowHandle() {
        /*var iCount = 0;
        while (iCount < 3) {
            if (chickShow(1 + parseInt(8 * Math.random()))) {
                iCount++;
            }
        }
        gameSec--;
        $('.time-count').html(gameSec + 's');
        if (gameSec > 0) {
            setTimeout(chickShowHandle, 1500);
        } else {
            //游戏结束
            gameOver();
        }*/
        var iCount = 0;
        while (iCount < 1) {
            if (chickShow(1 + parseInt(8 * Math.random()))) {
                iCount++;
            }
        }
        if (gameSec > 0){
            setTimeout(chickShowHandle, timeChickOut);
            if (timeChickOut >300){
                timeChickOut = timeChickOut*.7;
            }
        }
    }

    //计时函数
    function  timeCount () {
        gameSec--;
        $('.time-count').html(gameSec + 's');
        if (gameSec > 0) {
            setTimeout(timeCount, 1000);
        } else {
            //游戏结束
            gameOver();
        }
    }

    //小鸡动画结束事件
    $('.egg').on('webkitAnimationEnd', 'i', function () {
        $(this).attr('class', '').next().removeClass('touched')
    });
    //点击小鸡事件
    $('.egg').on('touchstart', function () {
        if ($(this).find('.act').length == 0) {
            return;
        }
        if (!$(this).find('i').eq(0).next().hasClass('touched')) {
            gameScore += parseInt(($(this).find('i').eq(0).attr('class'))[16]);
            $('.score span').html(gameScore);
            $(this).find('i').eq(0).next().addClass('touched');
            switch (parseInt(($(this).find('i').eq(0).attr('class'))[16])) {
                case 0:
                    musicChick0.play();
                    break;
                case 1:
                    musicChick1.play();
                    break;
                case 5:
                    musicChick5.play();
                    break;
                default:
                    break;
            }
        }
    });

    //首屏按钮事件
    $('.start-btn').on('click', function () {
        $('.pageOne').hide();
        $('.pageTwo').show();
        $('.btn-music').addClass('game');
        musicBgm.muted = false;
        musicBtn.muted = false;
        musicChick0.muted = false;
        musicChick1.muted = false;
        musicChick5.muted = false;
        musicWin.muted = false;
        musicFail.muted = false;
        musicStart.muted = false;
        musicBtn.play();
        $('.btn-music').hide();
    });

    //引导页按钮事件
    $('.btn-start-game').on('click', function () {
        $('.rule-box').hide();
        $('.mask').show();
        $('.mask i').addClass('count-three');
        musicBtn.play();
        //禁止滑动
        $('body').on('touchmove', function (event) {
            event.preventDefault();
        });
    });

    //倒计时动画结束事件
    $('.pageTwo .mask').on('webkitAnimationEnd', '.count-three', function () {
        $('.mask').html('').html('<i class="count-two"></i>');
    });
    $('.pageTwo .mask').on('webkitAnimationEnd', '.count-two', function () {
        $('.mask').html('').html('<i class="count-one"></i>');
    });
    $('.pageTwo .mask').on('webkitAnimationEnd', '.count-one', function () {
        $('.mask').html('').html('<i class="count-start"></i>');
        musicStart.play();
    });
    $('.pageTwo .mask').on('webkitAnimationEnd', '.count-start', function () {
        $('.pageTwo .mask').hide();
        $(this).attr('class', '');
        $('.score span').html(gameScore);
        $('.time-count').html(gameSec + 's');
        chickShowHandle();
        timeCount ();
        $('.btn-music').show();
    });

    //游戏结束函数
    var timerTimeLast = false;

    function gameOver() {
        $('.btn-music').hide();
        //可以滑动
        $('body').unbind('touchmove');
        if (gameScore >= 30) {
            //进入抽奖页面
            musicWin.play();
            $('.pageTwo').hide();
            $('.pageThree,.game-win').show();
            goldRain();
            setTimeLast();
            timerTimeLast = setInterval(function () {
                setTimeLast();
            }, 1000);
            function setTimeLast() {
                var myDate = new Date(),
                    myHour = (23 - myDate.getHours()) > 9 ? ((23 - myDate.getHours()) + '') : ('0' + (23 - myDate.getHours())),
                    myMin = (60 - myDate.getMinutes()) > 9 ? ((60 - myDate.getMinutes()-1) + '') : ('0' + (60 - myDate.getMinutes()-1)),
                    mySec = (60 - myDate.getSeconds()) > 9 ? ((60 - myDate.getSeconds()-1) + '') : ('0' + (60 - myDate.getSeconds()-1));
                $('.time-last').html(myHour + ':' + myMin + ':' + mySec);
            }
            $('.chance-last').html(parseInt(gameScore / 30));
        } else {
            //进入失败提示页面
            musicFail.play();
            $('.pageTwo').hide();
            $('.pageThree,.game-fail').show();
            $('.game-fail').on('click', function () {
                //显示最后一屏
                musicBtn.play();
                $('.btn-music').show();
                $('.game-fail').hide();
                $('.last-page').show();
                var liWidth = $('.lunbo li').width(),
                    moveWidth = 0,
                    objLunboUl = $('.lunbo ul'),
                    objClone;
                setInterval(function () {
                    if (moveWidth < liWidth) {
                        objLunboUl.css('transform', 'translateX(-' + moveWidth + 'px)');
                        moveWidth++;
                    } else {
                        objLunboUl.css('transform', 'translateX(0px)');
                        moveWidth = 0;
                        objClone = objLunboUl.find("li").eq(0).clone();
                        objLunboUl.find("li")[0].remove();
                        objLunboUl.append(objClone);
                    }
                }, 10);
            });
        }
    }

    //金币雨函数
    function goldRain() {
        var icount = 0;
        while (icount < 35) {
            setTimeout(function () {
                $('.game-win').append('<div class="icon-gold-' + parseInt(1 + 3 * Math.random()) + '" style="left:' + parseInt(1 + 650 * Math.random()) + 'px"></div>');
            }, 1 + parseInt(3000 * Math.random()));
            icount++;
        }
    }

    $('.icon-gold-1,.icon-gold-2,.icon-gold-3').on('webkitAnimationEnd', function () {
        $(this).hide();
    });

    //抽奖按钮
    $('.btn-try').on('click', function () {
        if ($('.txt-pao').hasClass('act')) {
            return;
        }
        musicBtn.play();
        showResult(10, true);
        if (parseInt($('.chance-last').html()) < 1) {
            $('.game-win').on('click', function () {
                //显示最后一屏
                musicBtn.play();
                if(timerTimeLast){
                    clearInterval(timerTimeLast);
                }
                $('.btn-music').show();
                $('.game-win').hide();
                $('.last-page').show();
                var liWidth = $('.lunbo li').width(),
                    moveWidth = 0,
                    objLunboUl = $('.lunbo ul'),
                    objClone;
                setInterval(function () {
                    if (moveWidth < liWidth) {
                        objLunboUl.css('transform', 'translateX(-' + moveWidth + 'px)');
                        moveWidth++;
                    } else {
                        objLunboUl.css('transform', 'translateX(0px)');
                        moveWidth = 0;
                        objClone = objLunboUl.find("li").eq(0).clone();
                        objLunboUl.find("li")[0].remove();
                        objLunboUl.append(objClone);
                    }
                }, 10);
            });
        }
        $('.chance-last').html(parseInt($('.chance-last').html()) - 1);
    });
    $('.txt-pao').on('webkitAnimationEnd', function () {
        $(this).removeClass('act');
    });

    //显示抽奖结果
    function showResult(num, flag) {
        $('.txt-pao i').html(num);
        $('.txt-pao').addClass('act');
        /* 抽中赠品时 */
        if (flag == true) {
            $('.txt-pao').removeClass('txt-pao-ts').addClass('txt-pao-zp');
            /* 抽中时 */
        } else {
            $('.txt-pao').removeClass('txt-pao-zp').addClass('txt-pao-ts');
        }
    }

    //奖品按钮
    $('.btn-prizes').on('click', function () {
        musicBtn.play();
        $('.last-page').addClass('pop-prizes-on');
        $('.btn-music').hide();
    });
    $('.pop-prizes, .pop-prizes-on .mask').on('click', function () {
        musicBtn.play();
        $('.last-page').removeClass('pop-prizes-on');
        $('.btn-music').show();
    });
    //分享按钮
    $('.btn-share').on('click', function () {
        musicBtn.play();
        $('.last-page').addClass('share-tip-on');
        $('.btn-music').hide();
        $('.share-tip-on .share-tip, .share-tip-on .mask').on('click', function () {
            musicBtn.play();
            $('.last-page').removeClass('share-tip-on');
            $('.btn-music').show();
        });
    });

    //二维码按钮
    $('.btn-qrcode').on('click', function () {
        musicBtn.play();
        $('.last-page').addClass('qrcode-on');
    });
    $('.last-page').on('click', '.img-qrcode', function () {
        musicBtn.play();
        $('.last-page').removeClass('qrcode-on');
    });

    /* init */
    function init() {
        $('.loading').show();
        $('.btn-music').show();
		
        //判断资源加载情况
        var loadImgtotal = $('.imgResource img').length,
            loadImgCount = 0;

        function getloaded() {
            loadImgCount = 0;
            for (var i = 0; i < loadImgtotal - 1; i++) {
                if ($('.imgResource img')[i].width > 0) {
                    loadImgCount++;
                }
            }
            if (loadImgCount == loadImgtotal - 1) {
                setTimeout(function () {
                    $('.loading').hide();
                    $('.pageOne').show();
                }, 2000);
            } else {
                setTimeout(function () {
                    getloaded();
                }, 1000);
            }
        }

        getloaded();
		
    }

    /*$('.pop-bind').on('click', function () {
        init();
        musicBtn.play();
    });*/

    /*//音频
     createjs.Sound.addEventListener("fileload", handleLoadComplete);
     createjs.Sound.registerSound({src:"music/bgm.mp3", id:"sound"});
     function handleLoadComplete(event) {
     createjs.Sound.play("sound");
     }
     //加载队列
     var manifest = [
     {src: "music/bgm.mp3", id: "click"}
     ];*/


    //判断手机横竖屏状态：
    function hengshuping() {
        if (window.innerWidth < window.innerHeight) {
            $('#henping-mask').hide();
        }
        if (window.innerWidth > window.innerHeight) {
            $('#henping-mask').show();
        }
    }

    window.addEventListener("resize", hengshuping, false);
    hengshuping();
};

