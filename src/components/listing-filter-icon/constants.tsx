import {
  Abc,
  DateRangeOutlined,
  ExpandCircleDownOutlined,
  FormatListBulleted,
  Numbers,
  TodayOutlined,
} from '@mui/icons-material';
import { ReactNode } from 'react';
import { TDataTableFilterType } from '../data-table/types';

export const listingFilterIconMap: Record<TDataTableFilterType, ReactNode> = {
  number: <Numbers />,
  'text-exact': <Abc />,
  'text-fuzzy': <Abc />,
  select: <ExpandCircleDownOutlined />,
  multiselect: <FormatListBulleted />,
  date: <TodayOutlined />,
  daterange: <DateRangeOutlined />,
};
