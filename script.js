let section = document.querySelector("section");

let add = document.querySelector("form button");
add.addEventListener("click", e =>{
    e.preventDefault();  //設定按鈕停止事件
// console.log(e.target.parentElement.children);
// 取得表單資料
    let form = e.target.parentElement;  //parentElement 父層
    let todoText = form.children[0].value;   //children 子層
    let todoYear = form.children[1].value;   //年
    let todoMonth = form.children[2].value;   //月
    let todoDate = form.children[3].value;   //日
    
    if(todoText === ""){    //if(todoText = 空值)
        alert("請輸入事項");
        return;            //回傳  以下程式不執行
    }

// 寫入html
    let todo = document.createElement("div");  //新增div標籤
    todo.classList.add("todo");                //新增todo類別
    let text = document.createElement("p");    //新增p標籤
    text.classList.add("todo-text");           //新增todo-text類別
    text.innerText = todoText;                 //寫入todoText字串
    let time = document.createElement("p");    //新增p標籤
    time.classList.add("todo-time");           //新增todo-time類別
    time.innerText = todoYear + "/" + todoMonth + "/" + todoDate;
    todo.appendChild(text);
    todo.appendChild(time);
    
    let completeButton = document.createElement("button");  //新增button標籤
    completeButton.classList.add("complete");               //新增complete類別
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';  //<i>新增圖示
    completeButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;    //<i>父層 = completeButton
        todoItem.classList.toggle("done");           //toggle新增或刪除done類別:刪除線
    });

    let trashButton = document.createElement("button");     //新增button標籤
    trashButton.classList.add("trash");                     //新增trash類別
    trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';  //<i>刪除圖示
    trashButton.addEventListener("click", e =>{
        let todoItem = e.target.parentElement;    //<i>父層 = trashButton
        todoItem.addEventListener("animationend", () =>{   //刪除動畫結束後
            // 新增localStorage資料刪除
            // 瀏覽器>開發人員工具>Application>localStorage>list查看結果
            let text = todoItem.children[0].innerText;  //取得text資料
            let myListArray = JSON.parse(localStorage.getItem("list"));  //取得localStorage資料，轉成陣列
            myListArray.forEach((item, index) => {
                if(item.todoText == text){
                    myListArray.splice(index, 1);  //陣列中，刪一筆資料
                    localStorage.setItem("list", JSON.stringify(myListArray)); //放回陣列剩下的資料
                }
            });
            todoItem.remove();                             //動畫結束後[刪除資料]，避免刪除時動畫還沒跑
        });
        todoItem.style.animation = "scaleDown 0.3s forwards";  //新增刪除動畫
    });

    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    todo.style.animation = "scaleUp 0.3s forwards";         //新增彈出動畫

    // 將資料以陣列方式存入localStorage
    let myTodo = {
        todoText: todoText,
        todoYear: todoYear,
        todoMonth: todoMonth,
        todoDate: todoDate
    };
    let myList = localStorage.getItem("list");  //getItem取得資料
    if(myList == null){
        localStorage.setItem("list", JSON.stringify([myTodo]));  //新增[myTodo]陣列資料>list
    }
    else{
        let myListArray = JSON.parse(myList);  //parse轉換成陣列
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));  //新增myListArray陣列資料>list
    }

    form.children[0].value="";      //清空欄位
    form.children[1].value="";      //清空年
    form.children[2].value="";      //清空月
    form.children[3].value="";      //清空日

    section.appendChild(todo);
});

loadData();

