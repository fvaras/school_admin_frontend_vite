"use client"

import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

interface IProps {
    field: any;
    label: string;
    placeholder?: string;
    description?: React.ReactNode;
    disabled?: boolean
}

const FormTextAreaField: React.FC<IProps> = ({ field, label, placeholder, description, disabled = false }) => (
    <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
            <Textarea
                placeholder={placeholder}
                className="resize-none"
                disabled={disabled}
                {...field}
            />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
    </FormItem>
)

export default FormTextAreaField