import { ConfirmDialog, DataTable, DataTableHeaderSelection, DataTableRowActions, DataTableRowSelection } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { IUser } from "../../models/IUser"
import { useUsers } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"

const AllUsersTable = () => {

  const [data, setData] = useState<IUser[]>([])
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false)
  const [currentData, setCurrentData] = useState<IUser | null>(null)

  const { loading, loadingModification, getAllUsers, deleteUser } = useUsers()

  const navigate = useNavigate()

  const { t } = useTranslation()

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
      header: t('ADMINMODULE.FIELDNAMES.USERNAME')//"Username"
    },
    {
      accessorKey: "firstName",
      header: t('ADMINMODULE.FIELDNAMES.NAME'), //"Name"
    },
    {
      accessorKey: "lastName",
      header: t('ADMINMODULE.FIELDNAMES.LASTNAME'), //"Last Name"
    },
    {
      accessorKey: "rut",
      header: t('ADMINMODULE.FIELDNAMES.UUIDRUT'), //"UUID"
    },
    {
      accessorKey: "phone",
      header: t('ADMINMODULE.FIELDNAMES.PHONE'), //"Phone"
    },
    {
      accessorKey: "email",
      header: t('ADMINMODULE.FIELDNAMES.EMAIL'), //"Email"
    },
    {
      accessorKey: "stateId",
      header: t('ADMINMODULE.FIELDNAMES.STATE'), //"State",
      cell: ({ row }) => <>
        {row.original.stateId === 1 && <Badge variant='outline'>Active</Badge>}
        {row.original.stateId !== 1 && <Badge variant='destructive'>Inactive</Badge>}
      </>
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions
        title={t('ADMINMODULE.FIELDNAMES.ACTIONS')}
        data={row.original}
        items={[
          {
            title: t('ADMINMODULE.FIELDNAMES.EDIT_ACTION'), onClick: (data) => { navigate(`../${data.id}`, { relative: 'path' }) }
          },
          {
            title: t('ADMINMODULE.FIELDNAMES.DELETE_ACTION'), onClick: (data) => {
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
        onConfirm={() => handleDelete(currentData!.id)}
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