// "use client";
import Image from 'next/image';
import Carousel1 from '@/public/carousel1.svg'
import Carousel2 from '@/public/carousel2.svg'
import Carousel3 from '@/public/carousel3.svg'
import Carousel4 from '@/public/carousel4.svg'

function Carousel() {
    return (
        <div className="carousel w-full mt-5">
            <div id="slide1" className="carousel-item relative w-full">
                <Image src={Carousel1} alt="" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-ghost">
                        ❮
                    </a>
                    <a href="#slide2" className="btn btn-ghost">
                        ❯
                    </a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <Image src={Carousel2} alt="" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-ghost">
                        ❮
                    </a>
                    <a href="#slide3" className="btn btn-ghost">
                        ❯
                    </a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <Image src={Carousel3} alt="" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-ghost">
                        ❮
                    </a>
                    <a href="#slide4" className="btn btn-ghost">
                        ❯
                    </a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <Image src={Carousel4} alt="" className="w-full" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-ghost">
                        ❮
                    </a>
                    <a href="#slide1" className="btn btn-ghost">
                        ❯
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
