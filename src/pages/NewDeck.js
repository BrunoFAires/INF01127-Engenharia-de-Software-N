import {Button, Col, Form, Input, Layout, Modal, Row} from 'antd';
import {AppHeader, Header} from "../components/header";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {useNewDeck} from "../hooks/useNewDeck";

const {Content, Footer} = Layout;


export const NewDeck = () => {
    const {handleChangeTitle, handleChangeDescription, showModal, handleOk, isModalOpen, handleCancel, setSearchCardTitle, searchCard} = useNewDeck()

    return <Layout>
        <AppHeader/>
        <Content style={{padding: '0 48px'}}>
            <Col md={12} className='mx-auto space-y-3'>
                <Input onChange={handleChangeTitle} size={'large'} placeholder={'Título'}/>
                <TextArea onChange={handleChangeDescription} size={'large'} placeholder={'Descrição'}
                          autoSize={{minRows: 3, maxRows: 3}}/>
                <Row justify={'end'}>
                    <Button onClick={showModal} className={''} size={'large'} loading={false} type="primary"
                    >
                        Adicionar carta
                    </Button>
                </Row>
                <Row justify={'center'}>
                    <Button className={'w-1/2'} size={'large'} loading={false} type="primary"
                            htmlType="submit">
                        Salvar
                    </Button>
                </Row>
                <Modal title="Pesquisar carta" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                       okText={'Adicionar'} cancelText={'Cancelar'}>
                    <Col className={'space-y-3'}>
                        <Input onChange={data => {setSearchCardTitle(data.target.value)}} size={'large'} placeholder={'Nome'}/>
                        <Button onClick={searchCard} className={'w-1/2'} size={'large'} loading={false} type="primary">
                            Pesquisar
                        </Button>
                    </Col>
                </Modal>
            </Col>
        </Content>
    </Layout>
}
