// components/ProgressBar.tsx
import React from 'react';
import { LinearProgress } from '@mui/material';

// Define the props type for the ProgressBar component
type ProgressBarProps = {
  progress: number | null; // The progress state from the parent component
};

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="ProgressBar">
      {progress && <LinearProgress variant="determinate" value={progress} />}
    </div>
  );
}

export default ProgressBar;
