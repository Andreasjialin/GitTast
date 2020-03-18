/*
    遵从AMD规范
*/
define(["jquery"],function($){
    //封装函数
    function index(){
        $(function(){
            var oUl = $(".banner").find(".imgBox");
            var aBtns = $(".banner").find("ol li");
            var iNow = 1; //当前显示图片的下标
            var timer = null;
    
            //点击按钮的时候实现图片的切换
            aBtns.click(function(){
                iNow = $(this).index() + 1;
                tab();
            })
    
    
            //自动轮播
            timer = setInterval(function(){
            iNow++;
            tab();
            }, 2000);
    
            //封装一个切换的函数
            function tab(){
            aBtns.removeClass("active").eq(iNow - 1).addClass("active");
            if(iNow == 8){
                aBtns.eq(0).addClass("active");
            }
            oUl.animate({left: -iNow * 1280}, 800, function(){
                if(iNow == 8){
                oUl.css("left", -1280);
                iNow = 1;
                }
                if(iNow == 0){
                oUl.css("left", 7 * -1280);
                iNow = 7;
                }
            });
            }
    
    
            //移入移出
            $(".banner").mouseenter(function(){
            clearInterval(timer);
            }).mouseleave(function(){
                timer = setInterval(function(){
                iNow++;
                tab();
            }, 2000);
            })
    
            //添加左右切换
            $(".leftRightTabs").find("a").click(function(){
            if(this.className == 'left'){
                iNow--;
                tab();
            }else{
                //右
                iNow++;
                tab();
            }
            return false; //阻止默认行为
            })
        })
    }
    

    return{
        index:index
    }
})