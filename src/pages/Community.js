import {Avatar, Button, Card, Col, Divider, Form, Layout, List, Row, Skeleton, Upload} from 'antd';
import {AppHeader} from "../components/header";
import React from "react";
import {CommentOutlined, DislikeOutlined, LikeOutlined, UploadOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {useCommunity} from "../hooks/useCommunity";
import InfiniteScroll from 'react-infinite-scroll-component';
import Meta from "antd/es/card/Meta";


const {Content} = Layout;


export const Community = () => {
    const navigate = useNavigate()
    const {
        posts,
        loading,
        handleChangePostText,
        handleSubmitPost,
        handleLikePost,
        handleDislikePost,
        loadMoreData,
        hasMoreData
    } = useCommunity()


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
                    onFinish={handleSubmitPost}
                    autoComplete="true"
                    style={{width: '100%'}}
                >
                    <Form.Item
                        className={'m-0'}
                        name="text"
                        rules={[
                            {
                                required: true,
                                message: 'Este campo é obrigatório',
                            },
                        ]}
                    >
                        <TextArea value={''} onChange={handleChangePostText} size={'large'} placeholder={'Descrição'}
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
                <div className={'w-1/2'}>
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={loadMoreData}
                        hasMore={hasMoreData}
                        loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                        scrollableTarget="scrollableDiv"
                        className='w-[100%]'
                    >
                        <List
                            className='w-full space-x-3'
                            dataSource={posts}
                            renderItem={(it, index) => {

                                const totalLikes = <div><LikeOutlined className={`${it.liked ? 'text-[#08c]' : ''}`}
                                                                      key="ellipsis" onClick={() => {
                                    handleLikePost(it)
                                }}/> {it.likes}</div>
                                const totalDislikes = <div><DislikeOutlined className={`${it.disliked ? 'text-[#08c]' : ''}`}
                                                                      key="ellipsis" onClick={() => {
                                    handleDislikePost(it)
                                }}/> {it.dislikes}</div>
                                const totalComments = <div><CommentOutlined key="ellipsis"/> {it.comments}</div>
                                return <Card
                                    key={index}
                                    className={'w-full flex-shrink-0  mb-5'}
                                    hoverable

                                    onClick={() => {
                                    }}
                                    actions={[
                                        totalLikes,
                                        totalDislikes,
                                        totalComments,
                                    ]}
                                >
                                    <Meta
                                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"/>}
                                        title={it.user.profile?.name}
                                        description={it.text}
                                    />
                                </Card>
                            }}
                        />
                    </InfiniteScroll>
                </div>
            </Col>
        </Content>
    </Layout>
}
