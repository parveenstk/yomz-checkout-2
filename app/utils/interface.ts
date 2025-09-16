export interface ProductData {
    id: number;
    img: { [key: string]: string };
    title: { [key: string]: string };
    bagQty: number;
    compareAtPrice: number;
    price: number;
    percentageOff: number;
}