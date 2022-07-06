import {UserAction , Role} from "./models/model.js";

function userCreatedDate(){
    return function(target: any,key:string,descriptor:PropertyDescriptor){
        let val = descriptor.value
        descriptor.value = function(... args:any[]){
            let arr:Array<string> = [];
            for(let j=0;j<7;j++){
                arr.push(args[0].target[j].value)
            }
            let d: Date = new Date();
            let dt = d.getDate()+" "+d.toLocaleString('en-US', {month: 'long',})+" "+d.getFullYear()+" Time: "+d.getHours()+":"+d.getMinutes();
            arr.push(dt.toString())
            return val.apply(this,[arr]);
        }
    }
}

export class User<T extends Array<object>,U extends Array<Array<string>>> implements UserAction{
    APIData:Array<object> = [];
    UsersData:Array<Array<string>> = [];
    
    constructor( APIData:T,UsersData:U){
        this.APIData = APIData
        this.UsersData = UsersData
    }
    
    @userCreatedDate()
    addUser(arr:Array<string>){
        this.UsersData.push(arr);
        document.getElementById("reset")?.click();
        let table = document.getElementById("table_tag") as HTMLTableElement;
        let i = this.UsersData.length-1;
        let row = table.insertRow(i+1);
        for(let j=0;j<arr.length+1;j++){
            if(j ===arr.length){
                let btn = document.createElement('input') as HTMLInputElement;
                btn.type = "button";
                btn.className = "btn";
                btn.value = "Edit";
                let cell = row.insertCell(-1)
                cell.appendChild(btn);
                btn.onclick = (()=> {this.selectedRowEdit(btn)});

                let btn1 = document.createElement('input') as HTMLInputElement;
                btn1.type = "button";
                btn1.className = "btn1";
                btn1.value = "Delete";
                btn1.onclick = (()=> {this.selectedRowDelete(btn1)});

                cell.appendChild(btn1);
                return
            }
            let cell = row.insertCell(-1)
            let inputField = document.createElement('input') as HTMLInputElement;
            if(j===4){
                inputField.type="number";
            }
            else if(j===3){
                inputField.type="email";
            }
            else{
                inputField.type = "text";
            }
            inputField.value =this.UsersData[i][j]
            inputField.disabled = true
            cell.appendChild(inputField);
        }   
    }

    selectedRowEdit(refer:any){
        let j : number = 0;
            for(j=0;j<refer.parentNode.parentNode.cells.length-1;j++){
                if(j===7){
                    continue;
                }
                refer.parentNode.parentNode.cells[j].childNodes[0].disabled = false
            }
            refer.parentNode.parentNode.cells[j].childNodes[0].value = "Save";
            let arrChanged = [...this.UsersData[refer.parentNode.parentNode.rowIndex-1]]
            refer.parentNode.parentNode.cells[j].childNodes[0].onclick=()=>{
                if(refer.parentNode.parentNode.cells[5].childNodes[0].value in Role){}
                else{
                    alert(arrChanged[5]+" role is not valid . Please choose from the given role : SuperAdmin , Admin , Subscriber");
                    return;
                }
                for(j=0;j<refer.parentNode.parentNode.cells.length-1;j++){

                    arrChanged[j] = refer.parentNode.parentNode.cells[j].childNodes[0].value
                    refer.parentNode.parentNode.cells[j].childNodes[0].disabled = true
                    
                }
                this.UsersData[refer.parentNode.parentNode.rowIndex-1] = arrChanged;
                refer.parentNode.parentNode.cells[j].childNodes[1].value = "Delete";
                refer.parentNode.parentNode.cells[j].childNodes[1].onclick = (()=>{this.selectedRowDelete(refer)})
                refer.parentNode.parentNode.cells[j].childNodes[0].value = "Edit";
                refer.parentNode.parentNode.cells[j].childNodes[0].onclick = (()=>{this.selectedRowEdit(refer)})
            }
            refer.parentNode.parentNode.cells[j].childNodes[1].value = "Cancel";
    
            refer.parentNode.parentNode.cells[j].childNodes[1].onclick=()=>{
                for(j=0;j<refer.parentNode.parentNode.cells.length-1;j++){
                    refer.parentNode.parentNode.cells[j].childNodes[0].value = this.UsersData[refer.parentNode.parentNode.rowIndex-1][j]
                    refer.parentNode.parentNode.cells[j].childNodes[0].disabled = true
    
                }
                refer.parentNode.parentNode.cells[j].childNodes[1].value = "Delete";
                refer.parentNode.parentNode.cells[j].childNodes[1].onclick = (()=>{this.selectedRowDelete(refer)})
                refer.parentNode.parentNode.cells[j].childNodes[0].value = "Edit";
                refer.parentNode.parentNode.cells[j].childNodes[0].onclick = (()=>{this.selectedRowEdit(refer)})
            }
    }

    selectedRowDelete(i:any){
        let rIndex,table = document.getElementById("table_tag") as HTMLTableElement;
                rIndex = i.parentNode.parentNode.rowIndex;
                table.deleteRow(rIndex)
                this.UsersData.splice(rIndex-1,1)
    }

}