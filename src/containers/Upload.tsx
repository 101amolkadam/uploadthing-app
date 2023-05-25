// Upload.tsx
import React, { useState } from 'react';
import { UploadthingProvider, useUpload } from '@uploadthing/react';
import { useDropzone } from 'react-dropzone';
import FileInput from '../components/FileInput';
import UploadButton from '../components/UploadButton';
import ProgressBar from '../components/ProgressBar';
import Image from '../components/Image';

// Define and export the types for the file and image data
export type MyFile = {
  name: string;
  size: number;
  type: string;
};

// Get the Uploadthing credentials from the environment variables
const UPLOADTHING_SECRET = process.env.REACT_APP_UPLOADTHING_SECRET;
const UPLOADTHING_APP_ID = process.env.REACT_APP_UPLOADTHING_APP_ID;

// Define a custom type for the FileRouter
type OurFileRouter = {
  imageUploader: {
    metadata: {
      userId: string;
    };
    file: {
      url: string;
    };
  };
};

function Upload() {
  // Use React Hooks to manage the state of the file and url
  const [file, setFile] = useState<MyFile | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  // Use Uploadthing hook to upload the file and get the progress and error
  const { uploadFile, progress, error } = useUpload<OurFileRouter>();

  // Use react-dropzone hook to create a dropzone area
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'], // Change this line
      'image/png': ['.png'] // Change this line
    }, 
    maxFiles: 1, // Only allow one file at a time
    onDrop: (acceptedFiles) => {
      // When a file is dropped, set it as the file state
      setFile(acceptedFiles[0]);
    },
  });

  // Handle the upload button click event and call the uploadFile function
  const handleUpload = async () => {
    try {
      if (file) {
        // Pass the routeSlug and a fake userId as metadata to the uploadFile function
        const response = await uploadFile('imageUploader', file, {
          userId: 'fakeId',
        });
        setUrl(response.file.url);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Upload">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag and drop an image here, or click to select one</p>
      </div>
      <FileInput file={file} onFileChange={setFile} />
      <UploadButton file={file} onUpload={handleUpload} />
      <ProgressBar progress={progress} />
      {error && <p>{error.message}</p>}
      <Image url={url} />
    </div>
  );
}

export default function UploadWrapper() {
  return (
    // Use UploadthingProvider to pass the credentials to the Upload component
    <UploadthingProvider secret={UPLOADTHING_SECRET} appId={UPLOADTHING_APP_ID}>
      <Upload />
    </UploadthingProvider>
  );
}
