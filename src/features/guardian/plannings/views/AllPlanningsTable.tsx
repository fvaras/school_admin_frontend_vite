import { DataTable } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { IPlanningTableRowDTO } from "../../models/IPlanning"
import { useTranslation } from "react-i18next"

interface IProps {
    plannings: IPlanningTableRowDTO[]
}

const AllPlanningsTable = ({ plannings }: IProps) => {

    const { t } = useTranslation()

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
            header: t('GUARDIANMODULE.FIELDNAMES.GRADENAME'), // "Grade"
        },
        {
            accessorKey: "subjectName",
            header: t('GUARDIANMODULE.FIELDNAMES.SUBJECTNAME'), // "Subject"
        },
        {
            accessorKey: "title",
            header: t('GUARDIANMODULE.FIELDNAMES.TITLE'), // "Title"
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