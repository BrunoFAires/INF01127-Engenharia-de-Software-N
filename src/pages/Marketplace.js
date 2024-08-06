import { Layout, Card, Button, Spin, Modal, Carousel, Row, Col } from 'antd';
import { AppHeader } from "../components/header";
import useMarketplace from "../hooks/useMarktplace";
import { Counter } from "../components/counter"
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Content } = Layout;

export const Marketplace = () => {
    const {
        order,
        loading,
        isModalVisible,
        isTradeModalVisible,
        userAdvertisements,
        showModal,
        showTradeModal,
        handlePurchase,
        handleTrade,
        handleCancel,
        total,
        handleDecrement,
        handleIncrement,
        tradeQuantities,
        handleTradeDecrement,
        handleTradeIncrement,
        selectedTrade,
        setSelectedTrade,
        carouselRef,
        handlePrev,
        handleNext
    } = useMarketplace();

    return (
        <Layout className='min-h-[100vh]'>
            <AppHeader />
            <Content className='px-[48px] mt-6'>
                {loading ? (
                    <Spin size="large" />
                ) : (
                    order ? (
                        <Card title={order.title} bordered={false}>
                            <Row className='flex flex-col md:flex-row'>
                                <Col sspan={24} md={12} className='flex items-center justify-around'>
                                    <img src={order.card.image} alt="Card" className='w-full h-auto max-w-[300px] mb-4 md:mb-0' />
                                </Col>
                                <Col span={24} md={12} className='gutter-row'>
                                    <div className='space-x-3 space-y-3 justify-center'>
                                        <p className="mx-4">{order.description}</p>
                                        <p className="py-8 my-4">{`Vendedor: ${order.seller.name}`}</p>
                                        <p className="my-4">{`Disponível em estoque: ${order.quantity}`}</p>

                                        {!order?.sale ? (
                                            <>
                                                <p>{`Preço: ${order.price}`}</p>
                                            </>) : (<></>)}
                                    </div>
                                </Col>
                            </Row>

                            {!order?.sale ? (
                                <Row className='flex flex-col md:flex-row mt-3 justify-around w-full p-4'>
                                    <Col span={24} md={12} className='gutter-row'>
                                        <div className='flow mx-12 '>
                                            <Counter
                                                total={total}
                                                handleDecrement={handleDecrement}
                                                handleIncrement={handleIncrement}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={24} md={12} className='gutter-row mt-4 flex justify-center md:mt-0 md:justify-start'>
                                        <Button type="primary" onClick={showModal}>Comprar</Button>
                                    </Col>
                                </Row>
                            ) : (
                                <Row className='flex flex-col md:flex-row mt-3 justify-around w-full p-4'>
                                    <Col span={24} md={12} className='gutter-row'>
                                        <div className='flow mx-12 '>
                                            <Counter
                                                total={total}
                                                handleDecrement={handleDecrement}
                                                handleIncrement={handleIncrement}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={24} md={12} className='gutter-row mt-4 flex justify-center md:mt-0 md:justify-start'>
                                        <Button type="primary" onClick={showTradeModal}>Trocar</Button>
                                    </Col>
                                </Row>
                            )}
                        </Card>
                    ) : (
                        <p>Anúncio não encontrado.</p>
                    )
                )}
                <Modal
                    title="Confirmar compra"
                    open={isModalVisible}
                    onOk={handlePurchase}
                    onCancel={handleCancel}
                >
                    <p>Você deseja comprar esta(s) carta(s)?</p>
                </Modal>
                <Modal
                    title="Escolha para Trocar"
                    open={isTradeModalVisible}
                    onOk={handleTrade}
                    onCancel={handleCancel}
                >
                    <p>Selecione um anúncio e uma quantidade para troca:</p>
                    <div className=" justify-between items-center">
                        <Button
                            type="primary"
                            icon={<LeftOutlined />}
                            onClick={handlePrev}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
                        />
                        <Carousel dotPosition="bottom" ref={carouselRef}>
                            {userAdvertisements.map(ad => (
                                <div key={ad.id} >
                                    <Card
                                        key={ad.id}
                                        title={ad.title}
                                        bordered={false}
                                        onClick={() => setSelectedTrade(ad)}
                                        className={selectedTrade && selectedTrade.id === ad.id ? 'border border-blue-500' : ''}
                                    >
                                        <Row className='flex flex-col md:flex-row'>
                                            <Col span={24} md={12} className='flex items-center justify-around'>
                                                <img
                                                    src={ad.card.image}
                                                    alt="Card"
                                                    className='w-full h-auto max-w-[300px] mb-4 md:mb-0'
                                                />
                                            </Col>
                                            <Col span={24} md={12} className='gutter-row '>
                                                <div className='space-x-3 space-y-3 justify-center'>
                                                    <p className="mx-4">{order.description}</p>
                                                    <p className="my-4">{`Disponível em estoque: ${order.quantity}`}</p>
                                                </div>
                                            </Col>
                                            <Row className='flex flex-col md:flex-row mt-3 justify-around w-full p-4'>
                                                <Col span={24} md={12} className='gutter-row'>
                                                    
                                                        <Counter
                                                            total={tradeQuantities[ad.id] || 1}
                                                            handleDecrement={() => handleTradeDecrement(ad.id)}
                                                            handleIncrement={() => handleTradeIncrement(ad.id, ad.quantity)}
                                                        />
                                                    
                                                </Col>
                                            </Row>
                                        </Row>
                                    </Card>
                                </div>
                            ))}
                        </Carousel>
                        <Button
                            type="primary"
                            icon={<RightOutlined />}
                            onClick={handleNext}
                            style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
                        />
                    </div>
                </Modal>
            </Content>
        </Layout>
    );
};