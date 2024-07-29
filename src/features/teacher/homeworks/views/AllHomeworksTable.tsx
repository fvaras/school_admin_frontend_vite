import { ConfirmDialog, DataTable, DataTableRowActions } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { IHomeworkTableRowDTO } from "../../models/IHomework"
import { useHomeworks } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

const AllHomeworksTable = () => {

    const [data, setData] = useState<IHomeworkTableRowDTO[]>([])
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<IHomeworkTableRowDTO | null>(null)

    const { loading, loadingModification, getAllHomeworks, deleteHomework } = useHomeworks()

    const navigate = useNavigate()

    const { toast } = useToast()

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
        const data = await getAllHomeworks()
        setData(data)
    }

    const handleDelete = async (id: string) => {
        await deleteHomework(id)
        toast({
            variant: "destructive",
            description: "Homework deleted successfully",
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
                content="Only homeworks without activity can be deleted; however, you can also change its status."
                loading={loadingModification}
                onConfirm={() => handleDelete(currentData!.id)}
                onCancel={() => setShowDeleteConfirmDialog(false)}
            />

            <DataTable
                columns={columns}
                data={data}
                enableFilter
                filterBy={'title'}
                filterPlaceholder="Filter title..."
                enableViewOptions
            />
        </div>
    )
}

export default AllHomeworksTable