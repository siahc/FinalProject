export class Patient {
  id: number;
  fname: string;
  lname: string;
  dob: string;
  img: string;

  constructor(
    id?: number,
  fname?: string,
  lname?: string,
  dob?: string,
  img?: string,

  ){
    this.id = id;
  this.fname = fname;
  this.lname = lname;
  this.dob = dob;
  this.img = img;

  }



}
