import {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Order} from "../models/order";
import {CompletedOrders2, ConfirmDelivery, PendingOrders2, RatePlayers} from "../service/orderService";
import {useAuthHook} from "./useAuthHook";
import {message} from "antd";

export const useOrders = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [evaluatedOrders, setEvaluatedOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {loading: loadingUser, currentUser} = useAuthHook();
    const orderIdRef = useRef(new Set());
    const [rating, setRating] = useState({});
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [isRateConfirmModalOpen, setIsRateConfirmModalOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [selectedAd_Id, setSelectedAd_Id] = useState(null);

    useEffect(() => {
        const fetchPendingOrders = async () => {
            if (loadingUser) {
                return;
            }

            if (!currentUser) {
                return;
            }

            try {
                const pendingOrders1 = [];
                const {data, error} = await PendingOrders2(currentUser);
                if (error) {
                    console.error("Error fetching pending orders:", error);
                    throw error;
                }

                data.forEach(OrderResult => {

                    const orderVar = new Order(
                        OrderResult.id,
                        OrderResult.deal,
                        OrderResult.created_at,
                        OrderResult.finished_at,
                        OrderResult.approved,
                        OrderResult.order_user
                    );
                    pendingOrders1.push(orderVar);
                    orderIdRef.current.add(OrderResult.id);
                });
                setPendingOrders(pendingOrders1);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPendingOrders();
    }, [currentUser]);


    useEffect(() => {
        const fetchCompletedOrders = async () => {
            if (loadingUser) {
                return;
            }

            if (!currentUser) {
                console.log("currentUser is not defined, returning");
                return;
            }

            try {
                const completedOrders = [];
                const {data, error} = await CompletedOrders2(currentUser);
                if (error) {
                    console.error("Error fetching pending orders:", error);
                    throw error;
                }

                data.forEach(OrderResult => {
                    const orderVar = new Order(
                        OrderResult.id,
                        OrderResult.deal,
                        OrderResult.created_at,
                        OrderResult.finished_at,
                        OrderResult.approved,
                        OrderResult.order_user
                    );
                    completedOrders.push(orderVar);
                });
                setCompletedOrders(completedOrders);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCompletedOrders();
    }, [currentUser, loadingUser]);


    const confirmDelivery = async (orderId) => {
        try {
            const order = pendingOrders.find(it => it.id === orderId)
            order.deliveredOrder()
            const newPendingOrders = pendingOrders.filter(it => it.id !== orderId)
            setPendingOrders(newPendingOrders)
            setCompletedOrders([...completedOrders, order])
            await ConfirmDelivery(orderId, currentUser.id);
        } catch (error) {
            console.error("Error confirming delivery:", error);
        }
    };

    const ratePlayers = async (User, RatingGrade, orderId) => {
        try {
            //await RatePlayers (User,RatingGrade, orderId);
            const order = completedOrders.find(it => it.id === orderId)
            order.evaluatedOrder()
            await RatePlayers(User, RatingGrade, orderId, currentUser);
        } catch (error) {
            console.error("Error rating players", error);
        }
    }

    const handleRatingChange = (value, orderId) => {
        if (!isNaN(value)) {
            setRating(prevRatings => ({
                ...prevRatings,
                [orderId]: value
            }));
        }
    };

    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };


    const showConfirmModal = (orderId) => {

        setSelectedOrder(orderId);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmModalOk = async () => {
        try {
            await confirmDelivery(selectedOrder);
            message.success('Pedido confirmado com sucesso');
            setIsConfirmModalOpen(false);
        } catch (error) {
            message.error('Falha ao confirmar pedido');
        }
    };

    const handleConfirmModalCancel = () => {
        setIsConfirmModalOpen(false);
    };

    const showRateConfirmModal = (idSeller, rating, advertisement_id) => {
        setSelectedSeller(idSeller)
        setSelectedAd_Id(advertisement_id)
        setSelectedRating(rating);
        setIsRateConfirmModalOpen(true);
    };

    const handleRateConfirmModalOk = async () => {
        try {
            await ratePlayers(selectedSeller, selectedRating, selectedAd_Id, currentUser);
            message.success('Avaliação enviada com sucesso');
            setIsRateConfirmModalOpen(false);
        } catch (error) {
            message.error('Falha ao enviar avaliação');
        }
    };

    const handleRateConfirmModalCancel = () => {
        setIsRateConfirmModalOpen(false);
    };

    return {
        pendingOrders,
        completedOrders,
        evaluatedOrders,
        loading,
        error,
        orderId: orderIdRef.current,
        rating,
        handleRatingChange,
        handleKeyPress,
        showConfirmModal,
        showRateConfirmModal,
        isConfirmModalOpen,
        handleConfirmModalOk,
        handleRateConfirmModalCancel,
        isRateConfirmModalOpen,
        handleRateConfirmModalOk,
        handleConfirmModalCancel
    };
};