function loadData(){

    // 重啟網頁，讀取localStorage資料
    let myList = localStorage.getItem("list");   //取得localStorage(list)資料
    if (myList !== null){                        //myList 不等於 空值
        let myListArray = JSON.parse(myList);    //myList 轉成陣列
        myListArray.forEach(item => {            //forEach 列出陣列每一筆資料
            
        // 寫入html
            let todo = document.createElement("div");  //新增div標籤
            todo.classList.add("todo");                //新增todo類別
            let text = document.createElement("p");    //新增p標籤
            text.classList.add("todo-text");           //新增todo-text類別
            text.innerText = item.todoText;     //寫入todoText字串  todoText>item.todoText
            let time = document.createElement("p");    //新增p標籤
            time.classList.add("todo-time");           //新增todo-time類別
            // todoYear,todoMonth,todoDate  +  item.
            time.innerText = item.todoYear + "/" + item.todoMonth + "/" + item.todoDate;
            todo.appendChild(text);
            todo.appendChild(time);
            
            let completeButton = document.createElement("button");  //新增button標籤
            completeButton.classList.add("complete");               //新增complete類別
            completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';  //<i>新增圖示
            completeButton.addEventListener("click", e => {
                let todoItem = e.target.parentElement;    //<i>父層 = completeButton
                todoItem.classList.toggle("done");           //toggle新增或刪除done類別:刪除線
            });

            let trashButton = document.createElement("button");     //新增button標籤
            trashButton.classList.add("trash");                     //新增trash類別
            trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';  //<i>刪除圖示
            trashButton.addEventListener("click", e =>{
                let todoItem = e.target.parentElement;    //<i>父層 = trashButton
                todoItem.addEventListener("animationend", () =>{   //刪除動畫結束後
                    // 新增localStorage資料刪除
                    // 瀏覽器>開發人員工具>Application>localStorage>list查看結果
                    let text = todoItem.children[0].innerText;  //取得text資料
                    let myListArray = JSON.parse(localStorage.getItem("list"));  //取得localStorage資料，轉成陣列
                    myListArray.forEach((item, index) => {
                        if(item.todoText == text){
                            myListArray.splice(index, 1);  //陣列中，刪一筆資料
                            localStorage.setItem("list", JSON.stringify(myListArray)); //放回陣列剩下的資料
                        }
                    });
                    todoItem.remove();                             //動畫結束後[刪除資料]，避免刪除時動畫還沒跑
                });
                todoItem.style.animation = "scaleDown 0.3s forwards";  //新增刪除動畫
            });

            todo.appendChild(completeButton);
            todo.appendChild(trashButton);

            todo.style.animation = "scaleUp 0.3s forwards";         //新增彈出動畫

            section.appendChild(todo);//印出section資料

        });
    }
}

function mergeTime(arr1, arr2) {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length && j < arr2.length) {
      if (Number(arr1[i].todoYear) > Number(arr2[j].todoYear)) {
        result.push(arr2[j]);
        j++;
      } else if (Number(arr1[i].todoYear) < Number(arr2[j].todoYear)) {
        result.push(arr1[i]);
        i++;
      } else if (Number(arr1[i].todoYear) == Number(arr2[j].todoYear)) {
        if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
          result.push(arr2[j]);
          j++;
        } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
          result.push(arr1[i]);
          i++;
        } else if (Number(arr1[i].todoMonth) == Number(arr2[j].todoMonth)) {
          if (Number(arr1[i].todoDate) > Number(arr2[j].todoDate)) {
            result.push(arr2[j]);
            j++;
          } else {
            result.push(arr1[i]);
            i++;
          }
        }      
      }
    }
    while (i < arr1.length) {
      result.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      result.push(arr2[j]);
      j++;
    }
    return result;
}
  
function mergeSort(arr) {
if (arr.length === 1) {
    return arr;
} else {
    let middle = Math.floor(arr.length / 2);
    let right = arr.slice(0, middle);
    let left = arr.slice(middle, arr.length);
    return mergeTime(mergeSort(right), mergeSort(left));
}
}

let sortButton = document.querySelector("div.sort button");
sortButton.addEventListener("click", () => {
    
    let sortedArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list", JSON.stringify(sortedArray));

    let len = section.children.length;
    for(let i = 0; i < len ; i++){
        section.children[0].remove();
    }

    loadData();
    
});