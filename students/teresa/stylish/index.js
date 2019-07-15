// 點擊女裝，觸發 ajax，去拿資料，呈現在指定的地方

// 先把共同的地方記起來
// 女裝範例為：https://api.appworks-school.tw/api/1.0/products/woman
let API = "https://api.appworks-school.tw/api/1.0"

function apiurl(type) {
    let theurl = API + "/products/" + type
    ajax(theurl, render)
}

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
    console.log("request sent to the server");
}

function render(data) {

    //Remove all child elements of a DOM node
    let allproducts = document.getElementById("genral-container");
    while (allproducts.firstChild){
    allproducts.removeChild (allproducts.firstChild);
}

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

        allcolors.setAttribute("class", "hextrial");
        
        //篩出新的 hex 碼，套進、更新到原本的 html 屬性
        let coloritems = items[i].colors;
        for (j = 0; j < coloritems.length; j += 1){
            let colorsnewhex = "#"+coloritems[j].code;
            console.log (colorsnewhex);
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
        products.appendChild(allcolors);
        products.appendChild(productsname);
        products.appendChild(productsprice);
        
        console.log (JSON.parse(data).data[i].title);
    }
}

// ajax("https://api.appworks-school.tw/api/1.0/products/women",
//     function (response) { render(response); });
    // you should get product information in JSON format and render data in the page

    // 先看最後被 call 的 function（ajax），電腦會先執行，上面的兩個 function 只是表述
/* ajax 是執行上面 ajax function，裡面有兩個參數：URL 與一個 function。回到最上面看 ajax function，可以知道當狀態是 OK 的時候，會執行某個動作 render function 裡的動作*/