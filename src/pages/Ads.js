import React from 'react';
import { Button, Card, Col, Input, Layout, Modal, Row, Select, InputNumber, Pagination, Form } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { AppHeader } from "../components/header";
import { useAds } from "../hooks/useAds";
import { Counter } from "../components/counter";

const { Content } = Layout;
const { Option } = Select;

export const Ads = ({ currentUser }) => {
  const {
    handleChangeTitle,
    searchCardTitle,
    handleChangeDescription,
    handleChangeAdType,
    handleChangeQuantity,
    handleChangePrice,
    showModal,
    handleOk,
    isModalOpen,
    handleCancel,
    setSearchCardTitle,
    searchCard,
    apiResponse,
    loading,
    setActualPage,
    actualPage,
    totalPages,
    handleAddCard,
    handleRemoveCard,
    handleSubmit,
    anuncio,
    isValidForm
  } = useAds({ currentUser });

  return (
    <Layout className={'min-h-[100vh]'}>
      <AppHeader />
      <Content className={'px-[48px]'}>
        <Col md={12} className='mx-auto space-y-3 mt-3'>

        <Form layout="vertical">
            <Form.Item label="Título">
                <Input value={anuncio.title} onChange={handleChangeTitle} size={'large'} placeholder={'Carta Pokemon'} />
            </Form.Item>

            <Form.Item label="Descrição">
                <TextArea value={anuncio.description} onChange={handleChangeDescription} size={'large'} autoSize={{ minRows: 3, maxRows: 3 }} />
            </Form.Item>

            <Form.Item label="Tipo de Anúncio">
                <Select value={anuncio.status} onChange={handleChangeAdType} size={'large'}>
                    <Option value={1}>Troca</Option>
                    <Option value={2}>Venda</Option>
                </Select>
            </Form.Item>

            <Form.Item label="Quantidade Disponível">
                <InputNumber value={anuncio.quantity} onChange={handleChangeQuantity} size={'large'} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Preço">
                <InputNumber value={anuncio.price} onChange={handleChangePrice} size={'large'} style={{ width: '100%' }} />
            </Form.Item>

            <Row justify={'end'} style={{marginBottom: '20px'}}>
                <Button onClick={showModal} size={'large'} type="primary">Adicionar Carta</Button>
            </Row>

            <Row className={'space-x-3 space-y-3 flex flex-row justify-center'} md={12} style={{marginBottom: '20px'}}>
                {anuncio.card && (
                <Card
                    key={anuncio.card.card_id}
                    style={{ width: 240 }}
                    cover={<img alt="example" src={anuncio.card.image} />}
                >
                    <Counter total={1} handleDecrement={handleRemoveCard} />
                </Card>
                )}
            </Row>

          <Row justify={'center'}>
            <Button disabled={!isValidForm} className={'w-1/2'} size={'large'} type="primary" onClick={handleSubmit}>Salvar</Button>
          </Row>

          <Modal title="Search Card" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText={'Adicionar'} cancelText={'Cancelar'} width={'80%'}>
              <Col>
                <Col md={8} className={'space-y-3 mb-3'}>
                  <Input value={searchCardTitle} onChange={data => { setSearchCardTitle(data.target.value) }} size={'large'} placeholder={'Name'} />
                  <Button onClick={searchCard} className={'w-1/2'} size={'large'} type="primary">Search</Button>
                </Col>
                <Row className={'flex space-x-3 space-y-3 justify-center'}>
                  {apiResponse && apiResponse.map(it => (
                    <Card
                      key={it.id}
                      hoverable
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
        </Col>
      </Content>
    </Layout>
  );
};
