import { useEffect, useState } from "react";
import { findByName } from "../service/pokemonClient";
import { Advertisements } from "../models/advertisements";
import { insertAnuncio, updateAnuncio } from "../service/adsService";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "../models/card";

export const useAds = ({ currentUser }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchCardTitle, setSearchCardTitle] = useState('');
    const [apiResponse, setApiResponse] = useState([]);
    const [anuncio] = useState(new Advertisements(null, '', '', 1, 0, null, 0, {}, currentUser));
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [actualPage, setActualPage] = useState(1);
    const [update, setUpdate] = useState(false);
    const [isValidForm, setIsValidForm] = useState(false);
    const navigate = useNavigate();
    const { state } = useLocation();
    const anuncioToEdit = state?.anuncioToEdit;

    useEffect(() => {
        if (anuncioToEdit) {
            anuncio.fromObject(anuncioToEdit);
        }
    }, [anuncioToEdit]);

    useEffect(() => {
        const validForm = anuncio.title
            && anuncio.description
            && anuncio.quantity > 0
            && anuncio.price > 0
            && anuncio.card.id;
        setIsValidForm(validForm);
    }, [update]);

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

    const handleChangeTitle = (e) => {
        anuncio.setTitle(e.target.value);
        setUpdate(!update);
    };

    const handleChangeDescription = (e) => {
        anuncio.setDescription(e.target.value);
        setUpdate(!update);
    };

    const handleChangeAdType = (value) => {
        anuncio.setStatus(value);
        setUpdate(!update);
    };

    const handleChangeQuantity = (value) => {
        anuncio.setQuantity(value);
        setUpdate(!update);
    };

    const handleChangePrice = (value) => {
        anuncio.setPrice(value);
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
    }, [actualPage]);

    const handleAddCard = (selectedCard) => {
        const card = new Card(selectedCard.id, selectedCard.card_id, selectedCard.name, selectedCard.description, selectedCard.image, selectedCard.artist, selectedCard.rarity, selectedCard.type, anuncio);
        anuncio.setCard(card);
        setUpdate(!update);
    };

    const handleRemoveCard = () => {
        anuncio.setCard({});
        setUpdate(!update);
    };

    const handleSubmit = () => {
        if (anuncio.id) {
            updateAnuncio(anuncio).then(() => navigate('/my-ads', { replace: true }));
        } else {
            insertAnuncio(anuncio).then(() => navigate('/my-ads', { replace: true }));
        }
    };

    return {
        handleChangeTitle,
        searchCardTitle,
        handleChangeDescription,
        handleChangeAdType,
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
        anuncio,
        isValidForm
    };
};
