import { Layout, Skeleton, Typography } from 'antd';
import React from 'react';
import ContentSection from '../components/ContentSection';
import { AppHeader } from '../components/header';
import { useOrders } from '../hooks/useOrder';

const { Content } = Layout;
const { Title } = Typography;

export const Order = () => {
    const { pendingOrders, completedOrders, loading, error, confirmDelivery, ratePlayers } = useOrders();

    return (
        <Layout className="min-h-[100vh]">
            <AppHeader />
            <Content className="px-[48px] mt-6 shadow-[#b6b6b6] shadow-xl">
                <Title level={2} className="text-center">Meus Pedidos</Title>
                {loading && <Skeleton active />}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <>
                        <ContentSection
                            title="Pedidos Pendentes"
                            orders={pendingOrders}
                            emptyText="Nenhum pedido pendente"
                            onConfirm={confirmDelivery}
                        />
                        <ContentSection
                            title="Pedidos Finalizados"
                            orders={completedOrders}
                            emptyText="Nenhum pedido finalizado"
                            onRate={ratePlayers}
                        />
                    </>
                )}
            </Content>
        </Layout>
    );
};

export default Order;