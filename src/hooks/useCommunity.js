import {useEffect, useState} from "react";
import {Post} from "../models/post";
import {useAuthHook} from "./useAuthHook";
import {addNewPost, findPostByLikes, countTotalPosts, reactPost} from "../service/communityService";

export const useCommunity = () => {
    const [post] = useState(new Post(null, null, null, null, null, null, null, null))
    const {currentUser, loading: loadingUser} = useAuthHook()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState(false);
    const [actualPage, setActualPage] = useState(0)
    const [totalPosts, setTotalPosts] = useState()
    const [hasMoreData, setHasMoreData] = useState(true)

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
    }, [totalPosts]);

    useEffect(() => {
        post.setUser(currentUser)
    }, [currentUser]);


    const handleChangePostText = (event) => {
        post.setText(event.target.value)
        setUpdate(!update)
    }

    const handleSubmitPost = () => {
        addNewPost(post, currentUser).then(newPost => {
            setPosts([...posts, newPost])
        })
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

    return {
        loading,
        posts,
        handleChangePostText,
        handleSubmitPost,
        handleLikePost,
        handleDislikePost,
        loadMoreData,
        hasMoreData
    }
}
