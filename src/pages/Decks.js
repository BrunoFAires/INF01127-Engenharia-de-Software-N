import {Button, Form, Input, Layout, Row} from 'antd';
import {AppHeader, Header} from "../components/header";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const {Content, Footer} = Layout;


export const Decks = () => {
    const navigate = useNavigate()

    return <Layout>
        <AppHeader/>
        <Content className={'m-[24px]'}>
            <Row justify={'end'}>
                <Button size={'large'} type="primary" onClick={() => navigate('/newDeck')}>Cadastrar novo
                    baralho</Button>
            </Row>
        </Content>

    </Layout>
}
