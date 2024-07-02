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
            console.log(result)
        })

    return <Layout>
        <AppHeader/>
        <Content style={{padding: '0 48px'}}>
            <div
                style={{
                    padding: 24,
                    minHeight: 380,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                Content
            </div>
        </Content>
        <Footer style={{textAlign: 'center'}}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    </Layout>
}
