import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} 搬砖小分队`}
      links={[
        {
          key: '仿掘金首页',
          title: '仿掘金首页',
          href: 'https://juejin.cn/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'juejin',
          title: '稀土掘金',
          href: 'https://juejin.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
