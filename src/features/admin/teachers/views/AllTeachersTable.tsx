import { ConfirmDialog, DataTable, DataTableHeaderSelection, DataTableRowActions, DataTableRowSelection } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { ITeacherDTO } from "../../models/ITeacher"
import { useTeachers } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"

const AllTeachersTable = () => {

    const [data, setData] = useState<ITeacherDTO[]>([])
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<ITeacherDTO | null>(null)

    const { loading, loadingModification, getAllTeachers, deleteTeacher } = useTeachers()

    const { t } = useTranslation();

    const navigate = useNavigate()

    const { toast } = useToast()

    const columns: ColumnDef<ITeacherDTO>[] = [
        // {
        //     id: "select",
        //     header: ({ table }) => <DataTableHeaderSelection table={table} />,
        //     cell: ({ row }) => <DataTableRowSelection row={row} />,
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: "firstName",
            header: t('ADMINMODULE.FIELDNAMES.USERNAME'), // First name
        },
        {
            accessorKey: "lastName",
            header: t('ADMINMODULE.FIELDNAMES.LASTNAME'), // Last name
        },
        {
            accessorKey: "rut",
            header: t('ADMINMODULE.FIELDNAMES.UUIDRUT'), // UUID
        },
        {
            accessorKey: "contactPhone",
            header: t('ADMINMODULE.FIELDNAMES.PHONE'), // Corporative phone
        },
        {
            accessorKey: "contactEmail",
            header: t('ADMINMODULE.FIELDNAMES.EMAIL'), // Corporative email
        },
        {
            accessorKey: "stateId",
            header: t('ADMINMODULE.FIELDNAMES.STATE'), // State"
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
        const data = await getAllTeachers()
        setData(data)
    }

    const handleDelete = async (id: string) => {
        await deleteTeacher(id)
        toast({
            variant: "destructive",
            description: "Teacher deleted successfully",
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
                content="Only teachers without activity can be deleted; however, you can also change its status."
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
            />
        </div>
    )
}

export default AllTeachersTable