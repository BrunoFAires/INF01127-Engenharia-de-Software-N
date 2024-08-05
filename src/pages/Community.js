import {Avatar, Button, Card, Col, Layout, List, Modal, Row, Skeleton} from 'antd';
import {AppHeader} from "../components/header";
import React from "react";
import {CommentOutlined, DislikeOutlined, LikeOutlined} from "@ant-design/icons";
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
        handleCancel,
        handleSelectDeckToPublish,
        handleSelectDeck,
        handleRemoveSelectedDeck,
        showDecksModal,
        handleCancelDeckSelection,
        decks,
        selectedDeck
    } = useCommunity()


    /*
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
    */

    return <Layout className={'min-h-[100vh]'}>
        <AppHeader/>
        <Modal title="Deletar baralho" open={showDeleteModal} onOk={handleConfirmeDelete}
               onCancel={handleCancel}
               okText={'Confirmar'} cancelText={'Cancelar'}>
            <p>Você tem certeza que deseja excluir essa publicação? A ação não pode ser revertida.</p>
        </Modal>
        <Modal title="Publicar baralho" open={showDecksModal} onOk={handleConfirmeDelete}
               onCancel={handleCancelDeckSelection}
               okText={'Confirmar'} cancelText={'Cancelar'}>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={decks}
                locale={{emptyText: 'Sem baralhos'}}
                renderItem={(item) => (
                    <List.Item
                        actions={[<div className='hover:cursor-pointer' key="list-loadmore-edit"
                                       onClick={() => handleSelectDeck(item)}>Selecionar</div>,
                        ]}
                    >
                        <Skeleton title loading={item.loading} active>
                            <List.Item.Meta

                                description={item.title}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </Modal>
        <Content className={'px-[48px] mt-6 shadow-[#b6b6b6] shadow-xl'}>

            <Col className='flex flex-col space-y-3 items-center'>
                <Row className='w-1/2'>
                    <TextArea value={post.text} onChange={handleChangePostText} size={'large'}
                              placeholder={'Digite o que você está pensando...'}
                              autoSize={{minRows: 5, maxRows: 5}}/>
                    <Row justify={" w-full mt-3"} className='space-x-3 items-center'>
                        {selectedDeck && selectedDeck.cards.slice(0, 5).map(it => {
                            return <img src={it.image} className={'w-[50px]'} alt=''/>
                        })}
                        {selectedDeck && selectedDeck.cards.length > 5 ? <p className='pl-2'>...</p> : ''}
                    </Row>
                    <Row justify={"end w-full mt-3"} className='space-x-3'>
                        {/*<Upload {...props}>
                                <Button size={'large'} icon={<UploadOutlined/>}>Adicionar imagem</Button>
                            </Upload>*/}
                        {!selectedDeck ?
                            <Button onClick={handleSelectDeckToPublish} className={''} size={'large'} loading={false}
                                    htmlType="submit">
                                Selecionar baralho
                            </Button> :
                            <Button onClick={handleRemoveSelectedDeck} className={''} size={'large'} loading={false}
                                    htmlType="submit">
                                Remover baralho
                            </Button>}

                        <Button onClick={handleSubmitPost} disabled={!post.text} className={''} size={'large'}
                                loading={false}
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
                                        description={<>
                                            <p className='pb-3'>{it.text}</p>
                                            <Row className=''>{
                                                it.cardPost?.slice(0, 5)?.map(it => {
                                                    return <img className='w-[100px] pl-2 pb-2' src={it.image} alt=''/>
                                                })
                                            }</Row>
                                        </>}
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
