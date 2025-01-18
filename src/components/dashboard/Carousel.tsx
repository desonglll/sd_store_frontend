import React, {useEffect, useState} from "react";
import {Carousel as AntCarousel} from "antd";
import httpLink from "../../graphql/httplink/httplink.ts";
import {ApolloClient, InMemoryCache, useQuery} from "@apollo/client";
import QUERY from "../../graphql/querys/GetCarouselImages.ts";
import {CarouselImageType} from "../../types/carousel.ts";


const uri = httpLink();

const client = new ApolloClient({
    link: uri,
    cache: new InMemoryCache(),
})


function Carousel() {
    const {data, loading, error} = useQuery(QUERY, {
        client,
    })
    const [carouselImages, setCarouselImages] = useState<CarouselImageType[]>([])
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
        if (loading) console.log('Loading...');
        if (error) console.log('Error:', error);
        if (data) {
            setCarouselImages(data.allCarouselImages)
        }
    }, [loading, error, data]);
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