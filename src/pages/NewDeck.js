import {Button, Card, Col, Form, Input, Layout, Modal, Pagination, Row} from 'antd';
import {AppHeader, Header} from "../components/header";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {useNewDeck} from "../hooks/useNewDeck";
import Meta from "antd/es/card/Meta";

const {Content, Footer} = Layout;


export const NewDeck = () => {
    const {
        handleChangeTitle,
        handleChangeDescription,
        showModal,
        handleOk,
        isModalOpen,
        handleCancel,
        setSearchCardTitle,
        searchCard,
        apiResponse,
        loading
    } = useNewDeck()

    console.log(apiResponse)

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
                <Modal title="Pesquisar carta" loading={loading} open={isModalOpen} onOk={handleOk}
                       onCancel={handleCancel}
                       okText={'Adicionar'} cancelText={'Cancelar'} width={'80%'}>
                    <Col>
                        <Col md={8} className={'space-y-3 mb-3'}>
                            <Input onChange={data => {
                                setSearchCardTitle(data.target.value)
                            }} size={'large'} placeholder={'Nome'}/>
                            <Button onClick={searchCard} className={'w-1/2'} size={'large'} loading={false}
                                    type="primary">
                                Pesquisar
                            </Button>
                        </Col>
                        <Row className={'flex space-x-3 space-y-3 justify-center'}>
                            {apiResponse && apiResponse.data.map(it =>
                                <Card
                                    hoverable
                                    style={{width: 240}}
                                    cover={<img alt="example"
                                                src={it.images.large}/>}
                                    onClick={() => {
                                        console.log(it)
                                    }}
                                >
                                </Card>
                            )}
                        </Row>
                        <Pagination defaultCurrent={1} total={50} />
                    </Col>
                </Modal>
            </Col>
        </Content>
    </Layout>
}
