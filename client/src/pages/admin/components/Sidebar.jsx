import { Layout, Menu } from 'antd';
import {
    AppstoreOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    TagOutlined,
    LogoutOutlined,
    LaptopOutlined,
    PictureOutlined,
    MessageOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

function Sidebar({ collapsed, token, activeTab, setActiveTab }) {
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="shadow-md h-screen"
            width={240}
            style={{
                background: token.colorBgContainer,
                borderRight: `1px solid ${token.colorBorderSecondary}`,
            }}
        >
            <div
                className="h-16 flex items-center justify-center"
                style={{ borderBottom: `1px solid ${token.colorBorderSecondary}` }}
            >
                <div className="text-xl font-bold flex items-center" style={{ color: token.colorPrimary }}>
                    {!collapsed && (
                        <span className="flex items-center gap-2">
                            <LaptopOutlined /> LapTop Shop
                        </span>
                    )}
                    {collapsed && (
                        <span className="text-2xl">
                            <LaptopOutlined />
                        </span>
                    )}
                </div>
            </div>

            <Menu
                mode="inline"
                defaultSelectedKeys={[activeTab]}
                onClick={(e) => setActiveTab(e.key)}
                style={{
                    border: 'none',
                    padding: '8px',
                }}
                items={[
                    {
                        key: 'website',
                        icon: <PictureOutlined />,
                        label: 'Quản lý website',
                    },
                    {
                        key: 'products',
                        icon: <AppstoreOutlined />,
                        label: 'Quản lý sản phẩm',
                    },
                    {
                        key: 'categories',
                        icon: <TagOutlined />,
                        label: 'Quản lý danh mục',
                    },
                    {
                        key: 'orders',
                        icon: <ShoppingCartOutlined />,
                        label: 'Quản lý đơn hàng',
                    },
                    {
                        key: 'users',
                        icon: <UserOutlined />,
                        label: 'Quản lý người dùng',
                    },
                    {
                        key: 'messages',
                        icon: <MessageOutlined />,
                        label: 'Tin nhắn',
                    },
                ]}
            />

            <div className="absolute bottom-0 left-0 right-0 p-4">
                <Menu
                    mode="inline"
                    style={{ border: 'none' }}
                    items={[
                        {
                            key: 'logout',
                            icon: <LogoutOutlined />,
                            label: 'Đăng xuất',
                            danger: true,
                        },
                    ]}
                />
            </div>
        </Sider>
    );
}

export default Sidebar;
