    //<!--�ȉ�jquery�̐ݒ�ƂȂ�܂�-->


    //<!-- �w�b�_�[�̍����������R���e���c��������-->

    $(function () {
        var height = $(".site-header").height();
        $("body").css("margin-top", height + 30); //30px�����]�T����������
    });



    //<!-- �X���[�Y�X�N���[�������̋L�q -->

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



    //<!-- �œ������̐ݒ�-->


    function doHighlight() {
        var word = $("#word").val()
            .replace(/^\s+|\s+$/g, "") //�O��̋󔒂�����(g�I�v�V�����͌J��Ԃ�)
            .replace(/\s+/g, " ") //�A������󔒂�1��
            .split(" ");
        for (i in word) { //�v�f���Ԃ񃋁[�v(i�ɂ͓Y��������)
            if (word[i] != "") { //�󕶎��ł���Ώ������Ȃ�
                $("body").removeHighlight(); // �Č����̎��Ahighlight�̍Đݒ� �����𑱂��ĂQ�񂷂�Ɠ����Ȃ��H
                $("body").highlight(word[i]); //#target���̃e�L�X�g�ɑ΂��A�������̌��Ńn�C���C�g

                var ypos = $(".highlight").offset().top;
                // window.scrollTo(0 /*�@���@*/, ypos�@/* �c�@*/);�@//�@�����܂ŃX�N���[��
                window.scrollTo({
                    left: 0 /*�@���@*/ ,
                    top: ypos - 35 /* �c�@*/ ,
                    behavior: "smooth" /* �X���[�Y�@*/
                });
                $(".remove_btn").click(function () {
                    $("body").removeHighlight(); //.highlight�N���X���폜
                    $("#word").val(""); //���������󗓂ɂ���
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
            if (text == "�œ�����/Google�T�C�g������") {
                $('#word').val("");
                $('#word').css("color", "black");
            }
        } else {
            if (text == "") {
                $('#word').val("�œ�����/Google�T�C�g������");
                $('#word').css("color", "#999");
            }
        }
    }

    function search_submit() {
        var last_keyword = $('#word').val();
        window.location.href = "https://www.google.com/search?hl=ja&hq=inurl:www.arsvi.com&ie=Shift_JIS&oe=Shift_JIS&filter=0&q=" + last_keyword;
    }



    //<!-- �{�^���A�łɂ��s����-->


    $(function () {

        // �����L�����Z���̃t���O���`�F0�c�����\�@1�c�L�����Z��
        var cancelFlag = 0;

        //++++++++++++++++++++++++++++
        //�N���b�N�������ɒ�����������������

        $('#clickKey').on('click', function () {

            if (cancelFlag == 0) {
                //++++cancelFlag��0�ł���Ώ����J�n+++++

                // 1. �܂�cancelFlg�𗧂Ă�i1�ɂ���j
                cancelFlag = 1;

                // 2. �������L�q�i�����10000�~���b������A�j���[�V�����j
                $('#moveBox').css('width', '0').animate({
                    width: '100%'
                }, 10000);

                // 3. �������I�������cancelFlag�����낷�i0�ɖ߂��j
                setTimeout(function () {
                    cancelFlag = 0;
                }, 10000);

            }

        });

    });
