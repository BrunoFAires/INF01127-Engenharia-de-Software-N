import {AppHeader} from "../components/header";
import {useHome} from "../hooks/useHome";
import Meta from "antd/es/card/Meta";
import {Avatar, Button, Card, Layout, Row, Spin, Col, Input, Select, Pagination, Typography, Form} from 'antd';
import React, { useState, useEffect } from "react";
import { fetchAds, fetchTotalAds } from '../service/adsService';

const {Content} = Layout;
const { Option } = Select;
const { Title, Text } = Typography;

export const Home = () => {
    const {loading, posts, navigate} = useHome()

    const [ads, setAds] = useState([]);
    const [totalAds, setTotalAds] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(40);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("price_asc");
    const [filters, setFilters] = useState({
        price: null,
        artist: null,
        rarity: null,
        name: null,
    });

    useEffect(() => {
        const loadAds = async () => {
            const paginatedAds = await fetchAds({
                filters,
                searchTerm,
                sortOrder,
                currentPage,
                pageSize,
            });
            setAds(paginatedAds);
        };

        const loadTotalAds = async () => {
            const total = await fetchTotalAds(filters);
            setTotalAds(total);
        };

        loadAds();
        loadTotalAds();
    }, [currentPage, searchTerm, sortOrder, filters]);// eslint-disable-line react-hooks/exhaustive-deps

    const handleSearch = value => {
        setSearchTerm(value);
        setCurrentPage(1); 
    };

    const handleSortOrderChange = value => {
        setSortOrder(value);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value,
        }));
        setCurrentPage(1);
    };

    return <Layout className={'min-h-[100vh]'}>
        <AppHeader/>
        <Content className={'px-[48px] mt-6 shadow-[#b6b6b6] shadow-xl'}>
            {loading ? <Row justify={"center"}><Spin/></Row> : <>
                
            <Row justify={'end'} className='pb-3'>
                <Button size={'large'} type="primary" onClick={() => {
                }}>Acessar mercado de cartas</Button>
            </Row>

            <Form layout="vertical" className="mb-4">
                <Row gutter={[16, 16]} className="flex-wrap">
                    <Col xs={24} sm={12} md={8} lg={4}>
                        <Input
                            placeholder="Pesquisar anúncios"
                            enterButton
                            size="large"
                            onChange={e => handleSearch(e.target.value)}
                            className="w-full"
                        />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={4}>
                        <Input placeholder="Preço" size="large" onChange={e => handleFilterChange('price', e.target.value)} className="w-full" />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={4}>
                        <Input placeholder="Artista" size="large" onChange={e => handleFilterChange('artist', e.target.value)} className="w-full" />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={4}>
                        <Input placeholder="Raridade" size="large" onChange={e => handleFilterChange('rarity', e.target.value)} className="w-full" />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={4}>
                        <Input placeholder="Pokémon" size="large" onChange={e => handleFilterChange('name', e.target.value)} className="w-full" />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={4}>
                        <Select
                            defaultValue="price_asc"
                            size="large"
                            onChange={handleSortOrderChange}
                            className="w-full"
                        >
                            <Option value="price_asc">Menor preço</Option>
                            <Option value="price_desc">Maior preço</Option>
                            <Option value="title">Título (A-Z)</Option>
                            <Option value="number_asc">Numeração</Option>
                        </Select>
                    </Col>
                </Row>
            </Form>
            
            {ads.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <Title level={3}>Nenhum anúncio encontrado.</Title>
                </div>
            ) : (
                <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                    {ads.map(ad => (
                        <Col xs={24} sm={12} md={8} lg={6} xl={4} key={ad.id}>
                            <Card
                                cover={<img alt={ad.card_name} src={ad.card_image} />}
                            >
                                <Card.Meta
                                    title={`${ad.title}`}
                                    description={(
                                         <div className="mt-2">
                                            <div className="mt-2"><Text strong className="text-gray-600">Descrição: </Text><Text className="text-black">{ad.description}</Text></div>
                                            <div className="mt-2"><Text strong className="text-gray-600">Preço: </Text><Text className="text-black">R$ {ad.price}</Text></div>
                                            <div className="mt-1"><Text strong className="text-gray-600">Artista: </Text><Text className="text-black">{ad.card_artist}</Text></div>
                                            <div className="mt-1"><Text strong className="text-gray-600">Raridade: </Text><Text className="text-black">{ad.card_rarity}</Text></div>
                                            <div className="mt-1"><Text strong className="text-gray-600">Pokémon: </Text><Text className="text-black">{ad.card_name}</Text></div>
                                        </div>
                                    )}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
             <Row justify="center" className="mt-4">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalAds} 
                    onChange={page => setCurrentPage(page)}
                    showSizeChanger={false}
                />
            </Row>


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
