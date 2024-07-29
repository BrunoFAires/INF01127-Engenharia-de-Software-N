import {Avatar, Button, Card, Col, Form, Image, Input, Layout, List, Row} from 'antd';
import {AppHeader} from "../components/header";
import {supabase} from "../service/supabaseClient";
import {Counter} from "../components/counter";
import React from "react";
import Meta from "antd/es/card/Meta";
import {CommentOutlined, EditOutlined, EllipsisOutlined, LikeOutlined, SettingOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const {Content} = Layout;


export const NewPost = () => {

    return <Layout className={'min-h-[100vh]'}>
        <AppHeader/>
        <Content className={'px-[48px] mt-6 shadow-[#b6b6b6] shadow-xl'}>
            <Row justify={'end'} className='pb-3'>
                <Button size={'large'} type="primary" onClick={() => {
                }}>Nova publicação</Button>
            </Row>
            <Col xs={24} md={24}
                 className={'min-h-[100vh] flex justify-center'}>
                <Col md={8}
                     className={'min-h-[100%] flex-col  space-y-5 '}>
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
                        onFinish={() => {
                        }}
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
                            <TextArea value={''} onChange={() => {
                            }} size={'large'} placeholder={'Descrição'}
                                      autoSize={{minRows: 5, maxRows: 5}}/>
                        </Form.Item>
                        <Form.Item>
                            <Row justify={"end"}><Button className={''} size={'large'} loading={false}
                                                         htmlType="submit">
                                Publicar
                            </Button></Row>
                        </Form.Item>
                    </Form>
                </Col>
            </Col>
        </Content>
    </Layout>
}
