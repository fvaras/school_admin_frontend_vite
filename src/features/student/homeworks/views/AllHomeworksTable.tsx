import { DataTable } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { IHomeworkTableRowDTO } from "../../models/IHomework"

interface IProps {
    homeworks: IHomeworkTableRowDTO[]
}

const AllHomeworksTable = ({ homeworks }: IProps) => {

    const columns: ColumnDef<IHomeworkTableRowDTO>[] = [
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
        },
    ]

    return (
        <div className="container mx-auto py-10">
            <DataTable
                columns={columns}
                data={homeworks}
                enableFilter
                filterBy={'title'}
                filterPlaceholder="Filter title..."
                enableViewOptions
            />
        </div>
    )
}

export default AllHomeworksTable