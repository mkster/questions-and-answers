import { ExclamationCircleOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth0 } from '@auth0/auth0-react';
import { Menu } from 'antd';
import React, { useState } from 'react';

const { SubMenu } = Menu;

export default function useTopNavigation(onSelectionChange) {
    const [currentSelection, setCurrentSelection] = useState("answer")
    const {isAuthenticated, isLoading } = useAuth0();

    const loggedIn = !isLoading && isAuthenticated

    function handleClick(e) {
        setCurrentSelection(e.key);
        onSelectionChange(e.key)
    };

    const userMenuLoading =
        <SubMenu key="SubMenu" disabled={false} icon={<UserOutlined />}>
            <Menu.Item key="" disabled={true}>Loading</Menu.Item>
        </SubMenu>

    const userMenuLoggedOut = 
        <SubMenu key="SubMenu" disabled={false} icon={<UserOutlined />}>
            <Menu.Item key="login">Login</Menu.Item>
        </SubMenu>

    const userMenuLoggedIn =
        <SubMenu key="SubMenu" disabled={false} icon={<UserOutlined />}>
            <Menu.Item key="userQuestions">Your Questions</Menu.Item>
            <Menu.Item key="logout">Logout</Menu.Item>
        </SubMenu>

    const menuUser = isLoading ? userMenuLoading : !loggedIn ? userMenuLoggedOut : userMenuLoggedIn

    //const { currentSelection } = this.state;
    const TopNavigation = ()=>(
        <Menu onClick={handleClick} selectedKeys={[currentSelection]} theme="dark" mode="horizontal">
            {menuUser}
            <Menu.Item key="ask" style={{ fontSize: '16px'}} icon={<QuestionCircleOutlined />}>
            </Menu.Item>
            <Menu.Item key="answer" icon={<ExclamationCircleOutlined />}>
            </Menu.Item>
        </Menu>
    )
    return [TopNavigation, currentSelection, setCurrentSelection]
}


/*


*/