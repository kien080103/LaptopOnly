import img1 from '../assets/images/fs1.webp';
import img2 from '../assets/images/fs2.webp';
import img3 from '../assets/images/fs3.webp';
import img4 from '../assets/images/fs4.webp';
import img5 from '../assets/images/fs5.webp';
import Slider from 'react-slick';

import img6 from '../assets/images/img1.gif';

// Dữ liệu sản phẩm
const products = [
    {
        id: 1,
        name: 'Laptop HP 245 G10 BG5U8PT',
        cpu: 'R7-7730U',
        gpu: 'AMD Radeon',
        ram: '16GB',
        storage: '512GB',
        size: '14"',
        price: 13040000,
        oldPrice: 19990000,
        sold: '0/5 suất',
        img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_744_1_19.png',
    },
    {
        id: 2,
        name: 'Laptop Dell Inspiron 15 3520 JYM17 - Nhập khẩu chính hãng',
        cpu: 'i3-1215U',
        gpu: 'Intel UHD',
        ram: '8GB',
        storage: '512GB',
        size: '15.6"',
        price: 8450000,
        oldPrice: 12290000,
        sold: '0/5 suất',
        img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_744_1_19.png',
    },
    {
        id: 3,
        name: 'Laptop MSI Cyborg 15 A12UCX-618VN',
        cpu: 'i5-12450H',
        gpu: 'RTX 2050',
        ram: '16GB',
        storage: '512GB',
        size: '15.6"',
        price: 14840000,
        oldPrice: 19990000,
        sold: '1/5 suất',
        img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_744_1_19.png',
    },
    {
        id: 4,
        name: 'Laptop MSI Gaming Thin 15 B13UC-1411VN V2',
        cpu: 'i7-13620H',
        gpu: 'RTX 3050',
        ram: '24GB',
        storage: '512GB',
        size: '15.6"',
        price: 18350000,
        oldPrice: 20990000,
        sold: '2/5 suất',
        img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_744_1_19.png',
    },
    {
        id: 5,
        name: 'Laptop Lenovo IdeaPad Slim 3 15ABR8 82XM00MCVN',
        cpu: 'R7-5825U',
        gpu: 'AMD Radeon',
        ram: '16GB',
        storage: '512GB',
        size: '15.6"',
        price: 13040000,
        oldPrice: 16190000,
        sold: '0/5 suất',
        img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_744_1_19.png',
    },
    {
        id: 5,
        name: 'Laptop Lenovo IdeaPad Slim 3 15ABR8 82XM00MCVN',
        cpu: 'R7-5825U',
        gpu: 'AMD Radeon',
        ram: '16GB',
        storage: '512GB',
        size: '15.6"',
        price: 13040000,
        oldPrice: 16190000,
        sold: '0/5 suất',
        img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_744_1_19.png',
    },
    {
        id: 5,
        name: 'Laptop Lenovo IdeaPad Slim 3 15ABR8 82XM00MCVN',
        cpu: 'R7-5825U',
        gpu: 'AMD Radeon',
        ram: '16GB',
        storage: '512GB',
        size: '15.6"',
        price: 13040000,
        oldPrice: 16190000,
        sold: '0/5 suất',
        img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_744_1_19.png',
    },
    {
        id: 5,
        name: 'Laptop Lenovo IdeaPad Slim 3 15ABR8 82XM00MCVN',
        cpu: 'R7-5825U',
        gpu: 'AMD Radeon',
        ram: '16GB',
        storage: '512GB',
        size: '15.6"',
        price: 13040000,
        oldPrice: 16190000,
        sold: '0/5 suất',
        img: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_744_1_19.png',
    },
];

function FlashSale() {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div>
            <img src={img6} alt="" className="w-[100%] mx-auto  object-cover rounded-lg mb-20" />
            {/* Banner trên */}
            <div className="relative">
                <img className="w-full h-[70px]" src={img1} alt="" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/1">
                    <img className="w-[250px] h-[70px]" src={img2} alt="" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-2xl">
                        Flash Sale
                    </span>
                </div>
            </div>

            {/* Ảnh 5 + Ảnh 3 và Ảnh 4 */}
            <div className="relative mt-2">
                <img src={img5} alt="" className="w-full" />

                {/* Ảnh 3 góc trái trên */}
                <img src={img3} alt="" className="absolute top-0 left-0 h-[70px] w-auto" />

                {/* Ảnh 4 góc phải trên */}
                <img src={img4} alt="" className="absolute top-0 right-0 h-[70px] w-auto" />

                {/* Slider sản phẩm */}
                <div className="absolute top-[70px] left-0 right-0 px-4">
                    <Slider {...settings}>
                        {products.map((p) => (
                            <div key={p.id} className="px-2">
                                <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
                                    <img src={p.img} alt={p.name} className="w-full h-[180px] object-contain" />
                                    <div className="p-2 text-sm">
                                        <p className="text-red-600 font-semibold">
                                            {p.cpu} / {p.gpu}
                                        </p>
                                        <p className="text-gray-600">
                                            {p.ram} {p.storage} {p.size} Full HD
                                        </p>
                                        <p className="mt-1 font-medium">{p.name}</p>
                                        <div className="mt-2">
                                            <span className="text-red-600 font-bold">{p.price.toLocaleString()}đ</span>
                                            <span className="text-gray-400 text-xs line-through ml-2">
                                                {p.oldPrice.toLocaleString()}đ
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-xs mt-1">Đã bán {p.sold}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default FlashSale;
