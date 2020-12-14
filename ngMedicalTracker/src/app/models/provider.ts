import { LanguageServiceMode } from 'typescript';

export class Provider {
  id: number;
  fname: string;
  lname: string;
  location: string;
  title: string;
  email: string;
  phone: string;
  constructor(
    id?: number,
    fname?: string,
    lname?: string,
    location?: string,
    title?: string,
    email?: string,
    phone?: string
  ){
    this.id = id;
  this.fname = fname;
  this.lname = lname;
  this.location = location;
  this.title = title;
  this.email = email;
  this.phone = phone;
  }
}
