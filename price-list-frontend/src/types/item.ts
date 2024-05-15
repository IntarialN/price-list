import {ModelItem} from "@/modules/items/models";

export interface ItemState {
    items: ModelItem[];
    pages: number;
    itemsPerPage: number;
    activePage: number;
}