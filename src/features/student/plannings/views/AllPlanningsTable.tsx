import { DataTable } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { IPlanningTableRowDTO } from "../../models/IPlanning"
import { useTranslation } from "react-i18next"

interface IProps {
    plannings: IPlanningTableRowDTO[]
    loadingData: boolean
}

const AllPlanningsTable = ({ plannings, loadingData }: IProps) => {

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
            header: t('STUDENTMODULE.FIELDNAMES.GRADENAME'), // "Grade"
        },
        {
            accessorKey: "subjectName",
            header: t('STUDENTMODULE.FIELDNAMES.SUBJECTNAME'), // "Subject"
        },
        {
            accessorKey: "title",
            header: t('STUDENTMODULE.FIELDNAMES.TITLE'), // "Title"
        }
    ]

    return (
        <div className="mx-auto py-5">
            <DataTable
                columns={columns}
                data={plannings}
                loading={loadingData}
                enableFilter
                filterBy={'title'}
                filterPlaceholder="Filter title..."
            />
        </div>
    )
}

export default AllPlanningsTable