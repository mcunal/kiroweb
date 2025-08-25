import React, { useState, useEffect, useRef } from 'react';
import './OpportunitiesSlider.css';

const OpportunitiesSlider = ({ opportunities }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        // Otomatik geçişin sadece 1'den fazla resim olduğunda çalışmasını sağla
        if (!opportunities || opportunities.length <= 1) {
            resetTimeout(); // Olası bir önceki timeout'u temizle
            return;
        }

        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setCurrentIndex((prevIndex) =>
                    prevIndex === opportunities.length - 1 ? 0 : prevIndex + 1
                ),
            7000 // 7 saniye
        );

        return () => {
            resetTimeout();
        };
    }, [currentIndex, opportunities]);

    // Eğer hiç fırsat yoksa veya opportunities prop'u gelmediyse, slider'ı render etme
    if (!opportunities || opportunities.length === 0) {
        return null;
    }

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? opportunities.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === opportunities.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // Sadece 1'den fazla resim varsa okları göster.
    const showArrows = opportunities.length > 1;

    return (
        <div className="opportunities-container">
            {showArrows && <button onClick={goToPrevious} className="slider-arrow arrow-left">&#10094;</button>}
            <div className="opportunities-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {opportunities.map((opportunity) => (
                    <div className="opportunity-slide" key={opportunity.id}>
                        <a href="https://www.shopier.com/luminesans" target="_blank" rel="noopener noreferrer">
                            <img src={opportunity.imageUrl} alt="Fırsat" />
                        </a>
                    </div>
                ))}
            </div>
            {showArrows && <button onClick={goToNext} className="slider-arrow arrow-right">&#10095;</button>}
        </div>
    );
};

export default OpportunitiesSlider;