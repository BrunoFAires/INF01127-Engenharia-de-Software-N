import { Button, InputNumber, List, Tag, Typography } from 'antd';
import { useState } from 'react';

const { Title } = Typography;

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
            <List
                dataSource={orders}
                renderItem={item => {
                return <List.Item>
                    <List.Item.Meta
                        title={`Pedido #${item.order_id}`}
                        description={
                            <>
                                <p>Carta: {item.advertisement_id?.card?.name}</p>
                                <p>Quantidade: {item.quantity}</p>
                                <p>Preço final: {item.advertisement_id?.price * item.quantity} R$</p>
                                <p>Vendido por: {item.advertisement_id?.seller?.name}</p>
                                <p>Entregue: {item.finished ? 'Sim' : 'Não'}</p>
                                {onConfirm && !item.finished && (
                                    <Button type="primary" onClick={() => onConfirm(item.id)} >
                                        Confirmar Entrega
                                    </Button>
                                )}
                                {onRate && item.finished && !item.evaluated && (
                                    <>
                                        <InputNumber
                                            min={0}
                                            max={10}
                                            value={rating[item.id]}
                                            onChange={(value) => handleRatingChange(value, item.id,)}
                                        />
                                        <Button
                                            type="primary"
                                            onClick={() => onRate(item.advertisement_id?.seller?.id, rating[item.id], item.id)}
                                        >
                                            Avaliar Vendedor
                                        </Button>
                                    </>
                                )}
                                {item.finished && item.evaluated && (
                                        <Tag color="green" className="mt-2">
                                            Vendedor Avaliado
                                        </Tag>
                                    )}
                            </>
                        }
                    />
                </List.Item>
}}
                locale={{ emptyText }}
            />
        </>
    );
};

export default ContentSection;
