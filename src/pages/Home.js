import {Button, Card, Layout, Row} from 'antd';
import {AppHeader} from "../components/header";
import {supabase} from "../service/supabaseClient";
import React from "react";

const {Content} = Layout;


export const Home = () => {

    const posts = [{
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        image: 'https://i.ytimg.com/vi/QgXKQDpU82A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCwkT_OuyHmIEQuPzrPTiH9_Y2Lyg',
        likes: 10,
        username: 'Lorem Ipsum',
        comments: 5
    },
        {
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            image: 'https://i.ytimg.com/vi/QgXKQDpU82A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCwkT_OuyHmIEQuPzrPTiH9_Y2Lyg',
            likes: 10,
            username: 'Lorem Ipsum',
            comments: 5
        },
        {
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            image: 'https://i.ytimg.com/vi/QgXKQDpU82A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCwkT_OuyHmIEQuPzrPTiH9_Y2Lyg',
            likes: 10,
            username: 'Lorem Ipsum',
            comments: 5
        },
        {
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            image: 'https://i.ytimg.com/vi/QgXKQDpU82A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCwkT_OuyHmIEQuPzrPTiH9_Y2Lyg',
            likes: 10,
            username: 'Lorem Ipsum',
            comments: 5
        },
        {
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            image: 'https://i.ytimg.com/vi/QgXKQDpU82A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCwkT_OuyHmIEQuPzrPTiH9_Y2Lyg',
            likes: 10,
            username: 'Lorem Ipsum',
            comments: 5
        },
        {
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            image: 'https://i.ytimg.com/vi/QgXKQDpU82A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCwkT_OuyHmIEQuPzrPTiH9_Y2Lyg',
            likes: 10,
            username: 'Lorem Ipsum',
            comments: 5
        },
        {
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            image: 'https://i.ytimg.com/vi/QgXKQDpU82A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCwkT_OuyHmIEQuPzrPTiH9_Y2Lyg',
            likes: 10,
            username: 'Lorem Ipsum',
            comments: 5
        },
        {
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            image: 'https://i.ytimg.com/vi/QgXKQDpU82A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCwkT_OuyHmIEQuPzrPTiH9_Y2Lyg',
            likes: 10,
            username: 'Lorem Ipsum',
            comments: 5
        },
        {
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            image: 'https://i.ytimg.com/vi/QgXKQDpU82A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCwkT_OuyHmIEQuPzrPTiH9_Y2Lyg',
            likes: 10,
            username: 'Lorem Ipsum',
            comments: 5
        },
        {
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            image: 'https://i.ytimg.com/vi/QgXKQDpU82A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCwkT_OuyHmIEQuPzrPTiH9_Y2Lyg',
            likes: 10,
            username: 'Lorem Ipsum',
            comments: 5
        }]

    supabase
        .from('profile')
        .select()
        .then(result => {
        })

    return <Layout className={'min-h-[100vh]'}>
        <AppHeader/>
        <Content className={'px-[48px] mt-6 shadow-[#b6b6b6] shadow-xl'}>
            <Row justify={'end'} className='pb-3'>
                <Button size={'large'} type="primary" onClick={() => {}}>Acessar mercado de cartas</Button>
            </Row>
            <div className="flex items-center bg-black h-[50vh] overflow-x-auto overflow-clip space-x-3">
                {posts.map((it, index) => (
                    <Card
                        key={index}
                        className={'w-[700px] flex-shrink-0'}
                        hoverable
                        cover={<img alt="example" src={it.image}/>}
                        onClick={() => {
                        }}
                    >
                    </Card>
                ))}
            </div>
            <Row justify={'end'} className='pb-3'>
                <Button size={'large'} type="primary" onClick={() => {}}>Acessar Comunidade</Button>
            </Row>
            <div className="flex items-center bg-black h-[50vh] overflow-x-auto overflow-clip space-x-3">
                {posts.map((it, index) => (
                    <Card
                        key={index}
                        className={'w-[700px] flex-shrink-0'}
                        hoverable
                        cover={<img alt="example" src={it.image}/>}
                        onClick={() => {
                        }}
                    >
                    </Card>
                ))}
            </div>
            <Row></Row>
        </Content>
    </Layout>
}
