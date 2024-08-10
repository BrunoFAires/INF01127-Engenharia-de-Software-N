export class Order_User {
    constructor(id, order_id, user_id,advertisement_id,finished,quantity,evaluated) {
        this.id = id;
        this.order_id = order_id;
        this.user_id = user_id;
        this.advertisement_id = advertisement_id;
        this.finished = finished;
        this.quantity = quantity;
        this.evaluated = evaluated;
     }
    deliveredOrder(){
        this.finished = true;
    }
    evaluatedOrder(){
        this.evaluated = true;
    }


}