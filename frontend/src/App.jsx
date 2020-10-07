import { useAuth0 } from '@auth0/auth0-react';
import { Layout } from 'antd';
import React from 'react';
import './App.less';
import QAContent from './components/QAContent';
import QAFooter from './components/QAFooter';
import useTopNavigation from './components/useTopNavigation';

const { Header, Footer, Content } = Layout;

export default function App() {
  const { loginWithRedirect, logout } = useAuth0();
  function onSelectionChange(newSelection) {
    if (newSelection === 'login') {
      loginWithRedirect();
    } else if (newSelection === 'logout') {
      logout();
    }
  }

  const [
    TopNavigation,
    navigationSelection,
    setNavigationSelection,
  ] = useTopNavigation(onSelectionChange);

  function onQuestionAsked() {
    setNavigationSelection('answer');
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header><TopNavigation /></Header>
      <Content style={{ height: '100%' }}><QAContent navigationSelection={navigationSelection} onQuestionAsked={onQuestionAsked} /></Content>
      <Footer><QAFooter/></Footer>
    </Layout>
  );
}


