import React from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

interface Action {
  label?: string;
  onClick?: (row: any) => void;
  isSeparator?: boolean;
}

interface ActionsColumnProps {
  row: any;
  actions: Action[];
}

export const ActionsColumn: React.FC<ActionsColumnProps> = ({ row, actions }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {actions.map((action, index) =>
          action.isSeparator ? (
            <DropdownMenuSeparator key={index} />
          ) : (
            <DropdownMenuItem key={index} onClick={() => action.onClick?.(row)}>
              {action.label}
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
