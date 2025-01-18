export interface ImageType {
    id: number;
    file: string;
    available: boolean
}

export interface CarouselImageType {
    available: boolean
    id: number
    image: ImageType
    name: string
    url: string
}
