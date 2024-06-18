import {useSignUp} from "../hooks/useSignUp";
import {Button, Col, Form, Input, Layout, Row} from "antd";
import {Content} from "antd/es/layout/layout";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export const SignUp = () => {
    const {loading, onSubmit} = useSignUp()
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <Layout>
        <Content>
            <Row
                justify="center"
                align="middle"
                style={{minHeight: '100vh', background: '#ffffff'}}
            >
                <Col xs={24} md={24}
                     style={{background: '#e6f7ff', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
                    <Row style={{flex: 1}}>
                        <Col xs={24} xl={16} justify={'center'} align="center"
                             style={{background: '#bae7ff', padding: '24px'}}>
                            <Col md={16}
                                 style={{
                                     minHeight: '100vh',
                                     display: 'flex',
                                     alignItems: 'center'
                                 }}>
                                <Form
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
                                        label="Nome"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Este campo é obrigatório',
                                            },
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Sobrenome"
                                        name="surname"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Este campo é obrigatório',
                                            },
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label="E-mail"
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
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Senha"
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
                                        <Input.Password type="password" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button loading={loading} type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Col>
                        <Col sm={24} xl={8} style={{background: '#91d5ff', padding: '24px'}}>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </Content>
    </Layout>
}
