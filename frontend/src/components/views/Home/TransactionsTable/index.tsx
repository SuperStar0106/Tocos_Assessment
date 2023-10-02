import { TableComponent } from "components";
import { useSelector } from "react-redux";

export interface ITransactionsTableProps {
  className?: string,
};

export const TransactionsTable: React.FC<ITransactionsTableProps> = (props) => {
  const rows = [
    {
      key: 'id',
      value: 'Transaction ID'
    },
    {
      key: 'senderId',
      value: 'From',
    },
    {
      key: 'receiverId',
      value: 'To',
    },
    {
      key: 'amount',
      value: 'Value',
    },
  ];

  return (
    <TableComponent
      {...props}
      rows={rows}
    />
  )
}