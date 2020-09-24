import { ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';

const { SubMenu } = Menu;

export default function useTopNavigation() {

    const [currentSelection, setCurrentSelection] = useState("answer")

    function handleClick(e) {
        setCurrentSelection(e.key);
    };

    //const { currentSelection } = this.state;
    const TopNavigation = ()=>(
        <Menu onClick={handleClick} selectedKeys={[currentSelection]} theme="dark" mode="horizontal">
            <Menu.Item key="ask" icon={<QuestionCircleOutlined />}>
                Ask
            </Menu.Item>
            <Menu.Item key="answer" icon={<ExclamationCircleOutlined />}>
                Answer
            </Menu.Item>
        </Menu>
    )
    return [TopNavigation, currentSelection, setCurrentSelection]
}


/*
<SubMenu key="SubMenu" disabled={true} icon={<UserOutlined />}>
                <Menu.Item key="setting:1">Your Questions</Menu.Item>
                <Menu.Item key="setting:2">Your Answers</Menu.Item>
            </SubMenu>

*/