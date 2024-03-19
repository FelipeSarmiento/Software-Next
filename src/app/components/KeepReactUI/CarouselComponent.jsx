"use client";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Carousel } from "keep-react";

export const CarouselComponent = ({items = []}) => {
    return (
        <Carousel slideInterval={2000} showControls={true} indicators={false} leftControl={<IconChevronLeft size={48}/>} rightControl={<IconChevronRight size={48}/>}>
            {items.map((item, index) => (
                <div key={index} className="flex items-center justify-center h-96">
                    <Image src={item.src} alt={item.alt} width={item.width} height={item.height} />
                </div>
            ))}
        </Carousel>
    )
}

