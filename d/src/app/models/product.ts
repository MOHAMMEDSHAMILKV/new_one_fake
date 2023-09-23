export class Product {
    id!: number;
    percentOff!: number; 
    productName!: string;
    src!: string;
    rating!: number;
    currentPrice!: number;
    previousPrice!: number;
    time!: string;
    countType!: string;
    wishList!: boolean;
    constructor(id: number, percentOff: number, productName: string, src: string, rating: number, currentPrice: number, previousPrice: number, time: string, countType: string){
        this.id = id
        this.percentOff = percentOff
        this.productName = productName
        this.src = src
        this.rating = rating
        this.currentPrice = currentPrice
        this.previousPrice = previousPrice
        this.time = time 
        this.countType = countType
    }
}


export class discount_details {
    has_discount!: any
    discount_based_on:any
    discount_price:any
    discount_percentage_price:any
    offer_line_id:any
  }
export class ProductReal {
    display_name!: string
    data: ProductRealChild[]
    constructor(display_name: string, data: ProductRealChild[]) {
      this.display_name = display_name
      this.data = data
    }
}

export class OfferDetails{
    has_offer!: boolean
    offer_based_on!: string
    offer_price!: number
    offer_percentage_price!: number
    constructor(has_offer: boolean, offer_based_on: string, offer_price:number, offer_percentage_price:number) {
        this.has_offer = has_offer,
        this.offer_based_on = offer_based_on,
        this.offer_price = offer_price,
        this.offer_percentage_price = offer_percentage_price
    }
}

export class ProductRealChild{
    id!: number;
    selling_price!: number;
    has_offer!: boolean;
    offer_price!: number; 
    offer_based_on!: string; 
    offer_percentage_price!: number;
    offer_details!:OfferDetails;
    is_stock!: boolean; 
    max_sales_order!:number;
    min_sales_order!:number;
    conversion_factor!:number;
    base_uom_name!:string;
    base_uom_conversion_factor!:number;
    sales_uom_name!:string;
    sales_uom_conversion_factor!:number;
    produced_country!:string;
    inventory_id!: number; 
    name!: string; 
    display_name!: string;
    image1!: string ;
    set_offer!:boolean;
    max_order_limit!:number;
    min_order_limit !:number;
    rating:number;
    stock_count!:number;
    discount_details!:discount_details;
    inventory_name!:any;
    estimated_delivery!:any;
    quantity!:number;
    image!:any
    constructor(id: number, 
        selling_price: number, 
        rating:number,
        max_order_limit:number,
        min_order_limit:number, 
        has_offer: boolean, 
        offer_price: number, 
        offer_based_on: string, 
        offer_percentage_price: number,
        offer_details: OfferDetails, 
        is_stock: boolean, 
        max_sales_order: number, 
        min_sales_order: number,
        conversion_factor: number,
        base_uom_name:string,
        base_uom_conversion_factor:number,
        sales_uom_name:string,
        sales_uom_conversion_factor:number,
        produced_country:string,
        inventory_id:number,
        name:string,
        display_name:string,
        image1:string,
        set_offer:boolean,
        stock_count:number,
        discount_details:discount_details,    
        inventory_name:any,
        estimated_delivery:any,
        quantity:number,
        image:any){
        this.id = id;
        this.selling_price = selling_price;
        this.has_offer = has_offer;
        this.offer_price = offer_price; 
        this.offer_based_on = offer_based_on; 
        this.offer_percentage_price = offer_percentage_price;
        this.offer_details = offer_details
        this.is_stock = is_stock; 
        this.max_sales_order = max_sales_order;
        this.min_sales_order = min_sales_order;
        this.conversion_factor = conversion_factor;
        this.base_uom_name = base_uom_name;
        this.base_uom_conversion_factor = base_uom_conversion_factor
        this.produced_country = produced_country
        this.sales_uom_name = sales_uom_name
        this.sales_uom_conversion_factor = sales_uom_conversion_factor
        this.inventory_id = inventory_id; 
        this.name = name;
        this.display_name = display_name;
        this.image1 = image1 ;
        this.set_offer = set_offer;
        this.max_order_limit = max_order_limit;
        this.min_order_limit = min_order_limit;
        this.rating = rating,
        this.stock_count=stock_count,
        this.discount_details=discount_details,
        this.inventory_name=inventory_name, 
        this.estimated_delivery=estimated_delivery,
        this.quantity=quantity,
        this.image=this.image
    }
}


export class countryList{
    name!:any;
    code!:any
    constructor(name:any,code:any){
        this.name=name,
        this.code=code
    }
}