import React from "react";
import { FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch"

interface FormToogleButtonFieldProps {
    field: any;
    label: string;
    description: string;
    disabled?: boolean
}

const FormToogleButtonField: React.FC<FormToogleButtonFieldProps> = ({ field, label, description, disabled = false }) => (
    <>
        <div className="space-y-2">
            <FormLabel>{label}</FormLabel>
            <FormItem className="flex flex-row items-center justify-center h-10">{/* rounded-lg border */}
                <div className="px-2">
                    {description &&
                        <FormDescription>
                            {description}
                        </FormDescription>
                    }
                </div>
                <FormControl>
                    <Switch
                        disabled={disabled}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                </FormControl>
            </FormItem>
        </div>
        {/* <FormItem className="flex items-center space-x-2">
            <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                id={field.name} />
            <Label htmlFor={field.name}>{description}</Label>
        </FormItem> */}
        {/* <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
            <FormLabel>{label}</FormLabel>
            <div>
                <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id={field.name} />
                <Label htmlFor={field.name}>{description}</Label>
            </div>
        </FormItem> */}
    </>
);

export default FormToogleButtonField