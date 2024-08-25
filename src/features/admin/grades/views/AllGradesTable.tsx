import { ConfirmDialog, DataTable, DataTableRowActions } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { IGradeDTO } from "../../models/IGrade"
import { useGrades } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

const AllGradesTable = () => {

    const [data, setData] = useState<IGradeDTO[]>([])
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<IGradeDTO | null>(null)

    const { loading, loadingModification, getAllGrades, deleteGrade } = useGrades()

    const navigate = useNavigate()

    const { toast } = useToast()

    const columns: ColumnDef<IGradeDTO>[] = [
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
            accessorKey: "contactEmail",
            header: "Email"
        },
        {
            accessorKey: "contactPhone",
            header: "Phone"
        },
        {
            accessorKey: "capacity",
            header: "Capacity"
        },
        {
            accessorKey: "active",
            header: "State",
            cell: ({ row }) => <>
                {row.original.active && <Badge variant='outline' className="bg-green-800 text-green-100">Active</Badge>}
                {!row.original.active && <Badge variant='destructive'>Inactive</Badge>}
            </>
        },
        {
            id: "actions",
            cell: ({ row }) => <DataTableRowActions
                title="Actions"
                data={row.original}
                items={[
                    {
                        title: 'Edit', onClick: (data) => { navigate(`../${data.id}`, { relative: 'path' }) }
                    },
                    {
                        title: 'View students', onClick: (data) => { navigate(`../${data.id}/students`, { relative: 'path' }) }
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
        const data = await getAllGrades()
        setData(data)
    }

    const handleDelete = async (id: string) => {
        await deleteGrade(id)
        toast({
            variant: "destructive",
            description: "Grade deleted successfully",
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
                content="Only grades without activity can be deleted; however, you can also change its status."
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

export default AllGradesTable