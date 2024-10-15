import { ConfirmDialog, DataTable, DataTableRowActions } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { ICalendarEventDTO } from "../../models/IEvent"
import { useEvents } from "../../hooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { formatDateType } from "@/lib/formatters"
import { useTranslation } from "react-i18next"

const AllEventsTable = () => {

    const [data, setData] = useState<ICalendarEventDTO[]>([])
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<ICalendarEventDTO | null>(null)

    const { loading, loadingModification, getAllEvents, deleteEvent } = useEvents()

    const { t } = useTranslation()
    
    const navigate = useNavigate()

    const { toast } = useToast()

    const columns: ColumnDef<ICalendarEventDTO>[] = [
        // {
        //     id: "select",
        //     header: ({ table }) => <DataTableHeaderSelection table={table} />,
        //     cell: ({ row }) => <DataTableRowSelection row={row} />,
        //     enableSorting: false,
        //     enableHiding: false,
        // },
        {
            accessorKey: "title",
            header: t('ADMINMODULE.FIELDNAMES.TITLE'), // "Title"
        },
        {
            accessorKey: "startDate",
            header: t('ADMINMODULE.FIELDNAMES.STARTDATE'), // "Start",
            cell: ({ row }) => (<span>{formatDateType(row.original.startDate, 'yyyy-MM-dd HH:mm')}</span>)
        },
        {
            accessorKey: "endDate",
            header: t('ADMINMODULE.FIELDNAMES.ENDDATE'), // "End",
            cell: ({ row }) => (<span>{formatDateType(row.original.endDate, 'yyyy-MM-dd HH:mm')}</span>)
        },
        {
            accessorKey: "active",
            header: t('ADMINMODULE.FIELDNAMES.STATE'), // "State",
            cell: ({ row }) => <>
                {/* TODO: Set all these values from i18n */}
                {row.original.type === 1 && <Badge variant='outline' className="bg-green-800 text-green-100">Vacaciones</Badge>}
                {row.original.type === 2 && <Badge variant='outline' className="bg-green-800 text-green-100">Administrativo</Badge>}
                {row.original.type === 3 && <Badge variant='outline' className="bg-green-800 text-green-100">Reunión</Badge>}
                {row.original.type === 4 && <Badge variant='outline' className="bg-green-800 text-green-100">Social</Badge>}
                {row.original.type === 9 && <Badge variant='outline' className="bg-green-800 text-green-100">Otros</Badge>}
            </>
        },
        // {
        //     accessorKey: "active",
        //     header: "State",
        //     cell: ({ row }) => <>
        //         {row.original.stateId === 1 && <Badge variant='outline' className="bg-green-800 text-green-100">Active</Badge>}
        //         {row.original.stateId !== 1 && <Badge variant='destructive'>Inactive</Badge>}
        //     </>
        // },
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
        const data = await getAllEvents()
        setData(data)
    }

    const handleDelete = async (id: string) => {
        await deleteEvent(id)
        toast({
            variant: "destructive",
            description: "Event deleted successfully",
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
                content="Only events without activity can be deleted; however, you can also change its status."
                loading={loadingModification}
                onConfirm={() => handleDelete(currentData!.id)}
                onCancel={() => setShowDeleteConfirmDialog(false)}
            />

            <DataTable
                columns={columns}
                data={data}
                loading={loading}
                enableFilter
                filterBy={'title'}
                filterPlaceholder="Filter by title..."
            />
        </div>
    )
}

export default AllEventsTable