import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Order_User } from '../models/order_user';
import { CompletedOrders, ConfirmDelivery, PendingOrders, RatePlayers } from "../service/orderService";
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
                console.log("loadingUser is true, returning");
                return;
            }

            if (!currentUser) {
                console.log("currentUser is not defined, returning");
                return;
            }

            try {
                const pendingOrders1 = [];
                const { data, error } = await PendingOrders(currentUser);
                if (error) {
                    console.error("Error fetching pending orders:", error);
                    throw error;
                }

                data.forEach(Order_UserResult => {

                    const orderUser = new Order_User(
                        Order_UserResult.id,
                        Order_UserResult.order_id,
                        currentUser,
                        Order_UserResult.advertisement_id,
                        Order_UserResult.finished,
                        Order_UserResult.quantity,
                        Order_UserResult.evaluated
                    );
                    pendingOrders1.push(orderUser);
                    orderIdRef.current.add(Order_UserResult.id);
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
                console.log("loadingUser is true, returning");
                return;
            }

            if (!currentUser) {
                console.log("currentUser is not defined, returning");
                return;
            }

            try {
                const completedOrders = [];
                const { data, error } = await CompletedOrders(currentUser);
                if (error) {
                    console.error("Error fetching pending orders:", error);
                    throw error;
                }

                data.forEach(Order_UserResult => {
                    const orderUser = new Order_User(
                        Order_UserResult.id,
                        Order_UserResult.order_id,
                        currentUser,
                        Order_UserResult.advertisement_id,
                        Order_UserResult.finished,
                        Order_UserResult.quantity,
                        Order_UserResult.evaluated
                    );
                    completedOrders.push(orderUser);
                });
                setCompletedOrders(completedOrders);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCompletedOrders();
    }, [currentUser, loadingUser,updateCompletedOrders]);

    

    const confirmDelivery = async (orderId) => {
        try {
            const order = pendingOrders.find(it => it.id === orderId)
            order.deliveredOrder()
            const newPendingOrders = pendingOrders.filter(it => it.id !== orderId)
            setPendingOrders(newPendingOrders)
            setCompletedOrders([...completedOrders, order])
            await ConfirmDelivery(orderId);
        } catch (error) {
            console.error("Error confirming delivery:", error);
        }
    };

    const   ratePlayers = async (User, RatingGrade, orderId) => {
        console.log("testando",User,RatingGrade,orderId)
        try {
            await RatePlayers (User,RatingGrade, orderId);
            const order = completedOrders.find(it => it.id === orderId)
            order.evaluatedOrder()
            setEvaluatedOrders([...evaluatedOrders, order])
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
        orderId: orderIdRef.current
    };
};
