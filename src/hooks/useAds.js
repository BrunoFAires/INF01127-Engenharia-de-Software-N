import {useEffect, useState} from "react";
import {findByName} from "../service/pokemonClient";
import {Advertisements} from "../models/advertisements";
import {deleteAd, insertAd, myAds, updateAd} from "../service/adsService";
import {useLocation} from "react-router-dom";
import {Card} from "../models/card";
import {message, Modal} from "antd";
import {useAuthHook} from "./useAuthHook";

export const useAds = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchCardTitle, setSearchCardTitle] = useState('');
    const [apiResponse, setApiResponse] = useState([]);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [actualPage, setActualPage] = useState(1);
    const [isValidForm, setIsValidForm] = useState(false);
    const [ads, setAds] = useState([]);
    const [isAddAdModalOpen, setIsAddAdModalOpen] = useState(false);
    const {currentUser, loading: loadingUser} = useAuthHook()
    const [ad, setAd] = useState(new Advertisements(null, '', '', 1, 1, null, null, {}, currentUser, true));

    const isSelectedCard = (cardId) => ad.card && ad.card.card_id === cardId;
    const {state} = useLocation();
    const adToEdit = state?.adToEdit;

    useEffect(() => {
        if (adToEdit) {
            const adObj = new Advertisements();
            adObj.fromObject(adToEdit);
            setAd(adObj);
        }
    }, [adToEdit]);

    useEffect(() => {
        const validForm = ad.title && ad.description && ad.quantity > 0 && ad.price > 0;
        setIsValidForm(validForm);
    }, [ad]);

    const resetAd = () => {
        if (!currentUser) {
            return
        }
        setAd(new Advertisements(null, '', '', 1, 1, null, null, {}, currentUser, true));
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSearchCardTitle('');
        setTotalPages(0);
        setApiResponse([]);
        setActualPage(1);
    };

    const handleChangeTitle = (data) => {
        ad.setTitle(data.target.value);
        setUpdate(!update);
    };

    const handleChangeDescription = (data) => {
        ad.setDescription(data.target.value);
        setUpdate(!update);
    };

    const handleChangeAdType = (value) => {
        ad.setStatus(value);
        setUpdate(!update);
    };

    const handleChangeSale = (value) => {
        ad.setSale(value);
        setUpdate(!update);
    };

    const handleChangeQuantity = (value) => {
        ad.setQuantity(value);
        setUpdate(!update);
    };

    const handleChangePrice = (value) => {
        ad.setPrice(value);
        setUpdate(!update);
    };

    const searchCard = async () => {
        if (!searchCardTitle) return;
        setLoading(true);
        const result = await findByName(searchCardTitle, actualPage);
        setApiResponse(result?.data || []);
        const total = Math.ceil(result?.totalCount / 10);
        setTotalPages(total);
        setLoading(false);
    };

    useEffect(() => {
        if (searchCardTitle) {
            searchCard();
        }
    }, [actualPage]);// eslint-disable-line react-hooks/exhaustive-deps

    const handleAddCard = (selectedCard) => {
        const card = new Card(
            null,
            selectedCard.id,
            selectedCard.name,
            selectedCard.description,
            selectedCard.images.large,
            selectedCard.artist,
            selectedCard.rarity,
            selectedCard.type,
        );

        ad.setCard(card);
        setUpdate(!update);
    };

    const handleRemoveCard = () => {
        ad.setCard(null);
        setUpdate(!update);
    };

    const handleSubmit = async () => {
        try {
            if (ad.id) {
                await updateAd(ad);
            } else {
                await insertAd(ad);
            }
        } catch (error) {
            console.error('Error submitting ads:', error);
            throw error;
        }
    };


    useEffect(() => {
        fetchAds();
    }, [currentUser]);// eslint-disable-line react-hooks/exhaustive-deps

    const fetchAds = async () => {
        if (!currentUser) {
            return
        }
        setLoading(true);
        try {
            const response = await myAds(currentUser);
            setAds(response);
        } catch (error) {
            console.error('Failed to fetch ads:', error);
        }
        setLoading(false);
    };

    const handleEdit = (ads) => {
        ad.setId(ads.id);
        ad.setTitle(ads.title);
        ad.setDescription(ads.description);
        ad.setSale(ads.sale);
        ad.setQuantity(ads.quantity);
        ad.setPrice(ads.price);
        ad.setCard(ads.card);
        setIsAddAdModalOpen(true);
    };

    const handleRemove = (id) => {
        Modal.confirm({
            title: 'Tem certeza que deseja remover este anúncio?',
            onOk: async () => {
                try {
                    await deleteAd(id);
                    message.success('Anúncio removido com sucesso');
                    fetchAds();
                } catch (error) {
                    message.error('Falha ao remover anúncio');
                }
            },
        });
    };

    const showAddAdModal = () => {
        resetAd();
        setIsAddAdModalOpen(true);
    };

    const handleAddAdModalOk = async () => {
        try {
            await handleSubmit();
            message.success('Anúncio publicado com sucesso');
            fetchAds();
            setIsAddAdModalOpen(false);
        } catch (error) {
            message.error('Falha ao publicar anúncio');
        }
    };

    const handleAddAdModalCancel = () => {
        setIsAddAdModalOpen(false);
    };

    return {
        handleChangeTitle,
        searchCardTitle,
        handleChangeDescription,
        handleChangeAdType,
        handleChangeSale,
        handleChangeQuantity,
        handleChangePrice,
        showModal,
        handleOk,
        isModalOpen,
        handleCancel,
        setSearchCardTitle,
        searchCard,
        apiResponse,
        loading,
        totalPages,
        setActualPage,
        actualPage,
        handleAddCard,
        handleRemoveCard,
        handleSubmit,
        ad,
        resetAd,
        isValidForm,
        showAddAdModal,
        ads,
        handleEdit,
        handleRemove,
        isAddAdModalOpen,
        handleAddAdModalCancel,
        handleAddAdModalOk,
        isSelectedCard,
        currentUser,
        loadingUser
    };
};
