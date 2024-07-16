import { Payment, columns } from "@/components/ui/custom/table/columns"
import { DataTable } from "@/components/ui/custom/table/data-table"

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

const DataTableDemo = () => {
  const data = getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default DataTableDemo