"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormField,
} from "@/components/ui/form"
import { FormInputField, FormTextAreaField, FormToogleButtonField } from "@/components/ui/custom/forms"
import { ButtonLoading, Heading } from "@/components/ui/custom"
import { IGradeDTO, IGradeForCreationDTO, IGradeForUpdateDTO } from "../../models/IGrade"

const formSchema = z.object({
    name: z.string().min(2, { message: "Required" }),
    contactEmail: z.string().email({ message: "Invalid email address" }).min(3, { message: "Required" }),
    contactPhone: z.string().min(3, { message: "Required" }),
    capacity: z.number().min(3, { message: "Required" }),
    description: z.string().min(3, { message: "Required" }),
    active: z.boolean(),
    // teachersId: z.string().min(2, { message: "Required" }),
})

interface IProps {
    mode: 'ADD' | 'EDIT'
    grade?: IGradeDTO
    loading: boolean
    submit: (id: number | null, grade: IGradeForCreationDTO | IGradeForUpdateDTO) => void
}

const AddEditGradeForm = ({ grade, mode, loading, submit }: IProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: mode === 'ADD' ? '' : grade?.name,
            contactEmail: mode === 'ADD' ? '' : grade?.contactEmail,
            contactPhone: mode === 'ADD' ? '' : grade?.contactPhone,
            capacity: mode === 'ADD' ? 0 : grade?.capacity,
            description: mode === 'ADD' ? '' : grade?.description,
            active: mode === 'ADD' ? true : grade?.active,
            // teachersId: null // TODO
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (mode === 'ADD') {
            const newGrade: IGradeForCreationDTO = {
                name: values.name,
                contactEmail: values.contactEmail,
                contactPhone: values.contactPhone,
                capacity: values.capacity,
                description: values.description,
                active: values.active,
                teachersId: [] // TODO
            }
            submit(null, newGrade)
        } else {
            const existingGrade: IGradeForUpdateDTO = {
                name: values.name,
                contactEmail: values.contactEmail,
                contactPhone: values.contactPhone,
                capacity: values.capacity,
                description: values.description,
                active: values.active,
                teachersId: [] // TODO
            }
            submit(grade!.id, existingGrade)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Heading variant="subtitle2">User Info</Heading>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4 -mx-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormInputField
                                field={field}
                                label="Name"
                                placeholder="name"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                            <FormInputField
                                field={field}
                                label="Email"
                                placeholder="contactEmail"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                            <FormInputField
                                field={field}
                                label="Phone"
                                placeholder=""
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="capacity"
                        render={({ field }) => (
                            <FormInputField
                                field={field}
                                type="number"
                                label="Capacity"
                                placeholder="Number of students for this grade"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="active"
                        render={({ field }) => (
                            <FormToogleButtonField
                                field={field}
                                label="State"
                                description="Active"
                            />
                        )}
                    />
                    <div className="col-start-1 col-end-3">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormTextAreaField
                                    field={field}
                                    label="Description"
                                    placeholder=""
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="col-start-1 col-end-3">
                    <ButtonLoading loading={loading} type="submit">Submit</ButtonLoading>
                </div>
            </form>
        </Form>
    )
}

export default AddEditGradeForm;
