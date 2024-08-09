import React from 'react';
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    InputNumber,
    Layout,
    Modal,
    Pagination,
    Row,
    Select,
    Spin,
    Typography
} from 'antd';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {AppHeader} from '../components/header';
import {useAds} from '../hooks/useAds';

const {Title, Text} = Typography;
const {Content} = Layout;
const {Option} = Select;
const {TextArea} = Input;

export const MeusAnuncios = () => {
    const {
        handleChangeTitle,
        searchCardTitle,
        handleChangeDescription,
        handleChangeSale,
        handleChangeQuantity,
        handleChangePrice,
        showModal,
        handleOk,
        isModalOpen,
        handleCancel,
        setSearchCardTitle,
        searchCard,
        apiResponse,
        setActualPage,
        actualPage,
        totalPages,
        handleAddCard,
        anuncio,
        showAddAdModal,
        anuncios,
        handleEdit,
        handleRemove,
        isAddAdModalOpen,
        handleAddAdModalCancel,
        handleAddAdModalOk,
        isSelectedCard,
        currentUser,
        loadingUser
    } = useAds();

    return (
        <Layout className={'min-h-[100vh]'}>
            <AppHeader/>
            <Content className={'px-[48px] py-2'}>
                {loadingUser ? <Row justify={"center"}><Spin/></Row> : !currentUser.profile.seller ? <>
                        <p>Você não é um vendedor. Para publicar anúncios, acesse o seu perfil e altere o tipo para
                            vendedor.</p></> :
                    <>
                        <Row justify="space-between" align="middle">
                            <Title level={3}>Meus Anúncios</Title>
                            <Button type="primary" icon={<PlusOutlined/>} onClick={showAddAdModal}>
                                Adicionar Anúncio
                            </Button>
                        </Row>
                        {anuncios.length === 0 ? (
                            <div style={{textAlign: 'center', marginTop: '50px'}}>
                                <Title level={3}>Você não tem nenhum anúncio publicado.</Title>
                            </div>
                        ) : (
                            <Row gutter={[16, 16]} style={{marginTop: '24px'}}>
                                {anuncios.map(anuncio => (
                                    <Col xs={24} sm={12} md={8} lg={6} xl={4} key={anuncio.id}>
                                        <Card
                                            cover={<img alt={anuncio.title} src={anuncio.card.image}/>}
                                            actions={[
                                                <EditOutlined key="edit" onClick={() => handleEdit(anuncio)}/>,
                                                <DeleteOutlined key="delete" onClick={() => handleRemove(anuncio.id)}/>,
                                            ]}
                                        >
                                            <Card.Meta
                                                title={anuncio.title}
                                                description={(
                                                    <div class="mt-2">
                                                        <Text>{anuncio.description}</Text>
                                                        <div class="mt-2"><Text strong
                                                                                class="text-gray-600">Preço: </Text><Text
                                                            class="text-black">R$ {anuncio.price}</Text></div>
                                                        <div class="mt-1"><Text strong
                                                                                class="text-gray-600">Quantidade: </Text><Text
                                                            class="text-black">{anuncio.quantity}</Text></div>
                                                        <div class="mt-1"><Text strong
                                                                                class="text-gray-600">Status: </Text><Text
                                                            class={`${anuncio.status === 1 ? 'text-green-500' : 'text-red-500'}`}>{anuncio.status === 1 ? 'Ativo' : 'Inativo'}</Text>
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )}
                        <Modal
                            title="Adicionar Anúncio"
                            open={isAddAdModalOpen}
                            onOk={handleAddAdModalOk}
                            onCancel={handleAddAdModalCancel}
                            width={'40%'}
                        >
                            <Form layout="vertical">
                                <Form.Item label="Título">
                                    <Input value={anuncio.title} onChange={handleChangeTitle} size={'large'}/>
                                </Form.Item>
                                <Form.Item label="Descrição">
                                    <TextArea value={anuncio.description} onChange={handleChangeDescription}
                                              size={'large'}
                                              autoSize={{minRows: 3, maxRows: 3}}/>
                                </Form.Item>
                                <Form.Item label="Tipo de Anúncio">
                                    <Select value={anuncio.sale} onChange={handleChangeSale} size={'large'}
                                            style={{width: '100%'}}>
                                        <Option value={true}>Venda</Option>
                                        <Option value={false}>Troca</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Quantidade">
                                    <InputNumber value={anuncio.quantity} onChange={handleChangeQuantity} size={'large'}
                                                 style={{width: '100%'}}/>
                                </Form.Item>
                                <Form.Item label="Preço">
                                    <InputNumber value={anuncio.price} onChange={handleChangePrice} size={'large'}
                                                 style={{width: '100%'}}/>
                                </Form.Item>
                                <Row justify={'end'}>
                                    <Button onClick={showModal} size={'large'} type="primary">Adicionar Carta</Button>
                                </Row>
                                <Row className={'space-x-3 space-y-3 flex flex-row justify-center'} md={12}>
                                    {anuncio.card && anuncio.card.card_id && (
                                        <Card
                                            key={anuncio.card.card_id}
                                            style={{width: 240}}
                                            cover={<img alt="example" src={anuncio.card.image}/>}
                                        />
                                    )}
                                </Row>
                                <Modal title="Pesquisar Carta" open={isModalOpen} onOk={handleOk}
                                       onCancel={handleCancel}
                                       okText={'Adicionar'} cancelText={'Cancelar'} width={'80%'}>
                                    <Col>
                                        <Col md={8} className={'space-y-3 mb-3'}>
                                            <Input value={searchCardTitle} onChange={data => {
                                                setSearchCardTitle(data.target.value)
                                            }} size={'large'} placeholder={'Name'}/>
                                            <Button onClick={searchCard} className={'w-1/2'} size={'large'}
                                                    type="primary">Pesquisar</Button>
                                        </Col>
                                        <Row className={'flex space-x-3 space-y-3 justify-center'}>
                                            {apiResponse && apiResponse.map(it => (
                                                <Card
                                                    key={it.id}
                                                    hoverable
                                                    className={isSelectedCard(it.id) ? 'selected-card' : ''}
                                                    style={{width: 240}}
                                                    cover={<img alt="example" src={it.images.large}/>}
                                                    onClick={() => {
                                                        handleAddCard(it)
                                                    }}
                                                />
                                            ))}
                                        </Row>
                                        <Row className={'justify-center'}>
                                            {totalPages && <Pagination current={actualPage} defaultPageSize={1}
                                                                       onChange={value => setActualPage(value)}
                                                                       defaultCurrent={1} total={totalPages}/>}
                                        </Row>
                                    </Col>
                                </Modal>
                            </Form>
                        </Modal></>}
            </Content>
        </Layout>
    )
        ;
};
