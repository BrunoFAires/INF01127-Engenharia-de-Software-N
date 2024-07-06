import {Button, Card, Col, Input, InputNumber, Layout, Modal, Pagination, Row, Space} from 'antd';
import {AppHeader, Header} from "../components/header";
import TextArea from "antd/es/input/TextArea";
import {useNewDeck} from "../hooks/useNewDeck";
import {Counter} from "../components/counter";

const {Content, Footer} = Layout;


export const NewDeck = () => {
    const {
        handleChangeTitle,
        searchCardTitle,
        handleChangeDescription,
        showModal,
        handleOk,
        isModalOpen,
        handleCancel,
        setSearchCardTitle,
        searchCard,
        apiResponse,
        loading,
        setActualPage,
        actualPage,
        totalPages,
        handleAddCard,
        handleRemoveCard,
        handleSubmit,
        deck,
    } = useNewDeck()

    return <Layout className={'min-h-[100vh]'}>
        <AppHeader/>
        <Content className={'px-[48px]'}>
            <Col md={12} className='mx-auto space-y-3 mt-3'>
                <Input onChange={handleChangeTitle} size={'large'} placeholder={'Título'}/>
                <TextArea onChange={handleChangeDescription} size={'large'} placeholder={'Descrição'}
                          autoSize={{minRows: 3, maxRows: 3}}/>
                <Row justify={'end'}>
                    <Button onClick={showModal} className={''} size={'large'} loading={false} type="primary"
                    >
                        Adicionar carta
                    </Button>
                </Row>
                <Row className={'space-x-3 flex flex-row justify-center'} md={12}>
                    {deck.groupedCardsById().map(it => <Card
                        style={{width: 240}}
                        cover={<img alt="example"
                                    src={it.image}/>}
                    ><Counter total={deck.totalCard(it.id)}
                              handleDecrement={() => {
                                  handleRemoveCard(it.id)
                              }}/></Card>)}
                </Row>
                <Row justify={'center'}>
                    <Button className={'w-1/2'} size={'large'} loading={false} type="primary" onClick={handleSubmit}>
                        Salvar
                    </Button>
                </Row>
                <Modal title="Pesquisar carta" loading={loading} open={isModalOpen} onOk={handleOk}
                       onCancel={handleCancel}
                       okText={'Adicionar'} cancelText={'Cancelar'} width={'80%'}>
                    <Col>
                        <Col md={8} className={'space-y-3 mb-3'}>
                            <Input value={searchCardTitle} onChange={data => {
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
                                        console.log(it.id)
                                        console.log(deck)
                                    }}
                                >
                                    <Counter total={deck.totalCard(it.id)} handleIncrement={() => {
                                        handleAddCard(it)
                                    }}
                                             handleDecrement={() => {
                                                 handleRemoveCard(it.id)
                                             }}/>
                                </Card>
                            )}
                        </Row>
                        <Row className={'justify-center'}>
                            {totalPages && <Pagination current={actualPage} defaultPageSize={1}
                                                       onChange={value => setActualPage(value)}
                                                       defaultCurrent={1}
                                                       total={totalPages}/>}
                        </Row>
                    </Col>
                </Modal>
            </Col>
        </Content>
    </Layout>
}
