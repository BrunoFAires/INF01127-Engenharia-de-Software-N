import {Button, Col, Input, Layout, Row, Select, Spin} from 'antd';
import {AppHeader} from "../components/header";
import React from "react";
import {useProfile} from "../hooks/useProfile";

const {Option} = Select;


const {Content} = Layout;


export const Profile = () => {
    const {
        currentUser,
        loading,
        enableButton,
        handleChangeName,
        handleChangeSurname,
        handleChangeAccountType,
        handleSaveUpdateProfile
    } = useProfile()
    return <Layout className={'min-h-[100vh]'}>
        <AppHeader/>
        <Content className={'px-[48px] mt-6 shadow-[#b6b6b6] shadow-xl'}>
            {loading ? <Row justify={"center"}><Spin/></Row> : <Col className='flex flex-col space-y-3'>
                <Input onChange={handleChangeName} value={currentUser.profile.name} className='w-1/3' size={'large'}
                       placeholder='Nome'/>
                <Input onChange={handleChangeSurname} value={currentUser.profile.surname} className='w-1/3'
                       size={'large'} placeholder='Sobrenome'/>
                <Input value={currentUser.email} disabled className='w-1/3' size={'large'} placeholder='Sobrenome'/>
                <div>
                    <p>Perfil de vendedor: </p>
                    <Select value={Boolean(currentUser.profile.seller)} className='w-1/3'
                            onChange={handleChangeAccountType} size={'large'} style={{width: '100%'}}>
                        <Option value={true}>Sim</Option>
                        <Option value={false}>Não</Option>
                    </Select>
                </div>
                <Row className='w-1/3' justify='end'> <Button onClick={handleSaveUpdateProfile} className={''} size={'large'} disabled={!enableButton}
                                                              loading={false}
                                                              htmlType="submit">
                    Salvar
                </Button></Row>
            </Col>}
        </Content>
    </Layout>
}
