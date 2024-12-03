import React, { useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Import pages (Task Dashboard and Filter Tasks)
import TaskDashboard from './TaskDashboard'; // Task Dashboard page
import FilterTasks from './FilterTasks'; // Filter Tasks page

const { Header, Sider, Content } = Layout;

const Filter: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sider with fixed position */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          position: 'fixed', // Fix the sidebar to the left
          top: 0,  // Make sure it's aligned at the top
          left: 0,  // Position it on the left side
          bottom: 0, // Ensure it spans the entire height
          height: '100vh',  // Full height of the viewport
          zIndex: 10, // Make sure it's above other content
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: collapsed ? '16px' : '20px',
            textAlign: 'center',
            padding: '16px 0',
            fontWeight: 'bold',
            
          }}
        >
          Task Manager
        </div>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/tasks/dashboard">Task Dashboard</Link> 
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/tasks/filter">Your Tasks</Link> 
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main layout */}
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        {/* Header */}
        <Header style={{ padding: 0, background: '#001529' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined style={{ color: '#FFFFFF' }} /> : <MenuFoldOutlined style={{ color: '#FFFFFF' }} />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>

        {/* Content */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            backgroundColor: '#FFFFFF', // Purple background color
            borderRadius: borderRadiusLG,
          }}
        >
          <FilterTasks />
        </Content>
      </Layout>
    </Layout>
  );
};



export default Filter;
