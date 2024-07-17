import React from "react";
import { Input } from "@/components/ui/input";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";

interface FormInputFieldProps {
    field: any;
    label: string;
    placeholder?: string;
    description?: string;
}

const FormInputField: React.FC<FormInputFieldProps> = ({ field, label, placeholder, description }) => (
    <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
            <Input placeholder={placeholder} {...field} />
        </FormControl>
        {description &&
            <FormDescription>
                {description}
            </FormDescription>
        }
        <FormMessage />
    </FormItem>
);

export default FormInputField;
