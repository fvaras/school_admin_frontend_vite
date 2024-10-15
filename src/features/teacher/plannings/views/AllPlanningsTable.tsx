import { ConfirmDialog, DataTable, DataTableRowActions } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import { IPlanningTableRowDTO } from "../../models/IPlanning"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

interface IProps {
    plannings: IPlanningTableRowDTO[]
    loadingData: boolean
    loadingModification: boolean
    onDelete: (row: IPlanningTableRowDTO) => Promise<void>
}

const AllPlanningsTable = ({ plannings, loadingData, loadingModification, onDelete }: IProps) => {

    const { t } = useTranslation()
    
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<IPlanningTableRowDTO | null>(null)

    const navigate = useNavigate()

    const columns: ColumnDef<IPlanningTableRowDTO>[] = [
        // {
        //     id: "select",
        //     header: ({ table }) => <DataTableHeaderSelection table={table} />,
        //     cell: ({ row }) => <DataTableRowSelection row={row} />,
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: "subjectName",
            header: t('TEACHERMODULE.FIELDNAMES.SUBJECTNAME'), // "Subject"
        },
        {
            accessorKey: "gradeName",
            header: t('TEACHERMODULE.FIELDNAMES.GRADENAME'), // "Grade"
        },
        {
            accessorKey: "title",
            header: t('TEACHERMODULE.FIELDNAMES.TITLE'), // "Title"
        },
        {
            id: "actions",
            cell: ({ row }) => <DataTableRowActions
                title={t('TEACHERMODULE.FIELDNAMES.ACTIONS')}
                data={row.original}
                items={[
                    {
                        title: t('TEACHERMODULE.FIELDNAMES.EDIT_ACTION'), onClick: (data) => { navigate(`../${data.id}`, { relative: 'path' }) }
                    },
                    {
                        title: t('TEACHERMODULE.FIELDNAMES.DELETE_ACTION'), onClick: (data) => {
                            setCurrentData(data);
                            setShowDeleteConfirmDialog(true)
                        }
                    }
                ]}
            />
        },
    ]

    const handleDelete = async (row: IPlanningTableRowDTO) => {
        await onDelete(row)
        setShowDeleteConfirmDialog(false)
    }

    return (
        <div className="mx-auto">
            <ConfirmDialog
                isOpen={showDeleteConfirmDialog}
                triggerComponent={null}
                title="Are you sure?"
                content="Only plannings without activity can be deleted; however, you can also change its status."
                loading={loadingModification}
                onConfirm={() => handleDelete(currentData!)}
                onCancel={() => setShowDeleteConfirmDialog(false)}
            />

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