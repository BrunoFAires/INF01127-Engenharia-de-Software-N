import {supabase} from "./supabaseClient";
import {Order} from "../models/order";

export const mySales = async (user) => {
    const result = await supabase
        .from('order')
        .select('*, order_user!inner(*, profile(*), advertisements!inner(*, card(*), profile(*)))')
        .eq('order_user.advertisements.seller', user.id)
        .eq('deal', false)


    const {error, data} = result

    if (error) {
        // eslint-disable-next-line no-throw-literal
        throw 'Erro ao buscar as vendas'
    }

    return data.map(OrderResult => {
        return new Order(
            OrderResult.id,
            OrderResult.deal,
            OrderResult.created_at,
            OrderResult.finished_at,
            OrderResult.approved,
            OrderResult.order_user
        );
    });
}


export const pendingDeals = async (user) => {
    const orderIdsResult = await supabase
        .from('order')
        .select('id, order_user!inner(user_id)')
        .eq('deal', true)
        .eq('order_user.approved', false)
        .eq('order_user.user_id', user.id);

    const {error, data} = orderIdsResult

    if (error) {
        // eslint-disable-next-line no-throw-literal
        throw 'Erro ao buscar as vendas'
    }

    const orders = await supabase
        .from('order')
        .select('*, order_user(*, profile(*), advertisements(*, card(*), profile(*)))')
        .in('id', data.map(it => it.id))

    const {error: ordersError, data: ordersData} = orders

    if (ordersError) {
        // eslint-disable-next-line no-throw-literal
        throw 'Erro ao buscar as vendas'
    }


    return ordersData.map(OrderResult => {
        return new Order(
            OrderResult.id,
            OrderResult.deal,
            OrderResult.created_at,
            OrderResult.finished_at,
            OrderResult.approved,
            OrderResult.order_user
        );
    });
}

export const updateOffer = async (orderId, value) => {
    const result = await supabase
        .from('order_user')
        .update({'approved': value, 'finished': !value})
        .eq('order_id', orderId)

    const {error} = result

    if (error) {
        // eslint-disable-next-line no-throw-literal
        throw 'Ocorreu um problema ao processar a solicitação.'
    }
}