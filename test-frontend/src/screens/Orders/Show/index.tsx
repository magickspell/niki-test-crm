import React, {useEffect} from "react";
import OrdersShowStore from "./store";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import styles from "./styles.m.styl";
import {SingleOrderItem} from "~/screens/Orders/Show/types";

type ShowParams = {
    id: string;
};

const OrdersShow = observer(
    (): JSX.Element => {
        const [state] = React.useState(new OrdersShowStore());

        useEffect(() => {
            if (state.initialized) return;
            state.initialize();
        });

        return (
            <div className={styles.screenWrapper}>
                <div className={styles.screen}>
                    <div className={styles.items}>
                        {
                            (!state.order)
                                ? `order unknown`
                                : <>
                                    <h3>Order</h3>
                                    <p>number: {state.id}</p>
                                    <p>status: {state.order.status}</p>
                                    {(state.order.items.length > 0)
                                        ?
                                        <>
                                            <u><b>Items:</b></u>
                                        <ul>
                                            {
                                                state.order.items.map((i: SingleOrderItem) => <li>
                                                    <p>id: {i.id}</p>
                                                    <p>offer: {i.offer.displayName}</p>
                                                    <p>quantity: {i.quantity}</p>
                                                </li>)
                                            }
                                        </ul>
                                        </>
                                        : <p><b style={{color: "darkred"}}>No items</b></p>
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        );
    }
);

export default OrdersShow;
