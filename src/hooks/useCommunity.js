import {useEffect, useState} from "react";
import {Post} from "../models/post";
import {useAuthHook} from "./useAuthHook";
import {addNewPost, countTotalPosts, deletePost, findPostByLikes, reactPost} from "../service/communityService";
import {useNavigate} from "react-router-dom";
import {message} from "antd";
import {myDecks} from "../service/deckService";
import {Deck} from "../models/deck";

export const useCommunity = () => {
    const [post] = useState(new Post(null, null, null, null, null, null, null, null))
    const {currentUser} = useAuthHook()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState(false);
    const [actualPage, setActualPage] = useState(0)
    const [totalPosts, setTotalPosts] = useState()
    const [hasMoreData, setHasMoreData] = useState(true)
    const [postToDelete, setPostToDelete] = useState()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showDecksModal, setShowDecksModal] = useState(false)
    const [decks, setDecks] = useState([])
    const [selectedDeck, setSelectedDeck] = useState()
    const navigate = useNavigate()

    const loadMoreData = () => {
        if (!totalPosts)
            return
        let currentTotalPost = 0
        findPostByLikes(actualPage)
            .then(result => {
                currentTotalPost = posts.length + result.length
                setPosts([...posts, ...result])
            }).finally(_ => {
            setLoading(false)
            setActualPage(actualPage + 1)
            setHasMoreData(currentTotalPost < totalPosts)
        })
    }

    useEffect(() => {
        countTotalPosts().then(result => {
            setTotalPosts(result)
        })
    }, []);


    useEffect(() => {
        loadMoreData()
    }, [totalPosts]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        post.setUser(currentUser)
    }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps


    const handleChangePostText = (event) => {
        post.setText(event.target.value)
        setUpdate(!update)
    }

    const handleSubmitPost = () => {
        try {
            const cardIds = selectedDeck?.cards.map((card) => card.id)

            addNewPost(post, cardIds, currentUser).then(newPost => {
                setPosts([...posts, newPost])
            }).finally(_ => {
                post.setText('')
                setUpdate(!update)
                setSelectedDeck(null)
                message.success('Publicação enviada com sucesso')
            })
        } catch (e) {
            message.error(e)
        }
    }

    const handleLikePost = (post) => {
        reactPost(post, currentUser, true).then(it => {
            post.likePost()
            setUpdate(!update)
        })
    }


    const handleDislikePost = (post) => {
        reactPost(post, currentUser, false).then(it => {
            post.dislikePost()
            setUpdate(!update)
        })
    }

    const handleDeletePost = (post) => {
        setShowDeleteModal(true)
        setPostToDelete(post)
    }

    const handleConfirmeDelete = async () => {
        await deletePost(postToDelete)
        const newPosts = posts.filter(it => it.id !== postToDelete.id)
        setPosts(newPosts)
        setTotalPosts(totalPosts - 1)
        setShowDeleteModal(false)
        setPostToDelete(null)
    }

    const handleCancel = () => {
        setPostToDelete(null)
        setShowDeleteModal(false)
    }

    const handleCancelDeckSelection = () => {
        setDecks([])
        setSelectedDeck(null)
        setShowDecksModal(false)
    }

    const handleSelectDeckToPublish = () => {
        myDecks(currentUser).then(result => {
            result.data.forEach(deckResult => {
                const deck = new Deck(deckResult.id, deckResult.title, deckResult.description, deckResult.rating, currentUser, deckResult.card_deck)
                decks.push(deck)
            })
        }).finally(() => {
            setShowDecksModal(true)
        })
    }

    const handleSelectDeck = (deck) => {
        setSelectedDeck(deck)
        setShowDecksModal(false)
    }

    const handleRemoveSelectedDeck = () => {
        setSelectedDeck(null)
    }

    return {
        loading,
        posts,
        post,
        handleChangePostText,
        handleSubmitPost,
        handleLikePost,
        handleDislikePost,
        loadMoreData,
        hasMoreData,
        navigate,
        currentUser,
        showDeleteModal,
        handleDeletePost,
        handleConfirmeDelete,
        handleCancel,
        handleSelectDeckToPublish,
        handleSelectDeck,
        handleRemoveSelectedDeck,
        showDecksModal,
        handleCancelDeckSelection,
        update,
        decks,
        selectedDeck
    }
}
