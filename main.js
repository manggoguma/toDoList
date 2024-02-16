// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할 일이 추가된다
// delete 버튼을 누르며 할 일이 삭제된다
// check 버튼을 누르면 할 일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하느 순간 false=>true
// 2. true이면 끝난 걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝날 걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남 탭은 끝난 아이템만 진행중인 탭은 진행중인 아이템만
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let mode = 'all';
let taskList=[];
let filterList=[];
let underLine = document.getElementById("under-line")

addButton.addEventListener("click",addTask)
taskInput.addEventListener("keypress",enterKey)

for(let i = 1; i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);
    });
}

function addTask() {
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value, 
        isComplete : false
    }
    taskList.push(task);
    console.log(taskList);
    render();

    taskInput.value=''; // ⭐ 입력 후 자동으로 비우기
}

function render() {
    // 1. 내가 선택한 탭에 따라서
    // all => taskList
    // ongoing, done => filterList
    let list = [];
    if(mode === "all"){
        // taskList
        list = taskList;
    } else if(mode === "ongoing"){
        // filterList
        list = filterList;
    } else if(mode === "done"){
        list = filterList;
    }
    // 2. 리스트를 달리 보여준다

    let resultHTML=``;
    for(let i = 0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML+= `<div class="task"> 
            <div class="task-done">${list[i].taskContent}</div>
             <div>
                <button class="check" onclick="toggleComplete('${list[i].id}')">✅</button>
                <button class="trash" onclick="deleteTask('${list[i].id}')">🗑️</button>                        
            </div>
         </div>`;
        } else{
            resultHTML += `<div class="task"> 
        <div>${list[i].taskContent}</div>
        <div>
            <button class="check" onclick="toggleComplete('${list[i].id}')">✅</button>
            <button class="trash" onclick="deleteTask('${list[i].id}')">🗑️</button>                        
        </div>
    </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function deleteTask(id) {
    for(let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i,1)
            break;
        }
      }
    console.log(taskList);
    filter();
}


function toggleComplete(id) {
    for(let i = 0; i<taskList.length;i++){
        if(taskList[i].id ==id){
            taskList[i].isComplete =  !taskList[i].isComplete
            break;
        }
    }
    filter();
    console.log(taskList);
}

function filter(event) {
    if (event) {
        mode = event.target.id; // 내가 선택한 정보는 mode가 들고 있다. 모두가 알아야 하므로 지역 변수에서 전역 변수로 변경.
      }

    filterList = [];
    
    if(mode === "all"){
        render();
    } else if(mode === "ongoing"){
        // 진행중인 아이템을 보여준다
        // task.isComplete = 
        for(let i = 0; i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        
    }else if(mode ==="done"){
        // 끝나는 케이스
        // task.isComplete = true
        for(let i= 0 ; i<taskList.length;i++){
            if(taskList[i].isComplete===true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGenerate() {
    return '_'+ Math.random().toString(36).substr(2, 9);
  }

// ⭐ 언더바 이동하기
tabs.forEach((menu)=>
    menu.addEventListener("click", (e)=>underLineIndicator(e))
);

function underLineIndicator (e) {
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = 
    e.currentTarget.offsetTop+ e.currentTarget.offsetHeight + "px";
};

// ⭐ enter 누르면 항목 자동 추가시키기

function enterKey(e) {
    if(e.keyCode==13){
        addTask();
    }
}

