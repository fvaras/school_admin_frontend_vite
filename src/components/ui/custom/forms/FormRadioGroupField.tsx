import React from 'react'
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface IProps {
    field: any;
    label: string;
    placeholder?: string;
    description?: string;
    options: { value: string; label: string }[];
}

const FormRadioGroupField: React.FC<IProps> = ({ field, label, placeholder, description, options }) => (
    <FormItem className="space-y-3">
        <FormLabel>{label}</FormLabel>
        <FormControl>
            <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
            >
                {options.map((option, key) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                            <RadioGroupItem value={option.value} />
                        </FormControl>
                        <FormLabel className="font-normal">
                            {option.label}
                        </FormLabel>
                    </FormItem>
                ))}
            </RadioGroup>
        </FormControl>
        <FormMessage />
    </FormItem>
)

export default FormRadioGroupField