// UploadButton.tsx
import React from 'react';
import { Button } from '@mui/material';
import { MyFile } from '../containers/Upload'; // Import the MyFile type

// Define the props type for the UploadButton component
type UploadButtonProps = {
  file: MyFile | null; // The file state from the parent component
  onUpload: () => void; // The callback function to upload the file in the parent component
};

function UploadButton({ file, onUpload }: UploadButtonProps) {
  // Handle the upload button click event and call the onUpload callback
  const handleClick = () => {
    onUpload();
  };

  return (
    <div className="UploadButton">
      <Button variant="contained" onClick={handleClick} disabled={!file}>
        Upload
      </Button>
    </div>
  );
}

export default UploadButton;
