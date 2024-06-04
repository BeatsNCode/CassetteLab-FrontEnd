import React, { useState } from 'react';
import { TextField, Chip, Box } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

type GenresUpdateInputProps = {
  genres: string[];
  setGenres: React.Dispatch<React.SetStateAction<string[]>>;
  maxEntries?: number;
};

const GenresUpdateInput: React.FC<GenresUpdateInputProps> = ({ genres = [], setGenres, maxEntries = 3 }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === 'Enter' || event.key === ',') && genres.length < maxEntries) {
      event.preventDefault();
      const newGenres = inputValue
        .split(',')
        .map(genre => genre.trim())
        .filter(genre => genre && !genres.includes(genre));
      if (genres.length + newGenres.length <= maxEntries) {
        setGenres([...genres, ...newGenres]);
        setInputValue('');
      }
    }
  };

  const handleDelete = (genreToDelete: string) => () => {
    setGenres(genres.filter((genre) => genre !== genreToDelete));
  };

  return (
    <Box sx={{ display: 'inline', flexDirection: 'column', gap: 1 }}>
      <TextField
        required
        variant="standard"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        margin="normal"
        fullWidth
        id="genres"
        name="genres"
        autoComplete="off"
        helperText="Your Genre(s) - Max is 3."
        InputLabelProps={{ shrink: false }}
        InputProps={{
          startAdornment: (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
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

export default GenresUpdateInput;
