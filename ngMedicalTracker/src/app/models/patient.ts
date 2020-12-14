export class Patient {
  id: number;
  fname: string;
  lname: string;
  dob: string;
  img: string;
  email: string;

  constructor(
    id?: number,
  fname?: string,
  lname?: string,
  dob?: string,
  img?: string,
  email?: string

  ){
    this.id = id;
  this.fname = fname;
  this.lname = lname;
  this.dob = dob;
  this.img = img;
  this.email = email;
  }



}
