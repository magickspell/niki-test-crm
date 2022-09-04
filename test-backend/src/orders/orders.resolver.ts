import {Args, Resolver} from '@nestjs/graphql'
import {Query} from '@nestjs/graphql'
import {RetailService} from '../retail_api/retail.service'
import {OrdersResponse} from '../graphql'

@Resolver('Orders') // Resolver to Orders - class name
export class OrdersResolver {
    constructor(private retailService: RetailService) {
    }


    /*@Query() // decorator for Query, can include string  - param for query
    async orders(@Args('page') page: number) { // number - property to pass to GET Query, it's strange, that it is string and means id
      return this.retailService.orders({
        page: page,
        limit: 20,
      })
    }*/

    @Query()
    //async getOrders(@Args('page') id: number) {
    async getOrders(@Args('page') id: number): Promise<OrdersResponse> { //todo эта ебань не работает, разобраться почему!
        const resp = await this.retailService.orders({page: id})
            console.log(resp)
        return resp
    }

    @Query()
    async order(@Args('number') id: string) { // number - property to pass to GET Query, it's strange, that it is string and means id
        return this.retailService.findOrder(id)
    }
}
