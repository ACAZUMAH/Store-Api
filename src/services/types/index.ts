
export interface Query{
    page?: number;
    limit?: number;
    sort?: string;
    name?: string;
    company?: string;
    price?: number;
}

export interface product {
    name: string;
    company: string;
    price: number;
    rating?: number;
}