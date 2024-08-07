import { Button, Card, Col, InputNumber, Row, Tag, Typography } from 'antd';
import { useState } from 'react';

const { Title, Text } = Typography;

const ContentSection = ({ title, orders, emptyText, onConfirm, onRate }) => {
    const [rating, setRating] = useState({});

    const handleRatingChange = (value, orderId) => {
        setRating(prevRatings => ({
            ...prevRatings,
            [orderId]: value
        }));
    };

    return (
        <>
            <Title level={3}>{title}</Title>
            <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                {orders.length === 0 ? (
                    <Col span={24}>
                        <Text>{emptyText}</Text>
                    </Col>
                ) : (
                    orders.map((item) => (
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} key={item.id}>
                            <Card
                                cover={<img alt="Seu Pedido" src={item.advertisement_id?.card?.image} />}
                                actions={[
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                                        {onConfirm && !item.finished && (
                                            <Button type="primary" onClick={() => onConfirm(item.id)} style={{ marginBottom: '8px' }}>
                                                Confirmar recebimento
                                            </Button>
                                        )}
                                        {onRate && item.finished && !item.evaluated && (
                                            <>
                                                <InputNumber
                                                    min={0}
                                                    max={10}
                                                    value={rating[item.id]}
                                                    onChange={(value) => handleRatingChange(value, item.id)}
                                                />
                                                <Button
                                                    type="primary"
                                                    onClick={() => onRate(item.advertisement_id?.seller?.id, rating[item.id], item.id)}
                                                    style={{ marginTop: '8px' }}
                                                >
                                                    Avaliar Vendedor
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                ]}
                            >
                                <Card.Meta
                                    title={`Pedido #${item.order_id}`}
                                    description={(
                                        <div className="mt-1">
                                           <Text strong className="text-gray-600">Vendido por: </Text>
                                           <Text className="text-black"> {item.advertisement_id.seller.name}</Text>
                                            <div className="mt-1">
                                                <Text strong className="text-gray-600">Preço: </Text>
                                                <Text className="text-black">R$ {item.advertisement_id?.price * item.quantity}</Text>
                                            </div>
                                            <div className="mt-1">
                                                <Text strong className="text-gray-600">Quantidade: </Text>
                                                <Text className="text-black">{item.quantity}</Text>
                                            </div>
                                            <div className="mt-1">
                                                <Text strong className="text-gray-600">Entregue: </Text>
                                                <Text className="text-black">{item.finished ? 'Sim' : 'Não'}</Text>
                                            </div>
                                            {item.finished && item.evaluated && (
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
                )}
            </Row>
        </>
    );
};

export default ContentSection;
