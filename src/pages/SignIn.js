import {useSignUp} from "../hooks/useSignUp";
import {Button, Col, Form, Input, Layout, Row} from "antd";
import {Content} from "antd/es/layout/layout";
import {useSignIn} from "../hooks/useSignIn";

export const SignIn = () => {
    const {loading, onSubmit} = useSignIn()

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
                                        label="E-mail"
                                        name="email"
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
                                        label="Senha"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Este campo é obrigatório',
                                            },
                                        ]}
                                    >
                                        <Input type="password"/>
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
