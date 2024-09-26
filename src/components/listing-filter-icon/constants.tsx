import {
  Abc,
  DateRangeOutlined,
  ExpandCircleDownOutlined,
  FormatListBulleted,
  TodayOutlined,
} from '@mui/icons-material';
import { ReactNode } from 'react';
import { TDataTableFilterType } from '../data-table/DataTable';

export const listingFilterIconMap: Record<TDataTableFilterType, ReactNode> = {
  text: <Abc />,
  select: <ExpandCircleDownOutlined />,
  multiselect: <FormatListBulleted />,
  date: <TodayOutlined />,
  daterange: <DateRangeOutlined />,
};
