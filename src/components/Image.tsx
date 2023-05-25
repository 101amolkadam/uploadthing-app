// components/Image.tsx
import React from 'react';
import { CircularProgress } from '@mui/material';
import { useQuery } from 'react-query';
import axios from 'axios';

// Define the types for the image data and the props for the Image component
type ImageData = {
  data: string;
};

type ImageProps = {
  url: string | null; // The url state from the parent component
};

function Image({ url }: ImageProps) {
  // Use React Query to fetch and cache the image data from the url
  const { data: image, isLoading } = useQuery<ImageData>(
    ['image', url],
    () => axios.get(url!),
    { enabled: !!url }
  );

  return (
    <div className="Image">
      {url && (
        <>
          <p>Image URL: {url}</p>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <img src={image!.data} alt="Uploaded image" />
          )}
        </>
      )}
    </div>
  );
}

export default Image;
