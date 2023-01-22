import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField } from '@mui/material';
import { ImageGallery } from '../components';

export const NoteView = () => {
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Grid item fontSize={39} fontWeight="light">
        October 13 2023
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Enter a title"
          label="Title"
          sx={{ border: 'none', mb: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿What happened today?"
          sx={{ border: 'none', mb: 1 }}
          minRows={5}
        />
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
