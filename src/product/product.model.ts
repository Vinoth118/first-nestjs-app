export class Product {
    constructor(
        public id: string, 
        public title: string, 
        public price: { 
            price: number, 
            compareAtPrice: number 
        }
    ) {}
}