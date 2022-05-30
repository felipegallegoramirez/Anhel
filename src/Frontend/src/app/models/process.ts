export class Process{

  constructor(
      idpatient: string ="", 
      idpsichologist: string ="", 
      count: Number =0,
      id:string="",namepatient="",namepsichologist=""
    ) {
    this.idpatient = idpatient
    this.idpsichologist = idpsichologist
    this.count = count
    this._id=id
    this.namepatient=namepatient
    this.namepsichologist=namepsichologist
  }
    
    _id:string;
    idpatient:string;
    idpsichologist:string;
    count:Number;
    namepatient:string;
    namepsichologist:string;
}