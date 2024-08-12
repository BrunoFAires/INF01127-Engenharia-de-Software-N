import {useEffect, useState} from "react";
import {addComment, commentsByPost, deleteComment, findPostById} from "../service/communityService";
import {useParams} from "react-router-dom";
import {Comment} from "../models/comment";
import {useAuthHook} from "./useAuthHook";
import {message} from 'antd';

export const usePost = () => {
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [post, setPost] = useState()
    const [comment] = useState(new Comment(null, null, 0, null, null, null))
    const [commentToDelete, setCommentToDelete] = useState()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [update, setUpdate] = useState(false)
    let {postId} = useParams();
    const {currentUser} = useAuthHook()

    useEffect(() => {
        findPostById(postId).then(post => {
            setPost(post)
            comment.post = post
            commentsByPost(post).then(comments => {
                setComments(comments)
            }).finally(_ => setLoading(false))
        })
    }, [postId]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        comment.profile = currentUser?.profile
        setUpdate(!update)
    }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChangeCommentText = (event) => {
        comment.text = event.target.value
        setUpdate(!update)
    }

    const handleAddComment = async () => {
        try {
            const newCommentId = await addComment(comment)
            const newComment = new Comment(newCommentId, comment.text, 0, Date.now(), comment.profile, comment.post)
            setComments([...comments, newComment])
            post.addComment()
            comment.text = ''
            comment.id = null
            setUpdate(!update)
            message.success('Comentário adicionado com sucesso')
        } catch (e) {
            message.error(e)
        }
    }

    const handleDeleteComment = (comment) => {
        setShowDeleteModal(true)
        setCommentToDelete(comment)
    }

    const handleConfirmeDelete = async () => {
        try {
            await deleteComment(commentToDelete)
            const newComments = comments.filter(it => it.id !== commentToDelete.id)
            setComments(newComments)
            setShowDeleteModal(false)
            setCommentToDelete(null)
            post.removeComment()
            message.success('Comentário removido com sucesso')
        } catch (e) {
            message.error(e)
        }
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
