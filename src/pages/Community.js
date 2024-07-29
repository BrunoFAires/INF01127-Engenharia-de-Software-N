import {Avatar, Button, Card, Col, Form, Layout, Row, Upload} from 'antd';
import {AppHeader} from "../components/header";
import React from "react";
import Meta from "antd/es/card/Meta";
import {CommentOutlined, LikeOutlined, UploadOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

const {Content} = Layout;


export const Community = () => {
    const navigate = useNavigate()
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

    const a = <div><LikeOutlined key="ellipsis"/> 150</div>
    const b = <div><CommentOutlined key="ellipsis"/> 10</div>

    const props = {
        accept: "image/png, image/jpeg",
        multiple: false,
        maxCount: 1,
        onChange({file, fileList}) {
            if (file.status !== 'uploading') {
                console.log(file, fileList);
            }
        },
    };

    return <Layout className={'min-h-[100vh]'}>
        <AppHeader/>
        <Content className={'px-[48px] mt-6 shadow-[#b6b6b6] shadow-xl'}>
            <Row justify={'end'} className='pb-3'>
                <Button size={'large'} type="primary" onClick={() => navigate('/newPost')}>Nova publicação</Button>
            </Row>

            <Col className='flex flex-col space-y-3 items-center'>
                <Form
                    className={'space-y-4 w-1/2'}
                    labelCol={{
                        span: 3,
                    }}
                    labelAlign={'left'}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={() => {
                    }}
                    autoComplete="true"
                    style={{width: '100%'}}
                >
                    <Form.Item
                        className={'m-0'}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Este campo é obrigatório',
                            },
                        ]}
                    >
                        <TextArea value={''} onChange={() => {
                        }} size={'large'} placeholder={'Descrição'}
                                  autoSize={{minRows: 5, maxRows: 5}}/>
                    </Form.Item>
                    <Form.Item>
                        <Row justify={"end"} className='space-x-3'>
                            <Upload {...props}>
                                <Button size={'large'} icon={<UploadOutlined/>}>Adicionar imagem</Button>
                            </Upload>
                            <Button className={''} size={'large'} loading={false}
                                    htmlType="submit">
                                Publicar
                            </Button></Row>
                    </Form.Item>
                </Form>
                {posts.map((it, index) => (
                    <Card
                        key={index}
                        className={'w-1/2 flex-shrink-0 h-min-[500px]'}
                        hoverable

                        onClick={() => {
                        }}
                        actions={[
                            a,
                            b,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"/>}
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                ))}
            </Col>
        </Content>
    </Layout>
}
