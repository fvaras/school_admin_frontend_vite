import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

interface IItemOption<T> {
  title: string
  onClick?: (data: T) => void
}

interface IProps<T> {
  title: string
  data: T
  items: IItemOption<T>[]
}

export const DataTableRowActions = <T,>({
  title = 'Actions',
  data,
  items
}: IProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {title && <DropdownMenuLabel>Actions</DropdownMenuLabel>}
        {items.map((item, key) => (
          item.title ? (
            <DropdownMenuItem
              key={key}
              onClick={() => item.onClick ? item.onClick(data) : {}}
            >
              {item.title}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuSeparator key={key} />
          )
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}