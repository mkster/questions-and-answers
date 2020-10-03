import { GithubOutlined } from '@ant-design/icons';
import { useAuth0 } from "@auth0/auth0-react";
import { Layout, Typography } from 'antd';
import React from 'react';
import './App.less';
import QAContent from './components/QAContent';
import useTopNavigation from './components/useTopNavigation';
const { Header, Footer, Content } = Layout;
const { Link } = Typography;


export default function App() {
  const [TopNavigation, navigationSelection, setNavigationSelection] = useTopNavigation(onSelectionChange)
  const { loginWithRedirect, logout } = useAuth0();

  function onQuestionAsked(){
    setNavigationSelection("answer")
  }

  function onSelectionChange(newSelection){
    if (newSelection === "login"){
      loginWithRedirect();
    } else if (newSelection === "logout"){
      logout();
    }
  }

  return (
    <Layout style={{minHeight: "100vh"}}>
      <Header><TopNavigation /></Header>
      <Content style={{ height: "100%" }}><QAContent navigationSelection={navigationSelection} onQuestionAsked={onQuestionAsked} /></Content>
      <LayoutFooter/>
    </Layout>
  );
}

function LayoutFooter(){
  return (
    <Footer>
      <Link href="https://github.com/mkster" target="_blank">
        <GithubOutlined /> View Code
      </Link>
    </Footer>
  )
}
