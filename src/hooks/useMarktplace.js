import { useEffect, useState, useRef } from 'react';
import { fetchByAdvertisementId, purchase, fetchByUserId, trade } from '../service/marketplaceService';
import { useParams } from 'react-router-dom';
import { Advertisement } from '../models/advertisement';

const useMarketplace = () => {
    const {id} = useParams();
    const [order] = useState(new Advertisement(null, null, null, null, null, null, null, null, null, null));
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isTradeModalVisible, setIsTradeModalVisible] = useState(false);
    const [userAdvertisements, setUserAdvertisements] = useState([]);
    const [selectedTrade, setSelectedTrade] = useState(null);
    const [tradeQuantities, setTradeQuantities] = useState({});
    const [total, setTotal] = useState(1);
    const carouselRef = useRef(null);

    const fetchOrder = async () => {
        try {
            const result = await fetchByAdvertisementId(id);
            order.fromObject(result);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchOrder();
        }
    }, [id]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showTradeModal = async () => {
        try {
            const result = await fetchByUserId();
            setUserAdvertisements(result);
            // Reset tradeQuantities
            const initialQuantities = result.reduce((acc, ad) => {
                acc[ad.id] = 1; // Inicializa a quantidade com 1
                return acc;
            }, {});
            setTradeQuantities(initialQuantities);
        } catch (error) {
        }
        setIsTradeModalVisible(true);
    };

    const handlePurchase = async () => {
        setIsModalVisible(false);
        await purchase(order, total); // Chama o serviço para realizar a compra com a quantidade
        //TODO: NAVIGATE PARA TELA DO EDUARDO
    };

    const handleTrade = async () => {
        setIsTradeModalVisible(false);
        await trade(order, selectedTrade, tradeQuantities[selectedTrade.id], total);
        // Lógica para realizar a troca
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsTradeModalVisible(false);
    };

    const handleDecrement = () => {
        if (total > 1) {
            setTotal(total - 1);
        }
    };

    const handleIncrement = () => {
        console.log(order);
        if (total < order.quantity) {
            setTotal(total + 1);
        }
    };

    const handleTradeDecrement = (adId) => {
        setTradeQuantities((prev) => ({
            ...prev,
            [adId]: (prev[adId] || 1) > 1 ? (prev[adId] || 1) - 1 : 1
        }));
    };

    const handleTradeIncrement = (adId, max) => {
        setTradeQuantities((prev) => ({
            ...prev,
            [adId]: (prev[adId] || 1) < max ? (prev[adId] || 1) + 1 : max
        }));
    };

    const handlePrev = () => {
        carouselRef.current.prev();
    };

    const handleNext = () => {
        carouselRef.current.next();
    };

    return { 
        order, 
        loading, 
        isModalVisible, 
        isTradeModalVisible,
        userAdvertisements,
        showModal, 
        showTradeModal,
        handlePurchase, 
        handleTrade,
        handleCancel, 
        total, 
        handleDecrement, 
        handleIncrement,
        tradeQuantities,
        handleTradeDecrement,
        handleTradeIncrement,
        selectedTrade,
        setSelectedTrade,
        carouselRef,
        handlePrev,
        handleNext
    };
};

export default useMarketplace;
