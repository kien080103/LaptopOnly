import { Layout, Button, Badge, Avatar, Dropdown } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

function Header({ collapsed, setCollapsed, token }) {
    const notificationItems = [
        {
            key: '1',
            label: 'Đơn hàng mới #125 từ Nguyễn Văn An',
        },
        {
            key: '2',
            label: 'Đơn hàng #123 đã được giao thành công',
        },
        {
            key: '3',
            label: '5 sản phẩm sắp hết hàng',
        },
    ];

    const userMenuItems = [
        {
            key: '1',
            label: 'Thông tin cá nhân',
        },
        {
            key: '2',
            label: 'Cài đặt',
        },
        {
            key: '3',
            label: 'Đăng xuất',
            danger: true,
        },
    ];

    return (
        <AntHeader
            className="flex items-center justify-between px-6"
            style={{
                background: token.colorBgContainer,
                height: 64,
                borderBottom: `1px solid ${token.colorBorderSecondary}`,
                padding: '0 16px',
            }}
        >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="text-lg"
            />

            <div className="flex items-center gap-6">
                <Dropdown
                    menu={{
                        items: notificationItems,
                    }}
                    placement="bottomRight"
                    arrow
                >
                    <Badge count={3} size="small">
                        <Button
                            type="text"
                            shape="circle"
                            icon={<BellOutlined />}
                            className="flex items-center justify-center text-lg"
                        />
                    </Badge>
                </Dropdown>

                <Dropdown
                    menu={{
                        items: userMenuItems,
                    }}
                    placement="bottomRight"
                >
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Avatar
                            size={32}
                            className="border-2"
                            style={{ borderColor: token.colorPrimary }}
                            icon={<UserOutlined />}
                        />
                        <div>
                            <div className="font-medium text-sm">Admin</div>
                            <div className="text-xs opacity-60">Quản trị viên</div>
                        </div>
                    </div>
                </Dropdown>
            </div>
        </AntHeader>
    );
}

export default Header;




