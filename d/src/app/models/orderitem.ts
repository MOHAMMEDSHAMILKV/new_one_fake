export class Orderitem {
    id!:number
    order_id!:number
    status!:string
    data!: OrderitemChild[]
    constructor(id:number,order_id:number,status:string,data:OrderitemChild[]){
        this.id = id
        this.order_id = order_id
        this.status = status
        this.data = data
    }
}
export class OrderitemChild{
    id!:number
    sku_id!:number
    product_name!:string
    product_image!:string
    expected_delivery!:string
    delivery_partner!:string
    qty!:number
    selling_price!:number
    constructor(id:number,sku_id:number,product_name:string,product_image:string,expected_delivery:string,delivery_partner:string,qty:number,selling_price:number){
        this.id = id
        this.sku_id = sku_id
        this.product_name = product_name
        this.product_image = product_image
        this.expected_delivery = expected_delivery
        this.delivery_partner = delivery_partner
        this.qty = qty
        this.selling_price = selling_price
    }  
}
