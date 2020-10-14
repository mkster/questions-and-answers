import { useAuth0 } from '@auth0/auth0-react';
import { Layout } from 'antd';
import React from 'react';
import './App.less';
import QAContent from './components/QAContent';
import QAFooter from './components/QAFooter';
import { QATopNavigation, useTopNavigationState } from './components/QATopNavigation';

const { Header, Footer, Content } = Layout;

export default function App() {
  const [currentNavSelection, setNavCurrentSelection, onMenuClick] = useTopNavigationState(onNavigationChange)
  const {loginWithRedirect, logout } = useAuth0();

  function onQuestionAsked() {
    setNavCurrentSelection('answer');
  }

  function onNavigationChange(newSelection){
    if (newSelection === 'login') {
      loginWithRedirect();
    } else if (newSelection === 'logout') {
      logout();
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header><QATopNavigation currentNavSelection={currentNavSelection} onMenuClick={onMenuClick} /></Header>
      <Content style={{ height: '100%' }}><QAContent navigationSelection={currentNavSelection} onQuestionAsked={onQuestionAsked} /></Content>
      <Footer><QAFooter/></Footer>
    </Layout>
  );
}


