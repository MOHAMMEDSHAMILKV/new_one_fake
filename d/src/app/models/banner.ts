


export class BannerCategory {
  tittle!: any
  values!:values[]
  constructor(tittle: any, values:values[]){
    this.tittle = tittle,
    this.values = values
  }
}
export class values {
  description!: any
  id!: number
  group_name!: any
  group_key!: any
  last_updated!: any
  title!: any
}

// export class BannerChild {
//   display_name!: string
//   id!: number
//   image!: number
//   mptt_level!: number
//   parent!: number
//   priorty!: number
//   redirect_id!: number
//   redirect_type!: string
//   redirecturl!: string
//   section_type!:String
//   redirect_code!:any
// }