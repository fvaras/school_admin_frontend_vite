import { ConfirmDialog, DataTable, DataTableRowActions } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { IGradeDTO } from "../../models/IGrade"
import { useGrades } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"

const AllGradesTable = () => {

    const [data, setData] = useState<IGradeDTO[]>([])
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<IGradeDTO | null>(null)

    const { t } = useTranslation()
    
    const { loadingModification, getAllGrades, deleteGrade } = useGrades()

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
            header: t('ADMINMODULE.FIELDNAMES.NAME'), // "Name"
        },
        {
            accessorKey: "contactEmail",
            header: t('ADMINMODULE.FIELDNAMES.EMAIL'), // "Email"
        },
        {
            accessorKey: "contactPhone",
            header: t('ADMINMODULE.FIELDNAMES.PHONE'), // "Phone"
        },
        {
            accessorKey: "capacity",
            header: t('ADMINMODULE.FIELDNAMES.CAPACITY'), // "Capacity"
        },
        {
            accessorKey: "active",
            header: t('ADMINMODULE.FIELDNAMES.STATE'), // "State",
            cell: ({ row }) => <>
                {row.original.active && <Badge variant='outline' className="bg-green-800 text-green-100">{t('ADMINMODULE.STATES.ACTIVE')}</Badge>}
                {!row.original.active && <Badge variant='destructive'>{t('ADMINMODULE.STATES.INACTIVE')}</Badge>}
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
                        title: t('ADMINMODULE.FIELDNAMES.VIEWSTUDENTS_ACTION'), onClick: (data) => { navigate(`../${data.id}/students`, { relative: 'path' }) }
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
        <div className="mx-auto">
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
            />
        </div>
    )
}

export default AllGradesTable