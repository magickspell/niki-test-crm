// methods for controllers
import {Injectable} from '@nestjs/common'
import {CrmType, Order, OrdersFilter, RetailPagination} from './types'
import axios, {AxiosInstance} from 'axios'
import {ConcurrencyManager} from 'axios-concurrency'
import {serialize} from '../tools'
import {plainToClass} from 'class-transformer'
import {OrderDelivery, OrderItem, OrdersResponse} from "../graphql";


@Injectable() // it makes something like DataProvider Layer does
export class RetailService {
    private readonly axios: AxiosInstance

    constructor() {
        this.axios = axios.create({
            baseURL: `${process.env.REACT_APP_RETAIL_URL}/api/v5`,
            timeout: 10000,
            headers: {},
        })

        this.axios.interceptors.request.use((config) => {
            //console.log(config)
            return config
        })
        this.axios.interceptors.response.use(
            (r) => {
                //console.log("Result:", r.data)
                return r
            },
            (r) => {
                //console.log("Error:", r.response.data)
                return r
            },
        )
    }
    async orders(filter?: OrdersFilter): Promise<any> {
        const params = serialize(filter, '')
        console.log(`params`)
        console.log(params)
        const resp = await this.axios.get(`/orders?apiKey=${process.env.REACT_APP_RETAIL_KEY}&${params}`)

        if (!resp.data) throw new Error('RETAIL CRM ERROR')

        const orders = plainToClass(Order, resp.data.orders as Array<any>)
        const pagination: RetailPagination = resp.data.pagination
        /*https://stackoverflow.com/questions/56319137/why-does-a-graphql-query-return-null*/
        return {orders, pagination} // блять, это просто ахуенно, нужно было заменить массив на объект
        /*return [
            plainToClass(Order, resp.data.orders.map((i: any) => {
                return {
                    number: i.number,
                    id: i.id,
                    site: i.site,
                    createdAt: i.createdAt,
                    status: i.status,
                }
            }) as Array<any>),
            (() => {
                return {
                    limit: resp.data.pagination.limit,
                    totalCount: resp.data.pagination.totalCount,
                    currentPage: resp.data.pagination.currentPage,
                    totalPageCount: resp.data.pagination.totalPageCount,
                }
            })()
        ]*/
    }

    /*https://example5.retailcrm.ru/api/v5/orders?apiKey={env.apiKey}[ids][]=629*/
    async findOrder(id: string): Promise<Order | null> {
        const resp = await this.axios.get(`/orders?apiKey=${process.env.REACT_APP_RETAIL_KEY}&filter[ids][]=${id}`)
        if (!resp.data) throw new Error('RETAIL CRM ERROR')

        const order = plainToClass(Order, resp.data.orders[0] as Order)
        return order
    }

    /* https://example5.retailcrm.ru/api/v5/orders/statuses?apiKey=&ids[]=629 */
    async orderStatuses(): Promise<CrmType[]> {
        const resp = await this.axios.get(`orders/statuses?apiKey=${process.env.REACT_APP_RETAIL_KEY}&ids[]=${629}`)
        if (!resp.data) throw new Error('RETAIL CRM ERROR')

        return plainToClass(CrmType, (
            Object.values(resp.data.orders).map((i: any) => { // parse arr from obj because we need arr
                return {name: i.status, code: i.group}
            })
        ) as Array<CrmType>)
    }

    /* https://example5.retailcrm.ru/api/v5/reference/product-statuses?apiKey= */
    async productStatuses(): Promise<CrmType[]> {
        const resp = await this.axios.get(`/reference/product-statuses?apiKey=${process.env.REACT_APP_RETAIL_KEY}`)
        if (!resp.data) throw new Error('RETAIL CRM ERROR')

        return plainToClass(CrmType, (
            Object.values(resp.data.productStatuses).map((i: any) => { // parse arr from obj because we need arr
                return {code: i.code, name: i.name}
            })
        ) as Array<CrmType>)
    }

    /* https://example5.retailcrm.ru/api/v5/reference/delivery-types?apiKey={} */
    async deliveryTypes(): Promise<CrmType[]> {
        const resp = await this.axios.get(`/reference/delivery-types?apiKey=${process.env.REACT_APP_RETAIL_KEY}`)
        if (!resp.data) throw new Error('RETAIL CRM ERROR')

        return plainToClass(CrmType, (
            Object.values(resp.data.deliveryTypes).map((i: any) => { // parse arr from obj because we need arr
                return {code: i.code, name: i.name}
            })
        ) as Array<CrmType>)
    }
}
