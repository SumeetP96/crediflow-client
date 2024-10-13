import { Grid2, Skeleton } from '@mui/material';
import { useMemo } from 'react';

export interface IFormSkeletonProps {
  rows: number;
}

export default function FormSkeleton({ rows }: IFormSkeletonProps) {
  const rowArray = useMemo(() => {
    return Array.from({ length: rows }, (_, i) => i);
  }, [rows]);

  return (
    <Grid2 container spacing={4}>
      {rowArray.map((i) => (
        <Grid2 key={i} size={{ xs: 12, md: i % 2 === 1 ? 6 : 12 }}>
          <Skeleton variant="rounded" height={30} animation="wave" />
        </Grid2>
      ))}
    </Grid2>
  );
}
