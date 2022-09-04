
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export abstract class IQuery {
    abstract getOrders(page?: Nullable<number>): OrdersResponse | Promise<OrdersResponse>;

    abstract order(number: string): Nullable<Order> | Promise<Nullable<Order>>;

    abstract productStatuses(): Nullable<ProductStatus>[] | Promise<Nullable<ProductStatus>[]>;

    abstract orderStatuses(): Nullable<OrderStatus>[] | Promise<Nullable<OrderStatus>[]>;

    abstract deliveryTypes(): Nullable<DeliveryType>[] | Promise<Nullable<DeliveryType>[]>;
}

export class OrdersResponse {
    orders: Nullable<Order>[];
    pagination: Pagination;
}

export class Pagination {
    limit: number;
    totalCount: number;
    currentPage: number;
    totalPageCount: number;
}

export class OrderItemOffer {
    externalId?: Nullable<string>;
    displayName?: Nullable<string>;
    article?: Nullable<string>;
}

export class OrderItem {
    id: number;
    status: string;
    quantity: number;
    offer?: Nullable<OrderItemOffer>;
    comment: string;
}

export class Order {
    number: string;
    id: number;
    site: string;
    createdAt: string;
    status: string;
    delivery?: Nullable<OrderDelivery>;
    items: Nullable<OrderItem>[];
}

export class OrderDelivery {
    code?: Nullable<string>;
}

export class DeliveryType {
    code: string;
    name: string;
}

export class ProductStatus {
    code: string;
    name: string;
}

export class OrderStatus {
    code: string;
    name: string;
}

type Nullable<T> = T | null;
