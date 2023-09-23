export class Cart {
    id!:number;
    image!:string;
    name!: string;
    delivery_time!: string;
    deliveryPartnerLogo!: string;
    total_price!: number;
    Sprice!: number;
    maxQty!: number;
    quantity!:number;
    max_order_limit!:number;
    min_order_limit!:number;
    stock_count!:number
    constructor(id: number, 
        image: string, name: string, 
        delivery_time: string, 
        deliveryPartnerLogo: string, 
        total_price: number, 
        Sprice: number, maxQty:number, 
        quantity:number,
        max_order_limit:number,
        min_order_limit:number,
        stock_count:number){
        this.id = id
        this.image = image
        this.name = name
        this.delivery_time = delivery_time
        this.deliveryPartnerLogo = deliveryPartnerLogo
        this.total_price = total_price
        this.Sprice = Sprice
        this.maxQty = maxQty
        this.quantity = quantity
        this.max_order_limit=max_order_limit
        this.min_order_limit=min_order_limit
        this.stock_count=stock_count
    }
}


delivery_time: null
id: 3
image: "https://m.media-amazon.com/images/I/51K72V1p8vL._SL1300_.jpg"
inventory_id: 1
name: "sample  5"
price: 100
quantity: 3
total_price: 300
user_id: 28
variant_id: 6