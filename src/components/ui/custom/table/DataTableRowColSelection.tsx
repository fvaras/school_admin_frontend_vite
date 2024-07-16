import { Checkbox } from "@/components/ui/checkbox"
import { Row, Table } from "@tanstack/react-table"

interface IDataTableHeaderSelection<T> {
    table: Table<T>
}
export const DataTableHeaderSelection = <T,>({ table }: IDataTableHeaderSelection<T>) => {
    return (
        <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
        />
    )
}

interface IDataTableRowSelectionProps<T> {
    row: Row<T>
}
export const DataTableRowSelection = <T,>({ row }: IDataTableRowSelectionProps<T>) => {
    return (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
    )
}