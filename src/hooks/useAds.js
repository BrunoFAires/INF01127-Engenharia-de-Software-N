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
  const [anuncio] = useState(new Advertisements(null, '', '', 1, 1, null, null, {}, currentUser, true));
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [actualPage, setActualPage] = useState(1);
  const [isValidForm, setIsValidForm] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const anuncioToEdit = state?.anuncioToEdit;

  useEffect(() => {
    if (anuncioToEdit) {
      const anuncioObj = new Advertisements();
      anuncioObj.fromObject(anuncioToEdit);
    }
  }, [anuncioToEdit]);

  useEffect(() => {
    const validForm = anuncio.title && anuncio.description && anuncio.quantity > 0 && anuncio.price > 0;
    setIsValidForm(validForm);
  }, [anuncio]);

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
    anuncio.setTitle(data.target.value);
    setUpdate(!update);
  };

  const handleChangeDescription = (data) => {
    anuncio.setDescription(data.target.value);
    setUpdate(!update);
  };

  const handleChangeAdType = (value) => {
    anuncio.setStatus(value);
    setUpdate(!update);
  };

  const handleChangeSale = (value) => {
    anuncio.setSale(value);
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

    anuncio.setCard(card);
    setUpdate(!update);
  };

  const handleRemoveCard = () => {
    anuncio.setCard(null);
    setUpdate(!update);
  };

  const handleSubmit = async () => {
    try {
      if (anuncio.id) {
        await updateAnuncio(anuncio);
      } else {
        await insertAnuncio(anuncio);
      }
    } catch (error) {
      console.error('Error submitting anuncio:', error);
      throw error;
    }
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
    anuncio,
    isValidForm
  };
};
