import {supabase} from './supabaseClient';


export const PendingOrders = async (user) => {
    return supabase
        .from('order_user')
        .select(`*,order_id (*),advertisement_id (*,card(*),seller(*))`)
        .eq('user_id', user.id)
        .eq('order_user.approved', true)
        .eq('finished', false);
};

export const CompletedOrders = async (user) => {
    return supabase
        .from('order_user')
        .select(`*,order (*),advertisement_id (*,card(*),seller(*))`)
        .eq('user_id', user.id)
        .eq('finished', true);
}

export const RatePlayers = async (user, Rate, idOrder, currentUser) => {
    const {data, error} = await supabase
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
    Var_Evaluations++;
    Var_Rate = Var_Rate / Var_Evaluations;


    const {error: insertError} = await supabase
        .from('profile')
        .update({ratings: Var_Rate, evaluations: Var_Evaluations})
        .eq('id', user);
    if (insertError) {
        console.error('Error updating profile:', insertError);
        throw insertError;
    }

    const {data: data2, error: error2} = await supabase
        .from('order_user')
        .select('*')
        .eq('order_id', idOrder)
        .eq('user_id', currentUser.id)
        .single();
    if (error2) {
        throw new Error(`Erro ao buscar order_user: ${error.message}`);
    }
    if (data2) {

        const {error: updateError} = await supabase
            .from('order_user')
            .update({evaluated: true})
            .eq('id', data2.id);
        if (updateError) {
            throw new Error(`Erro ao atualizar order_user: ${updateError.message}`);
        }
    }

};
export const ConfirmDelivery = async (orderUserId, user) => {

    const {error} = await supabase
        .from('order_user')
        .update({'finished': true})
        .eq('id', orderUserId)
        .eq('user_id', user.id)
    if (error) {
        throw new Error(`Erro ao buscar order_user: ${error.message}`);
    }
};


export const PendingOrders2 = async (User) => {

    return supabase
        .from('order')
        .select(`*,order_user!inner(*,advertisements (*,card(*), profile(*)))`)
        .eq('order_user.finished', false)
        .eq('order_user.approved', true)
        .eq('order_user.user_id', User.id);


};

export const CompletedOrders2 = async (User) => {

    return supabase
        .from('order')
        .select(`*,order_user!inner(*,advertisements (*,card(*), profile(*)))`)
        .eq('order_user.finished', true)
        .eq('order_user.user_id', User.id);
};

