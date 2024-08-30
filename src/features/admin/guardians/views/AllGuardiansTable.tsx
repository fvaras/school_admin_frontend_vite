import { ConfirmDialog, DataTable, DataTableRowActions } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { IGuardianTableRowDTO } from "../../models/IGuardian"
import { useGuardians } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"

const AllGuardiansTable = () => {

    const { t } = useTranslation()

    const [data, setData] = useState<IGuardianTableRowDTO[]>([])
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<IGuardianTableRowDTO | null>(null)

    const { loading, loadingModification, getAllGuardians, deleteGuardian } = useGuardians()

    const navigate = useNavigate()

    const { toast } = useToast()

    const columns: ColumnDef<IGuardianTableRowDTO>[] = [
        // {
        //     id: "select",
        //     header: ({ table }) => <DataTableHeaderSelection table={table} />,
        //     cell: ({ row }) => <DataTableRowSelection row={row} />,
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: "rut",
            header: t('ADMINMODULE.FIELDNAMES.UUIDRUT'), // "UUID"
        },
        {
            accessorKey: "firstName",
            header: t('ADMINMODULE.FIELDNAMES.NAME'), // "First Name"
        },
        {
            accessorKey: "lastName",
            header: t('ADMINMODULE.FIELDNAMES.LASTNAME'), // "Last Name"
        },
        {
            accessorKey: "phone",
            header: t('ADMINMODULE.FIELDNAMES.PHONE'), // "Phone"
        },
        {
            accessorKey: "email",
            header: t('ADMINMODULE.FIELDNAMES.EMAIL'), // "Email"
        },
        {
            accessorKey: "stateId",
            header: t('ADMINMODULE.FIELDNAMES.STATE'), // "State",
            cell: ({ row }) => <>
                {row.original.stateId === 1 && <Badge variant='outline' className="bg-green-800 text-green-100">{t('ADMINMODULE.STATES.ACTIVE')}</Badge>}
                {row.original.stateId !== 1 && <Badge variant='destructive'>{t('ADMINMODULE.STATES.INACTIVE')}</Badge>}
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
        <div className="mx-auto">
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
                filterBy={'lastName'}
                filterPlaceholder="Filter username..."
            />
        </div>
    )
}

export default AllGuardiansTable