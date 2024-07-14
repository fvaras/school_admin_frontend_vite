import React from "react"
import { Checkbox } from "../../../components/ui/checkbox"

interface SelectionColumnProps {
  table: any;
}

export const SelectionColumnHeader: React.FC<SelectionColumnProps> = ({ table }) => {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  );
};

interface SelectionCellProps {
  row: any;
}

export const SelectionColumnCell: React.FC<SelectionCellProps> = ({ row }) => {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
};
