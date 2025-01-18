import React from "react";
import {UserType} from "./user.ts";

export interface ToothCategoryType {
    code: string,
    name: string,
    available: boolean,
    user: UserType
}


export interface ToothType {
    id: React.Key;
    tooth_id: string;
    name: string;
    brand: string;
    category: ToothCategoryType;
    stock_quantity: number;
    sale_price: string;
    user: UserType;
    available: boolean;
    color: string;
    material: string;
    model: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    images: string[];
    created_at: string;
    updated_at: string;
}
