import {Layout} from "antd";
import React from "react";
import {AppHeader} from "../components/header";
import {Content} from "antd/es/layout/layout";
import {useSales} from "../hooks/useSales";
import ContentSection from "../components/ContentSection";

export const Sales = () => {
    const {sales, deals, currentUser, handleUpdateOffer} = useSales()
    return <Layout className={'min-h-[100vh]'}>
        <AppHeader/>
        <Content className={'px-[48px] mt-6 shadow-[#b6b6b6] shadow-xl'}>
            <ContentSection
                title="Trocas aguardando aprovação"
                orders={deals}
                emptyText="Nenhum pedido finalizado"
                onRate={() => {
                }}
                sale={true}
                deal={true}
                currentUser={currentUser}
                updateOffer={handleUpdateOffer}
            />
            <ContentSection
                title="Vendas realizadas"
                orders={sales}
                emptyText="Nenhum pedido finalizado"
                onRate={() => {
                }}
                sale={true}
                currentUser={currentUser}
            />
        </Content>
    </Layout>
}