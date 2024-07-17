import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";

interface FormSelectFieldProps {
    field: any;
    label: string;
    placeholder?: string;
    description?: string;
    options: { value: number; label: string }[];
}

const FormSelectField: React.FC<FormSelectFieldProps> = ({ field, label, placeholder, description, options }) => (
    <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value as unknown as string}>
            <FormControl>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                {options.map(option => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        {description &&
            <FormDescription>
                {description}
            </FormDescription>
        }
        <FormMessage />
    </FormItem>
);

export default FormSelectField;
