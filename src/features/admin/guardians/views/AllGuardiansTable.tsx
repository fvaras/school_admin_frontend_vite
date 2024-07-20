import { ConfirmDialog, DataTable, DataTableHeaderSelection, DataTableRowActions, DataTableRowSelection } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { IGuardianDTO } from "../../models/IGuardian"
import { useGuardians } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

const AllGuardiansTable = () => {

    const [data, setData] = useState<IGuardianDTO[]>([])
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<IGuardianDTO | null>(null)

    const { loading, loadingModification, getAllGuardians, deleteGuardian } = useGuardians()

    const navigate = useNavigate()

    const { toast } = useToast()

    const columns: ColumnDef<IGuardianDTO>[] = [
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
        const data = await getAllGuardians()
        setData(data)
    }

    const handleDelete = async (id: string) => {
        await deleteGuardian(id)
        toast({
            variant: "destructive",
            description: "Guardian deleted successfully",
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
                content="Only guardians without activity can be deleted; however, you can also change its status."
                loading={loadingModification}
                onConfirm={() => handleDelete(currentData!.id)}
                onCancel={() => setShowDeleteConfirmDialog(false)}
            />

            <DataTable
                columns={columns}
                data={data}
                enableFilter
                filterBy={'contactEmail'}
                filterPlaceholder="Filter username..."
                enableViewOptions
            />
        </div>
    )
}

export default AllGuardiansTable