import { Table, Card, Button, Input, Space, Tag, Select, Modal, Descriptions, message } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { requestGetPayments, requestUpdateStatusPayment } from '../../../config/request';
import moment from 'moment';

const { Option } = Select;

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchOrders = async () => {
        const res = await requestGetPayments();
        const sortedOrders = res.metadata.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setOrders(sortedOrders);
        setOrders(res.metadata);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleChangeStatus = async (id, newStatus) => {
        try {
            const data = {
                idPayment: id,
                status: newStatus,
            };
            await requestUpdateStatusPayment(data);
            message.success('Cập nhật trạng thái thành công');
            fetchOrders();
        } catch (error) {
            message.error('Cập nhật trạng thái thất bại');
        }
    };
    const printBill = (order) => {
        const printWindow = window.open('', '_blank');

        printWindow.document.write(`
    <html>
    <head>
        <title>Hóa đơn bán hàng</title>
        <style>
            body {
                font-family: Arial, Helvetica, sans-serif;
                background: #f4f6f8;
                padding: 20px;
                color: #333;
            }
            .invoice {
                max-width: 800px;
                margin: auto;
                background: #fff;
                padding: 24px;
                border-radius: 10px;
            }
            h1 {
                text-align: center;
                color: #e53935;
                margin-bottom: 4px;
            }
            .sub-title {
                text-align: center;
                font-size: 14px;
                color: #666;
                margin-bottom: 20px;
            }
            .section {
                margin-bottom: 24px;
            }
            .section-title {
                font-weight: bold;
                font-size: 16px;
                margin-bottom: 12px;
                border-left: 4px solid #e53935;
                padding-left: 8px;
            }
            .info-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px 20px;
                font-size: 14px;
            }
            .info-grid span {
                font-weight: 600;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            table th, table td {
                border-bottom: 1px solid #eaeaea;
                padding: 10px;
                text-align: left;
                font-size: 14px;
            }
            table th {
                background: #f8f9fa;
            }
            .product-img {
                width: 60px;
                height: 60px;
                object-fit: contain;
                border: 1px solid #ddd;
                border-radius: 6px;
            }
            .total {
                text-align: right;
                font-size: 18px;
                font-weight: bold;
                color: #e53935;
                margin-top: 16px;
            }
            .footer {
                text-align: center;
                margin-top: 32px;
                font-size: 14px;
                color: #555;
            }
        </style>
    </head>

    <body>
        <div class="invoice">
            <h1>HÓA ĐƠN BÁN HÀNG</h1>
            <div class="sub-title">Website Bán Laptop Only</div>

            <!-- Thông tin đơn hàng -->
            <div class="section">
                <div class="section-title">Thông tin đơn hàng</div>
                <div class="info-grid">
                    <div><span>Mã đơn:</span> ${order.idPayment}</div>
                    <div><span>Ngày đặt:</span> ${moment(order.createdAt).format('DD/MM/YYYY HH:mm')}</div>
                    <div><span>Trạng thái:</span> ${order.status}</div>
                    <div><span>Thanh toán:</span> ${order.typePayment}</div>
                </div>
            </div>

            <!-- Thông tin nhận hàng -->
            <div class="section">
                <div class="section-title">Thông tin nhận hàng</div>
                <div class="info-grid">
                    <div><span>Họ tên:</span> ${order.fullName}</div>
                    <div><span>SĐT:</span> ${order.phoneNumber}</div>
                    <div><span>Email:</span> ${order.email}</div>
                    <div><span>Địa chỉ:</span> ${order.address}</div>
                </div>
            </div>

            <!-- Danh sách sản phẩm -->
            <div class="section">
                <div class="section-title">Sản phẩm</div>
                <table>
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>SL</th>
                            <th>Đơn giá</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items
                            .map(
                                (item) => `
                                <tr>
                                    <td>
                                        <img
                                            src="${import.meta.env.VITE_URL_IMAGE}/uploads/products/${
                                    item.product.imagesProduct.split(',')[0]
                                }"
                                            class="product-img"
                                        />
                                    </td>
                                    <td>${item.product.nameProduct}</td>
                                    <td>${item.quantity}</td>
                                    <td>${item.price.toLocaleString('vi-VN')}đ</td>
                                    <td>${(item.price * item.quantity).toLocaleString('vi-VN')}đ</td>
                                </tr>
                            `,
                            )
                            .join('')}
                    </tbody>
                </table>

                <div class="total">
                    Tổng cộng: ${order.totalPrice.toLocaleString('vi-VN')} đ
                </div>
            </div>

            <div class="footer">
                Cảm ơn quý khách đã mua hàng ❤️<br/>
                Hẹn gặp lại!
            </div>
        </div>
    </body>
    </html>
    `);

        printWindow.document.close();
        printWindow.print();
    };

    const statusMap = {
        success: { text: 'Đã giao hàng', color: 'green' },
        confirm: { text: 'Đang xử lý', color: 'blue' },
        shipping: { text: 'Đang giao hàng', color: 'cyan' },
        pending: { text: 'Chờ xử lý', color: 'orange' },
        failed: { text: 'Đã hủy', color: 'red' },
    };

    const statusTextMap = {
        pending: 'Chờ xử lý',
        confirm: 'Đang xử lý',
        shipping: 'Đang giao hàng',
        success: 'Hoàn thành',
        failed: 'Hủy',
    };

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'idPayment',
            key: 'idPayment',
            render: (idPayment) => <a>#{idPayment}</a>,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'items',
            key: 'items',
            render: (items) => items.map((item) => item?.product?.nameProduct).join(', '),
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (createdAt) => moment(createdAt).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            render: (totalPrice) => `${totalPrice.toLocaleString('vi-VN')}đ`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const item = statusMap[status] || { text: 'Không xác định', color: 'gray' };
                return <Tag color={item.color}>{item.text}</Tag>;
            },
            filters: Object.keys(statusMap).map((key) => ({
                text: statusMap[key].text,
                value: key,
            })),
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => {
                const statusFlow = ['pending', 'confirm', 'shipping', 'success'];
                const currentIndex = statusFlow.indexOf(record.status);

                // Các trạng thái tiếp theo có thể chọn
                let nextStatuses = statusFlow.slice(currentIndex + 1);
                if (record.status !== 'success' && record.status !== 'failed') {
                    nextStatuses.push('failed');
                }

                return (
                    <Space size="middle">
                        <Button
                            type="primary"
                            icon={<EyeOutlined />}
                            size="small"
                            onClick={() => {
                                setSelectedOrder(record);
                                setModalVisible(true);
                            }}
                        >
                            Chi tiết
                        </Button>

                        {record.status !== 'success' && record.status !== 'failed' && (
                            <Select
                                labelInValue
                                value={{ value: record.status, label: statusTextMap[record.status] }} // hiển thị tiếng Việt
                                style={{ width: 140 }}
                                size="small"
                                onChange={(option) => handleChangeStatus(record.idPayment, option.value)} // option.value là key gốc
                            >
                                {nextStatuses.map((status) => (
                                    <Select.Option key={status} value={status}>
                                        {statusTextMap[status]}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    </Space>
                );
            },
        },
    ];

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <div className="text-2xl font-bold">Quản lý đơn hàng</div>
                <Input placeholder="Tìm kiếm đơn hàng" prefix={<SearchOutlined />} style={{ width: 250 }} />
            </div>

            <Card bordered={false} style={{ borderRadius: 12 }}>
                <Table dataSource={orders} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} />
            </Card>

            <Modal
                title={`Chi tiết đơn hàng #${selectedOrder?.idPayment}`}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={800}
            >
                {selectedOrder && (
                    <>
                        <Descriptions bordered column={2} size="middle" className="mb-4">
                            <Descriptions.Item label="Khách hàng">{selectedOrder.fullName}</Descriptions.Item>
                            <Descriptions.Item label="Ngày đặt">
                                {moment(selectedOrder.createdAt).format('DD/MM/YYYY HH:mm')}
                            </Descriptions.Item>
                            <Descriptions.Item label="Tổng tiền">
                                {selectedOrder.totalPrice.toLocaleString('vi-VN')}đ
                            </Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">
                                <Tag color={statusMap[selectedOrder.status]?.color}>
                                    {statusMap[selectedOrder.status]?.text}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Số lượng">
                                {selectedOrder.items.reduce((acc, item) => acc + item.quantity, 0)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Địa chỉ">{selectedOrder.address}</Descriptions.Item>
                        </Descriptions>

                        <Table
                            dataSource={selectedOrder.items}
                            rowKey={(item) => item.product?.id}
                            pagination={false}
                            size="small"
                            columns={[
                                { title: 'Sản phẩm', dataIndex: ['product', 'nameProduct'], key: 'productName' },
                                {
                                    title: 'Hình ảnh',
                                    dataIndex: ['product', 'imagesProduct'],
                                    key: 'imagesProduct',
                                    render: (imagesProduct) => (
                                        <img
                                            className="w-15 h-15 object-cover rounded-md"
                                            src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${
                                                imagesProduct.split(',')[0]
                                            }`}
                                            alt="Hình ảnh"
                                        />
                                    ),
                                },
                                { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
                                {
                                    title: 'Đơn giá',
                                    dataIndex: 'price',
                                    key: 'price',
                                    render: (price) => `${price.toLocaleString('vi-VN')}đ`,
                                },
                                {
                                    title: 'Thành tiền',
                                    key: 'total',
                                    render: (_, item) => `${(item.price * item.quantity).toLocaleString('vi-VN')}đ`,
                                },
                                {
                                    //buton printBill
                                    title: 'In hóa đơn',
                                    key: 'print',
                                    render: (_, __, index) => {
                                        const rowSpan = index === 0 ? selectedOrder.items.length : 0;

                                        return {
                                            children: (
                                                <Button
                                                    type="default"
                                                    size="small"
                                                    onClick={() => printBill(selectedOrder)}
                                                    disabled={selectedOrder.status !== 'success'}
                                                >
                                                    In hóa đơn
                                                </Button>
                                            ),
                                            props: {
                                                rowSpan,
                                            },
                                        };
                                    },
                                },
                            ]}
                        />
                    </>
                )}
            </Modal>
        </>
    );
}

export default OrderManagement;
