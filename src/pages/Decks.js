import {Button, Layout, List, Modal, Row, Skeleton} from 'antd';
import {AppHeader} from "../components/header";
import {useMyDecks} from "../hooks/useMyDecks";
import React from "react";

const {Content} = Layout;


export const Decks = ({currentUser}) => {
    const {
        navigate, decks,
        handleDeleteDeck,
        showDeleteModal,
        handleOnEdit,
        handleConfirmeDelete,
        handleCancel,
        loading
    } = useMyDecks({currentUser})
    return <Layout className={'min-h-[100vh]'}>
        <Modal title="Deletar baralho" open={showDeleteModal} onOk={handleConfirmeDelete}
               onCancel={handleCancel}
               okText={'Confirmar'} cancelText={'Cancelar'}>
            <p>Você tem certeza que deseja excluir o baralho? A ação não pode ser revertida.</p>
        </Modal>
        <AppHeader/>
        <Content className={'m-[24px]'}>
            <Row justify={'end'}>
                <Button size={'large'} type="primary" onClick={() => navigate('/deck')}>Cadastrar novo
                    baralho</Button>
            </Row>
            <List
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                dataSource={decks}
                locale={{emptyText: 'Sem baralhos'}}
                renderItem={(item) => (
                    <List.Item
                        actions={[<div className='hover:cursor-pointer' key="list-loadmore-edit"
                                       onClick={() => handleOnEdit(item)}>Editar</div>,
                            <div className='hover:cursor-pointer' key="list-loadmore-more" onClick={() => handleDeleteDeck(item)}>Excluir</div>]}
                    >
                        <Skeleton title loading={item.loading} active>
                            <List.Item.Meta

                                description={item.title}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        </Content>

    </Layout>
}
