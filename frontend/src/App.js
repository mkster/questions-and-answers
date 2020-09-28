import { useAuth0 } from "@auth0/auth0-react";
import { Layout } from 'antd';
import React, { useEffect } from 'react';
import './App.less';
import QAContent from './Components/QAContent';
import useTopNavigation from './Components/useTopNavigation';
const { Header, Footer, Content } = Layout;

//Alt + Shift + O - organise imports

export default function App() {
  const [TopNavigation, navigationSelection, setNavigationSelection] = useTopNavigation()
  const { loginWithRedirect, logout } = useAuth0();

  function onQuestionAsked(){
    setNavigationSelection("answer")
  }

  useEffect(()=>{
    if (navigationSelection === "login"){
      loginWithRedirect();
    } else if (navigationSelection === "logout"){
      logout();
    }
  }, [navigationSelection])

  return (
    <Layout style={{minHeight: "100vh"}}>
      <Header><TopNavigation /></Header>
      <Content style={{ height: "100%" }}><QAContent navigationSelection={navigationSelection} onQuestionAsked={onQuestionAsked} /></Content>
      <Footer></Footer>
    </Layout>
  );
}

/*
function useInterval(func, t=10){
  let interval;
  useEffect(()=>{
    interval = setInterval(func, t);
    return () => { clearInterval(interval);}
  }, [])

  return interval
}
*/
