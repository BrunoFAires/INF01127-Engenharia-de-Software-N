import { Order_User } from "./order_user";

export class Order {
    constructor(id, deal, created_at, finished_at, approved, order_user) {
        this.id = id;
        this.deal = deal;
        this.created_at = created_at;
        this.finished_at= finished_at;
        this.approved= approved
        this.order_user = order_user.map(it => new Order_User(it.id, it.order_id,it.user_id, it.advertisement_id, it.finished, it.quantity, it.evaluated))
    }
    deliveredOrder(){
        this.order_user[0].finished = true;
    }
    evaluatedOrder(){
        this.order_user[0].evaluated = true;
    }
}