export interface ProductItemProps {
    _id: string;
    slug: string;
    name: string;
    category: string;
    thumbnail: string;
    linktobuy: string;
    description: string;
    images: string[];
    price: number;
    discount?: number;
    details: string;
    isFeatured?: boolean;
}

export interface ProductItemPropsSlide {
    _id: string;
    slug: string;
    name: string;
    category: string;
    thumbnail: string;
    images: string[];
    price: number;
    discount?: number;
    isFeatured?: boolean;
}