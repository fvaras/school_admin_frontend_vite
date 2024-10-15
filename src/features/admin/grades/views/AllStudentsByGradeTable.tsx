import { ConfirmDialog, DataTable, DataTableRowActions } from "@/components/ui/custom"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import { IStudentTableRowDTO } from "../../models/IStudent"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"

interface IProps {
    students: IStudentTableRowDTO[]
    loadingData: boolean
    loadingModification: boolean
    onDelete: (row: IStudentTableRowDTO) => Promise<void>
}

const AllStudentsByGradeTable = ({ students, loadingData, loadingModification, onDelete }: IProps) => {
    
    const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState<boolean>(false)
    const [currentData, setCurrentData] = useState<IStudentTableRowDTO | null>(null)

    const { t } = useTranslation()
    
    const navigate = useNavigate()

    const columns: ColumnDef<IStudentTableRowDTO>[] = [
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
            accessorKey: "gradeName",
            header: t('ADMINMODULE.FIELDNAMES.GRADE'), // "Grade"
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
                        title: t('ADMINMODULE.FIELDNAMES.EDIT_ACTION'), onClick: (data) => { navigate(`/admin/students/${data.id}`, { relative: 'path' }) }
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

    const handleDelete = async (row: IStudentTableRowDTO) => {
        await onDelete(row)
        setShowDeleteConfirmDialog(false)
    }

    return (
        <div className="mx-auto">
            <ConfirmDialog
                isOpen={showDeleteConfirmDialog}
                triggerComponent={null}
                title="Are you sure?"
                content="Only students without activity can be deleted; however, you can also change its status."
                loading={loadingModification}
                onConfirm={() => handleDelete(currentData!)}
                onCancel={() => setShowDeleteConfirmDialog(false)}
            />

            <DataTable
                columns={columns}
                data={students}
                loading={loadingData}
                enableFilter
                filterBy={'firstName'}
                filterPlaceholder="Filter username..."
            />
        </div>
    )
}

export default AllStudentsByGradeTable