var hintPop =(function(){
    function $$(id){
        return document.getElementById(id);
    };
    var dftOpt= {
        _title:"操作提示",           //弹框 title
        _content:"显示hintPop弹框",  //弹框 内容
        _activebg:"#dedede",         //弹框 确定/取消 背景active颜色
        _bg:"rgba(255,255,255,0.9)", //弹框 确定/取消 背景颜色
        _url: "javascript:;",        //弹框 点击确定 链接跳转
        _target:"_self",             //弹框 连接跳转方式
        _confirm:function(){         //弹框 点击确认回调函数
            console.log("confirm");
        },
        _cancel:function(){          //弹框 点击取消回调函数 
            console.log("cancel");
        }
    };
    var hintCon = '<div class="hint">hint show~</div>';          
    function showPop(opt){
        dftOpt = {
            _title:opt&&opt._title||"操作提示",
            _content:opt&&opt._content||"显示hintPop弹框",
            _activebg:opt&&opt._activebg||"#dedede",
            _bg:opt&&opt._bg||"rgba(255,255,255,0.9)",
            _url:opt&&opt._url|| "javascript:;",
            _target:opt&&opt._target||"_self",
            _confirm:opt&&opt._confirm||function(){
                console.log("confirm");
            },
            _cancel:opt&&opt._cancel||function(){
                console.log("cancel");
            }
        };
        var popCon ='<div class="pop">'
                        +'<div class="pop-top">'
                            +'<div class="pop-title">'+dftOpt._title+'</div>'  
                            +'<div class="pop-con">'+dftOpt._content+'</div>'         
                        +'</div>'
                        +'<div class="pop-button">'
                            +'<a href="'+dftOpt._url+'" id="_confirm" class="_confirm" target="'+dftOpt._target+'">确定</a>'
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
            if(typeof(dftOpt._confirm)=="function"){
                dftOpt._confirm();
            }
        }else if(this.id==="_cancel"){
            if(typeof(dftOpt._cancel)=="function"){
                dftOpt._cancel();
            }
        }
        this.style.backgroundColor = dftOpt._bg;
    };
    function bindClick(opt){
        $$("_confirm").addEventListener('touchstart', function(event){
            $$("_confirm").style.backgroundColor = opt._activebg;
            $$("_confirm").addEventListener('touchend', popHide);
        });
        $$("_confirm").addEventListener('touchmove', function(event){
            $$("_confirm").style.backgroundColor = opt._bg;
            $$("_confirm").removeEventListener("touchend",popHide);
        });

        $$("_cancel").addEventListener('touchstart', function(event){
            $$("_cancel").style.backgroundColor = opt._activebg;
            $$("_cancel").addEventListener('touchend', popHide);
        });
        $$("_cancel").addEventListener('touchmove', function(event){
            $$("_cancel").style.backgroundColor = opt._bg;
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
})();