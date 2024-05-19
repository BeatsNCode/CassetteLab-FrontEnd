import React, { useState } from 'react';
import { TextField, Chip, Box, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

type GenresInputProps = {
  genres: string[];
  setGenres: React.Dispatch<React.SetStateAction<string[]>>;
  maxEntries?: number;
};

const GenresInput: React.FC<GenresInputProps> = ({ genres, setGenres, maxEntries = 3 }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === 'Enter' || event.key === ',') && genres.length < maxEntries) {
      event.preventDefault();
      const newGenres = inputValue.split(',').map(genre => genre.trim()).filter(genre => genre && !genres.includes(genre));
      if (genres.length + newGenres.length <= maxEntries) {
        setGenres([...genres, ...newGenres]);
        setInputValue('');
      }
    } else if (event.key === 'Backspace' && !inputValue && genres.length) {
      const newGenres = genres.slice(0, -1);
      setGenres(newGenres);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleDelete = (genreToDelete: string) => () => {
    setGenres(genres.filter((genre) => genre !== genreToDelete));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <TextField
        required
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        margin="normal"
        fullWidth
        id="genres"
        label="Enter a maximum of genres"
        name="genres"
        autoComplete="genres"
        autoFocus
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {genres.map((genre) => (
          <Chip
            key={genre}
            label={genre}
            onDelete={handleDelete(genre)}
            deleteIcon={<CloseIcon />}
          />
        ))}
      </Box>
    </Box>
    
  );
};

export default GenresInput;
