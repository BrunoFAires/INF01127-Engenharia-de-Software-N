import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {AppHeader, Header} from "../components/header";
import {supabase} from "../service/supabaseClient";

const {Content, Footer} = Layout;


export const Home = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    supabase
        .from('profile')
        .select()
        .then(result => {
        })

    return <Layout className={'min-h-[100vh]'}>
        <AppHeader/>
        <Content className={'px-[48px] mt-6 shadow-[#b6b6b6] shadow-xl'}>

        </Content>
    </Layout>
}
