(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS之类的
        module.exports = factory();
    } else {
        // 浏览器全局变量
        root.hintPop = factory();
    }
}(window, function () {
    function $$(id){
        return document.getElementById(id);
    };
    var dftOpt= {
        title:"操作提示",           //弹框 title
        content:"显示hintPop弹框",  //弹框 内容
        activebg:"#dedede",         //弹框 确定/取消 背景active颜色
        bg:"rgba(255,255,255,0.9)", //弹框 确定/取消 背景颜色
        url: "javascript:;",        //弹框 点击确定 链接跳转
        target:"_self",             //弹框 连接跳转方式
        confirm:function(){         //弹框 点击确认回调函数
            console.log("confirm");
        },
        cancel:function(){          //弹框 点击取消回调函数 
            console.log("cancel");
        }
    };
    function showPop(opt){
        dftOpt = {
            title:opt&&opt.title||"操作提示",
            content:opt&&opt.content||"显示hintPop弹框",
            activebg:opt&&opt.activebg||"#dedede",
            bg:opt&&opt.bg||"rgba(255,255,255,0.9)",
            url:opt&&opt.url|| "javascript:;",
            target:opt&&opt.target||"_self",
            confirm:opt&&opt.confirm||function(){
                console.log("confirm");
            },
            cancel:opt&&opt.cancel||function(){
                console.log("cancel");
            }
        };
        var popCon ='<div class="pop">'
                        +'<div class="pop-top">'
                            +'<div class="pop-title">'+dftOpt.title+'</div>'  
                            +'<div class="pop-con">'+dftOpt.content+'</div>'         
                        +'</div>'
                        +'<div class="pop-button">'
                            +'<a href="'+dftOpt.url+'" id="_confirm" class="_confirm" target="'+dftOpt.target+'">确定</a>'
                            +'<a href="javascript:;" id="_cancel" class="_cancel">取消</a>'
                        +'</div>'
                    +'</div>';
        if($$("popBox")){
            $$("popBox").style.display = "block";
            $$("popBox").className = "popBox";
            $$("popBox").innerHTML = popCon;
        }else{
            var div = document.createElement("div");
            div.setAttribute("id", "popBox");
            div.setAttribute("class", "popBox");
            div.innerHTML = popCon;
            document.body.appendChild(div);
        }
        bindClick(dftOpt);
    };
    function popHide(event){
        if(event.target.id==="_confirm"){
            if(typeof(dftOpt.confirm)=="function"){
                dftOpt.confirm();
            }
        }else if(event.target.id==="_cancel"){
            if(typeof(dftOpt.cancel)=="function"){
                dftOpt.cancel();
            }
        }else{
            return false;
        }
        $$("popBox").className += " hide";
        setTimeout(function(){$$("popBox").style.display = 'none'}, 300);
        event.target.style.backgroundColor = dftOpt.bg;
    };
    function bindClick(opt){  
        $$("popBox").addEventListener('touchstart', function(event){
            if(event.target.id === "_confirm" || event.target.id === "_cancel"){
                event.target.style.backgroundColor = opt.activebg;
                $$("popBox").addEventListener('touchend', popHide);
            }
        });
        $$("popBox").addEventListener('touchmove', function(event){
            if(event.target.id === "_confirm" || event.target.id === "_cancel"){
                $$(event.target.id).style.backgroundColor = opt.bg;
                $$("popBox").removeEventListener("touchend",popHide);
            }
        });
        $$("popBox").addEventListener('touchend', popHide);  
    };
    function popFn(opt){
        showPop(opt);
    };

    function showHint(str){
        var hintCon = '<div class="hintOut"><div class="hint">'+(str||"hint show~")+'</div></div>';
        if($$("hintBox")){
            $$("hintBox").className = "hintBox";
            $$("hintBox").style.display = "block";
            $$("hintBox").innerHTML = hintCon;
        }else{
            var div = document.createElement("div");
            div.setAttribute("id", "hintBox");
            div.setAttribute("class", "hintBox");
            div.innerHTML = hintCon;
            document.body.appendChild(div);
        }
        setTimeout(function(){//显示1s后消失
            $$("hintBox").className = "hintBox hide";
            setTimeout(function(){$$("hintBox").style.display = "none";}, 300);
        }, 1000);
    };
    function hintFn(str){
        showHint(str);
    };
    return {
        hint : hintFn, //hint方法
        pop : popFn   //pop方法
    };
}));