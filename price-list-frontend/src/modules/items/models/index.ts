export interface ModelItem {
    id: number;
    name: string;
    price: number;
}

export interface ItemErrorResponse {
    id: number;
    message: string;
}

export interface ItemFindResponse {
    items: ModelItem[],
    pages: number
}