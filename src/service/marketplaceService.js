import {supabase} from "./supabaseClient";
import {getCurrentUser} from "./authService";
import {Advertisements} from "../models/advertisements";
import {Card} from "../models/card";
import {message} from "antd";

export const fetchByAdvertisementId = async (id) => {
    try {
        const { data: advertisementData } = await supabase
            .from('advertisements')
            .select('*, profile(*), card(*)')
            .eq('id', id)
            .single();

        if (!advertisementData) {
            throw new Error('Anúncio não encontrado');
        }

        return advertisementData;
    } catch (error) {
        message.error(error.message);
    }
};

export const fetchAdvertisementByUserId = async () => {
    try {
        const user = await getCurrentUser();
        
        const { data: advertisementsData, error: advertisementsError } = await supabase
            .from('advertisements')
            .select('*, card(*)')
            .eq('status', 1)
            .eq('seller', user.id);

        if (advertisementsError) {
            throw advertisementsError;
        }

        return advertisementsData.map(ad => new Advertisements(
            ad.id,
            ad.title,
            ad.description,
            ad.quantity,
            ad.status,
            ad.created_at,
            ad.price,
            new Card(
                ad.card.id,
                ad.card.card_id,
                ad.card.name,
                ad.card.description,
                ad.card.image,
                ad.card.artist,
                ad.card.rarity,
                ad.card.type
            ),
            user,
            ad.sale
        ));   
    } catch {
        return [];
    }
};

export const createOrder = async (advertisement, purchaseQuantity, user, selectedTrade, tradeQuantity) => {
    
        const { error } = await supabase.rpc('create_order', {
            is_deal: !advertisement.sale,
            buyer_uuid: user.id,
            advertisement_id: advertisement.id,
            seller_uuid: advertisement.seller.id,
            buyer_advertisement_id: selectedTrade ? selectedTrade.id : 0,
            purchase_quantity: purchaseQuantity,            
            trade_quantity: tradeQuantity ? tradeQuantity : 0
        });

    // eslint-disable-next-line no-throw-literal
        if (error) throw 'Erro ao realizar solicitação';
};