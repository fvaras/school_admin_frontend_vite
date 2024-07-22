import { ConfirmDialog, DataTable, DataTableRowActions } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { ISubjectDTO } from "../../models/ISubject"
import { useSubjects } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

const AllSubjectsTable = () => {

    const [data, setData] = useState<ISubjectDTO[]>([])
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<ISubjectDTO | null>(null)

    const { loading, loadingModification, getAllSubjects, deleteSubject } = useSubjects()

    const navigate = useNavigate()

    const { toast } = useToast()

    const columns: ColumnDef<ISubjectDTO>[] = [
        // {
        //     id: "select",
        //     header: ({ table }) => <DataTableHeaderSelection table={table} />,
        //     cell: ({ row }) => <DataTableRowSelection row={row} />,
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: "name",
            header: "Name"
        },
        {
            accessorKey: "gradeName",
            header: "Grade"
        },
        {
            accessorKey: "teacherName",
            header: "Teacher"
        },
        {
            accessorKey: "active",
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
        const data = await getAllSubjects()
        setData(data)
    }

    const handleDelete = async (id: string) => {
        await deleteSubject(id)
        toast({
            variant: "destructive",
            description: "Subject deleted successfully",
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
                content="Only subjects without activity can be deleted; however, you can also change its status."
                loading={loadingModification}
                onConfirm={() => handleDelete(currentData!.id)}
                onCancel={() => setShowDeleteConfirmDialog(false)}
            />

            <DataTable
                columns={columns}
                data={data}
                enableFilter
                filterBy={'name'}
                filterPlaceholder="Filter name..."
                enableViewOptions
            />
        </div>
    )
}

export default AllSubjectsTable