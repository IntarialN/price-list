import {ModelItem} from "@/modules/items/models";

export interface ItemState {
    items: ModelItem[];
    pages: number;
    itemsPerPage: number;
    activePage: number;
}

export type ItemSortType = {
    [key in ItemSortKeys]: ItemSortTypes
}

export type ItemSortKeys = 'price' | 'name'
export type ItemSortTypes = 'ASC' | 'DESC'