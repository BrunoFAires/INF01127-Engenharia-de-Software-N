import {useEffect, useState} from "react";
import {findPostByLikes} from "../service/communityService";
import {message} from "antd";
import {getAnuncios} from "../service/adsService";
import {useNavigate} from "react-router-dom";

export const useHome = () => {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [advertisements, setAdvertisements] = useState([])
    const navigate = useNavigate()

    const loadPosts = async () => {
        try {
            const post = await findPostByLikes(0)
            setPosts(post)
        } catch (e) {
            message.error(e)
        }
    }

    const loadAdvertisements = async () => {
        try {
            const advertisements = await getAnuncios(0)
            setAdvertisements(advertisements)
        } catch (e) {
            message.error(e)
        }
    }

    useEffect(() => {
        loadPosts().then(() => {
            loadAdvertisements().then(() => {
                setLoading(false)
            })
        })
    }, []);

    return {loading, posts, advertisements, navigate}
}