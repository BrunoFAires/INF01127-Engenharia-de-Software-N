import {Layout} from 'antd';
import {AppHeader} from "../components/header";
import {supabase} from "../service/supabaseClient";
import {Button, Row} from "antd";

const {Content} = Layout;


export const Order = () => {

    supabase
        .from('profile')
        .select()
        .then(result => {
        })

    return <Layout className={'min-h-[100vh]'}>
        <AppHeader/>
        <Content className={'px-[48px] mt-6 shadow-[#b6b6b6] shadow-xl'}>
            <h1>TESTE</h1>
        </Content>
    </Layout>
}