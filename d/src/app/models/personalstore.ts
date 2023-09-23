export class Personalstore {
  storeBG!:string
  storeTitle!: string
  personalStore!: PersonalStoreProduct[]
  constructor(storeBG: string, storeTitle: string, personalStore:[]){
    this.storeBG = storeBG
    this.storeTitle = storeTitle
    this.personalStore = personalStore
  }
}

export class PersonalStoreProduct {
  id!:number
  itemSrc!:string
  name!:string
  constructor(id:number,itemSrc:string,name:string){
    this.itemSrc = itemSrc
    this.name = name
  }
}