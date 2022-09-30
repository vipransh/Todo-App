let titleInput=document.querySelector(".title-text");
let descriptionInput=document.querySelector(".description-text");
let createTodoBtn=document.querySelector(".create-todo");
let todoContainer=document.querySelector(".right-div");
let popupDiv=document.querySelector(".popup-box");
let editTitle=document.querySelector(".title-text2");
let editDescription=document.querySelector(".description-text2");
let updateBtn=document.querySelector(".edit-todo");

showData();

// todo list creater
createTodoBtn.addEventListener("click",function (){
    if(titleInput.value.trim()!=0){
        let storedData=localStorage.getItem("localtask");
        if(storedData==null){
            dataArray=[];
        }
        else{
            dataArray=JSON.parse(storedData);
        }
        if(titleInput.value.length>28)
        titleInput.value=titleInput.value.slice(0,26);
        if(descriptionInput.value.length>160)
        descriptionInput.value=descriptionInput.value.slice(0,160);
        dataArray.push({'title': titleInput.value, 'description': descriptionInput.value});
        localStorage.setItem("localtask",JSON.stringify(dataArray));
        titleInput.value="";
        descriptionInput.value="";
    }
    showData();
});

// show list data 
function showData(){
    let storedData=localStorage.getItem("localtask");
        if(storedData==null){
            dataArray=[];
        }
        else{
            dataArray=JSON.parse(storedData);
        }
        let html='';
        dataArray.forEach((item,index)=> {
            html+=`
            <div class="list-div">
            <h2 class="list-title">${index+1+". "}${item.title} <img class="delete-btn" onclick="deleteTodo(${index})" src="resources/delete-icon.png" alt=""></h2>
            <p class="list-para">${item.description}
           <img class="edit-btn" onclick="editTodo(${index})" src="resources/editBtn.png" alt="">
            </p>
            </div>
            `;
            
        });
        todoContainer.innerHTML=html;
}


// edit todo list items
function editTodo(index){
    popupDiv.classList.add("show-popup");
    let storedData=localStorage.getItem("localtask");
    dataArray=JSON.parse(storedData);
    editTitle.value=dataArray[index].title;
    editDescription.value=dataArray[index].description;
    updateBtn.addEventListener("click",function(){
        let editT=editTitle.value;
        let editD=editDescription.value;
        dataArray[index].title=editT;
        dataArray[index].description=editD;
        localStorage.setItem("localtask",JSON.stringify(dataArray));
        showData();
        popupDiv.classList.remove("show-popup");
    });
    
}

// delete todo list items
function deleteTodo(index){
    let storedData=localStorage.getItem("localtask");
    dataArray=JSON.parse(storedData);
    dataArray.splice(index,1);
    localStorage.setItem("localtask",JSON.stringify(dataArray));
    showData();
}