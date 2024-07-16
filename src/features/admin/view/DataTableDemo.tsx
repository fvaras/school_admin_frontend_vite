import { DataTable, DataTableHeaderSelection, DataTableRowActions, DataTableRowSelection } from "@/components/ui/custom/table"
import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

function getData(): Payment[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f-1",
      amount: 100,
      status: "pending",
      email: "user1@example.com",
    },
    {
      id: "728ed52f-2",
      amount: 150,
      status: "processing",
      email: "user2@example.com",
    },
    {
      id: "728ed52f-3",
      amount: 200,
      status: "success",
      email: "user3@example.com",
    },
    {
      id: "728ed52f-4",
      amount: 250,
      status: "failed",
      email: "user4@example.com",
    },
    {
      id: "728ed52f-5",
      amount: 300,
      status: "pending",
      email: "user5@example.com",
    },
    {
      id: "728ed52f-6",
      amount: 350,
      status: "processing",
      email: "user6@example.com",
    },
    {
      id: "728ed52f-7",
      amount: 400,
      status: "success",
      email: "user7@example.com",
    },
    {
      id: "728ed52f-8",
      amount: 450,
      status: "failed",
      email: "user8@example.com",
    },
    {
      id: "728ed52f-9",
      amount: 500,
      status: "pending",
      email: "user9@example.com",
    },
    {
      id: "728ed52f-10",
      amount: 550,
      status: "processing",
      email: "user10@example.com",
    },
    {
      id: "728ed52f-11",
      amount: 600,
      status: "success",
      email: "user11@example.com",
    },
    {
      id: "728ed52f-12",
      amount: 650,
      status: "failed",
      email: "user12@example.com",
    },
    {
      id: "728ed52f-13",
      amount: 700,
      status: "pending",
      email: "user13@example.com",
    },
  ]

}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableHeaderSelection table={table} />,
    cell: ({ row }) => <DataTableRowSelection row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "amount",
    // header: "Amount 1$"
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">$ {row.getValue("amount")}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions
      title="Actions"
      data={row.original}
      items={[
        { title: 'Copy payment ID', onClick: (data) => navigator.clipboard.writeText(data.id) },
        { title: '' },
        { title: 'View customer', onClick: (data) => console.log('View customer', data) },
        { title: 'View payment details', onClick: (data) => console.log('View payment details', data) }
      ]}
    />
  },
]

const DataTableDemo = () => {
  const data = getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        enableFilter
        filterBy={'email'}
        filterPlaceholder="Filter emails..."
        enableViewOptions
      />
    </div>
  )
}

export default DataTableDemo