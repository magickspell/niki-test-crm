import { makeAutoObservable } from "mobx";
import { SingleOrder } from "~/screens/Orders/Show/types";
import client from "~/api/gql";
import {ORDER_QUERY} from "~/screens/Orders/Show/queries";

export default class OrdersShowStore {
  order: SingleOrder | null = null;
  id: string | number | null = null;
  initialized: boolean = false;
  loading = true

  constructor() {
    makeAutoObservable(this);
  }

  setOrder(): void {
    let urlsPath = window.location.href.split(`/`)
    this.id = (urlsPath[urlsPath.length - 1])
  }
  setOrderState(order: SingleOrder): void {
    this.order = order;
  }

  async loadOrder(): Promise<any> {
    this.loading = true;

    const response = await fetch(client.url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: ORDER_QUERY(String(this.id)),
      }),
    });
    const responseBody = await response.json();
    console.log(responseBody.data)
    //this.order = responseBody.data
    this.setOrderState(responseBody.data.order)
    console.log(`mobx order`)
    console.log(this.order)

    this.loading = false;
  }

  initialize() {
    if (!this.initialized) {
      this.initialized = true;
      this.setOrder()
      this.loadOrder()
    }
  }

}
