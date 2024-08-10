import {useEffect, useState} from "react";
import {message} from "antd";
import {mySales, pendingDeals, updateOffer} from "../service/salesService";
import {useAuthHook} from "./useAuthHook";

export const useSales = () => {
    const [loading, setLoading] = useState(true)
    const [sales, setSales] = useState([])
    const [deals, setDeals] = useState([])
    const {currentUser} = useAuthHook()

    const fetchSales = async () => {
        if (!currentUser)
            return

        try {
            const sales = await mySales(currentUser)
            setSales(sales)
        } catch (e) {
            message.error(e)
        }
    }

    const fetchPendingDealls = async () => {
        if (!currentUser)
            return

        try {
            const deals = await pendingDeals(currentUser)
            setDeals(deals)
        } catch (e) {
            message.error(e)
        }
    }

    useEffect(() => {
        fetchSales().then(() => {
            fetchPendingDealls().then(() => {
                setLoading(false)
            })
        })
    }, [currentUser]);

    const handleUpdateOffer = (orderId, value) => {
        try {
            updateOffer(orderId, value).then(() => {
                message.success('Operação realizada com sucesso.')
                const newDeals = deals.filter(it => it.id !== orderId)
                setDeals(newDeals)
            })
        } catch (e) {
            message.error(e)
        }
    }

    return {loading, sales, deals, currentUser, handleUpdateOffer}
}