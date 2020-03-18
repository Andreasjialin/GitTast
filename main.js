console.log("加载成功")

/*
    管理当前.html页面上引入的所有模块
*/
require.config({
    paths:{
        "jquery":"jquery-1.10.1",
        "jquery-cookie":"jquery.cookie",
        "parabola":"parabola",
        // "banner":"banner",
        "index":"index"
    },
    shim:{
        //设置依赖关系
        "jquery-cookie":["jquery"],
        //某一个模块，不遵从AMD
        "parabola":{
            exports:"_"
        }
    }
})

//使用模块 AMD规范
require(["index"],function(index){
    index.index();
})