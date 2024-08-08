export interface SubItem {
    name: string;
    link: string;
}

export interface MenuItemType {
    id?: string
    name: string;
    link?: string;
    icon: string;
    subItems?: SubItem[];
}