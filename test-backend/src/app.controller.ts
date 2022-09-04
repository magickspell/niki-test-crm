// A basic controller with a single route. (nest.js)
// Controllers are responsible for handling incoming requests and returning responses to the client.
import {Controller, Get, Header, HttpCode, Param, Post, Redirect, Req} from '@nestjs/common'
import { AppService } from './app.service'

@Controller() // this decorator accepts string to combine different routes in one
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // this decorator accepts string - path of the method
  getHello(): string {
    return this.appService.getHello()
  }
}

/*@Controller(`orders`)
export class OrdersController {
  constructor(private readonly appService: AppService) {}

  @Get() // crud - post
  getterOrders(@Req() request: any): string { //@Req decorator - its like Axios Interceptor with Promise - it allows to iterate with req
    console.log(request)
    return this.appService.getHello()
  }
  @Get(':id') // it  comes to "...host/orders/123"
  findOrder(@Param() params): string { // get params decorator
    console.log(params.id)
    return `This action returns a #${params.id} order`
  }

  @Post() // crud - post
  @HttpCode(200) // decorator that intercept response code
  @Header('Cache-Control', 'none') // decorator that intercept header
  create() {
    return 'Orders POST triggered!'
  }
}*/
