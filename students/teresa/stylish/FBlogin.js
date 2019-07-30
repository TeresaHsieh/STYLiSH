// 當使用者點擊 member icon 時，先 check 登入狀態
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log(response);
    // The response object is returned with a status field that lets the app know the current login status of the person.
    // Full docs on the response object can be found in the documentation for FB.getLoginStatus().
    if (response.status === 'connected') {
        /* 如果已經 Logged into app 跟 Facebook(狀態為 connected 時)，代表之前已經執行過「登入」的動作，
        也代表之前已經儲存我們要的資料在 localStorage 裡面了，所以可以直接跳轉 login.html */

        // 存所有要存的資料在 localStorage，以供未來 profile page 使用
            // console.log('Good to see you, ' + response.name + '.');
            // memberName = response.name;
            // localStorage.setItem("memberName", memberName);

            // uid = response.authResponse.userID;
            // accessToken = response.authResponse.accessToken;
            // localStorage.setItem("memberUID", response.authResponse.userID); // 將 userID 存在 localStorage
            // localStorage.setItem("memberaccessToken", response.authResponse.accessToken); // 將 accessToken 存在 localStorage
            // console.log(uid);
            // console.log(accessToken);
            // alert("yeah! 我們拿到了！");
        

        // 跳轉到 login.html，show 出 profile
        window.location = "login.html";
        return; // 強制將流程結束～

    } else {  // 如果狀態不是已經 Logged into app 跟 Facebook(狀態不是 connected 時)，執行以下動作

        console.log("123");
        // 跳出「登入」對話方塊提供用戶登入臉書
        FB.login(function (response) { 
            if (response.authResponse) { // users 乖乖登入臉書時
                console.log('Welcome!  Fetching your information.... ');
                
                uid = response.authResponse.userID;
                accessToken = response.authResponse.accessToken;
                localStorage.setItem("memberUID", response.authResponse.userID); // 將資料存在 localStorage
                localStorage.setItem("memberaccessToken", response.authResponse.accessToken); // 將資料存在 localStorage
                console.log(uid);
                console.log(accessToken);
                alert("yeah! 我們拿到了！");

                /* 拿到 token 跟 userId 後，call FB.API 去存所有要存的資料進 localStorage，
                以供未來 profile page 使用 */
                CallScopeAPI();
                
                window.location = "login.html";
                return; // 強制將流程結束～

            } else { // users 臨時不想登入了，可能點了「取消」或是其他行為時
                window.location = "index.html";
                alert("You cancelled login or did not fully authorize!");
            }
            // Handle the response object, like in statusChangeCallback() in our demo code.
        }, { scope: 'public_profile,email' });// 要求 users 授權個人照片跟 email
    }
}


// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        memberName = response.name;
        localStorage.setItem("memberName", memberName);
    });
}

function CallScopeAPI() {
    FB.api('/me', function (response) {
        console.log(response);
        console.log('Successful login for: ' + response.name);
        memberName = response.name;
        memberEmail = response.email;
        localStorage.setItem("memberName", memberName);
        localStorage.setItem("memberEmail", memberEmail);
    });
}