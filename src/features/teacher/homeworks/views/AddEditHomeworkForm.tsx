"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormField,
} from "@/components/ui/form"
import { FormInputField, FormComboboxField, FormTextAreaField, FormToogleButtonField, FormDatePickerField } from "@/components/ui/custom/forms"
import { ButtonLoading } from "@/components/ui/custom"
import { IHomeworkDTO, IHomeworkForCreationDTO, IHomeworkForUpdateDTO } from "../../models/IHomework"
import { useSubjects } from "../../hooks"
import { useEffect, useState } from "react"
import { LabelValueDTO } from "@/models/TLabelValueDTO"
import { useTranslation } from "react-i18next"

const formSchema = z.object({
    gradeId: z.string(),
    subjectId: z.string().min(2, { message: "Required" }),
    title: z.string().min(2, { message: "Required" }),
    description: z.string(),
    endsAt: z.date(),
    stateId: z.boolean()

})

interface IProps {
    mode: 'ADD' | 'EDIT'
    homework?: IHomeworkDTO
    loading: boolean
    submit: (id: string | null, homework: IHomeworkForCreationDTO | IHomeworkForUpdateDTO) => void
}

const AddEditHomeworkForm = ({ homework, mode, loading, submit }: IProps) => {

    const { t } = useTranslation()
    
    const [subjectsGradesList, setSubjectsGradesList] = useState<LabelValueDTO<string>[] | null>([])

    const { getWithGradeByTeacherForList, mapSubjectGradesPkFkToLabelValueWithData } = useSubjects()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gradeId: '',
            subjectId: mode === 'ADD' ? '' : homework?.subjectId,
            title: mode === 'ADD' ? '' : homework?.title,
            description: mode === 'ADD' ? '' : homework?.description,
            // estimatedDuration: mode === 'ADD' ? '' : (homework?.estimatedDuration ? homework?.estimatedDuration.toString() : 0),
            endsAt: mode === 'ADD' ? undefined : (homework?.endsAt ? new Date(homework?.endsAt) : undefined),
            stateId: mode === 'ADD' ? true : homework?.stateId === 1
        },
    })

    useEffect(() => {
        loadData()
    }, [mode])

    const loadData = async () => {
        const _listSubjectsGrades = await getWithGradeByTeacherForList()
        const _list = mapSubjectGradesPkFkToLabelValueWithData(_listSubjectsGrades)
        setSubjectsGradesList(_list)
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (mode === 'ADD') {
            const newHomework: IHomeworkForCreationDTO = {
                subjectId: values.subjectId,
                title: values.title,
                description: values.description,
                endsAt: values.endsAt,
                stateId: values.stateId ? 1 : 2
            }
            submit(null, newHomework)
        } else {
            const existingHomework: IHomeworkForUpdateDTO = {
                id: homework!.id,
                subjectId: values.subjectId,
                title: values.title,
                description: values.description,
                endsAt: values.endsAt,
                stateId: values.stateId ? 1 : 2
            }
            submit(homework!.id, existingHomework)
        }
    }

    return (
        <>
            {/* <pre>{JSON.stringify(form.getValues(), null, 4)}</pre> */}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4 -mx-2">

                        {subjectsGradesList &&
                            <FormField
                                control={form.control}
                                name="subjectId"
                                render={({ field }) => (
                                    <FormComboboxField
                                        field={field}
                                        label={t('TEACHERMODULE.FIELDNAMES.SUBJECTGRADE')} // "Subject / Grade"
                                        placeholder="Subject / Grade"
                                        options={subjectsGradesList}
                                    />
                                )}
                            />
                        }

                        <div className="col-start-1 col-end-3">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormInputField
                                        field={field}
                                        label={t('TEACHERMODULE.FIELDNAMES.TITLE')} // "Title"
                                        placeholder="Title"
                                    />
                                )}
                            />
                        </div>

                        <div className="col-start-1 col-end-3">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormTextAreaField
                                        field={field}
                                        label={t('TEACHERMODULE.FIELDNAMES.DESCRIPTION')} // "Description"
                                        placeholder="Description"
                                    />
                                )}
                            />
                        </div>


                        <FormField
                            control={form.control}
                            name="endsAt"
                            render={({ field }) => (
                                <FormDatePickerField
                                    field={field}
                                    label={t('TEACHERMODULE.FIELDNAMES.ENDDATE')} // "Ends at"
                                    placeholder="Pick a date"
                                />
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="stateId"
                            render={({ field }) => (
                                <FormToogleButtonField
                                    field={field}
                                    label={t('TEACHERMODULE.FIELDNAMES.STATE')} // "State"
                                    description={t('TEACHERMODULE.STATES.ACTIVE')}
                                />
                            )}
                        />

                    </div>
                    <div className="col-start-1 col-end-3">
                        <ButtonLoading loading={loading} type="submit">{t('TEACHERMODULE.FIELDNAMES.SAVEBUTTON')}</ButtonLoading>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default AddEditHomeworkForm;
