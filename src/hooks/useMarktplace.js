import {useEffect, useRef, useState} from 'react';
import {createOrder, fetchAdvertisementByUserId, fetchByAdvertisementId} from '../service/marketplaceService';
import {useNavigate, useParams} from 'react-router-dom';
import {message} from 'antd';
import {useAuthHook} from './useAuthHook';
import {Advertisements} from "../models/advertisements";

const useMarketplace = () => {
    const {id} = useParams();
    const [advertisement] = useState(new Advertisements(null, null, null, null, null, null, null, null, null, null));
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isTradeModalVisible, setIsTradeModalVisible] = useState(false);
    const [userAdvertisements, setUserAdvertisements] = useState([]);
    const [selectedTrade, setSelectedTrade] = useState(null);
    const [tradeQuantities, setTradeQuantities] = useState({});
    const [update, setUpdate] = useState(false);
    const [total, setTotal] = useState(1);
    const carouselRef = useRef(null);
    const navigate = useNavigate();
    const {currentUser, loading:loadingUser} = useAuthHook();

    const fetchAdvertisement = async () => {
        try {
            const result = await fetchByAdvertisementId(id);
            advertisement.fromObject(result);
            setUpdate(!update);
        } catch(e) {
            navigate('/');
        }
            finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchAdvertisement();
        }
    }, [id]);// eslint-disable-line react-hooks/exhaustive-deps

    const handleShowModal = () => {
        setIsModalVisible(true);
    };

    const handleShowTradeModal = async () => {
        try {
            const result = await fetchAdvertisementByUserId();
            setUserAdvertisements(result);
            // Reset tradeQuantities
            const initialQuantities = result.reduce((acc, ad) => {
                acc[ad.id] = ad.quantity; // Inicializa a quantidade com 1
                return acc;
            }, {});
            setTradeQuantities(initialQuantities);
        } catch (error) {
            message.error(error);
        }
        setIsTradeModalVisible(true);
    };

    const handlePurchase = async () => {
        setIsModalVisible(false);
        console.log(currentUser);
        await createOrder(advertisement, total, currentUser);
        navigate('/orders')
    };

    const handleTrade = async () => {
        setIsTradeModalVisible(false);
        await createOrder(advertisement, total, currentUser, selectedTrade, tradeQuantities[selectedTrade.id]);
        navigate('/orders')
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
        if (total < advertisement.quantity) {
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
        advertisement, 
        loading,
        loadingUser, 
        isModalVisible, 
        isTradeModalVisible,
        userAdvertisements,
        handleShowModal, 
        handleShowTradeModal,
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
