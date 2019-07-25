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
        ProductSimpleInfo.setAttribute("id", "ProductSimpleInfo");
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
        qtyButtonSelect.setAttribute("onchange", "clickToChooseNumber(this)");// 用 onchange 的方式，不是 onclick
        qtyButton.appendChild(qtyButtonSelect);

            // 抓庫存數量
        let StockInBtn = productArray[i].stock;

            // 有幾個庫存數量就要在 btn 裡面生幾次 option
        for (let j = 1; j <= StockInBtn; j += 1){ // 數量不要從 0 開始，省麻煩～使用者最少一款要買一件～然後記得 j <= StockInBtn，不然就是可以讓 j = StockInBtn + 1
            let qtyButtonOptions =  document.createElement("option");
            qtyButtonOptions.setAttribute("class", "qtyButtonOptions");
            qtyButtonOptions.setAttribute("value", j); // 未來如果要變更數量時，可以運用這個 value
            
            // 處理 load 進 cart 頁面時要以 users 點選的數量為 default 的問題，如果點選的數量等於 option 的值，就給它一個 selected 的 value
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
        subTotalPrice.textContent = "NT. " + productArray[i].price * productArray[i].qty // 單價 x 選的數量
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

    // 總金額
    // 先求出加總再帶入 textContent
    let allSubTotal = 0; 
    for (let i = 0; i < productArray.length; i += 1){
        allSubTotal += productArray[i].price * productArray[i].qty; // 每項小計的加總
    }

    document.getElementById("PriceTotal").textContent = allSubTotal;
        
    // 運費
    let DeliveryTotal = document.getElementById("PriceDelivery").textContent;
    DeliveryTotal = 60;
    document.getElementById("PriceDelivery").textContent = 60;
    
    // 應付金額
    document.getElementById("PriceShouldPay").textContent = allSubTotal + DeliveryTotal;
}

renderDataFromLocalStorage();

function clickToChooseNumber (selectOption){ // 點每一個 option 要馬上知道它的值，讓「小計」可以乘上「單價」做計算
    /* 如果保持預設，就可以不理會，因為使用的是 onchange 事件，所以只有在值改變的時候事件才會發生。
    如果使用者結帳前改變了之前點選的數量，就要把新的數量傳回 productArray 再傳回 localStorage */
 
    let productArray = JSON.parse(localStorage.getItem("shoppingStatus")) || [];// 從 shoppingStatus  裡面抓出之前的資料，並轉換成 object 格式，但也有可能裡面什麼都沒有，所以會是空 array
    
    let newNumber = selectOption.value;// 點擊 select 裡新的數字（不同於預設、有 onchange 事件發生時）
    console.log(newNumber)

    // 準備將更新的數量傳回 productArray
    let ParentID = selectOption.parentNode.parentNode.id; // 這邊的 id 是 object 的 index 數 
    console.log(ParentID);

    let ObjectNeedToChange = productArray[ParentID].qty; // 可以求出原本的 qty，知道 user 原本買了幾件
    console.log(ObjectNeedToChange);

    ObjectNeedToChange = newNumber ; // assign 新的數量給原本購買的數量 part 1（這句話其實沒什麼意思，但可以更清楚知道舊的數字跟新的數字分別是什麼）

    productArray[ParentID].qty = newNumber ; // assign 新的數量給原本購買的數量  part 2（真正將新的數字配給 productArray，這樣才可以調整到 productArray）

    localStorage.setItem("shoppingStatus", JSON.stringify(productArray)); // 將新的 productArray 上傳回 localStorage，更新上面的數量
    
    console.log(ObjectNeedToChange); // 測試一下新的 localStorage 裡的數量是不是有調整了
    
    
    // 更新完資料後要去更新每一款產品裡的小計～

    console.log(productArray); // 如果有調整過來代表調整的數量有上傳回 localStorage 且成功～

    let subTotalNumber = productArray[ParentID].price * productArray[ParentID].qty;
    
    console.log(subTotalNumber);

    document.getElementsByClassName("subTotalPrice")[ParentID].textContent = subTotalNumber
    
    checkAddUpPrice ();// 如果更改了其中產品的數量，就一定要再跑一個 function 去改總金額與應付金額
}


// remove 垃圾桶按鈕的移除功能
function removeItem(elem){

    let productArray = JSON.parse(localStorage.getItem("shoppingStatus")) || [];
    let RemoveItemID = elem.parentNode.id; // 用抓 parent ID 的方式，知道按了哪一行的按鈕，要刪掉哪行，上面有在動態產生按鈕時，順便嵌入這個 function(id 也剛好等於 index 的位置，所以可以用 splice method)
    console.log(RemoveItemID);

    productArray.splice(RemoveItemID, 1); // 在 index 值為 RemoveItemID 的地方，刪掉一個物件，e.g. 如果 RemoveItemID 是 1，就會在 index 為 1 的地方刪掉一個物件
    console.log(productArray);

    localStorage.setItem("shoppingStatus", JSON.stringify(productArray));// 把刪除的更新存回 localStorage
    window.location.reload(); // 重新 loading，發現如果沒有重新 loading 的話，更新不會馬上反映在頁面上，就會有點奇怪 ＱＱ
}

// 總金額、應付金額調整

function checkAddUpPrice(){

    let productArray = JSON.parse(localStorage.getItem("shoppingStatus")) || [];

    // 總金額再跑一次
    let allSubTotal = 0; 
    for (let i = 0; i < productArray.length; i += 1){
        allSubTotal += productArray[i].price * productArray[i].qty; // 每項小計的加總
    }

    document.getElementById("PriceTotal").textContent = allSubTotal;
        
    // 運費再跑一次
    let DeliveryTotal = document.getElementById("PriceDelivery").textContent;
    DeliveryTotal = 60;
    document.getElementById("PriceDelivery").textContent = 60;
    
    // 應付金額再跑一次
    document.getElementById("PriceShouldPay").textContent = allSubTotal + DeliveryTotal;
}