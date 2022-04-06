window.addEventListener('load', function() { //窗口加载事件，当 html、css 等文件加载完成之后，加载 js 文件
    var num = 1; //所下棋子个数
    var box = document.querySelector('#box');
    var lis = box.querySelectorAll('li');
    var str = ['012', '345', '678', '036', '147', '258', '048', '246']; //胜利方式枚举 表示第几个 li
    var btn = document.querySelector('button');
    var span = document.querySelectorAll('span');
    span[0].classList.add('bgc'); //初始化第一个棋子为 o
    var flag = false; //节流阀 某一方胜利或者和局时删除绑定事件

    for (i = 0; i < lis.length; i++) {
        lis[i].addEventListener('click', fn); //对每个 li 绑定点击事件
    }

    function fn() { //点击事件回调函数
        if (flag) { //重置九宫格
            alert('游戏已经结束，请刷新或重置重新开始！');
            lis[i].removeEventListener('click', fn);
        }
        // 1.下棋
        if (this.className == '') { //点击的当前 li 添加类，同时显示下一个棋子的类型
            if (num % 2 == 1) {
                this.className = 'iconfont icon-yuanquan';
                span[0].classList.remove('bgc');
                span[1].classList.add('bgc');
            } else {
                this.className = 'iconfont icon-cuocha_kuai red';
                span[0].classList.add('bgc');
                span[1].classList.remove('bgc');
            }
            num++;
        }
        // 2.判断是否获胜
        if (num > 5 && num <= 9) { //棋盘上棋子达到 5 个时开始检查是否某一方获胜
            for (var i = 0; i < str.length; i++) {
                var s = str[i].split('');
                if (lis[parseInt(s[0])].getAttribute('class') == 'iconfont icon-yuanquan' && lis[parseInt(s[1])].getAttribute('class') == 'iconfont icon-yuanquan' && lis[parseInt(s[2])].getAttribute('class') == 'iconfont icon-yuanquan') {
                    // 某一方获胜后将不能再下棋子，需重置九宫格
                    alert('o方胜利，游戏结束！');
                    span[0].classList.remove('bgc');
                    span[1].classList.remove('bgc');
                    flag = true;
                } else if (lis[parseInt(s[0])].getAttribute('class') == 'iconfont icon-cuocha_kuai red' && lis[parseInt(s[1])].getAttribute('class') == 'iconfont icon-cuocha_kuai red' && lis[parseInt(s[2])].getAttribute('class') == 'iconfont icon-cuocha_kuai red') {
                    alert('x方胜利，游戏结束！');
                    span[0].classList.remove('bgc');
                    span[1].classList.remove('bgc');
                    flag = true;
                }
            }
        } else if (num > 9) {
            flag = true;
            span[0].classList.remove('bgc');
            span[1].classList.remove('bgc');
            return alert('和局，游戏结束！');
        }
    }
    // 3.手动重置九宫格
    btn.addEventListener('click', function() {
        for (i = 0; i < lis.length; i++) {
            lis[i].setAttribute('class', '');
            span[0].classList.add('bgc');
            span[1].classList.remove('bgc');
            num = 1;
            flag = false;
        }
    })

})