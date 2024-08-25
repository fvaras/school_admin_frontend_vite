import { ConfirmDialog, DataTable, DataTableRowActions } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import { IStudentTableRowDTO } from "../../models/IStudent"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"

interface IProps {
    students: IStudentTableRowDTO[]
    loadingModification: boolean
    onDelete: (row: IStudentTableRowDTO) => Promise<void>
}

const AllStudentsByGradeTable = ({ students, loadingModification, onDelete }: IProps) => {
    
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<IStudentTableRowDTO | null>(null)

    const navigate = useNavigate()

    const columns: ColumnDef<IStudentTableRowDTO>[] = [
        // {
        //     id: "select",
        //     header: ({ table }) => <DataTableHeaderSelection table={table} />,
        //     cell: ({ row }) => <DataTableRowSelection row={row} />,
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: "rut",
            header: "UUID"
        },
        {
            accessorKey: "firstName",
            header: "First Name"
        },
        {
            accessorKey: "lastName",
            header: "Last Name"
        },
        {
            accessorKey: "gradeName",
            header: "Grade"
        },
        {
            accessorKey: "stateId",
            header: "State",
            cell: ({ row }) => <>
                {row.original.stateId === 1 && <Badge variant='outline' className="bg-green-800 text-green-100">Active</Badge>}
                {row.original.stateId !== 1 && <Badge variant='destructive'>Inactive</Badge>}
            </>
        },
        {
            id: "actions",
            cell: ({ row }) => <DataTableRowActions
                title="Actions"
                data={row.original}
                items={[
                    {
                        // title: 'Edit', onClick: (data) => { navigate(`/admin/users/${data.id}`) }
                        title: 'Edit', onClick: (data) => { navigate(`/admin/students/${data.id}`, { relative: 'path' }) }
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

    const handleDelete = async (row: IStudentTableRowDTO) => {
        await onDelete(row)
        setShowDeleteConfirmDialog(false)
    }

    return (
        <div className="mx-auto">
            <ConfirmDialog
                isOpen={showDeleteConfirmDialog}
                triggerComponent={null}
                title="Are you sure?"
                content="Only students without activity can be deleted; however, you can also change its status."
                loading={loadingModification}
                onConfirm={() => handleDelete(currentData!)}
                onCancel={() => setShowDeleteConfirmDialog(false)}
            />

            <DataTable
                columns={columns}
                data={students}
                enableFilter
                filterBy={'firstName'}
                filterPlaceholder="Filter username..."
                enableViewOptions
            />
        </div>
    )
}

export default AllStudentsByGradeTable