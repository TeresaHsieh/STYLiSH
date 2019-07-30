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
                localStorage.setItem("memberUID", response.authResponse.userID); // 將資料存在 localStorage
                localStorage.setItem("memberaccessToken", response.authResponse.accessToken); // 將資料存在 localStorage

                /* 拿到 token 跟 userId 後，call FB.API 去存所有要存的資料進 localStorage，
                以供未來 profile page 使用 */

                // 在圖形 API 測試工具裡設定下方資料
                FB.api('/me?fields=id,name,email,picture.width(150)', function (response) {
                    memberName = response.name;
                    memberEmail = response.email;
                    memberPicture = response.picture;
                    localStorage.setItem("memberName", response.name);
                    localStorage.setItem("memberEmail", response.email);
                    localStorage.setItem("memberPicture", response.picture.data.url);
                    
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

