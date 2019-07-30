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
        // 如果已經 Logged into app 跟 Facebook，跳轉到 login.html
        uid = response.authResponse.userID;
        accessToken = response.authResponse.accessToken;
        localStorage.setItem("memberUID", response.authResponse.userID); // 將 userID 存在 localStorage
        localStorage.setItem("memberaccessToken", response.authResponse.accessToken); // 將 accessToken 存在 localStorage
        console.log(uid);
        console.log(accessToken);
        alert("yeah! 我們拿到了！");
        testAPI();
        window.location = "login.html";
        return; // 結束這裡～

    } else {
        console.log("123");
        // The person is not logged into your app or we are unable to tell.
        FB.login(function (response) { // 用「登入」對話方塊將用戶登入
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function (response) {
                    console.log('Good to see you, ' + response.name + '.');
                });
                
                uid = response.authResponse.userID;
                accessToken = response.authResponse.accessToken;
                localStorage.setItem("memberUID", response.authResponse.userID); // 將資料存在 localStorage
                localStorage.setItem("memberaccessToken", response.authResponse.accessToken); // 將資料存在 localStorage
                console.log(uid);
                console.log(accessToken);
                alert("yeah! 我們拿到了！");
                testAPI();
                window.location = "login.html";
                return; // 結束這裡～

            } else {
                window.location = "index.html";
                alert("You cancelled login or did not fully authorize!");
            }
            // Handle the response object, like in statusChangeCallback() in our demo code.
        }, { scope: 'public_profile,email' });// 要求 users 授權
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
