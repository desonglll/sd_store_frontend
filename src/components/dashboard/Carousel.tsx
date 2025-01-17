import {useEffect, useState} from "react";
import axios from "axios";
import Api from "../../config/api.ts";
import {Carousel as AntCarousel} from "antd";

interface CarouselImage {
    available: boolean
    id: number
    image: never
    name: string
    url: string
}

function Carousel() {

    const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([])
    const [loading, setLoading] = useState(true)
    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: '320px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        width: '100%',
        objectFit: 'cover',
    };

    useEffect(() => {
        axios.get(Api.carouselImage).then((resp) => {
            setCarouselImages(resp.data.carousel_images)
        }).catch((error) => {
            console.log(error.response)
        }).finally(() => {
            setLoading(false)
        })
    }, []);
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };

    return (
        !loading &&
        <>
            <AntCarousel afterChange={onChange}>
                {carouselImages.map((image) => {
                    return (
                        <div key={image.id}>
                            <img src={image.url} alt={image.name} style={contentStyle}/>
                        </div>)
                })}
            </AntCarousel>
        </>
    )
}

export default Carousel;