import {Button, Space} from "antd";

export const Counter = ({total, handleDecrement, handleIncrement}) => {
    return <Space className={'flex flex-row justify-between'}>
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
