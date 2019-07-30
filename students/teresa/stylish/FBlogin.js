// 當使用者點擊 member icon 時，先 check 登入狀態
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

function statusChangeCallback(response) {

    // 先看看登入的狀態爲何，並印出來
    console.log(response);

    if (response.status === 'connected') {
        /* 如果已經 Logged into app 跟 Facebook(狀態為 connected 時)，代表之前已經執行過「登入」的動作，
        也代表之前已經儲存我們要的資料在 localStorage 裡面了，所以可以直接跳轉 login.html */

        // 跳轉到 login.html，show 出 profile
        window.location = "login.html";
        return; // 強制將流程結束～

    } else {  // 如果狀態不是已經 Logged into app 跟 Facebook(狀態不是 connected 時)，執行以下動作

        console.log("123");
        // 跳出「登入」對話方塊提供用戶登入臉書
        FB.login(function (response) {
            if (response.authResponse) { // users 乖乖登入臉書時

                uid = response.authResponse.userID;
                accessToken = response.authResponse.accessToken;
                localStorage.setItem("member UID", response.authResponse.userID); // 將資料存在 localStorage
                localStorage.setItem("member AccessToken", response.authResponse.accessToken); // 將資料存在 localStorage

                /* 拿到 token 跟 userId 後，call FB.API 去存所有要存的資料進 localStorage，
                以供未來 profile page 使用 */

                // 在圖形 API 測試工具裡設定下方資料
                FB.api('/me?fields=id,name,email,picture.width(150)', function (response) {
                    memberName = response.name;
                    memberEmail = response.email;
                    memberPicture = response.picture;
                    localStorage.setItem("member Name", response.name);
                    localStorage.setItem("member Email", response.email);
                    localStorage.setItem("member Picture", response.picture.data.url);
                    
                    // 拿到資料、存回 localStorage 後，跳轉到 profile 的頁面
                    window.location = "login.html";
                    return; // 強制將流程結束～
                });
                

            } else { // users 臨時不想登入了，可能點了「取消」或是直接關閉 tab 時
                window.location = "index.html";
                alert("You cancelled login or did not fully authorize!");
            }
            // Handle the response object, like in statusChangeCallback() in our demo code.
        }, { scope: 'public_profile,email' });// 要求 users 授權個人照片跟 email
    }
}


// 當使用者點擊按鈕登出時，要將 access token 儲存下來，post 到 checkout API
function SendTokenInformation(){

    let checkOutUrl = API + "/order/checkout"
    SendTokenAjax(checkOutUrl);    
}

function SendTokenAjax(src){

    let AllObject = JSON.parse(localStorage.getItem("shoppingStatus")); // 先抓 localStorage 到資料下來做處理
    let Access_Token = localStorage.getItem("member AccessToken");
    let TokenAndPrimeAndAllObject = { token: Access_Token, prime: Prime, order: AllObject };
    let CheckOutDetails = JSON.stringify(TokenAndPrimeAndAllObject);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // 這邊是拿到資料後，才會做的事情
        } else {
            return "error : Invalid token.";
        }
    };
    xhttp.open("POST", src);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader("Authorization", "Bearer");

    xhttp.send(CheckOutDetails);

    // 搜集好資料後，讓用戶登出～
    FB.logout(function(response) {
        // Person is now logged out
     });
}



