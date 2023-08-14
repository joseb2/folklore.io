import React from 'react';
import StoryContainer from './StoryContainer';
import MapBox from './MapBox';
import { Box, Container } from '@mui/material';

function CombinedMapContent() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        margin: '0',
        marginRight: '0',
        width: '100%',
        height: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <StoryContainer />
      <MapBox />
 </Box>
 
  );
}

export default CombinedMapContent;