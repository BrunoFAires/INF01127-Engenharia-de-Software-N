import {Avatar, Button, Card, Col, Form, Layout, List, Modal, Row, Skeleton, Upload} from 'antd';
import {AppHeader} from "../components/header";
import React from "react";
import {CommentOutlined, DislikeOutlined, LikeOutlined, UploadOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {useCommunity} from "../hooks/useCommunity";
import InfiniteScroll from 'react-infinite-scroll-component';
import Meta from "antd/es/card/Meta";


const {Content} = Layout;


export const Community = () => {
    const {
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
        handleCancel
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
        <Modal title="Deletar baralho" open={showDeleteModal} onOk={handleConfirmeDelete}
               onCancel={handleCancel}
               okText={'Confirmar'} cancelText={'Cancelar'}>
            <p>Você tem certeza que deseja excluir essa publicação? A ação não pode ser revertida.</p>
        </Modal>
        <Content className={'px-[48px] mt-6 shadow-[#b6b6b6] shadow-xl'}>

            <Col className='flex flex-col space-y-3 items-center'>
                <Row className='w-1/2'>
                    <TextArea value={post.text} onChange={handleChangePostText} size={'large'}
                              placeholder={'Digite o que você está pensando...'}
                              autoSize={{minRows: 5, maxRows: 5}}/>
                    <Row justify={"end w-full mt-3"} className='space-x-3'>
                        {/*<Upload {...props}>
                                <Button size={'large'} icon={<UploadOutlined/>}>Adicionar imagem</Button>
                            </Upload>*/}
                        <Button onClick={handleSubmitPost} disabled={!post.text} className={''} size={'large'} loading={false}
                                htmlType="submit">
                            Publicar
                        </Button></Row>
                </Row>
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
                                const totalDislikes = <div><DislikeOutlined
                                    className={`${it.disliked ? 'text-[#08c]' : ''}`}
                                    key="ellipsis" onClick={() => {
                                    handleDislikePost(it)
                                }}/> {it.dislikes}</div>
                                const totalComments = <div><CommentOutlined key="ellipsis"/> {it.comments}</div>
                                return <Card
                                    key={index}
                                    className={'w-full flex-shrink-0  mb-5'}
                                    extra={it.user.id === currentUser.id &&
                                        <div className='hover:cursor-pointer'
                                             onClick={() => {
                                                 handleDeletePost(it)
                                             }}>Excluir</div>}
                                    actions={[
                                        totalLikes,
                                        totalDislikes,
                                        totalComments,
                                    ]}
                                >
                                    <Meta
                                        onClick={() => {
                                            navigate(`/post/${it.id}`)
                                        }}
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
