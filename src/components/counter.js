import {Button, Space} from "antd";

export const Counter = ({total, handleDecrement, handleIncrement}) => {
    //justify-between foi substituido por justify-evenly. Isso ajuda na disposição de marketplace
    return <Space className={'flex flex-row justify-evenly'}> 
        <Button
            type="primary"
            className={'w-1/2'}
            onClick={() => {
                handleDecrement()
            }}
            danger
        >
            -
        </Button>
        <p>{total}</p>
        {handleIncrement && <Button
            type="primary"
            className={'w-1/2'}
            onClick={() => {
                handleIncrement()
            }}
        >
            +
        </Button>}
    </Space>
}
