import {Layout} from 'antd';
import {AppHeader} from "../components/header";
import {supabase} from "../service/supabaseClient";

const {Content} = Layout;


export const Home = () => {

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
