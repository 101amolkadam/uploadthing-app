// FileInput.tsx
import React from 'react';
import { MyFile } from '../containers/Upload'; // Import the MyFile type

// Define the props type for the FileInput component
type FileInputProps = {
  file: MyFile | null; // The file state from the parent component
  onFileChange: (file: MyFile) => void; // The callback function to set the file state in the parent component
};

function FileInput({ file, onFileChange }: FileInputProps) {
  // Handle the file change event and call the onFileChange callback with the selected file
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onFileChange(file);
    }
  };

  return (
    <div className="FileInput">
      <input type="file" onChange={handleChange} />
      {file && <p>Selected file: {file.name}</p>}
    </div>
  );
}

export default FileInput;
