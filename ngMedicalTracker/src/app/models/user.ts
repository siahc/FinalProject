export class User {
  id:number;
  username:string;
  password:string;
  enabled:boolean;
  role:string;
  constructor(
    id?:number,
    username?:string,
    password?:string,
    enabled?:boolean,
    role?:string
    ){
      this.id = id;
      this.username = username;
      this.password = password;
      this.enabled = enabled;
      this.role = role;
  }
}
