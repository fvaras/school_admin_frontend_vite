import React from "react";
import { Input } from "@/components/ui/input";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";

interface FormInputFieldProps {
    field: any;
    label: string;
    type?: 'text' | 'password'
    placeholder?: string;
    description?: string;
    disabled?: boolean
}

const FormInputField: React.FC<FormInputFieldProps> = ({ field, label, type = 'text', placeholder, description, disabled = false }) => (
    <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
            <Input placeholder={placeholder} type={type} disabled={disabled} {...field} />
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
