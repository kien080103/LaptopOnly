import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { requestCreateCart, requestGetProductById } from '../config/request';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Image, Tabs, Rate, Button, InputNumber, Tag, Divider, Skeleton, Carousel, Badge, message } from 'antd';
import { ShoppingCart, Heart, Check, Shield, RotateCcw, Truck, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import CardBody from '../components/CardBody';
import { useStore } from '../hooks/useStore';

function DetailProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('1');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [productRelate, setProductRelate] = useState([]);

    const carouselRef = useRef(null);

    const { fetchCart } = useStore();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await requestGetProductById(id);
                setProduct(res.metadata.product);
                setProductRelate(res.metadata.productRelate);
                document.title = res.metadata.product.nameProduct;
                carouselRef.current.scrollIntoView({ behavior: 'smooth' });
            } catch (error) {
                console.error('Error fetching product:', error);
                message.error('Không thể tải thông tin sản phẩm');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const renderImages = () => {
        if (!product || loading) {
            return <Skeleton.Image className="w-full h-[500px] rounded-lg" active />;
        }

        const imageUrls = product.imagesProduct
            .split(', ')
            .map((img) => `${import.meta.env.VITE_API_URL}/uploads/products/${img}`);

        return (
            <div className="sticky top-[100px] pb-8">
                <div className="mb-4 relative overflow-hidden rounded-xl">
                    <Image
                        src={imageUrls[selectedImageIndex]}
                        alt={product.nameProduct}
                        className="w-full object-contain rounded-lg"
                        height={400}
                        preview={{
                            toolbarRender: () => null,
                            maskClassName: 'backdrop-blur-sm bg-black/70',
                        }}
                    />
                    {product.discountProduct > 0 && (
                        <div className="absolute top-4 left-4 z-10">
                            <Badge.Ribbon
                                text={`Giảm ${product.discountProduct}%`}
                                color="red"
                                className="text-sm font-bold"
                            />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-5 gap-2 mt-4">
                    {imageUrls.map((url, index) => (
                        <div
                            key={index}
                            className={`cursor-pointer border-2 ${
                                selectedImageIndex === index ? 'border-red-500' : 'border-gray-200'
                            } rounded-lg overflow-hidden transition-all duration-200 ${
                                selectedImageIndex === index ? 'shadow-md' : 'hover:shadow-md'
                            }`}
                            onClick={() => setSelectedImageIndex(index)}
                        >
                            <img
                                src={url}
                                alt={`${product.nameProduct} - ${index + 1}`}
                                className="w-full h-20 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const navigate = useNavigate();

    const handleAddToCart = async (type) => {
        const data = {
            productId: product.id,
            quantity: quantity,
        };
        try {
            await requestCreateCart(data);
            await fetchCart();
            message.success('Thêm vào giỏ hàng thành công');
            if (type === 'buy') {
                navigate('/cart');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const finalPrice = product
        ? product.discountProduct > 0
            ? product.priceProduct * (1 - product.discountProduct / 100)
            : product.priceProduct
        : 0;

    return (
        <div className="min-h-screen bg-gray-50" ref={carouselRef}>
            <header>
                <Header />
            </header>

            <main className="w-[70%] mx-auto pt-[90px] mb-10">
                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                        <Skeleton active paragraph={{ rows: 12 }} />
                        <Skeleton active paragraph={{ rows: 12 }} />
                    </div>
                ) : product ? (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                            <div>{renderImages()}</div>

                            {/* Right Column - Product Info */}
                            <div className="flex flex-col">
                                {/* Title & Rating */}
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800 leading-tight">
                                        {product.nameProduct}
                                    </h1>
                                    <div className="flex items-center mt-2">
                                        <Rate disabled defaultValue={4.5} allowHalf className="text-sm" />
                                        <span className="text-gray-500 ml-2 text-sm">4.5 (120 đánh giá)</span>
                                        <div className="ml-4 flex items-center">
                                            <span className="text-sm text-blue-600 font-medium">Đã bán: 256</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 bg-gray-50 pt-4 pb-2 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-red-600">
                                            Giá : {finalPrice.toLocaleString()}₫
                                        </span>
                                        {product.discountProduct > 0 && (
                                            <span className="text-gray-500 text-lg line-through ml-3">
                                                Giá gốc: {product.priceProduct.toLocaleString()}₫
                                            </span>
                                        )}

                                        {product.discountProduct > 0 && (
                                            <div className="flex items-center">
                                                <span className="bg-red-100 text-red-700 text-sm px-2 py-0.5 rounded font-medium">
                                                    Tiết kiệm {((product.priceProduct - finalPrice) / 1000).toFixed(0)}K
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>{' '}
                                <div className="mr-4 flex items-center gap-2">
                                    <span className="block text-sm text-gray-600 mb-1">Số lượng</span>
                                    <InputNumber
                                        min={1}
                                        max={product.stockProduct}
                                        value={quantity}
                                        onChange={setQuantity}
                                        className="w-20"
                                        disabled={product.stockProduct === 0}
                                    />
                                </div>
                                {/* Stock Status */}
                                <div className="mt-4 flex items-center">
                                    <div className="mr-4 flex items-center">
                                        <span className="font-medium text-gray-700 mr-2 ">Tình trạng:</span>
                                        {product.stockProduct > 0 ? (
                                            <Tag color="success" className="flex items-center text-sm">
                                                <span>Còn hàng ({product.stockProduct}) sản phẩm</span>
                                            </Tag>
                                        ) : (
                                            <Tag color="error" className="text-sm">
                                                Hết hàng
                                            </Tag>
                                        )}
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-medium text-gray-700 mr-2">Bảo hành:</span>
                                        <Tag color="processing" className="text-sm">
                                            12 tháng
                                        </Tag>
                                    </div>
                                </div>
                                {/* Buy Options */}
                                <div className="mt-6 flex items-center">
                                    <div className="flex-1">
                                        <Button
                                            type="primary"
                                            danger
                                            size="large"
                                            className="flex items-center justify-center h-[50px] bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold w-full shadow-md hover:shadow-lg transition-all"
                                            icon={<ShoppingCart className="mr-2" />}
                                            disabled={product.stockProduct === 0}
                                            onClick={() => handleAddToCart('add')}
                                        >
                                            THÊM VÀO GIỎ HÀNG
                                        </Button>
                                        <Button
                                            type="default"
                                            size="large"
                                            className="mt-3 flex items-center justify-center h-[50px] border-blue-500 hover:border-blue-700 text-blue-600 hover:text-blue-700 font-bold w-full"
                                            disabled={product.stockProduct === 0}
                                            onClick={() => handleAddToCart('buy')}
                                        >
                                            MUA NGAY
                                        </Button>
                                    </div>
                                </div>
                                {/* Benefits */}
                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <Shield className="text-blue-500 mr-3 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-medium text-gray-800">Bảo hành chính hãng</h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                12 tháng tại trung tâm bảo hành chính hãng
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <Truck className="text-green-500 mr-3 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-medium text-gray-800">Giao hàng miễn phí</h4>
                                            <p className="text-xs text-gray-500 mt-1">Với đơn hàng trên 800.000đ</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <RotateCcw className="text-orange-500 mr-3 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-medium text-gray-800">Đổi trả dễ dàng</h4>
                                            <p className="text-xs text-gray-500 mt-1">Trong vòng 7 ngày đầu tiên</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <Check className="text-purple-500 mr-3 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-medium text-gray-800">Sản phẩm chính hãng</h4>
                                            <p className="text-xs text-gray-500 mt-1">100% hàng chính hãng, an toàn</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Tabs */}
                        <div className="mt-12">
                            <Tabs
                                defaultActiveKey="1"
                                onChange={setActiveTab}
                                items={[
                                    {
                                        key: '1',
                                        label: 'Thông số kỹ thuật',
                                        children: (
                                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                                <h3 className="text-xl font-bold mb-6 text-gray-800">
                                                    Thông số kỹ thuật {product.nameProduct}
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
                                                    {product.specsProduct &&
                                                        product.specsProduct.map((spec, index) => (
                                                            <div
                                                                key={index}
                                                                className={`flex py-3 px-4 ${
                                                                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                                                }`}
                                                            >
                                                                <div className="w-1/3 font-medium text-gray-700">
                                                                    {spec.label}
                                                                </div>
                                                                <div className="w-2/3 text-gray-800">{spec.value}</div>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        key: '2',
                                        label: 'Mô tả sản phẩm',
                                        children: (
                                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                                <h3 className="text-xl font-bold mb-6 text-gray-800">
                                                    Giới thiệu {product.nameProduct}
                                                </h3>
                                                <div className="prose max-w-none text-gray-700">
                                                    <p className="text-base leading-relaxed">
                                                        {product.descriptionProduct}
                                                    </p>

                                                    <div className="mt-8 space-y-4">
                                                        <h4 className="text-lg font-semibold">
                                                            Hiệu năng mạnh mẽ cho công việc và giải trí
                                                        </h4>
                                                        <p>
                                                            Laptop Gaming ASUS TUF 16 2025 được trang bị bộ vi xử lý
                                                            Intel Core 5 210H với 8 lõi và 12 luồng, đem lại hiệu năng
                                                            ấn tượng cho mọi tác vụ từ làm việc văn phòng đến chơi game.
                                                        </p>

                                                        <h4 className="text-lg font-semibold">
                                                            Đồ họa sống động với NVIDIA GeForce RTX 4050
                                                        </h4>
                                                        <p>
                                                            Card đồ họa NVIDIA GeForce RTX 4050 6GB GDDR6 cho phép bạn
                                                            trải nghiệm các tựa game AAA mới nhất với đồ họa chất lượng
                                                            cao và khả năng ray-tracing.
                                                        </p>

                                                        <h4 className="text-lg font-semibold">
                                                            Màn hình 16 inch sắc nét
                                                        </h4>
                                                        <p>
                                                            Trải nghiệm hình ảnh sắc nét trên màn hình 16 inch độ phân
                                                            giải FullHD+ (1920 x 1200) với tần số quét cao, mang lại
                                                            trải nghiệm gaming mượt mà.
                                                        </p>

                                                        <div className="mt-4">
                                                            <img
                                                                src={`${
                                                                    import.meta.env.VITE_API_URL
                                                                }/uploads/products/${
                                                                    product.imagesProduct.split(', ')[0]
                                                                }`}
                                                                alt={product.nameProduct}
                                                                className="w-full rounded-lg"
                                                            />
                                                        </div>

                                                        <h4 className="text-lg font-semibold">
                                                            Thiết kế bền bỉ, tản nhiệt hiệu quả
                                                        </h4>
                                                        <p>
                                                            Thiết kế đạt chuẩn quân đội MIL-STD-810H với hệ thống tản
                                                            nhiệt thông minh, đảm bảo hiệu suất ổn định trong thời gian
                                                            dài.
                                                        </p>

                                                        <h4 className="text-lg font-semibold">Đa dạng cổng kết nối</h4>
                                                        <p>
                                                            Trang bị đầy đủ các cổng kết nối hiện đại như Thunderbolt 4,
                                                            HDMI 2.1, USB 3.2, cùng nhiều cổng khác đáp ứng mọi nhu cầu
                                                            sử dụng.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        key: '3',
                                        label: 'Đánh giá',
                                        children: (
                                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                                <div className="flex flex-col md:flex-row gap-8">
                                                    <div className="md:w-1/3 border-r pr-8">
                                                        <div className="text-center">
                                                            <h3 className="text-3xl font-bold text-gray-800">4.5</h3>
                                                            <Rate disabled defaultValue={4.5} allowHalf />
                                                            <p className="mt-2 text-gray-500">Dựa trên 120 đánh giá</p>
                                                        </div>

                                                        <div className="mt-6 space-y-2">
                                                            <div className="flex items-center">
                                                                <span className="w-8 text-xs">5★</span>
                                                                <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2">
                                                                    <div
                                                                        className="bg-yellow-400 h-2.5 rounded-full"
                                                                        style={{ width: '75%' }}
                                                                    ></div>
                                                                </div>
                                                                <span className="text-xs">75%</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <span className="w-8 text-xs">4★</span>
                                                                <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2">
                                                                    <div
                                                                        className="bg-yellow-400 h-2.5 rounded-full"
                                                                        style={{ width: '15%' }}
                                                                    ></div>
                                                                </div>
                                                                <span className="text-xs">15%</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <span className="w-8 text-xs">3★</span>
                                                                <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2">
                                                                    <div
                                                                        className="bg-yellow-400 h-2.5 rounded-full"
                                                                        style={{ width: '5%' }}
                                                                    ></div>
                                                                </div>
                                                                <span className="text-xs">5%</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <span className="w-8 text-xs">2★</span>
                                                                <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2">
                                                                    <div
                                                                        className="bg-yellow-400 h-2.5 rounded-full"
                                                                        style={{ width: '3%' }}
                                                                    ></div>
                                                                </div>
                                                                <span className="text-xs">3%</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <span className="w-8 text-xs">1★</span>
                                                                <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-2">
                                                                    <div
                                                                        className="bg-yellow-400 h-2.5 rounded-full"
                                                                        style={{ width: '2%' }}
                                                                    ></div>
                                                                </div>
                                                                <span className="text-xs">2%</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="md:w-2/3">
                                                        <div className="mb-6">
                                                            <Button type="primary" size="large" className="bg-blue-500">
                                                                Viết đánh giá
                                                            </Button>
                                                        </div>

                                                        <div className="space-y-6">
                                                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center">
                                                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold mr-3">
                                                                            N
                                                                        </div>
                                                                        <div>
                                                                            <h4 className="font-medium">
                                                                                Nguyễn Văn A
                                                                            </h4>
                                                                            <div className="flex items-center mt-1">
                                                                                <Rate
                                                                                    disabled
                                                                                    defaultValue={5}
                                                                                    className="text-xs"
                                                                                />
                                                                                <span className="text-xs text-gray-500 ml-2">
                                                                                    2 tháng trước
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <Tag color="blue">Đã mua hàng</Tag>
                                                                    </div>
                                                                </div>
                                                                <p className="mt-3 text-gray-700">
                                                                    "Sản phẩm rất tốt, mọi thứ đều hoàn hảo. Hiệu năng
                                                                    máy mạnh, chơi game mượt, thiết kế cũng rất đẹp.
                                                                    Giao hàng nhanh, đóng gói cẩn thận."
                                                                </p>
                                                            </div>

                                                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center">
                                                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold mr-3">
                                                                            T
                                                                        </div>
                                                                        <div>
                                                                            <h4 className="font-medium">Trần Văn B</h4>
                                                                            <div className="flex items-center mt-1">
                                                                                <Rate
                                                                                    disabled
                                                                                    defaultValue={4}
                                                                                    className="text-xs"
                                                                                />
                                                                                <span className="text-xs text-gray-500 ml-2">
                                                                                    1 tháng trước
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <Tag color="blue">Đã mua hàng</Tag>
                                                                    </div>
                                                                </div>
                                                                <p className="mt-3 text-gray-700">
                                                                    "Laptop chạy rất mượt, hiệu năng tốt. Pin dùng được
                                                                    khoảng 4-5 giờ với các tác vụ văn phòng. Chơi game
                                                                    cũng khá ổn. Chỉ có điểm trừ là hơi nóng khi chơi
                                                                    game nặng."
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="mt-6 flex justify-center">
                                                            <Button type="default">Xem thêm đánh giá</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                    },
                                ]}
                            />
                        </div>

                        {/* Related Products */}
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold text-gray-800">Sản phẩm cùng hãng</h2>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                                {productRelate
                                    .filter((item) => item.id !== product.id)
                                    .map((item) => (
                                        <div key={item.id}>
                                            <Link to={`/product/${item.id}`}>
                                                <CardBody data={item} />
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Không tìm thấy sản phẩm</h3>
                            <p className="text-gray-500">Sản phẩm không tồn tại hoặc đã bị xóa</p>
                        </div>
                        <Button type="primary" className="mt-6 bg-blue-500">
                            <a href="/">Quay lại trang chủ</a>
                        </Button>
                    </div>
                )}
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default DetailProduct;
