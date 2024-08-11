import {Layout, Modal, Skeleton, Typography} from 'antd';
import React from 'react';
import ContentSection from '../components/ContentSection';
import {AppHeader} from '../components/header';
import {useOrders} from '../hooks/useOrder';

const {Title} = Typography;
const {Content} = Layout;

export const Order = () => {
    const {
        pendingOrders,
        completedOrders,
        loading,
        error,
        rating,
        handleRatingChange,
        handleKeyPress,
        showConfirmModal,
        showRateConfirmModal,
        isConfirmModalOpen,
        handleConfirmModalOk,
        handleRateConfirmModalCancel,
        isRateConfirmModalOpen,
        handleRateConfirmModalOk,
        handleConfirmModalCancel
    } = useOrders();

    return (
        <Layout className="min-h-[100vh]">
            <AppHeader/>
            <Content className="px-[48px] mt-6 shadow-[#b6b6b6] shadow-xl">
                <Title level={2} className="text-center">Meus Pedidos</Title>
                {loading && <Skeleton active/>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <>
                        <ContentSection
                            title="Pedidos Pendentes"
                            orders={pendingOrders}
                            emptyText="Nenhum pedido pendente"
                            onConfirm={showConfirmModal}
                        />
                        {<ContentSection
                            title="Pedidos Finalizados"
                            orders={completedOrders}
                            emptyText="Nenhum pedido finalizado"
                            onRate={showRateConfirmModal}
                            handleKeyPress={handleKeyPress}
                            handleRatingChange={handleRatingChange}
                            rating={rating}
                        />}
                    </>
                )}
                <Modal
                    title="Confirmar recebimento"
                    open={isConfirmModalOpen}
                    onOk={handleConfirmModalOk}
                    onCancel={handleConfirmModalCancel}
                    okText="Confirmar"
                    cancelText="Cancelar"
                >
                    <p>Você tem certeza que deseja confirmar o recebimento deste pedido?</p>
                </Modal>
                <Modal
                    title="Avaliar o vendedor"
                    open={isRateConfirmModalOpen}
                    onOk={handleRateConfirmModalOk}
                    onCancel={handleRateConfirmModalCancel}
                    okText="Confirmar"
                    cancelText="Cancelar"
                >
                    <p>Você tem certeza que deseja dar essa nota ao vendedor?</p>
                </Modal>
            </Content>
        </Layout>
    );
};

export default Order;
