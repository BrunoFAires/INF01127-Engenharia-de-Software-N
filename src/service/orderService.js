import { supabase } from './supabaseClient';


export const PendingOrders = async (user) => {
    return supabase
        .from('order_user')
        .select(`*,order_id (*),advertisement_id (*,card(*),seller(*))`)
        .eq('user_id', user.id)
        .eq('finished', false);
};

export const CompletedOrders = async (user) => {
    return supabase
    .from('order_user')
        .select(`*,order (*),advertisement_id (*,card(*),seller(*))`)
        .eq('user_id', user.id)
        .eq('finished', true);
}

export const RatePlayers = async (user, Rate, idOrder) => {
    const { data, error } = await supabase
        .from('profile')
        .select('*')
        .eq('id', user)
        .single();
    if (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }

        let Var_Rate = 0;
        let Var_Evaluations = data.evaluations;
        Var_Rate = Rate + (data.ratings * data.evaluations);
        Var_Evaluations ++;
        Var_Rate = Var_Rate / Var_Evaluations;


    const { error: insertError } = await supabase
        .from('profile')
        .update({ ratings: Var_Rate, evaluations: Var_Evaluations })
        .eq('id', user);
        if (insertError) {
            console.error('Error updating profile:', insertError);
        throw insertError;
        }

   
        const { error : insertError2 } = await supabase
            .from('order_user')
            .update({ evaluated: true })
            .eq('id',idOrder );
        if (insertError2) throw insertError2;

};
export const ConfirmDelivery = async (orderUserId) => {
    
    const { error: error1 } = await supabase
        .from('order_user')
        .update({ finished: true })
        .eq('id', orderUserId);
    if (error1) throw error1;


    const { data: orderUser, error: error2 } = await supabase
        .from('order_user')
        .select('order_id')
        .eq('id', orderUserId)
        .single();
    if (error2) throw error2;


    const now = new Date().toISOString();
    const { error: error3 } = await supabase
        .from('order')
        .update({ finished_at: now })
        .eq('id', orderUser.order_id);
    if (error3) throw error3;
};