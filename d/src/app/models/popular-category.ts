export class PopularCategory {
  display_name!:string
  data:PopularCategoryChild []
  constructor(display_name: string, data:PopularCategoryChild[]) {
    this.display_name = display_name
    this.data = data
  }
}

export class PopularCategoryChild {
  id!: number;
  name!: string;
  image!: string;
  inventory_id!: number;
  priorty!: number;
  redirecturl!: string
  constructor(id: number, name: string, image: string, inventory_id: number,priorty: number,redirecturl: string) {
    this.id = id
    this.name = name
    this.image = image
    this.inventory_id = inventory_id
    this.priorty = priorty
    this.redirecturl = redirecturl
  }
}
