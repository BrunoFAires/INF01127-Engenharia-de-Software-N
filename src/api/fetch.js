import axios from "axios";

const fetch = async (method, url) => {
    const response = await axios({
        method,
        url,
        responseType: 'stream'
    }).catch(e => {
        console.error(e)
    })

    const {data} = response

    return data
}