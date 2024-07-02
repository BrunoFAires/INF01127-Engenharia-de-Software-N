import {Deck} from "../models/deck";
import {useState} from "react";
import {findByName} from "../service/pokemonClient";

export const useNewDeck = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchCardTitle, setSearchCardTitle] = useState()
    const [apiResponse, setApiResponse] = useState()
    const deck = new Deck()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChangeTitle = (data) => {
        deck.title = data.target.value
    }

    const handleChangeDescription = (data) => {
        deck.description = data.target.value
    }

    const searchCard = async () => {
        const result = await findByName(searchCardTitle)
        setApiResponse(result)
    }

    return {
        handleChangeTitle,
        handleChangeDescription,
        showModal,
        handleOk,
        isModalOpen,
        handleCancel,
        setSearchCardTitle,
        searchCard
    }
}