import { ViewWeekTwoTone } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
} from '@mui/material';
import { useMemo, useState } from 'react';
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

  const filteredColumns = useMemo(() => columns.filter((col) => col.select !== false), [columns]);

  return (
    <Box>
      <Tooltip title="Select Columns">
        <Button
          color="primary"
          startIcon={<ViewWeekTwoTone />}
          onClick={(event) => setAnchorEl(event.currentTarget)}
          variant="outlined"
          disableElevation
        >
          Columns
        </Button>
      </Tooltip>

      <Menu
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        slotProps={{
          paper: {
            style: {
              maxHeight: 600,
              minWidth: '18ch',
            },
          },
        }}
      >
        <MenuList>
          {filteredColumns.map((col) => (
            <MenuItem
              key={col.field as string}
              onClick={() => onToggleColumn(col.field)}
              sx={{ py: 0 }}
            >
              <ListItemIcon>
                <Checkbox size="small" checked={selectedColumn.includes(col.field)} disableRipple />
              </ListItemIcon>
              <ListItemText>{col.title}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
}
