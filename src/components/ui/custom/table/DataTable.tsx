"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Input } from "@/components/ui/input"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../table"
import { DataTablePagination } from "./DataTablePagination"
import { DataTableViewOptions } from "./DataTableViewOptions"
import { ChevronDownIcon, ChevronUpIcon, CaretSortIcon } from "@radix-ui/react-icons"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    enableFilter?: boolean
    filterBy?: keyof TData | null
    filterPlaceholder?: string
    enableViewOptions?: boolean
}

export function DataTable<TData, TValue>({
    columns,
    data,
    enableFilter = false,
    filterBy = null,
    filterPlaceholder = '',
    enableViewOptions = false
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        },
    })

    const handleSorting = (columnId: string) => {
        setSorting((prevSorting) => {
            const currentSort = prevSorting.find(sort => sort.id === columnId)
            if (currentSort) {
                const newDirection = currentSort.desc ? false : !currentSort.desc
                return [{ id: columnId, desc: newDirection }]
            }
            return [{ id: columnId, desc: false }]
        })
    }

    return (
        <div>
            {(enableViewOptions || enableFilter) && (
                <div className="flex items-center py-4">
                    {enableFilter && (
                        <Input
                            placeholder={filterPlaceholder}
                            value={(table.getColumn(filterBy as string)?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn(filterBy as string)?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                    )}
                    {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu> */}
                    {enableViewOptions && (
                        <DataTableViewOptions table={table} />
                    )}
                </div>
            )}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        // <TableHead key={header.id}>
                                        //     {header.isPlaceholder
                                        //         ? null
                                        //         : flexRender(
                                        //             header.column.columnDef.header,
                                        //             header.getContext()
                                        //         )}
                                        // </TableHead>
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    onClick={() => handleSorting(header.column.id)}
                                                    className="flex items-center cursor-pointer"
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {header.column.getCanSort() && (
                                                        header.column.getIsSorted() ? (
                                                            header.column.getIsSorted() === 'desc' ? (
                                                                <ChevronDownIcon className="ml-1 h-4 w-4" />
                                                            ) : (
                                                                <ChevronUpIcon className="ml-1 h-4 w-4" />
                                                            )
                                                        ) : (
                                                            <CaretSortIcon className="ml-1 h-4 w-4" />
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}
