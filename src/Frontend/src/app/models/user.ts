export class User{

  constructor(
    name:  string ="", 
    phonenumber:  number =0, 
    email:  string ="", 
    password:  string ="", 
    strikes:  number =0, 
    type:  string ="", 
    status:  string ="", 
    idprocesses:  Array<string> =[], 
    idsession:  Array<string> =[], 
    idpublications:  Array<string> =[],
    id:string=""
) {
    this.name = name
    this.phonenumber = phonenumber
    this.email = email
    this.password = password
    this.strikes = strikes
    this.type = type
    this.status = status
    this.idprocesses = idprocesses
    this.idsession = idsession
    this.idpublications = idpublications
    this._id=id
  }
    
    _id:string;
    name:  string;
    phonenumber:  number;
    email:  string;
    password:  string;
    strikes:  number;
    type:  string;
    status:  string;
    idprocesses:  Array<string>;
    idsession:  Array<string>;
    idpublications:  Array<string>;
  }