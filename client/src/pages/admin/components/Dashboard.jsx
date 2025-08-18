import { Typography, Row, Col, Card, Select, Button } from 'antd';
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    TeamOutlined,
    ShoppingCartOutlined,
    GiftOutlined,
} from '@ant-design/icons';
import { Area, Column } from '@ant-design/charts';

const { Title, Text } = Typography;
const { Option } = Select;

function Dashboard({ token }) {
    // Mock data for statistics
    const stats = {
        customers: {
            count: 3782,
            growth: 11.01,
            isPositive: true,
        },
        orders: {
            count: 5359,
            growth: 9.05,
            isPositive: false,
        },
        revenue: {
            count: 192450000,
            growth: 15.2,
            isPositive: true,
        },
        monthlySales: [
            { month: 'T1', sales: 120 },
            { month: 'T2', sales: 380 },
            { month: 'T3', sales: 190 },
            { month: 'T4', sales: 340 },
            { month: 'T5', sales: 180 },
            { month: 'T6', sales: 190 },
            { month: 'T7', sales: 320 },
            { month: 'T8', sales: 90 },
            { month: 'T9', sales: 190 },
            { month: 'T10', sales: 390 },
            { month: 'T11', sales: 280 },
            { month: 'T12', sales: 100 },
        ],
    };

    // Recent orders
    const recentOrders = [
        { id: 1, customer: 'Nguyễn Văn An', product: 'MacBook Pro M3', amount: 45990000, status: 'Hoàn thành' },
        { id: 2, customer: 'Trần Thị Bình', product: 'Dell XPS 15', amount: 36990000, status: 'Đang xử lý' },
        { id: 3, customer: 'Lê Minh Cường', product: 'Lenovo ThinkPad', amount: 29990000, status: 'Chờ xử lý' },
    ];

    // Area chart data
    const areaData = Array.from({ length: 50 }, (_, i) => ({
        date: `2023-${Math.floor(i / 4) + 1}-${(i % 4) * 7 + 1}`,
        value: Math.floor(Math.random() * 100) + 150,
        category: 'Doanh thu',
    })).concat(
        Array.from({ length: 50 }, (_, i) => ({
            date: `2023-${Math.floor(i / 4) + 1}-${(i % 4) * 7 + 1}`,
            value: Math.floor(Math.random() * 70) + 30,
            category: 'Lợi nhuận',
        })),
    );

    const areaConfig = {
        data: areaData,
        xField: 'date',
        yField: 'value',
        seriesField: 'category',
        color: [token.colorPrimary, token.colorInfo],
        areaStyle: { fillOpacity: 0.7 },
        smooth: true,
        xAxis: { tickCount: 5 },
        yAxis: {
            min: 0,
            tickCount: 5,
        },
        animation: {
            appear: {
                animation: 'path-in',
                duration: 1000,
            },
        },
    };

    return (
        <>
            <div className="mb-8">
                <Title level={3} style={{ margin: 0, fontWeight: 600 }}>
                    Tổng quan
                </Title>
                <Text type="secondary">Chào mừng quay trở lại, Admin</Text>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24} sm={8}>
                    <Card
                        bordered={false}
                        className="overflow-hidden"
                        style={{ borderRadius: 12 }}
                        bodyStyle={{ padding: 20 }}
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{
                                    background: `${token.colorPrimary}15`,
                                }}
                            >
                                <TeamOutlined className="text-xl" style={{ color: token.colorPrimary }} />
                            </div>
                            <div>
                                <div className="text-sm opacity-60">Khách hàng</div>
                                <div className="text-2xl font-bold">
                                    {stats.customers.count.toLocaleString('vi-VN')}
                                </div>
                                <div
                                    className={`text-sm ${
                                        stats.customers.isPositive ? 'text-green-600' : 'text-red-600'
                                    }`}
                                >
                                    {stats.customers.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{' '}
                                    {stats.customers.growth}%
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={8}>
                    <Card
                        bordered={false}
                        className="overflow-hidden"
                        style={{ borderRadius: 12 }}
                        bodyStyle={{ padding: 20 }}
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{
                                    background: `${token.colorError}15`,
                                }}
                            >
                                <ShoppingCartOutlined className="text-xl" style={{ color: token.colorError }} />
                            </div>
                            <div>
                                <div className="text-sm opacity-60">Đơn hàng</div>
                                <div className="text-2xl font-bold">{stats.orders.count.toLocaleString('vi-VN')}</div>
                                <div
                                    className={`text-sm ${stats.orders.isPositive ? 'text-green-600' : 'text-red-600'}`}
                                >
                                    {stats.orders.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{' '}
                                    {stats.orders.growth}%
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={8}>
                    <Card
                        bordered={false}
                        className="overflow-hidden"
                        style={{ borderRadius: 12 }}
                        bodyStyle={{ padding: 20 }}
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{
                                    background: `${token.colorSuccess}15`,
                                }}
                            >
                                <GiftOutlined className="text-xl" style={{ color: token.colorSuccess }} />
                            </div>
                            <div>
                                <div className="text-sm opacity-60">Doanh thu</div>
                                <div className="text-2xl font-bold">
                                    {stats.revenue.count.toLocaleString('vi-VN')} đ
                                </div>
                                <div
                                    className={`text-sm ${
                                        stats.revenue.isPositive ? 'text-green-600' : 'text-red-600'
                                    }`}
                                >
                                    {stats.revenue.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{' '}
                                    {stats.revenue.growth}%
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[24, 24]} className="mt-6">
                <Col xs={24} lg={16}>
                    <Card
                        bordered={false}
                        title="Doanh số theo tháng"
                        className="h-full"
                        style={{ borderRadius: 12 }}
                        extra={
                            <Select defaultValue="year" style={{ width: 140 }} size="middle">
                                <Option value="year">Năm nay</Option>
                                <Option value="month">Tháng này</Option>
                                <Option value="week">Tuần này</Option>
                            </Select>
                        }
                    >
                        <Column
                            data={stats.monthlySales}
                            xField="month"
                            yField="sales"
                            colorField="month"
                            height={300}
                            color={({ month }) => {
                                const colors = [token.colorPrimary, token.colorInfo, token.colorSuccess];
                                return colors[month.charCodeAt(1) % colors.length];
                            }}
                            columnStyle={{
                                radius: [6, 6, 0, 0],
                            }}
                            label={false}
                            xAxis={{
                                label: {
                                    autoRotate: false,
                                },
                            }}
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        bordered={false}
                        title="Đơn hàng gần đây"
                        className="h-full"
                        style={{ borderRadius: 12 }}
                        extra={
                            <Button type="link" className="px-0">
                                Xem tất cả
                            </Button>
                        }
                    >
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="font-medium">
                                            #{order.id} - {order.customer}
                                        </div>
                                        <div className="text-sm opacity-60">{order.product}</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-right">
                                            {order.amount.toLocaleString('vi-VN')} đ
                                        </div>
                                        <div
                                            className={`text-xs text-right ${
                                                order.status === 'Hoàn thành'
                                                    ? 'text-green-600'
                                                    : order.status === 'Đang xử lý'
                                                    ? 'text-blue-600'
                                                    : order.status === 'Đang giao hàng'
                                                    ? 'text-purple-600'
                                                    : 'text-orange-600'
                                            }`}
                                        >
                                            {order.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <Button type="primary" block>
                                Quản lý đơn hàng
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Card
                bordered={false}
                title="Thống kê"
                className="mt-6"
                style={{ borderRadius: 12 }}
                extra={
                    <div className="flex gap-2">
                        <Button type="primary" size="middle">
                            Tháng
                        </Button>
                        <Button size="middle">Quý</Button>
                        <Button size="middle">Năm</Button>
                    </div>
                }
            >
                <div className="mb-2 text-gray-500">Chỉ tiêu theo từng tháng</div>
                <div className="h-80">
                    <Area {...areaConfig} />
                </div>
            </Card>
        </>
    );
}

export default Dashboard;




