export enum Role {
    SuperAdmin = "SuperAdmin",
    Admin = "Admin",
    Subscriber = "Subscriber"
  }

export interface UserAction{
  APIData:Array<object>,
  UsersData:Array<Array<string>>,
  addUser(refer:any):void,
  selectedRowEdit(refer:any):void,
  selectedRowDelete(i:any):void
}

