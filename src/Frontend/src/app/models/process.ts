export class Process{

  constructor(
      idpatient: string ="", 
      idpsichologist: string ="", 
      count: Number =0,
      id:string=""
    ) {
    this.idpatient = idpatient
    this.idpsichologist = idpsichologist
    this.count = count
    this._id=id
  }
    
    _id:string;
    idpatient:string;
    idpsichologist:string;
    count:Number;
}