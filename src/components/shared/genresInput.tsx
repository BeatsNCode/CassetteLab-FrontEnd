import React, { useState } from 'react';
import { TextField, Chip, Box } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

type GenresInputProps = {
  genres: string[];
  setGenres: React.Dispatch<React.SetStateAction<string[]>>;
  maxEntries?: number;
};

const GenresInput: React.FC<GenresInputProps> = ({ genres, setGenres, maxEntries = 3 }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && genres.length < maxEntries && inputValue.trim() !== '') {
      event.preventDefault();
      const newGenre = inputValue.trim();
      if (!genres.includes(newGenre)) {
        setGenres([...genres, newGenre]);
      }
      setInputValue('');
    }
  };

  const handleDelete = (genreToDelete: string) => () => {
    setGenres(genres.filter((genre) => genre !== genreToDelete));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <TextField
        required
        autoFocus
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        margin="normal"
        fullWidth
        id="genres"
        label="Enter a maximum of 3 genres"
        name="genres"
        autoComplete="genres"
        InputLabelProps={{ shrink: false }}
        InputProps={{
          startAdornment: (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1, marginTop: 1 }}>
              {genres.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  onDelete={handleDelete(genre)}
                  deleteIcon={<CloseIcon />}
                  variant="outlined"
                />
              ))}
            </Box>
          ),
        }}
      />
    </Box>
  );
};

export default GenresInput;
