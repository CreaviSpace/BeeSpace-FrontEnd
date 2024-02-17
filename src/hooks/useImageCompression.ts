import imageCompression from 'browser-image-compression';
import { useState } from 'react';

const useImageCompression = () => {
  const [isLoading, setIsLoading] = useState(false);

  const compressImage = async (imageFile: File) => {
    if (isLoading) return;

    setIsLoading(true);

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);

      setIsLoading(false);

      return compressedFile;
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };

  return { compressImage, isLoading };
};

export default useImageCompression;
