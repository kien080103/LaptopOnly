import { useEffect } from 'react';
import './App.css';
import Banner from './components/Banner';
import Category from './components/Category';
import FlashSale from './components/FlashSale';
import Header from './components/Header';
import BrandBanner from './components/BrandBanner';
import Blog from './components/Blog';
import BrandBanner2 from './components/BrandBanner2';
import Footer from './components/Footer';
import { useStore } from './hooks/useStore';

function App() {
    useEffect(() => {
        document.title = 'Trang chủ';
    }, []);

    const { categories } = useStore();

    return (
        <div>
            <header>
                <Header />
            </header>

            <main className="w-[80%] mx-auto mt-[70px] mb-10">
                <div className="mt-8">
                    <Banner categories={categories} />
                </div>
                <div>
                    <FlashSale />
                </div>

                <div>
                    {categories.map((item) => (
                        <Category key={item.id} data={item} />
                    ))}
                </div>

                <div>
                    <BrandBanner />
                </div>

                <div>
                    <BrandBanner2 />
                </div>

                <div>
                    <Blog />
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
