import {Button, Card, Col, InputNumber, Row, Tag, Typography} from 'antd';
import {useState} from 'react';

const {Title, Text} = Typography;

const ContentSection = ({title, orders, emptyText, onConfirm, onRate, sale, deal, currentUser, updateOffer}) => {
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
            <Title level={3}>{title}</Title>
            <Row gutter={[16, 16]} style={{marginTop: '24px'}}>
                {orders.length === 0 ? (
                    <Col span={24}>
                        <Text>{emptyText}</Text>
                    </Col>
                ) : (
                    orders.map((item) => (
                        item.order_user.filter(it => deal ? it.profile.id === currentUser.id : it).map((userOrder) => (
                            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={userOrder.id}>
                                <Card
                                    cover={<img alt="Seu Pedido" src={userOrder.advertisement?.card?.image}/>}
                                    actions={[
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            width: '100%'
                                        }}>
                                            {onConfirm && !userOrder.finished && item.approved && (
                                                <Button type="primary" onClick={() => onConfirm(userOrder.id)}
                                                        style={{marginBottom: '8px'}}>
                                                    Confirmar recebimento
                                                </Button>
                                            )}
                                            {onConfirm && !userOrder.finished && !item.approved && (
                                                <Tag color="blue" className="mt-2">
                                                    Aguardando troca ser aceita
                                                </Tag>
                                            )}
                                            {((onRate && item.approved && userOrder.finished && !userOrder.evaluated) || (sale && userOrder.approved)) && (
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
                                                        onClick={() => onRate(userOrder.advertisement?.seller?.id, rating[userOrder.id], item.id)}
                                                        style={{marginTop: '8px'}}
                                                    >
                                                        {sale ? 'Avaliar comprador' : 'Avaliar Vendedor'}
                                                    </Button>
                                                </>
                                            )}
                                            {(deal && !userOrder.approved) && (
                                                <Row className={'flex flex-row justify-evenly w-full'}>
                                                    <Button
                                                        type="primary"
                                                        danger
                                                        onClick={() => updateOffer(userOrder.order_id, false)}
                                                        style={{marginTop: '8px'}}
                                                    >
                                                        Recusar oferta
                                                    </Button>
                                                    <Button
                                                        type="primary"
                                                        onClick={() => updateOffer(userOrder.order_id, true)}
                                                        style={{marginTop: '8px'}}
                                                    >
                                                        Aceitar oferta
                                                    </Button>
                                                </Row>
                                            )}
                                        </div>
                                    ]}
                                >
                                    <Card.Meta
                                        title={`Pedido #${userOrder.id}`}
                                        description={(
                                            <div className="mt-1">
                                                <Text strong
                                                      className="text-gray-600">{sale ? (deal ? ` Ofertante: ${userOrder.advertisement?.seller?.name}` : ` Comprador: ${userOrder.profile?.name}`) : ` Vendido por: ${userOrder.advertisement?.seller?.name}`}</Text>
                                                <div className="mt-1">
                                                    <Text strong className="text-gray-600">Preço: </Text>
                                                    <Text
                                                        className="text-black">R$ {userOrder.advertisement?.price * userOrder.quantity}</Text>
                                                </div>
                                                <div className="mt-1">
                                                    <Text strong className="text-gray-600">Quantidade: </Text>
                                                    <Text className="text-black">{userOrder.quantity}</Text>
                                                </div>
                                                <div className="mt-1">
                                                    <Text strong className="text-gray-600">Negócio: </Text>
                                                    <Text className="text-black">{item.deal ? 'Troca' : 'Venda'}</Text>
                                                </div>
                                                {!deal && <div className="mt-1">
                                                    <Text strong className="text-gray-600">Status: </Text>
                                                    <Text
                                                        className="text-black">{item.approved && item.finished_at ? 'Confirmado' : deal || item.deal ? 'Recusado' : 'Pendente'}</Text>
                                                </div>}
                                                {!deal && <div className="mt-1">
                                                    <Text strong className="text-gray-600">Entregue: </Text>
                                                    <Text
                                                        className="text-black">{userOrder.finished && item.approved ? 'Sim' : 'Não'}</Text>
                                                </div>}
                                                {sale && !deal && <div className="mt-1">
                                                    <Text strong className="text-gray-600">Troca aceita: </Text>
                                                    <Text
                                                        className="text-black">{userOrder.approved ? 'Sim' : 'Não'}</Text>
                                                </div>}
                                                {!sale && userOrder.finished && userOrder.evaluated && (
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
                    ))
                )}
            </Row>
        </>
    )
        ;
};

export default ContentSection;
