// List items in the shopping cart. ============
/* 到 LocalStorage 裡面抓資料出來，解析後去 ajax 裡面找相關的資料，動態把資訊 render 出來，每一個 object 都是一條資訊列 */

// 到 LocalStorage 裡面抓已放在購物車裡面的資料
function getLocalStorageData () {
    let productArray = JSON.parse(localStorage.getItem("shoppingStatus")) || [];// 從 shoppingStatus  裡面抓出之前的資料，並轉換成 object 格式，但也有可能裡面什麼都沒有，所以會是空 array
    console.log(productArray);
}

getLocalStorageData();// 先定義 function 內容，再呼叫

// render and appendchild 讓資訊列成為動態變動
function renderDataFromLocalStorage (){
    let productArray = JSON.parse(localStorage.getItem("shoppingStatus")) || [];

    for (let i = 0; i < productArray.length; i += 1){

        // 先建立一個最大的外框 orderBox 去包裡面的東西
        let orderBox = document.getElementById("orderBox");
        let EachOrderInfo = document.createElement("div");
        EachOrderInfo.setAttribute("class", "EachOrderInfo");
        EachOrderInfo.setAttribute("id", i);// 多設 id 屬性為了要移除整行
        orderBox.appendChild(EachOrderInfo);

        // 照片
        let ProductSimpleInfo = document.createElement("div");
        let EachOrderPic = document.createElement("img");
        ProductSimpleInfo.setAttribute("class", "ProductSimpleInfo");
        EachOrderInfo.appendChild(ProductSimpleInfo);

        let ItemsPicUrl = productArray[i].main_image;// 從 localStorage 裡面抓資料
        EachOrderPic.setAttribute("src", ItemsPicUrl);
        EachOrderPic.setAttribute("width", "20%");
        EachOrderPic.setAttribute("class", "EachOrderPic");
        ProductSimpleInfo.appendChild(EachOrderPic); 

        // 品名
        let EachOrderDetail = document.createElement("div");
        EachOrderDetail.setAttribute("class", "EachOrderDetail");
        ProductSimpleInfo.appendChild(EachOrderDetail);

        let OrderName = document.createElement("span");
        OrderName.textContent = productArray[i].name;
        OrderName.setAttribute("class", "OrderName");
        
        EachOrderDetail.appendChild(OrderName);

        // 商品 ID
        let OrderID = document.createElement("span");
        OrderID.textContent = productArray[i].id;
        OrderID.setAttribute("class", "OrderID")

        EachOrderDetail.appendChild(OrderID);
        
        // 商品顏色
        let OrderColor = document.createElement("span");
        OrderColor.textContent = "顏色 ｜ " + productArray[i].color.name;
        OrderColor.setAttribute("class", "OrderColor")

        EachOrderDetail.appendChild(OrderColor);

        // 商品尺寸
        let OrderSize = document.createElement("span");
        OrderSize.textContent = "尺寸 ｜ " + productArray[i].size;
        OrderSize.setAttribute("class", "OrderSize")

        EachOrderDetail.appendChild(OrderSize);

        // 商品數量(處理 qtyButton 裡的 option 數量)

            // 生出 button 跟裡面的 select、option
        let qtyButton = document.createElement("div");
        qtyButton.setAttribute("class", "qtyButton")
        EachOrderInfo.appendChild(qtyButton);
        let qtyButtonSelect =  document.createElement("select");
        qtyButtonSelect.setAttribute("class", "selection");
        qtyButtonSelect.setAttribute("onchange", "clickToChooseNumber()");// 用 onchange 的方式，不是 onclick
        qtyButton.appendChild(qtyButtonSelect);

            // 抓庫存數量
        let StockInBtn = productArray[i].stock;

            // 有幾個庫存數量就要在 btn 裡面生幾次 option
        for (let j = 1; j <= StockInBtn; j += 1){ // 數量不要從 0 開始，省麻煩～使用者最少一款要買一件～
            let qtyButtonOptions =  document.createElement("option");
            qtyButtonOptions.setAttribute("class", "qtyButtonOptions"); 
            
            // 處理 load 進 cart 頁面時要以 users 點選的數量為 default 的問題
            let UsersDefaultNumber = productArray[i].qty; 
            if (j == UsersDefaultNumber){
                qtyButtonOptions.setAttribute("selected", "selected"); // selected = "selected" 就可以直接讓選項秀出來了
            }

            qtyButtonOptions.textContent = j;
            qtyButtonSelect.appendChild(qtyButtonOptions);
        }

        // 商品單價
        let ItemPrice = document.createElement("div");
        ItemPrice.setAttribute("class", "ItemPrice");

        EachOrderInfo.appendChild(ItemPrice);

        let ItemPriceSpan = document.createElement("span");
        ItemPriceSpan.setAttribute("class", "singlePrice");
        ItemPriceSpan.textContent = "NT. " + productArray[i].price;
        ItemPrice.appendChild(ItemPriceSpan);

        // 商品總價
        let subTotal = document.createElement("div");
        subTotal.setAttribute("class", "subTotal");

        EachOrderInfo.appendChild(subTotal);

        let subTotalPrice = document.createElement("span");
        subTotalPrice.setAttribute("class", "subTotalPrice");
        subTotalPrice.textContent = "NT. " + productArray[i].price // 單價 x 選的數量
        subTotal.appendChild(subTotalPrice);

        // 移除 icon
        let RemoveItem = document.createElement("div");
        RemoveItem.setAttribute("class", "RemoveItem");
        RemoveItem.setAttribute("onclick", "removeItem(this)"); 
        EachOrderInfo.appendChild(RemoveItem);

        let trashcan =  document.createElement("img");
        trashcan.setAttribute("src", "./images/cart-remove.png");
        trashcan.setAttribute("class", "trashcan"); 
        
        RemoveItem.appendChild(trashcan);
    }
}

