import { GithubOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';

const { Link } = Typography;

export default function QAFooter() {
  return (
    <Link href="https://github.com/mkster/questions-and-answers" target="_blank">
      <GithubOutlined /><span> View Code</span>
    </Link>
  );
}