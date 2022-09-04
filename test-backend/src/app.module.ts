// app.module.ts - The root module of the application. (nest.js)
import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {RetailService} from './retail_api/retail.service'
import {GraphQLModule} from '@nestjs/graphql'
import {OrdersModule} from './orders/orders.module'
import {ReferenceModule} from './reference/reference.module'

const {join} = require('path')

// typical graphql via nest
@Module({ //
    imports: [
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'], // path to gql files //To use the "schema 1st" approach (can be "code 1st"), start by adding a typePaths property to the options object.
            definitions: { // The path property of the definitions object indicates where to save generated TS output. By default as interfaces.
                path: join(process.cwd(), 'src/graphql.ts'), // generate and connect ts types
                outputAs: 'class',
            },
        }),
        OrdersModule,
        ReferenceModule,
    ],
    controllers: [AppController], // our controllers
    providers: [AppService, RetailService],
})

export class AppModule {
}
