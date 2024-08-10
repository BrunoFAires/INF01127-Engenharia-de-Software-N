import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Order } from "../models/order";
import { CompletedOrders2, ConfirmDelivery, PendingOrders2, RatePlayers } from "../service/orderService";
import { useAuthHook } from "./useAuthHook";

export const useOrders = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [evaluatedOrders, setEvaluatedOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { loading: loadingUser, currentUser } = useAuthHook();
    const navigate = useNavigate();
    const orderIdRef = useRef(new Set());
    const [updateCompletedOrders, setUpdateCompletedOrders] = useState(false);
    const [updatePendingOrders, setUpdatePendingOrders] = useState(false);

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
                const { data, error } = await PendingOrders2(currentUser);
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
                const { data, error } = await CompletedOrders2(currentUser);
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

    const   ratePlayers = async (User, RatingGrade, orderId) => {
        try {
            //await RatePlayers (User,RatingGrade, orderId);
            const order = completedOrders.find(it => it.id === orderId)
            order.evaluatedOrder()
            await RatePlayers (User,RatingGrade, orderId, currentUser);
        } catch (error) {
            console.error("Error rating players", error);
        }}

    return {
        pendingOrders,
        completedOrders,
        evaluatedOrders,
        loading,
        error,
        confirmDelivery,
        ratePlayers,
        currentUser,
        orderId: orderIdRef.current
    };
};
