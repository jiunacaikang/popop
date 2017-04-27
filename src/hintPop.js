(function($){
    $.prototype.hintPop = function(options) { //定义插件的名称，这里为fnPop
 		var dft = {
            _target:"_self"||{},  //连接跳转方式
 			_url: "javascript:;"||{}, //链接
 			_title:"操作提示"||{},
 			_content:"显示hintPop弹框"||{},//内容
            _activebg:"#dedede"||{},       // 弹框 确定取消 背景active颜色
            _bg:"rgba(255,255,255,0.9)"||{}, //弹框 确定取消 背景颜色
            _confirm:function(){
                console.log("confirm");
            },
            _cancel:function(){
                console.log("cancel");
            }
 		};
        var ops = $.extend({},dft,options);

        if($("#hint-pop").html()){
            $("#hint-pop").show().find(".hint-title").text(ops._title).siblings('.hint-con').text(ops._content);
            $("#hint-pop").find("._confirm").attr("href",ops._url).attr("target",ops._target);
        }else{
            var popCon='<div id="hint-pop" class="hint-pop">'
                            +'<div class="hint">'
                                +'<div class="hint-top">'
                                    +'<div class="hint-title">'+ops._title+'</div>'  
                                    +'<div class="hint-con">'+ops._content+'</div>'         
                                +'</div>'
                                +'<div class="hint-button">'
                                    +'<a href="'+ops._url+'" class="_confirm" target="'+ops._target+'">确定</a>'
                                    +'<a href="javascript:;" class="_cancel cc">取消</a>'
                                +'</div>'
                            +'</div>'
                        +'</div>';

            $("body").append(popCon); //添加
        }

        $(".hint-button a", $("body")).off("click touchstart touchmove touchend");

        $(".hint-button ._confirm", $("body")).on('click', function(){ 
            $(".hint-pop").fadeOut(200, function() {
                $("#hint-pop").hide();
                if(typeof(ops._confirm)=="function"){
                    ops._confirm();
                }
            });
        });

        $(".hint-button ._cancel", $("body")).on('click', function(){
            $(".hint-pop").fadeOut(200, function() {
                $("#hint-pop").hide();
                if(typeof(ops._cancel)=="function"){
                    ops._cancel();
                }
            });
        });

        $(".hint-button a", $("body")).on('touchstart touchmove touchend', {
            a: ops._activebg /*点击active颜色*/ ,
            b: ops._bg /*初始颜色*/
        }, touch);
    };

    function touch (event){
        var event = event || window.event,
            a=event.data.a,
            b=event.data.b;
        switch(event.type){
            case "touchstart":
                $(this).css("background",a);
                break;
            case "touchmove":
                $(this).css("background",b);
                break;
            case "touchend":
                 $(this).css("background",b);
                break;
         }           
    };
})(jQuery);
