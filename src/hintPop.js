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
        content:"显示Pop弹框",  //弹框 内容
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
    var hintCon = '<div class="hint">hint show~</div>';          
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
            $$("popBox").className = "popBox";
            $$("popBox").style.display = "block";
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
    function popHide(){
        $$("popBox").className += " hide";
        setTimeout(function(){$$("popBox").style.display = 'none'}, 300);
        if(this.id==="_confirm"){
            if(typeof(dftOpt.confirm)=="function"){
                dftOpt.confirm();
            }
        }else if(this.id==="_cancel"){
            if(typeof(dftOpt.cancel)=="function"){
                dftOpt.cancel();
            }
        }
        this.style.backgroundColor = dftOpt.bg;
    };
    function bindClick(opt){
        $$("_confirm").addEventListener('touchstart', function(event){
            $$("_confirm").style.backgroundColor = opt.activebg;
            $$("_confirm").addEventListener('touchend', popHide);
        });
        $$("_confirm").addEventListener('touchmove', function(event){
            $$("_confirm").style.backgroundColor = opt.bg;
            $$("_confirm").removeEventListener("touchend",popHide);
        });

        $$("_cancel").addEventListener('touchstart', function(event){
            $$("_cancel").style.backgroundColor = opt.activebg;
            $$("_cancel").addEventListener('touchend', popHide);
        });
        $$("_cancel").addEventListener('touchmove', function(event){
            $$("_cancel").style.backgroundColor = opt.bg;
            $$("_cancel").removeEventListener("touchend",popHide);
        });    
    };
    function popFn(opt){
        showPop(opt);
    };
    function showHint(str){
        hintCon = '<div class="hint">'+(str||"hint show~")+'</div>';
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
        setTimeout(function(){
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
