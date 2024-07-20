import { ConfirmDialog, DataTable, DataTableRowActions } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { IStudentTableRowDTO } from "../../models/IStudent"
import { useStudents } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

const AllStudentsTable = () => {

    const [data, setData] = useState<IStudentTableRowDTO[]>([])
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<IStudentTableRowDTO | null>(null)

    const { loading, loadingModification, getAllStudents, deleteStudent } = useStudents()

    const navigate = useNavigate()

    const { toast } = useToast()

    const columns: ColumnDef<IStudentTableRowDTO>[] = [
        // {
        //     id: "select",
        //     header: ({ table }) => <DataTableHeaderSelection table={table} />,
        //     cell: ({ row }) => <DataTableRowSelection row={row} />,
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: "userName",
            header: "Username"
        },
        {
            accessorKey: "firstName",
            header: "Name"
        },
        {
            accessorKey: "lastName",
            header: "Last Name"
        },
        {
            accessorKey: "rut",
            header: "UUID"
        },
        {
            accessorKey: "phone",
            header: "Phone"
        },
        {
            accessorKey: "email",
            header: "Email"
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

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const data = await getAllStudents()
        setData(data)
    }

    const handleDelete = async (id: string) => {
        await deleteStudent(id)
        toast({
            variant: "destructive",
            description: "Student deleted successfully",
        })
        await loadData()
        setShowDeleteConfirmDialog(false)
    }

    return (
        <div className="container mx-auto py-10">
            <ConfirmDialog
                isOpen={showDeleteConfirmDialog}
                triggerComponent={null}
                title="Are you sure?"
                content="Only students without activity can be deleted; however, you can also change its status."
                loading={loadingModification}
                onConfirm={() => handleDelete(currentData!.id)}
                onCancel={() => setShowDeleteConfirmDialog(false)}
            />

            <DataTable
                columns={columns}
                data={data}
                enableFilter
                filterBy={'userId'}
                filterPlaceholder="Filter username..."
                enableViewOptions
            />
        </div>
    )
}

export default AllStudentsTable