import {useEffect, useState} from "react";
import {addComment, commentsByPost, deleteComment, deletePost, findPostById} from "../service/communityService";
import {useParams} from "react-router-dom";
import {Comment} from "../models/comment";
import {getCurrentUser} from "../service/authService";
import {useAuthHook} from "./useAuthHook";

export const usePost = () => {
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [post, setPost] = useState()
    const [comment, setComment] = useState(new Comment(null, null, 0, null, null, null))
    const [commentToDelete, setCommentToDelete] = useState()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [update, setUpdate] = useState(false)
    let {postId} = useParams();
    const {currentUser} = useAuthHook()

    useEffect(() => {
        findPostById(postId).then(post => {
            setPost(post)
            comment.setPost(post)
            commentsByPost(post).then(comments => {
                setComments(comments)
            }).finally(_ => setLoading(false))
        })
    }, [postId]);

    useEffect(() => {
        comment.setProfile(currentUser?.profile)
        setUpdate(!update)
    }, [currentUser]);

    const handleChangeCommentText = (event) => {
        comment.setText(event.target.value)
        setUpdate(!update)
        console.log(comment)
    }

    const handleAddComment = async () => {
        await addComment(comment)
        setComments([...comments, comment])
        comment.setText('')
        setUpdate(!update)
    }

    const handleDeleteComment = (comment) => {
        setShowDeleteModal(true)
        setCommentToDelete(comment)
    }

    const handleConfirmeDelete = async () => {
        await deleteComment(commentToDelete)
        const newComments = comments.filter(it => it.id !== commentToDelete.id)
        setComments(newComments)
        setShowDeleteModal(false)
        setCommentToDelete(null)
    }

    const handleCancel = () => {
        setCommentToDelete(null)
        setShowDeleteModal(false)
    }


    return {
        loading,
        post,
        comments,
        comment,
        handleChangeCommentText,
        handleAddComment,
        currentUser,
        showDeleteModal,
        handleConfirmeDelete,
        handleCancel,
        handleDeleteComment
    }
}