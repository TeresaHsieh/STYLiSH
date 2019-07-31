// 女裝、男裝、配件不同分頁的資料 render

// 先把共同的地方記起來
// 女裝範例為：https://api.appworks-school.tw/api/1.0/products/woman
let API = "https://api.appworks-school.tw/api/1.0"

function apiurl(type) {

    let theurl = API + "/products/" + type
    
    ajax(theurl, render);
    pagingType = type;

    //Remove all child elements of a DOM node
    let allproducts = document.getElementById("genral-container");
    while (allproducts.firstChild) {
        allproducts.removeChild(allproducts.firstChild);
    }

    //清空前一次的顏色設定（如果上次有點過任何一個類別）
    document.getElementById("women").style.color = "#3f3a3a";
    document.getElementById("men").style.color = "#3f3a3a";
    document.getElementById("accessories").style.color = "#3f3a3a";

    document.getElementById(type).style.color = "#8b572a";
    
}

function changeLadyColor(){
    document.getElementById("lady").style.color = "#ffffff";
    document.getElementById("man").style.color = "#828282";
    document.getElementById("kit").style.color = "#828282";
}

function changeManColor() {
    document.getElementById("lady").style.color = "#828282";
    document.getElementById("man").style.color = "#ffffff";
    document.getElementById("kit").style.color = "#828282";
}

function changeKitColor() {
    document.getElementById("lady").style.color = "#828282";
    document.getElementById("man").style.color = "#828282";
    document.getElementById("kit").style.color = "#ffffff";
}


// 手機版它頁跳轉到「女裝」、「男裝」、「配件」頁面
function GoToLadyPage(){
    window.location = "index.html/?tag=women";
}



// Marketing Campaigns
// 一 load 進頁面就可以開始跑這個 function，並用 function 呼叫 ajax，render 照片進來

function marketing() {
    let marketingurl = API + "/marketing/campaigns"
    ajax(marketingurl, bannerrender);

    //Remove all child elements of a DOM node
    // let marketingCampaignDiv = document.getElementById("banner");
    // while (marketingCampaignDiv.firstChild) {
    //     marketingCampaignDiv.removeChild(marketingCampaignDiv.firstChild);
    // }
}

// let picArray = [items[i].picture];
let picArray = ["https://api.appworks-school.tw/assets/keyvisuals/201807242228.jpg", "https://api.appworks-school.tw/assets/keyvisuals/201807242222.jpg", "https://api.appworks-school.tw/assets/keyvisuals/201807202140.jpg"]
let poetryArray;
let bannerPics = picArray
// let bannerPics = "https://api.appworks-school.tw" + picArray
let bannerPicsLen = bannerPics.length;
let index = 0


function bannerrender(data) {
    let items = JSON.parse(data).data;
    poetryArray = [items[0].story, items[1].story, items[2].story];

    for (i = 0; i < items.length; i += 1) {

        // marketing campaign 最外層會變動的橫幅
        // let marketingCampaignDiv = document.getElementById("bannerPic");
        let marketingpics = document.createElement("img");
        let marketingnewurl = "https://api.appworks-school.tw" + items[i].picture;
        marketingpics.setAttribute("src", marketingnewurl);
        marketingpics.setAttribute("width", "100%");

        // marketing campaign 內文字
        let marketpoetry = document.createElement("div");
        let poemgurl = items[i].story;
        
        marketpoetry.setAttribute("src", poemgurl);
        marketpoetry.setAttribute("style", "poetry");
        // marketingCampaignDiv.appendChild(marketingpics);
        // marketingpics.appendChild(marketpoetry);  
        slideShow();
    }

    setInterval(slideShow, 10000);
}

function slideShow() {
    
    document.getElementById("bannerPic").innerHTML = "<img src='" + bannerPics[index] + "' style='width:100%' ><span class=poetry> " + poetryArray[index].replace(/\r\n/g, "<br/>") + " </span>";
    index += 1;
    if (index > bannerPicsLen - 1) {
        index = 0
    }
    // document.getElementById("poetry").innerHTML = "<span> '" + poetryArray[index] + "' </span>";
    // index += 1;
    // if(index > bannerPicsLen-1){
    //     index = 0
    // }      
}

function currentSlide(n) {
    slideShow(index = n);
}


// 產品區的資料 render ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

function ajax(src, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.response;
            callback(response);
        } else {
            return "error : Invalid token.";
        }

    }
    xhr.open("GET", src);
    xhr.send();
    
}

