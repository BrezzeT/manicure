import React, { useState } from 'react';
import { Box, Container, Modal, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const images = [
  '/gallery/1.jpg',
  '/gallery/2.jpg',
  '/gallery/3.jpg',
  '/gallery/4.jpg',
  '/gallery/5.jpg',
  '/gallery/6.jpg',
];

const ImageCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '16px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    '& img': {
      transform: 'scale(1.1)',
    },
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease-in-out',
  },
}));

const Gallery = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <Box sx={{ py: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {images.map((image, index) => (
          <ImageCard
            key={index}
            sx={{
              height: {
                xs: 300,
                sm: 250,
                md: 300,
              },
              gridColumn: {
                sm: index % 3 === 0 ? 'span 2' : 'span 1',
                md: 'span 1',
              },
              gridRow: {
                sm: index % 3 === 0 ? 'span 2' : 'span 1',
                md: 'span 1',
              },
            }}
            onClick={() => handleImageClick(image)}
          >
            <img src={image} alt={`Gallery image ${index + 1}`} />
          </ImageCard>
        ))}
      </Box>

      <Modal
        open={!!selectedImage}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none',
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: -40,
              right: 0,
              color: '#fff',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={selectedImage || ''}
            alt="Selected gallery image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Gallery; 