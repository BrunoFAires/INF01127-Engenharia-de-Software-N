import { supabase } from "./supabaseClient";
import { getCurrentUser } from "./authService";
import { Advertisement } from "../models/advertisement";
import { Card } from "../models/card";

export const fetchByAdvertisementId = async (id) => {
    try {
        const { data: advertisementData, error: advertisementError } = await supabase
            .from('advertisements')
            .select('*, profile(*), card(*)')
            .eq('id', id)
            .single();

        if (advertisementError) {
            throw advertisementError;
        }

        if (!advertisementData) {
            throw new Error('Anúncio não encontrado');
        }

        return advertisementData;
    } catch (error) {
        return null;
    }
};

export const purchase = async (order, quantity) => {
    try {
        const user = await getCurrentUser();

        const { data, error } = await supabase.rpc('create_order', {
            is_deal: false, // Assuming a purchase deal
            buyer_uuid: user.id,
            advertisement_id: order.id,
            seller_uuid: order.seller.id,
            buyer_advertisement_id: null,
            purchase_quantity: quantity,
            trade_quantity: 0
        });

        if (error) throw error;
        
    } catch (error) {
    }
};

export const fetchByUserId = async () => {
    try {
        const user = await getCurrentUser();
        
        const { data: advertisementsData, error: advertisementsError } = await supabase
            .from('advertisements')
            .select('*, card(*)')
            .eq('seller', user.id);

        if (advertisementsError) {
            throw advertisementsError;
        }

        return advertisementsData.map(ad => new Advertisement(
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
    } catch (error) {
        console.error('Erro ao carregar anúncios do usuário', error);
        return [];
    }
};

export const trade = async (order, selectedTrade, tradeQuantity, total) => {
    try {
        const user = await getCurrentUser();

        const { data, error } = await supabase.rpc('create_order', {
            is_deal: true,
            buyer_uuid: user.id,
            advertisement_id: order.id,
            seller_uuid: order.seller.id,
            buyer_advertisement_id: selectedTrade.id,
            purchase_quantity: total,
            trade_quantity: tradeQuantity
        });

        if (error) throw error;

    } catch (error) {
        console.error('Erro ao realizar a troca:', error);
    }
};