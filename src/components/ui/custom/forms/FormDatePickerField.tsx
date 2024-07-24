import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface FormDatePickerFieldProps {
    field: any;
    label: string;
    placeholder?: string;
    description?: string;
    disabled?: boolean
}

const FormDatePickerField: React.FC<FormDatePickerFieldProps> = ({ field, label, placeholder, description, disabled = false }) => (
    <FormItem className="flex flex-col">
        <FormLabel>{label}</FormLabel>
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={"outline"}
                        disabled={disabled}
                        className={cn(
                            // "w-[240px] pl-3 text-left font-normal",
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value ? (
                            format(field.value, "PPP")
                        ) : (
                            <span>{placeholder}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    // disabled={(date) =>
                    //     (date > new Date() || date < new Date("1900-01-01")) || disabled
                    // }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
        {description &&
            <FormDescription>
                {description}
            </FormDescription>
        }
        <FormMessage />
    </FormItem>
);

export default FormDatePickerField;
