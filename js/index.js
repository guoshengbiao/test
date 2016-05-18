/**
 * Created by tangsuan on 2016/5/16.
 */
$(document).on('touchmove',function(ev){
    ev.preventDefault();
});
$(function(){

    // 1.先适配
    //var winW=$(window).width();
    //var winH=$(window).height();
    var desW=640/2;
    var desH=960/2;

    var $box=$('#box');
    var $li=$('#box>ul>li');
    //if(winW/winH<=desW/desH){
    //    $box.css('transform','scale('+(winH/desH)+')');
    //}else{
    //    $box.css('transform','scale('+(winW/desW)+')');
    //}

    //2.滑屏
    slidePage();
    function slidePage() {
        var step = 1 / 4;
        var nowIndex = 0;
        var next = 0;
        var flag = true;

        $li.on('touchstart', function (e) {
            var startY = e.originalEvent.touches[0].pageY;
            if(flag==false)return;
            curIndex = $(this).index();
            $li.on('touchmove.move', function (e) {
                var touchY = e.originalEvent.touches[0].pageY;
                var moveY = touchY - startY;
                if (moveY > 0) {//向下滑
                    next = curIndex == 0 ? $li.length - 1 : curIndex - 1;
                    $li.eq(next).css('transform', 'translate(0,' + (-desH + moveY) + 'px)');
                } else if (moveY < 0) {//向上滑
                    next = curIndex == $li.length - 1 ? 0 : curIndex+1;
                    $li.eq(next).css('transform', 'translate(0,' + (desH  + moveY) + 'px)');
                }else{
                    flag=true;
                }
                $li.eq(next).addClass('zIndex').show();
         $(this).css('transform', 'translate(0,' + moveY * step + 'px) ' +
             'scale(' + (1 - Math.abs(moveY) / (desH) * step) + ')');

            });
            $li.on('touchend.move', function (e) {
                var touch = e.originalEvent.changedTouches[0].pageY;
                if(touch<startY){
                    $(this).css('transform','translate(0,'+(-desH*step)+'px) scale('+(1-step)+')');
                }else if(touch>startY){
                    $(this).css('transform','translate(0,'+(desH*step)+'px) scale('+(1-step)+')');
                }else {
                    flag=true;
                }
                $li.eq(next).css('transform', 'translate(0,0)');
                $li.eq(next).css('transition','.3s');
                $li.eq(curIndex).css('transition','.3s');
                $li.off('.move')
            });

        });
        $li.on('transitionend webkitTransitionend', function (e) {
            $li.css('transform','');
            $li.css('transition','');
            $li.eq(next).removeClass('zIndex').siblings('li').hide();
            flag=true;
        })

    }


});
