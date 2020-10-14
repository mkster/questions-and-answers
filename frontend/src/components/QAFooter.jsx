import { GithubOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Link } = Typography;

export default function QAFooter() {
  return (
    <Hoverable>
      <Link href="https://github.com/mkster/questions-and-answers" target="_blank">
        <GithubOutlined /><span> View Code</span>
      </Link>
    </Hoverable>
  );
}

const Hoverable = styled.div`
  width: max-content;
  padding : 3px;
  border-radius : 3px;
  background-color: transparent;
  transition: background-color 0.1s;
  :hover {
    background-color: #dedede;
  }
`