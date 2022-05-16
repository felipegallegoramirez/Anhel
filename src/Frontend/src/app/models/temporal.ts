export class Temporal{

  constructor(
    name:  string ="", 
    email:  string ="", 
    type:  string ="", 
    status:  string ="", 
    iduser:  string ="",
    id:string ="",
) {
    this.name = name
    this.email = email
    this.type = type
    this.status = status
    this.iduser = iduser
    this._id=id
  }
    
    _id:string;
    name:  string;
    email:  string;
    type:  string;
    status:  string;
    iduser:  string;
}