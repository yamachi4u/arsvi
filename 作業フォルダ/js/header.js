    //<!--以下jqueryの設定となります-->


    //<!-- ヘッダーの高さ分だけコンテンツを下げる-->

    $(function () {
        var height = $(".site-header").height();
        $("body").css("margin-top", height + 30); //30pxだけ余裕をもたせる
    });



    //<!-- スムーズスクロール部分の記述 -->

    $(function () {
        $('a[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 35
                    }, 500);
                    return false;
                }
            }
        });
    });



    //<!-- 頁内検索の設定-->


    function doHighlight() {
        var word = $("#word").val()
            .replace(/^\s+|\s+$/g, "") //前後の空白を除去(gオプションは繰り返し)
            .replace(/\s+/g, " ") //連続する空白を1つに
            .split(" ");
        for (i in word) { //要素数ぶんループ(iには添字が入る)
            if (word[i] != "") { //空文字であれば処理しない
                $("body").removeHighlight(); // 再検索の時、highlightの再設定 検索を続けて２回すると動かない？
                $("body").highlight(word[i]); //#target内のテキストに対し、処理中の語句でハイライト

                var ypos = $(".highlight").offset().top;
                // window.scrollTo(0 /*　横　*/, ypos　/* 縦　*/);　//　そこまでスクロール
                window.scrollTo({
                    left: 0 /*　横　*/ ,
                    top: ypos - 35 /* 縦　*/ ,
                    behavior: "smooth" /* スムーズ　*/
                });
                $(".remove_btn").click(function () {
                    $("body").removeHighlight(); //.highlightクラスを削除
                    $("#word").val(""); //検索窓を空欄にする
                });
            }
        }
    }

    function enter() {
        $("#word").keypress(function (e) {
            if (e.which == 13) {
                $("#search_btn1").click();
            }
        });
    }



    function search_window_flag(flag) {
        var text = $('#word').val();
        if (flag == 1) {
            if (text == "頁内検索/Googleサイト内検索") {
                $('#word').val("");
                $('#word').css("color", "black");
            }
        } else {
            if (text == "") {
                $('#word').val("頁内検索/Googleサイト内検索");
                $('#word').css("color", "#999");
            }
        }
    }

    function search_submit() {
        var last_keyword = $('#word').val();
        window.location.href = "https://www.google.com/search?hl=ja&hq=inurl:www.arsvi.com&ie=Shift_JIS&oe=Shift_JIS&filter=0&q=" + last_keyword;
    }



    //<!-- ボタン連打による不具合回避-->


    $(function () {

        // 処理キャンセルのフラグを定義：0…処理可能　1…キャンセル
        var cancelFlag = 0;

        //++++++++++++++++++++++++++++
        //クリックした時に長い長い処理をする

        $('#clickKey').on('click', function () {

            if (cancelFlag == 0) {
                //++++cancelFlagが0であれば処理開始+++++

                // 1. まずcancelFlgを立てる（1にする）
                cancelFlag = 1;

                // 2. 処理を記述（今回は10000ミリ秒かかるアニメーション）
                $('#moveBox').css('width', '0').animate({
                    width: '100%'
                }, 10000);

                // 3. 処理が終わったらcancelFlagをおろす（0に戻す）
                setTimeout(function () {
                    cancelFlag = 0;
                }, 10000);

            }

        });

    });
