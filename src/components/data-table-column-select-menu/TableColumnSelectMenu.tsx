import { ViewWeekTwoTone } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { IDataTableColumn } from '../data-table/DataTable';

export interface IDataTableColumnSelect<T> {
  columns: IDataTableColumn<T>[];
  selectedColumn: Array<keyof T>;
  onToggleColumn: (field: keyof T) => void;
}

export default function DataTableColumnSelect<T>({
  columns,
  selectedColumn,
  onToggleColumn,
}: IDataTableColumnSelect<T>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  return (
    <Box>
      <Tooltip title="Select Columns">
        <IconButton color="primary" onClick={(event) => setAnchorEl(event.currentTarget)}>
          <ViewWeekTwoTone />
        </IconButton>
      </Tooltip>

      <Menu
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        slotProps={{
          paper: {
            style: {
              maxHeight: 600,
              minWidth: '20ch',
            },
          },
        }}
      >
        {columns.map((col) => (
          <MenuItem key={col.field as string} onClick={() => onToggleColumn(col.field)}>
            <ListItemIcon>
              <Checkbox checked={selectedColumn.includes(col.field)} />
            </ListItemIcon>
            <ListItemText>{col.title}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
