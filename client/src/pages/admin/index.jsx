import { useState } from 'react';
import { Layout, theme } from 'antd';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import CategoryManagement from './components/CategoryManagement';
import OrderManagement from './components/OrderManagement';
import UserManagement from './components/UserManagement';
import WebsiteManagement from './components/ManagerWebsite';
import Messager from './components/Messager/Messager';

const { Content } = Layout;
const { useToken } = theme;

function Admin() {
    const [collapsed, setCollapsed] = useState(false);
    const { token } = useToken();

    // Default route is products management
    const [activeTab, setActiveTab] = useState('website');

    // Render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'website':
                return <WebsiteManagement />;
            case 'products':
                return <ProductManagement />;
            case 'categories':
                return <CategoryManagement />;
            case 'orders':
                return <OrderManagement />;
            case 'users':
                return <UserManagement />;
            case 'messages':
                return <Messager />;
            default:
                return <Dashboard token={token} />;
        }
    };

    return (
        <Layout className="min-h-screen">
            <Sidebar collapsed={collapsed} token={token} activeTab={activeTab} setActiveTab={setActiveTab} />

            <Layout>
                <Header collapsed={collapsed} setCollapsed={setCollapsed} token={token} />

                <Content
                    className="p-4 overflow-y-auto scrollbar-thin h-screen"
                    style={{ background: token.colorBgLayout }}
                >
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
}

export default Admin;
