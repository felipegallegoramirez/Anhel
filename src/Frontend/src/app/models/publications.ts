export class Publication{

  constructor(
    _id: string ="", 
    idcreador: string ="", 
    namecreador: string ="", 
    date:  string ="", 
    title:  string ="",
    item:Array<{
      type:string;
      text:string;
    }> =[]
) {
    this._id = _id
    this.idcreador = idcreador
    this.namecreador = namecreador
    this.date = date
    this.title = title
    this.item= item
  }

    
    _id:string;
    idcreador: string;
    namecreador: string;
    date:  string;
    title:  string;
    item: Array<{
      type:string;
      text:string;
    }>
  }