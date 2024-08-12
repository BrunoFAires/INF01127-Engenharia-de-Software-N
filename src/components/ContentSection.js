import { Button, Card, Col, Collapse, InputNumber, Row, Tag, Typography } from 'antd';
import { useState } from 'react';
import Component from './VendaPDF.js';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const ContentSection = ({ title, orders, emptyText, onConfirm, onRate }) => {
    const [rating, setRating] = useState({});

    

    const handleRatingChange = (value, orderId) => {
        if (!isNaN(value)) {
            setRating(prevRatings => ({
                ...prevRatings,
                [orderId]: value
            }));
        }
    };

    const handleKeyPress = (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <>
            <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                {orders.length === 0 ? (
                    <Col span={24}>
                        <Text>{emptyText}</Text>
                    </Col>
                ) : (
                    <Collapse className='w-full'>
                        <Panel header={title} key='finishedOrders' className='w-full'>
                            <Row>
                                {orders.map((item) => (
                                    item.order_user.map((userOrder) => (
                                        <Col xs={24} sm={12} md={8} lg={6} xl={4} key={userOrder.id} className='ml-3'>
                                            <Card
                                                cover={<img alt="Seu Pedido" src={userOrder.advertisement_id?.card?.image} />}
                                                actions={[
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        width: '100%',
                                                        zIndex: 10
                                                    }}>
                                                        {onConfirm && !userOrder.finished && item.approved && (
                                                            <Button type="primary" onClick={() => onConfirm(item.id)} style={{ marginBottom: '8px' }}>
                                                                Confirmar recebimento
                                                            </Button>
                                                        )}
                                                        {onConfirm && !userOrder.finished && !item.approved && (
                                                            <Tag color="blue" className="mt-2">
                                                                Aguardando troca ser aceita
                                                            </Tag>
                                                        )}
                                                        {onRate && userOrder.finished && !userOrder.evaluated && (
                                                            <>
                                                                <InputNumber
                                                                    min={0}
                                                                    max={10}
                                                                    value={rating[userOrder.id]}
                                                                    onChange={(value) => handleRatingChange(value, userOrder.id)}
                                                                    onKeyPress={handleKeyPress}
                                                                />
                                                                <Button
                                                                    type="primary"
                                                                    onClick={() => onRate(userOrder.advertisement_id?.seller?.id, rating[userOrder.id], item.id)}
                                                                    style={{ marginTop: '8px' }}
                                                                >
                                                                    Avaliar Vendedor
                                                                </Button>
                                                            </>
                                                        )}
                                                        <Component
                                                        Orders={item}
                                                        
                                                        />
                                                    </div>
                                                ]}
                                            >
                                                <Card.Meta
                                                    description={(
                                                        <div className="mt-1">
                                                            <Text strong className="text-gray-600">{item.deal ? 'Troca com:' : 'Vendido por:'} </Text>
                                                            <Text className="text-black"> {userOrder.advertisement_id?.seller?.name}</Text>
                                                            <div className="mt-1">
                                                                <Text strong className="text-gray-600">Preço: </Text>
                                                                <Text className="text-black">R$ {userOrder.advertisement_id?.price * userOrder.quantity}</Text>
                                                            </div>
                                                            <div className="mt-1">
                                                                <Text strong className="text-gray-600">Quantidade: </Text>
                                                                <Text className="text-black">{userOrder.quantity}</Text>
                                                            </div>
                                                            <div className="mt-1">
                                                                <Text strong className="text-gray-600">Negócio: </Text>
                                                                <Text className="text-black">{item.deal ? 'Troca' : 'Venda'}</Text>
                                                            </div>
                                                            <div className="mt-1">
                                                                <Text strong className="text-gray-600">Status: </Text>
                                                                <Text className="text-black">{item.approved ? 'Confirmado' : 'Pendente'}</Text>
                                                            </div>
                                                            <div className="mt-1">
                                                                <Text strong className="text-gray-600">Entregue: </Text>
                                                                <Text className="text-black">{userOrder.finished ? 'Sim' : 'Não'}</Text>
                                                            </div>
                                                            {userOrder.finished && userOrder.evaluated && (
                                                                <Tag color="green" className="mt-2">
                                                                    Vendedor Avaliado
                                                                </Tag>
                                                            )}
                                                        </div>
                                                    )}
                                                />
                                            </Card>
                                        </Col>
                                    ))
                                ))}
                            </Row>
                        </Panel>
                    </Collapse>
                )}
            </Row>
        </>
    );
};

export default ContentSection;
