import {Menu} from "antd";
import {menu} from "../utils/constants";
import {Header} from "antd/es/layout/layout";
import {useHeader} from "../hooks/useHeader";

export const AppHeader = () => {
    const {navigate} = useHeader()
    return <Header
        style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
        }}
    >
        <div className="demo-logo"/>
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={menu}
            onSelect={(it) => {
                navigate(it.item.props.route)
            }}
            style={{flex: 1, minWidth: 0}}
        />
    </Header>
}