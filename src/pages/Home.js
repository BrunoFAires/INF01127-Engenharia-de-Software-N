import {Avatar, Button, Card, Layout, Row, Spin} from 'antd';
import {AppHeader} from "../components/header";
import {supabase} from "../service/supabaseClient";
import React from "react";
import {useHome} from "../hooks/useHome";
import Meta from "antd/es/card/Meta";

const {Content} = Layout;


export const Home = () => {
    const {loading, posts, advertisements, navigate} = useHome()

    supabase.from('order').select('*, order_user(*, advertisements(*))').then((response) => console.log(response))

    return <Layout className={'min-h-[100vh]'}>
        <AppHeader/>
        <Content className={'px-[48px] mt-6 shadow-[#b6b6b6] shadow-xl'}>
            {loading ? <Row justify={"center"}><Spin/></Row> : <>
                <Row justify={'end'} className='pb-3'>
                    <Button size={'large'} type="primary" onClick={() => {
                    }}>Acessar mercado de cartas</Button>
                </Row>
                <div
                    className="flex items-center h-[50vh] overflow-x-auto overflow-clip space-x-3 mb-3 shadow-lg py-2">
                    {advertisements.map((it, index) => (
                        <Card
                            key={index}
                            className={'max-w-[400px]  content-center h-full flex-shrink-0  ml-2 mr-2'}
                        >
                            <Meta
                                description={<div className='flex flex-col items-center'>
                                    <p className='pb-3  text-center text-black'>{it.title}</p>
                                    <img className='w-[75%] pl-2 pb-2' src={it.card.image}
                                         alt=''/>
                                    <p className='pb-3  text-center text-black'>R$ {it.price}</p>
                                </div>}
                            />
                        </Card>
                    ))}
                </div>
                <Row justify={'end'} className='pb-3'>
                    <Button size={'large'} type="primary" onClick={() => navigate('/community')}>Acessar Comunidade</Button>
                </Row>
                <div className="flex items-center h-[50vh] overflow-x-auto overflow-clip space-x-3 shadow-lg mb-10 py-2">
                    {posts.slice(0, 6).map((it, index) => (
                        <Card
                            key={index}
                            className={'max-w-[500px] content-center h-full flex-shrink-0  ml-2 mr-2'}
                        >
                            <Meta
                                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"/>}
                                title={it.user.profile?.name}
                                description={<>
                                    <p className='pb-3'>{it.text}</p>
                                    <Row className=''>{
                                        it.cardPost?.slice(0, 5)?.map(it => {
                                            return <img className='w-[100px] pl-2 pb-2' src={it.image} alt=''/>
                                        })
                                    }</Row>
                                </>}
                            />
                        </Card>
                    ))}
                </div>

            </>}
        </Content>
    </Layout>
}