function render(data) {
    let items = JSON.parse(data).data;

    for (i = 0; i < items.length; i += 1) {

        /*做一個新的 body，最外面是 allproducts，裡面包 pics
        裡面再包 pics、colors、productsname、productsprice*/
        let allproducts = document.getElementById("genral-container");
        let products = document.createElement("div");
        let pics = document.createElement("img");
        let allcolors = document.createElement("div");
        let productsname = document.createElement("p");
        let productsprice = document.createElement("p");


        //篩出新的 url，套進、更新到原本的 html src 屬性
        let picsnewurl = items[i].main_image;
        pics.setAttribute("src", picsnewurl); //src 換成新的 url
        pics.setAttribute("class", "pic"); //把照片本身的樣式套到新的照片（已套入新的 URL）裡
        let picsID = items[i].id;
        pics.setAttribute("id", picsID);
        pics.setAttribute("onclick", "clickToGetDetail(" + picsID + ")");
        let picsURL = "product.html?id=" + picsID;
        pics.setAttribute("href", picsURL);

        allcolors.setAttribute("class", "hextrial");
        let coloritems = items[i].colors;

        for (j = 0; j < coloritems.length; j += 1) {
            let colorsnewhex = "#" + coloritems[j].code;
            let colors = document.createElement("div");
            colors.style.backgroundColor = colorsnewhex;
            colors.setAttribute("class", "color");
            allcolors.appendChild(colors);
        }

        //把新商品名添加到頁面
        productsname.textContent = items[i].title;
        productsname.setAttribute("class", "productsname");

        //把新商品價格添加到頁面
        productsprice.textContent = "TWD. " + items[i].price;
        productsprice.setAttribute("class", "price");


        allproducts.appendChild(products);
        products.appendChild(pics);
        products.setAttribute("class", "productsDIV");
        products.appendChild(allcolors);
        products.appendChild(productsname);
        products.appendChild(productsprice);

    }

    let pagingitems = JSON.parse(data).paging;
    if (pagingitems != undefined) {
        pagingNumber = pagingitems;
        window.addEventListener("scroll", addEventhandle);
    } else {
        pagingNumber = 0;
    }

}

//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// 站內搜尋功能
/* 在 searchbar 裡面輸入資料後，去讀取 users 在欄位裡輸入了什麼，
把輸入的值套進 api 公式，跑 ajax 跟 render（到資料庫裡面確認有沒有查詢的東西）*/

function readSearch() {
    let usersSearch = document.getElementById("searchtyping").value; // 抓 users 在欄位裡面輸入了什麼

    if (usersSearch != "") {

        
        let searchtheurl = API + "/products/search?keyword=" + usersSearch // 套進 api 公式，創造出新的 URL
        
        ajax(searchtheurl, render)  // 用新的 URL 跑 ajax

        // Remove all child elements of a DOM node
        let allproducts = document.getElementById("genral-container");
        while (allproducts.firstChild) {
            allproducts.removeChild(allproducts.firstChild);
        }
    }
}


function mobilereadSearch() {
    let usersSearch = document.getElementById("mobilesearchtyping").value; // 抓 users 在欄位裡面輸入了什麼

    if (usersSearch != "") {

        
        let searchtheurl = API + "/products/search?keyword=" + usersSearch // 套進 api 公式，創造出新的 URL
        
        ajax(searchtheurl, render)  // 用新的 URL 跑 ajax

        // Remove all child elements of a DOM node
        let allproducts = document.getElementById("genral-container");
        while (allproducts.firstChild) {
            allproducts.removeChild(allproducts.firstChild);
        }
    }
}

//手機版的站內搜尋，原本沒有打字框，點擊放大鏡後才會 show 出來、隱藏 logo 

let mobilesearchdiv = document.getElementById("mobilesearchbox");
let mobilesearchbtnHide = document.getElementById("closebtn");
let mobilesearchbtnShow = document.getElementById("mobilesearch");
let logo = document.getElementById("mobilelogo");

mobilesearchbtnShow.addEventListener('click', () => {
    mobilesearchdiv.style.display = "block";
    logo.hidden = true;
    mobilesearchbtnShow.style.display = "none";
});

mobilesearchbtnHide.addEventListener('click', () => {
    mobilesearchdiv.style.display = "none";
    logo.hidden = false;
    mobilesearchbtnShow.style.display = "block";
});


//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// Infinite Scroll

let generalContainer = document.getElementById("genral-container");
// let rect = generalContainer.getBoundingClientRect();

let pagingNumber = 0;
let pagingType = "";

function pagingapi(type, paging) {
    let pagingurl = API + "/products/" + type + "?paging=" + pagingNumber;
    
    ajax(pagingurl, render);
    window.removeEventListener("scroll", addEventhandle);
}

let last_known_scroll_position = 0;
let ticking = false;

function doSomething() {
    // genral-container 跑完了，可以開始 call ajax
    let rectBottom = generalContainer.getBoundingClientRect().bottom;


    if ((rectBottom <= (window.innerHeight || document.body.clientHeight)) && pagingNumber > 0) {
        pagingapi(pagingType, pagingNumber);
    }
}


function addEventhandle() {
    //last_known_scroll_position = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function () {
            doSomething();
            ticking = false;
        });
    }
    ticking = true;
}

// Take Parameter from Page URL
function clickToGetDetail(id) {
    window.location = "product.html?id=" + id; // 跳轉到自己的頁面
    let productUrl = API + "/products/details?id=" + id;
    
    ajax(productUrl, productrender);

}

// Add UP QTY in Cart

function addUpQTY() {
    let AllObject = JSON.parse(localStorage.getItem("shoppingStatus"))
    let productArray = JSON.parse(localStorage.getItem("shoppingStatus")).list || [];
    let totalQTY = productArray.length;
    // for (let i = 0; i < productArray.length; i += 1){
    //     totalQTY += productArray[i].qty;
    //     
    // } 
    AllObject.list = productArray
    localStorage.setItem("shoppingStatus", JSON.stringify(AllObject));// 把更新存回 localStorage


    document.querySelectorAll(".qty")[0].textContent = totalQTY;
    document.querySelectorAll(".qty")[1].textContent = totalQTY;    
}