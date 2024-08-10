import Meta from "antd/es/card/Meta";
import {Avatar, Button, Card, Col, Image, Layout, Modal, Row, Spin} from "antd";
import React from "react";
import {useCommunity} from "../hooks/useCommunity";
import {CommentOutlined, DislikeOutlined, LikeOutlined} from "@ant-design/icons";
import {usePost} from "../hooks/usePost";
import {AppHeader} from "../components/header";
import {Content} from "antd/es/layout/layout";
import TextArea from "antd/es/input/TextArea";

export const Post = () => {
    const {handleLikePost, handleDislikePost} = useCommunity()
    const {
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
    } = usePost()

    const totalLikes = <div><LikeOutlined className={`${post?.liked ? 'text-[#08c]' : ''}`}
                                          key="ellipsis" onClick={() => {
        handleLikePost(post)
    }}/> {post?.likes}</div>
    const totalDislikes = <div><DislikeOutlined className={`${post?.disliked ? 'text-[#08c]' : ''}`}
                                                key="ellipsis" onClick={() => {
        handleDislikePost(post)
    }}/> {post?.dislikes}</div>
    const totalComments = <div><CommentOutlined key="ellipsis"/> {post?.comments}</div>

    return <Layout className={'min-h-[100vh]'}>
        <AppHeader/>
        <Content className={'px-[48px] mt-6 shadow-[#b6b6b6] shadow-xl'}>
            {loading ? <Row justify={"center"}><Spin/></Row> : <>
                <Modal title="Deletar baralho" open={showDeleteModal} onOk={handleConfirmeDelete}
                       onCancel={handleCancel}
                       okText={'Confirmar'} cancelText={'Cancelar'}>
                    <p>Você tem certeza que deseja excluir essa publicação? A ação não pode ser revertida.</p>
                </Modal>
                <Col className='flex flex-col space-y-3 items-center'>
                    <Card
                        className={'w-1/2 flex-shrink-0  mb-5'}
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
                            title={post?.user?.profile?.name}
                            description={<>
                                <p className='pb-3'>{post?.text}</p>
                                <Row className=''>{
                                    post?.cardPost?.map(it => {
                                        return <Image className='w-[100px] pl-2 pb-2' src={it.image}/>
                                    })
                                }</Row>
                            </>}
                        />
                    </Card>
                    <Row className="w-1/2">
                        <TextArea value={comment.text} onChange={handleChangeCommentText} size={'large'}
                                  placeholder={'Adicione um comentário'}
                                  autoSize={{minRows: 5, maxRows: 5}}/>
                        <Row justify={"end"} className='space-x-3 w-full mt-3'>
                            <Button onClick={handleAddComment} className={''} size={'large'} loading={false}
                                    htmlType="submit">
                                Enviar
                            </Button></Row>
                    </Row>
                    <Row justify={'start'} className='w-1/2'>
                        <p>Comentários</p>
                    </Row>
                    {comments.map(it => {
                        return <Card
                            className={'w-1/2 flex-shrink-0  mb-5'}
                            extra={it?.profile?.id === currentUser?.id &&
                                <div className='hover:cursor-pointer'
                                     onClick={() => {
                                         handleDeleteComment(it)
                                     }}>Excluir</div>}
                        >
                            <Meta
                                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"/>}
                                title={<>
                                    <span>{it?.profile?.name}</span><span
                                    className='text-[12px] font-light'>{` - ${new Date(it?.at).toLocaleDateString('pr-BR')} às ${new Date(it?.at).toLocaleTimeString('pr-BR', {timeZone: 'America/Sao_Paulo'})}`}</span></>}
                                description={it?.text}
                            />
                        </Card>
                    })}
                </Col></>}
        </Content>
    </Layout>
}