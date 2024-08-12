import { Layout, message, Modal, Skeleton, Typography } from 'antd';
import React, { useState } from 'react';
import ContentSection from '../components/ContentSection';
import { AppHeader } from '../components/header';
import { useOrders } from '../hooks/useOrder';





const { Title, Text } = Typography;
const { Content } = Layout;

export const Order = () => {
  const { pendingOrders, completedOrders, loading, error, confirmDelivery, ratePlayers, currentUser } = useOrders();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [isRateConfirmModalOpen, setIsRateConfirmModalOpen] = useState(false); 
  const [selectedRating, setSelectedRating] = useState(null); 
  const [selectedSeller, setSelectedSeller] = useState(null); 
  const [selectedAd_Id, setSelectedAd_Id] = useState(null); 


  const showConfirmModal = (orderId) => {
    setSelectedOrder(orderId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmModalOk = async () => {
    try {
      await confirmDelivery(selectedOrder);
      message.success('Pedido confirmado com sucesso');
      setIsConfirmModalOpen(false);
    } catch (error) {
      message.error('Falha ao confirmar pedido');
    }
  };

  const handleConfirmModalCancel = () => {
    setIsConfirmModalOpen(false);
  };

  const showRateConfirmModal = (idSeller, rating, advertisement_id) => {
    setSelectedSeller(idSeller)
    setSelectedAd_Id(advertisement_id)
    setSelectedRating(rating);
    setIsRateConfirmModalOpen(true);
  };

  const handleRateConfirmModalOk = async () => {
    try {
      await ratePlayers(selectedSeller, selectedRating,selectedAd_Id, currentUser );
      message.success('Avaliação enviada com sucesso');
      setIsRateConfirmModalOpen(false);
    } catch (error) {
      message.error('Falha ao enviar avaliação');
    }
  };

  const handleRateConfirmModalCancel = () => {
    setIsRateConfirmModalOpen(false);
  };

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
              onConfirm={showConfirmModal}
            />
            { <ContentSection
              title="Pedidos Finalizados"
              orders={completedOrders}
              emptyText="Nenhum pedido finalizado"
              onRate={showRateConfirmModal}
            /> }
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
