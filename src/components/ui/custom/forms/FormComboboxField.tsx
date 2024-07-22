import React from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface FormSelectFieldProps {
    field: any;
    label: string;
    placeholder?: string;
    description?: string;
    options: { value: string; label: string }[];
    // onChange: (args: string) => void
}

const FormComboboxField: React.FC<FormSelectFieldProps> = ({ field, label, placeholder, description, options }) => (
    <FormItem className="flex flex-col">
        <FormLabel>{label}</FormLabel>
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            // "w-[200px] justify-between",
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value
                            ? options.find(
                                (option) => option.value === field.value
                            )?.label
                            : placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    value={option.label}
                                    key={option.value}
                                    // onSelect={(arg1) => {
                                    //     // console.log('onSelect', field.name, option.value, arg1)
                                    //     field.onChange(option.value)
                                    //     onChange(`${field.name} ${option.value} ${arg1}`)
                                    // }}
                                    onSelect={() => field.onChange(option.value)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            option.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
        <FormDescription>
            {description}
        </FormDescription>
        <FormMessage />
    </FormItem>
);

export default FormComboboxField;
