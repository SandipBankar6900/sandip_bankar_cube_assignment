
import React, { useState, useEffect, useRef } from 'react';
import fetchPhotos from '../services/photoService';

const PhotoGrid: React.FC<{ showImages: boolean }> = ({ showImages }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showImages) {
      const fetchNewPhotos = async () => {
        const data = await fetchPhotos();
        setPhotos(data);
        setCurrentIndex(0);
      };

      fetchNewPhotos(); 
    } else {
      setPhotos([]); 
    }
  }, [showImages]);

  useEffect(() => {
    if (showImages && photos.length > 0) {
      // Start interval to change photos every 10 seconds
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (photos.length * 3));
      }, 10000);
    } else {
      // Clear interval when photos are not shown
      clearInterval(intervalRef.current!);
    }

    return () => {
      // Cleanup interval on component unmount
      clearInterval(intervalRef.current!);
    };
  }, [showImages, photos]);

  useEffect(() => {
    
    if (!showImages) {
      setCurrentIndex(0);
    }
  }, [showImages]);

  const renderImages = () => {
    const images = [];
    for (let i = 0; i < 9; i++) {
      const index = (currentIndex + i) % photos.length;
      images.push(
        <img key={index} src={photos[index]} alt={`Photo ${index + 1}`} className="photo" />
      );
    }
    return images;
  };

  return (
    <div className="photo-grid">
      {showImages && photos.length > 0 && renderImages()}
    </div>
  );
};

export default PhotoGrid;
