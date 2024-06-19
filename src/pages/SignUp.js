import {useSignUp} from "../hooks/useSignUp";
import {Button, Col, Form, Input, Layout, Row} from "antd";
import {Content} from "antd/es/layout/layout";
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';

export const SignUp = () => {
    const {loading, onSubmit} = useSignUp()

    return <Layout>
        <Content>
            <Row
                justify="center"
                align="middle"

            >
                <Col xs={24} md={24} className={'min-h-[100vh] flex'}>
                    <Row style={{flex: 1}}>
                        <Col xs={24} xl={16} justify={'center'} align="center" className={'bg-[#bae7ff] px-12'}>
                            <Col md={12}
                                 className={'min-h-[100%] flex-col content-center space-y-5'}>
                                <p className={'text-2xl'}>Para continuar preencha as seguintes informações:</p>
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
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Este campo é obrigatório',
                                            },
                                        ]}
                                    >
                                        <Input size={'large'} placeholder={'Nome'}/>
                                    </Form.Item>
                                    <Form.Item
                                        name="surname"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Este campo é obrigatório',
                                            },
                                        ]}
                                    >
                                        <Input size={'large'} placeholder={'Sobrenome'}/>
                                    </Form.Item>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'O campo não é um e-mail válido',
                                            },
                                            {
                                                required: true,
                                                message: 'Este campo é obrigatório',
                                            },
                                        ]}
                                    >
                                        <Input size={'large'} placeholder={'E-mail'}/>
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Este campo é obrigatório',
                                            },
                                            {
                                                min: 6,
                                                message: 'Sua senha deve ter no mínimo 6 caractéres.',
                                            },
                                        ]}
                                    >
                                        <Input.Password size={'large'} placeholder={'Senha'} type="password"
                                                        iconRender={(visible) => (visible ? <EyeTwoTone/> :
                                                            <EyeInvisibleOutlined/>)}/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button className={'w-1/2'} size={'large'} loading={loading} type="primary"
                                                htmlType="submit">
                                            Cadastrar
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
