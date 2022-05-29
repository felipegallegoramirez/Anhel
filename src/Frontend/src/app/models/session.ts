export class Session{

  constructor(
    idprocess: string ="", 
    idpatient: string ="", 
    idpsichologist: string ="", 
    start: string ="", 
    end: string ="", 
    price: number =0,
    chat:Array<{
      message: string;
      sender:string;
      date:string;
    }> =[],
    id:string ="",namepsichologist=""
) {
    this.idprocess = idprocess
    this.idpatient = idpatient
    this.idpsichologist = idpsichologist
    this.start = start
    this.end = end
    this.price = price
    this.chat= chat
    this._id=id
    this.namepsichologist=namepsichologist
  }
    
    _id:string;
    idprocess:string;
    idpatient:string;
    idpsichologist:string;
    start:string;
    end:string;
    price:number;
    chat:Array<{
      message: string;
      sender:string;
      date:string;
    }>;
    namepsichologist:string;
  }
