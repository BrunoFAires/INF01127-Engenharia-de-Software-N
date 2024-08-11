import {Advertisements} from "./advertisements";
import {User} from "./user";
import {Profile} from "./profile";

export class Order_User {
    constructor(id, order_id, user, advertisement,finished,quantity,evaluated, approved) {
        this.id = id;
        this.order_id = order_id;
        this.profile = new Profile(user?.id, user?.name, user?.surname, user?.admin, user?.seller, user?.evaluations, user?.ratings);
        this.advertisement = new Advertisements(advertisement?.id, advertisement?.title, advertisement?.description, advertisement?.quantity, advertisement?.status, advertisement?.created_at, advertisement?.price, advertisement?.card, advertisement?.profile, advertisement?.sale);
        this.finished = finished;
        this.quantity = quantity;
        this.evaluated = evaluated;
        this.approved = approved
     }
    deliveredOrder(){
        this.finished = true;
    }
    evaluatedOrder(){
        this.evaluated = true;
    }


}