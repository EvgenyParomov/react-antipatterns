interface TableSummaryRowProps {
  getVisibleDays: () => number[];
  getDayTotal: (day: number) => number;
  getMonthTotal: () => number;
}

export const TableSummaryRow = ({
  getVisibleDays,
  getDayTotal,
  getMonthTotal
}: TableSummaryRowProps) => {
  return (
    <tr>
      <td>Total</td>
      {getVisibleDays().map(day => (
        <td key={`total-${day}`}>{getDayTotal(day)}</td>
      ))}
      <td>{getMonthTotal()}</td>
    </tr>
  );
};
