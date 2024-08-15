import { ConfirmDialog, DataTable, DataTableRowActions } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { IPlanningTableRowDTO } from "../../models/IPlanning"
import { usePlannings } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

interface IProps {
    plannings: IPlanningTableRowDTO[]
    loadingModification: boolean
    onDelete: (row: IPlanningTableRowDTO) => Promise<void>
}

const AllPlanningsTable = ({ plannings, loadingModification, onDelete }: IProps) => {

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
            header: "Subject"
        },
        {
            accessorKey: "gradeName",
            header: "Grade"
        },
        {
            accessorKey: "title",
            header: "Title"
        },
        {
            id: "actions",
            cell: ({ row }) => <DataTableRowActions
                title="Actions"
                data={row.original}
                items={[
                    {
                        // title: 'Edit', onClick: (data) => { navigate(`/teacher/users/${data.id}`) }
                        title: 'Edit', onClick: (data) => { navigate(`../${data.id}`, { relative: 'path' }) }
                    },
                    {
                        title: 'Delete', onClick: (data) => {
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
                enableFilter
                filterBy={'title'}
                filterPlaceholder="Filter title..."
                enableViewOptions
            />
        </div>
    )
}

export default AllPlanningsTable