// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log(response);
    // The response object is returned with a status field that lets the app know the current login status of the person.
    // Full docs on the response object can be found in the documentation for FB.getLoginStatus().
    if (response.status === 'connected') {
        // 如果已經 Logged into app 跟 Facebook，跳轉到 login.html
        let uid = response.authResponse.userID;
        let accessToken = response.authResponse.accessToken;
        window.location = "login.html";
        testAPI();
    } else if (response.status === 'not_authorized') {
        FB.login(function(response){ // 用「登入」對話方塊將用戶登入
            // Handle the response object, like in statusChangeCallback() in our demo code.
            }, {scope: 'public_profile,email'});// 要求 users 授權

    } else {
        console.log("123");
        // The person is not logged into your app or we are unable to tell.
       

        FB.login(function(response){ // 用「登入」對話方塊將用戶登入
            // Handle the response object, like in statusChangeCallback() in our demo code.
            }, {scope: 'public_profile,email'});// 要求 users 授權
    }
}

// 當使用者結束使用 login button 時，要 check 登入狀態
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}
