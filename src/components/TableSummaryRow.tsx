import { memo, useMemo } from 'react';

interface TableSummaryRowProps {
  getVisibleDays: () => number[];
  getDayTotal: (day: number) => number;
  monthTotal: number;
}

export const TableSummaryRow = memo(({
  getVisibleDays,
  getDayTotal,
  monthTotal
}: TableSummaryRowProps) => {
  const visibleDays = useMemo(() => getVisibleDays(), [getVisibleDays]);
  
  const dayTotals = useMemo(() => 
    visibleDays.map(day => ({
      day,
      total: getDayTotal(day)
    })),
    [visibleDays, getDayTotal]
  );

  return (
    <tr>
      <td>Total</td>
      {dayTotals.map(({ day, total }) => (
        <td key={`total-${day}`}>{total}</td>
      ))}
      <td>{monthTotal}</td>
    </tr>
  );
});
