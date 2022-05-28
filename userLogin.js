var captchaInputYn = 'N';

$(function() {

    fnInit();
            
    $("#login").mouseover(function(){
    $("#login").css({"cursor":"pointer"});
    
    });
}); 

function fnInit() {
    
    getid(document.loginForm);
    // 포커스
    if ($("#user_id")[0].value != "") {
        $("#pwd")[0].focus();
    } else {
        $("#user_id")[0].focus();
    }
}

$("#login").click(function(){
    
    if($.trim($("#user_id").val())==''){
        $("#user_id").focus();
        alert("아이디를 입력해 주세요.");
        return false;
    }
    if($.trim($("#pwd").val())==''){
        $("#pwd").focus();
        alert("비밀번호를 입력해 주세요.");
        return false;
    }
    
    var userId = $.trim($("#user_id").val());
    var password = $.trim($("#pwd").val());
    
    var key = CryptoJS.enc.Hex.parse("4D79456E6372797074696F6E4B657931");
    var iv = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
//    
    var d_passwd = CryptoJS.AES.encrypt(password, key, { iv: iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7}).ciphertext;
//    var rsaPublicKeyModulus = $.trim($("#rsaPublicKeyModulus").val());
//    var rsaPublicKeyExponent = $.trim($("#rsaPublicKeyExponent").val());
    
//    try {
//        encryptedForm(userId, password, rsaPublicKeyModulus, rsaPublicKeyExponent);
//        
//    } catch(err) {
//        alert(err);
//        return false;
//    }
    
//    if(captchaInputYn == 'Y'){
//        
//        var captchaInput = $.trim($("#captchaInput").val());
//        
//        $('#captchaInputVal').val(captchaInput);
//        $('#captchaInputYn').val(captchaInputYn);
//
//    };

    $("#user_id").val(userId);
    $("#securedUserId").val(userId);
    $("#securedPwd").val(d_passwd);
    saveid(document.loginForm);

//    var ajax_set = 
//    {             
//        form_name:"#loginForm",
//        url:"./login/actionLogin.do",
//        return_fn:function(jdata){doLoginResult(jdata);}
//    };
//  wini_ajaxSubmit(ajax_set, null);   
    
    var ajax_set = 
    {             
        form_name:"#frm2",
        url:"./login/actionLogin.do",
        return_fn:function(jdata){doLoginResult(jdata);}
    };

    wini_ajaxSubmit(ajax_set, null);
    
});

// 로그인 후처리
function doLoginResult(jdata) {
     if (jdata.errCd == "0") {
         //MM_moveURL("/index.jsp");
         //location.reload();
         location.href = "./index.jsp";
     } else if (jdata.errCd == "100") {
         alert("임시비밀번호로 로그인하셨습니다.\n 비밀번호를 변경하세요.");
         MM_moveURL("/index.jsp");
     } else {
         
         if(jdata.errCd == "-1"){
             alert(jdata.errMsg);
         }
         
         if(jdata.errCd == "-2"){
             location.reload();
         }

         if(jdata.errCd == "9"){
             alert(jdata.errMsg);
         }
         
//         if(jdata.errCd == "5" || jdata.errCd == "6"){
//             
//            captchaInputYn = 'Y';
//            fn_replaceSpamCaptchaimg();
//            $('#captchaInput').val('');
//            document.getElementById("loginCaptcha").style.display = "";
//        }
//        $('#pwd').val('');
//        $("#pwd").focus();
//        alert(jdata.errMsg);
        return;
     }
}

function encryptedForm(userId, password, rsaPublicKeyModulus, rsaPpublicKeyExponent) {
    var rsa = new RSAKey();
    rsa.setPublic(rsaPublicKeyModulus, rsaPpublicKeyExponent);

    // 사용자ID와 비밀번호를 RSA로 암호화한다.
    var securedUserId = rsa.encrypt(userId);
    var securedPwd = rsa.encrypt(password);

    $("#securedUserId").val(securedUserId);
    $("#securedPwd").val(securedPwd);
}


$("#b_id_save").click(function(){
    var c_obj = $("#checkId");
    if(c_obj.is(":checked")){
        c_obj.removeAttr("checked");
    } else {
        c_obj.prop("checked","checked");
    }
            
    return false;
});

function setCookie (name, value, expires) {
    document.cookie = name + "=" + escape (value) + "; path=/; expires=" + expires.toGMTString();
}

function getCookie(Name) {
    var search = Name + "="
    if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
        offset = document.cookie.indexOf(search)
        if (offset != -1) { // 쿠키가 존재하면
            offset += search.length
            // set index of beginning of value
            end = document.cookie.indexOf(";", offset)
            // 쿠키 값의 마지막 위치 인덱스 번호 설정
            if (end == -1)
                end = document.cookie.length
            return unescape(document.cookie.substring(offset, end))
        }
    }
    return "";
}

function saveid(form) {
    var expdate = new Date();
    // 기본적으로 30일동안 기억하게 함. 일수를 조절하려면 * 30에서 숫자를 조절하면 됨
    if (form.checkId.checked)
        expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * 30); // 30일
    else
        expdate.setTime(expdate.getTime() - 1); // 쿠키 삭제
//    alert(form.user_id.value);    
    setCookie("websaveUsrId", form.user_id.value, expdate);
}

function getid(form) {
    form.user_id.value = getCookie("websaveUsrId");
    //form.checkId.checked = ((form.user_id.value = getCookie("saveid")) != "");
}

/*아이디 찾기 화면 이동*/
function moveSearchId() {
    
    openPop(
            {
                url : "./searchId.do",
                name : "searchId",
                width : 600,
                height : 450,
                scrollbars : "yes",
                resizable : "no",
                param:{},
                callback : ""
            });
}

/*회원가입 화면 이동*/
function joinMember() {
    
//    if(confirm("※ 인사정보시스템에 ID가 없으신 직원 및 무기계약직이나\n 계약직만 회원가입하시기 바랍니다.")){
    
        openPop(
                {
                    url : "./joinMember.do",
                    name : "joinMember",
                    width : 800,
                    height : 500,
                    scrollbars : "yes",
                    resizable : "no",
                    param:{},
                    callback : ""
                });
//    }
}

