import { ConfirmDialog, DataTable, DataTableHeaderSelection, DataTableRowActions, DataTableRowSelection } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { IUser } from "../../models/IUser"
import { useUsers } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

const AllUsersTable = () => {

  const [data, setData] = useState<IUser[]>([])
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false)
  const [currentData, setCurrentData] = useState<IUser | null>(null)

  const { loading, loadingModification, getAllUsers, deleteUser } = useUsers()

  const navigate = useNavigate()

  const { toast } = useToast()

  const columns: ColumnDef<IUser>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => <DataTableHeaderSelection table={table} />,
    //   cell: ({ row }) => <DataTableRowSelection row={row} />,
    //   enableSorting: false,
    //   enableHiding: false,
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
        {row.original.stateId === 1 && <Badge variant='outline'>Active</Badge>}
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
    const data = await getAllUsers()
    setData(data)
  }

  const handleDelete = async (id: string) => {
    await deleteUser(id)
    toast({
      variant: "destructive",
      description: "User deleted successfully",
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
        content="Only users without activity can be deleted; however, you can also change its status."
        loading={loadingModification}
        onConfirm={() => handleDelete(currentData!.id.toString())}
        onCancel={() => setShowDeleteConfirmDialog(false)}
      />

      <DataTable
        columns={columns}
        data={data}
        enableFilter
        filterBy={'userName'}
        filterPlaceholder="Filter username..."
        enableViewOptions
      />
    </div>
  )
}

export default AllUsersTable