renderDataFromLocalStorage();


function clickToChooseNumber (){ // 點每一個 option 要馬上知道它的值，讓「小計」可以乘上「單價」做計算
    /* 如果保持預設，就可以不理他，因為 selected 的 value 不會消失，
    但如果使用者結帳前改變了之前點選的數量，就要先調整 option 的 value，清掉一開始預設，
    將新點選的 option 加上 selected */
    let productArray = JSON.parse(localStorage.getItem("shoppingStatus")) || [];// 從 shoppingStatus  裡面抓出之前的資料，並轉換成 object 格式，但也有可能裡面什麼都沒有，所以會是空 array
    

    for(i = 0; i < productArray.length; i += 0){
     let StockInBtn = productArray[i].stock;
    let test = document.getElementsByClassName("")[j];
    console.log (test);
   

    }
    // 用有 selected 的 value 的 option 去算
   
}


// remove 垃圾桶按鈕的移除功能
function removeItem(elem){

    let productArray = JSON.parse(localStorage.getItem("shoppingStatus")) || [];
    let RemoveItemID = elem.parentNode.id; // 用抓 parent ID 的方式，知道按了哪一行的按鈕，要刪掉哪行，上面有在動態產生按鈕時，順便嵌入這個 function(id 也剛好等於 index 的位置，所以可以用 splice method)
    console.log(RemoveItemID);

    productArray.splice(RemoveItemID, 1); // 在 index 值為 RemoveItemID 的地方，刪掉一個物件，e.g. 如果 RemoveItemID 是 1，就會在 index 為 1 的地方刪掉一個物件
    console.log(productArray);
    localStorage.setItem("shoppingStatus", JSON.stringify(productArray));// 把刪除的更新存回 localStorage
    window.location.reload(); // 重新 loading，發現如果沒有重新 loading 的話，更新不會馬上反映在頁面上，就會很～奇～怪～
}
