import {User} from "./app.js";
import {Role} from "./models/model.js";

let APIData: Array<object> = [];
let UsersData: Array<Array<string>> = [];
let column_list: Array<string> = [];

function api<T>(url: string): Promise<T> {
    return fetch(url)
      .then(response => {
        return response.json()
      })
  
  }
document.getElementById("load_button")?.addEventListener("click",async()=>{
    let data: Array<object> = await api("http://localhost:9010/user");
    console.log(data)
    if(document.getElementById("load_button")!.innerText === "Refresh data"){
        let Table = document.getElementById("table_tag") as HTMLTableElement;
        Table.innerHTML = "";
    }else{
        document.getElementById("load_button")!.innerHTML = "Refresh data";
        document.getElementById("table_tag")!.style.display = "revert";
        document.getElementById("input_tag")!.style.display = "flex";
    }
    APIData = data;
    loadTableData();
})

function loadTableData(){
    let table = document.getElementById("table_tag") as HTMLTableElement;
    let row = table.insertRow(0);
    column_list = Object.keys(APIData[0]);
    column_list.push("Edit")

    column_list.forEach((column)=>{
        let headerCell = document.createElement("th");
        headerCell.innerHTML = column;
        row.appendChild(headerCell);
        
    })
    for (let i = 0; i < APIData.length; i++) { 
        row = table.insertRow(i+1);
        let arr: Array<string> = [];
        column_list.forEach((column)=>{
            if(column ==="Edit"){
                let btn = document.createElement('input') as HTMLInputElement;
                btn.type = "button";
                btn.className = "btn";
                btn.value = "Edit";
                let cell = row.insertCell(-1)
                cell.appendChild(btn);
                btn.onclick = (function() {user.selectedRowEdit(this);});

                let btn1 = document.createElement('input') as HTMLInputElement;
                btn1.type = "button";
                btn1.className = "btn1";
                btn1.value = "Delete";
                btn1.onclick = (function() {user.selectedRowDelete(this)});

                cell.appendChild(btn1);
                return
            }
            let cell = row.insertCell(-1)
            let inputField = document.createElement('input') as HTMLInputElement;
            if(column==="Phone Number"){
                inputField.type="number";
            }
            else if(column==="Email"){
                inputField.type="email";
            }
            else{
                inputField.type = "text";
            }
            inputField.value =(APIData[i] as any)[column]
            inputField.disabled = true
            inputField.required = true
            arr.push((APIData[i] as any)[column])
            cell.appendChild(inputField);
        })        
        UsersData.push(arr);

    }

}; 

let user = new User(APIData,UsersData);

document.getElementById("input_tag")?.addEventListener("submit",(e:any)=>{
    e.preventDefault();
    if(e.target[5].value in Role){
        user.addUser(e);
    }else{
        alert(e.target[5].value+" role is not valid . Please choose from the given role : SuperAdmin , Admin , Subscriber");
        return;
    }
})

