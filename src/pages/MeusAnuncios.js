import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Layout, Row, Typography, Modal, message, Select, Input, InputNumber, Form, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { AppHeader } from '../components/header';
import { useAds } from '../hooks/useAds';
import { myAnuncios, deleteAnuncio } from '../service/adsService';

const { Title, Text } = Typography;
const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

export const MeusAnuncios = ({ currentUser }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddAdModalOpen, setIsAddAdModalOpen] = useState(false);

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
    handleRemoveCard,
    handleSubmit,
    anuncio,
  } = useAds({ currentUser });

  const isSelectedCard = (cardId) => anuncio.card && anuncio.card.card_id === cardId;

  useEffect(() => {
    fetchAnuncios();
  }, []);

  const fetchAnuncios = async () => {
    setLoading(true);
    try {
      const response = await myAnuncios(currentUser);
      setAnuncios(response);
    } catch (error) {
      console.error('Failed to fetch anuncios:', error);
    }
    setLoading(false);
  };

  const handleEdit = (ads) => {
    anuncio.setId(ads.id)
    anuncio.setTitle(ads.title);
    anuncio.setDescription(ads.description);
    anuncio.setSale(ads.sale);
    anuncio.setQuantity(ads.quantity);
    anuncio.setPrice(ads.price);
    anuncio.setCard(ads.card);
    setIsAddAdModalOpen(true);
  };

  const handleRemove = (id) => {
    Modal.confirm({
      title: 'Tem certeza que deseja remover este anúncio?',
      onOk: async () => {
        try {
          await deleteAnuncio(id);
          message.success('Anúncio removido com sucesso');
          fetchAnuncios();
        } catch (error) {
          console.error('Failed to remove anuncio:', error);
          message.error('Falha ao remover anúncio');
        }
      },
    });
  };

  const showAddAdModal = () => {
    setIsAddAdModalOpen(true);
  };

  const handleAddAdModalOk = async () => {
    try {
      await handleSubmit();
      message.success('Anúncio publicado com sucesso');
      fetchAnuncios();
      setIsAddAdModalOpen(false);
    } catch (error) {
      message.error('Falha ao publicar anúncio');
    }
  };

  const handleAddAdModalCancel = () => {
    setIsAddAdModalOpen(false);
  };

  return (
    <Layout className={'min-h-[100vh]'}>
      <AppHeader />
      <Content className={'px-[48px] py-2'}>
        <Row justify="space-between" align="middle">
          <Title level={3}>Meus Anúncios</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddAdModal}>
            Adicionar Anúncio
          </Button>
        </Row>
        {anuncios.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Title level={3}>Você não tem nenhum anúncio publicado.</Title>
          </div>
        ) : (
          <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
            {anuncios.map(anuncio => (
              <Col xs={24} sm={12} md={8} lg={6} key={anuncio.id}>
                <Card
                  cover={<img alt={anuncio.title} src={anuncio.card.image} />}
                  actions={[
                    <EditOutlined key="edit" onClick={() => handleEdit(anuncio)} />,
                    <DeleteOutlined key="delete" onClick={() => handleRemove(anuncio.id)} />,
                  ]}
                >
                  <Card.Meta
                    title={anuncio.title}
                    description={(
                      <div>
                        <Text>{anuncio.description}</Text>
                        <div><Text strong>Preço: </Text>R$ {anuncio.price}</div>
                        <div><Text strong>Quantidade: </Text>{anuncio.quantity}</div>
                        <div><Text strong>Status: </Text>{anuncio.status === 1 ? 'Ativo' : 'Inativo'}</div>
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
          width={'80%'}
        >
          <Form layout="vertical">
            <Form.Item label="Título">
              <Input value={anuncio.title} onChange={handleChangeTitle} size={'large'} />
            </Form.Item>
            <Form.Item label="Descrição">
              <TextArea value={anuncio.description} onChange={handleChangeDescription} size={'large'} autoSize={{ minRows: 3, maxRows: 3 }} />
            </Form.Item>
            <Form.Item label="Tipo de Anúncio">
              <Select value={anuncio.sale} onChange={handleChangeSale} size={'large'} style={{ width: '100%' }}>
                <Option value={true}>Venda</Option>
                <Option value={false}>Troca</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Quantidade">
              <InputNumber value={anuncio.quantity} onChange={handleChangeQuantity} size={'large'} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Preço">
              <InputNumber value={anuncio.price} onChange={handleChangePrice} size={'large'} style={{ width: '100%' }} />
            </Form.Item>
            <Row justify={'end'}>
              <Button onClick={showModal} size={'large'} type="primary">Adicionar Carta</Button>
            </Row>
            <Row className={'space-x-3 space-y-3 flex flex-row justify-center'} md={12}>
              {anuncio.card && anuncio.card.card_id && (
                <Card
                  key={anuncio.card.card_id}
                  style={{ width: 240 }}
                  cover={<img alt="example" src={anuncio.card.image} />}
                />
              )}
            </Row>
            <Modal title="Pesquisar Carta" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'Adiconar'} cancelText={'Cancelar'} width={'80%'}>
              <Col>
                <Col md={8} className={'space-y-3 mb-3'}>
                  <Input value={searchCardTitle} onChange={data => { setSearchCardTitle(data.target.value) }} size={'large'} placeholder={'Name'} />
                  <Button onClick={searchCard} className={'w-1/2'} size={'large'} type="primary">Pesquisar</Button>
                </Col>
                <Row className={'flex space-x-3 space-y-3 justify-center'}>
                  {apiResponse && apiResponse.map(it => (
                    <Card
                      key={it.id}
                      hoverable
                      className={isSelectedCard(it.id) ? 'selected-card' : ''}
                      style={{ width: 240 }}
                      cover={<img alt="example" src={it.images.large} />}
                      onClick={() => { handleAddCard(it) }}
                    />
                  ))}
                </Row>
                <Row className={'justify-center'}>
                  {totalPages && <Pagination current={actualPage} defaultPageSize={1} onChange={value => setActualPage(value)} defaultCurrent={1} total={totalPages} />}
                </Row>
              </Col>
            </Modal>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};
