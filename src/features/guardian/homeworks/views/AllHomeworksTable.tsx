import { DataTable } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { IHomeworkTableRowDTO } from "../../models/IHomework"
import { useTranslation } from "react-i18next"

interface IProps {
    homeworks: IHomeworkTableRowDTO[]
    loadingData: boolean
}

const AllHomeworksTable = ({ homeworks, loadingData }: IProps) => {

    const { t } = useTranslation()

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
            header: t('GUARDIANMODULE.FIELDNAMES.GRADENAME'), // "Grade"
        },
        {
            accessorKey: "subjectName",
            header: t('GUARDIANMODULE.FIELDNAMES.SUBJECTNAME'), // "Subject"
        },
        {
            accessorKey: "title",
            header: t('GUARDIANMODULE.FIELDNAMES.TITLE'), // "Title"
        },
    ]

    return (
        <div className="mx-auto py-5">
            <DataTable
                columns={columns}
                data={homeworks}
                loading={loadingData}
                enableFilter
                filterBy={'title'}
                filterPlaceholder="Filter title..."
            />
        </div>
    )
}

export default AllHomeworksTable