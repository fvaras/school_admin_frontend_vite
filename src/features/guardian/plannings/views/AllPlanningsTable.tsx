import { DataTable } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { IPlanningTableRowDTO } from "../../models/IPlanning"

interface IProps {
    plannings: IPlanningTableRowDTO[]
}

const AllPlanningsTable = ({ plannings }: IProps) => {

    const columns: ColumnDef<IPlanningTableRowDTO>[] = [
        // {
        //     id: "select",
        //     header: ({ table }) => <DataTableHeaderSelection table={table} />,
        //     cell: ({ row }) => <DataTableRowSelection row={row} />,
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: "gradeName",
            header: "Grade"
        },
        {
            accessorKey: "subjectName",
            header: "Subject"
        },
        {
            accessorKey: "title",
            header: "Title"
        }
    ]

    return (
        <div className="mx-auto py-5">
            <DataTable
                columns={columns}
                data={plannings}
                enableFilter
                filterBy={'title'}
                filterPlaceholder="Filter title..."
                enableViewOptions
            />
        </div>
    )
}

export default AllPlanningsTable