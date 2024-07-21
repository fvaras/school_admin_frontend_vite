"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormField,
} from "@/components/ui/form"
import { FormInputField, FormTextAreaField, FormToogleButtonField, FormComboboxField } from "@/components/ui/custom/forms"
import { ButtonLoading, Heading } from "@/components/ui/custom"
import { IGradeDTO, IGradeForCreationDTO, IGradeForUpdateDTO } from "../../models/IGrade"
import { useGrades, useTeachers } from "../../hooks"
import { useEffect, useState } from "react"
import { LabelValueDTO } from "@/models/TLabelValueDTO"

const formSchema = z.object({
    name: z.string().min(2, { message: "Required" }),
    contactEmail: z.string().email({ message: "Invalid email address" }).min(3, { message: "Required" }),
    contactPhone: z.string().min(3, { message: "Required" }),
    capacity: z.number().min(3, { message: "Required" }),
    description: z.string().min(3, { message: "Required" }),
    idTeacher1: z.string(), //.min(3, { message: "Required" }),
    idTeacher2: z.string(), //.min(3, { message: "Required" }),
    active: z.boolean(),
    // teachersId: z.string().min(2, { message: "Required" }),
})

interface IProps {
    mode: 'ADD' | 'EDIT'
    grade?: IGradeDTO
    loading: boolean
    submit: (id: string | null, grade: IGradeForCreationDTO | IGradeForUpdateDTO) => void
}

const AddEditGradeForm = ({ grade, mode, loading, submit }: IProps) => {

    const [teachersList, setTeachersList] = useState<LabelValueDTO<string>[] | null>(null)

    const { getTeachersId } = useGrades()

    const { getTeachersForList } = useTeachers()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: mode === 'ADD' ? '' : grade?.name,
            contactEmail: mode === 'ADD' ? '' : grade?.contactEmail,
            contactPhone: mode === 'ADD' ? '' : grade?.contactPhone,
            capacity: mode === 'ADD' ? 0 : grade?.capacity,
            description: mode === 'ADD' ? '' : grade?.description,
            idTeacher1: mode === 'ADD' ? '' : '', // will be assigned from an API call
            idTeacher2: mode === 'ADD' ? '' : '', // will be assigned from an API call
            active: mode === 'ADD' ? true : grade?.active,
        },
    })

    useEffect(() => {
        handeTeachersDataLoad()
    }, [mode])

    const handeTeachersDataLoad = async () => {
        const _teacherList = await getTeachersForList()
        setTeachersList(_teacherList)

        if (mode === 'EDIT') {
            const teachersIds: string[] = await getTeachersId(grade?.id!)
            if (teachersIds[0]) form.setValue('idTeacher1', teachersIds[0])
            if (teachersIds[1]) form.setValue('idTeacher2', teachersIds[1])
        }
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        const _teachersId: string[] = []
        if (values.idTeacher2)
            _teachersId.push(values.idTeacher2)
        if (values.idTeacher1)
            _teachersId.push(values.idTeacher1)
        if (mode === 'ADD') {
            const newGrade: IGradeForCreationDTO = {
                name: values.name,
                contactEmail: values.contactEmail,
                contactPhone: values.contactPhone,
                capacity: values.capacity,
                description: values.description,
                active: values.active,
                teachersId: _teachersId
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
                teachersId: _teachersId
            }
            submit(grade!.id, existingGrade)
        }
    }

    return (
        <>
            {/* <pre>{JSON.stringify(form.getValues(), null, 4)}</pre> */}

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
                        {teachersList &&
                            <>
                                <FormField
                                    control={form.control}
                                    name="idTeacher1"
                                    render={({ field }) => (
                                        <FormComboboxField
                                            field={field}
                                            label="First teacher"
                                            placeholder="One of the grade teachers"
                                            options={teachersList}
                                            onChange={(text) => {
                                                console.log('new value1', text);
                                                console.log('values1', form.getValues())
                                            }}
                                        />
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="idTeacher2"
                                    render={({ field }) => (
                                        <FormComboboxField
                                            field={field}
                                            label="Second Teacher"
                                            placeholder="One of the grade teachers"
                                            options={teachersList.map(el => ({ value: el.value, label: el.label }))}
                                            onChange={(text) => {
                                                console.log('new value1', text);
                                                console.log('values1', form.getValues())
                                            }}
                                        />
                                    )}
                                />
                            </>
                        }
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
        </>
    )
}

export default AddEditGradeForm;
