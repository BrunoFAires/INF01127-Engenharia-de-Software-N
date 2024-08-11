import { Layout, Card, Button, Spin, Modal, Carousel, Row, Col } from 'antd';
import { AppHeader } from "../components/header";
import useMarketplace from "../hooks/useMarktplace";
import { Counter } from "../components/counter"
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Content } = Layout;

export const Marketplace = () => {
    const {
        advertisement,
        loading,
        loadingUser,
        isModalVisible,
        isTradeModalVisible,
        userAdvertisements,
        handleShowModal,
        handleShowTradeModal,
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
                {loading || loadingUser ? (
                    <Spin size="large" />
                ) : (
                    advertisement ? (
                        <Content title={<span className="text-[2rem] font-bold">{advertisement.title}</span>} bordered={false}>
                            <Row className='flex flex-col md:flex-row'>
                                <Col sspan={24} md={12} className='flex items-center justify-around'>
                                    <img src={advertisement.card.image} alt="Card" className='w-full h-auto max-w-[300px] mb-4 md:mb-0' />
                                </Col>
                                <Col span={24} md={12} className='gutter-row'>
                                    <div className='space-x-3 space-y-3 justify-center'>
                                        <p className="mx-4">{`Descrição: ${advertisement.description}`}</p>
                                        <p className="py-8 my-4">{`Vendedor: ${advertisement.seller.name}`}</p>
                                        <p className="my-4">{`Disponível em estoque: ${advertisement.quantity}`}</p>

                                        {advertisement?.sale ? (
                                            <>
                                                <p>{`Preço: ${advertisement.price}`}</p>
                                            </>) : (<></>)}
                                    </div>
                                </Col>
                            </Row>
                            
                            {advertisement?.sale ? (
                                advertisement.status === 1 &&
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
                                        <Button type="primary" onClick={handleShowModal}>Comprar</Button>
                                    </Col>
                                </Row>
                            ) : (
                                advertisement.status === 1 &&
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
                                        <Button type="primary" onClick={handleShowTradeModal}>Trocar</Button>
                                    </Col>
                                </Row>
                            )}
                        </Content>
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
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
                        />
                        <Carousel className='w-full h-auto justify-center' dotPosition="bottom" ref={carouselRef}>
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
                                                    <p className="mx-4">{ad.description}</p>
                                                    <p className="my-4">{`Disponível em estoque: ${ad.quantity}`}</p>
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
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
                        />
                    </div>
                </Modal>
            </Content>
        </Layout>
    );
};