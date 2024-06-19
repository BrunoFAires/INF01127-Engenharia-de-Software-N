import {Button, Col, Form, Input, Layout, Row} from "antd";
import {Content} from "antd/es/layout/layout";
import {useSignIn} from "../hooks/useSignIn";

export const SignIn = () => {
    const {loading, onSubmit, handleClickSignUo} = useSignIn()

    return <Layout>
        <Content>
            <Row
                justify="center"
                align="middle"
            >
                <Col xs={24} md={24}
                     className={'min-h-[100vh] flex'}>
                    <Row style={{flex: 1}}>
                        <Col xs={24} xl={16} justify={'center'} align="center" className={'bg-[#bae7ff] px-12'}>
                            <Col md={12}
                                 className={'min-h-[100%] flex-col content-center space-y-5'}>
                                <p className={'text-2xl'}>Olá. Seja bem-vindo!</p>
                                <Form
                                    className={'space-y-4'}
                                    labelCol={{
                                        span: 3,
                                    }}
                                    labelAlign={'left'}
                                    name="basic"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onSubmit}
                                    autoComplete="true"
                                    style={{width: '100%'}}
                                >
                                    <Form.Item
                                        className={'m-0'}
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Este campo é obrigatório',
                                            },
                                        ]}
                                    >
                                        <Input placeholder={'E-mail'} size="large"/>
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Este campo é obrigatório',
                                            },
                                        ]}
                                    >
                                        <Input placeholder={'Senha'} size='large' type="password"/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button className={'w-1/2'} size={'large'} loading={loading} type="primary"
                                                htmlType="submit">
                                            Entrar
                                        </Button>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button className={'w-1/2'} size={'large'} type="primary" onClick={() => handleClickSignUo()}>
                                            Cadastre-se
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Col>
                        <Col sm={24} xl={8} className={'bg-[#91d5ff] px-12'}>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Content>
    </Layout>
}
