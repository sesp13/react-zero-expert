import { TurnedInNot } from '@mui/icons-material';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SidebarItem = ({ title = '', body, id, date, imageUrls = [] }) => {
  const dispatch = useDispatch();

  const noteTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + '...' : title;
  }, [title]);

  const onSelectNote = () => {
    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onSelectNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={noteTitle} secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
