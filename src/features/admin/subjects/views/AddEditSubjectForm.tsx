"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormField,
} from "@/components/ui/form"
import { FormInputField, FormToogleButtonField, FormComboboxField } from "@/components/ui/custom/forms"
import { ButtonLoading, Heading } from "@/components/ui/custom"
import { ISubjectDTO, ISubjectForCreationDTO, ISubjectForUpdateDTO } from "../../models/ISubject"
import { useGrades, useSubjects, useTeachers } from "../../hooks"
import { useEffect, useState } from "react"
import { LabelValueDTO } from "@/models/TLabelValueDTO"
import { useTranslation } from "react-i18next"

const formSchema = z.object({
    name: z.string().min(2, { message: "Required" }),
    color: z.string(),
    gradeId: z.string(),
    teacherId: z.string(),
    stateId: z.boolean(),
})

interface IProps {
    mode: 'ADD' | 'EDIT'
    subject?: ISubjectDTO
    loading: boolean
    submit: (id: string | null, subject: ISubjectForCreationDTO | ISubjectForUpdateDTO) => void
}

const AddEditSubjectForm = ({ subject, mode, loading, submit }: IProps) => {

    const [teachersList, setTeachersList] = useState<LabelValueDTO<string>[] | null>(null)
    const [gradesList, setGradesList] = useState<LabelValueDTO<string>[] | null>(null)

    const { t } = useTranslation()
    
    const { getTeachersId } = useSubjects()
    const { getTeachersForList } = useTeachers()
    const { getGradesForList } = useGrades()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: mode === 'ADD' ? '' : subject?.name,
            color: mode === 'ADD' ? '' : (subject?.color ? subject?.color : ''),
            gradeId: mode === 'ADD' ? '' : subject?.gradeId,
            teacherId: mode === 'ADD' ? '' : subject?.teacherId,
            stateId: mode === 'ADD' ? true : subject?.stateId === 1
        },
    })

    useEffect(() => {
        loadData()
    }, [mode])

    const loadData = async () => {
        const [_gradeList, _teachersList] = await Promise.all([getGradesForList(), getTeachersForList()])
        setGradesList(_gradeList)
        setTeachersList(_teachersList)
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (mode === 'ADD') {
            const newSubject: ISubjectForCreationDTO = {
                name: values.name,
                color: values.color,
                gradeId: values.gradeId,
                teacherId: values.teacherId,
                stateId: values.stateId ? 1 : 2,
            }
            submit(null, newSubject)
        } else {
            const existingSubject: ISubjectForUpdateDTO = {
                name: values.name,
                color: values.color,
                gradeId: values.gradeId,
                teacherId: values.teacherId,
                stateId: values.stateId ? 1 : 2,
            }
            submit(subject!.id, existingSubject)
        }
    }

    return (
        <>
            {/* <pre>{JSON.stringify(form.getValues(), null, 4)}</pre> */}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4 -mx-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormInputField
                                    field={field}
                                    label={t('ADMINMODULE.FIELDNAMES.NAME')} // "Name"
                                    placeholder="name"
                                />
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormInputField
                                    field={field}
                                    label={t('ADMINMODULE.FIELDNAMES.COLOR')} // "Color"
                                    placeholder="color"
                                    type='color'
                                />
                            )}
                        />
                        {gradesList &&
                            <FormField
                                control={form.control}
                                name="gradeId"
                                render={({ field }) => (
                                    <FormComboboxField
                                        field={field}
                                        label={t('ADMINMODULE.FIELDNAMES.GRADE')} // "Grade"
                                        placeholder="Grade"
                                        options={gradesList}
                                    />
                                )}
                            />
                        }

                        {teachersList &&
                            <FormField
                                control={form.control}
                                name="teacherId"
                                render={({ field }) => (
                                    <FormComboboxField
                                        field={field}
                                        label={t('ADMINMODULE.FIELDNAMES.MAINTEACHER')} // "Main Teacher"
                                        placeholder="Main teacher"
                                        options={teachersList}
                                    />
                                )}
                            />
                        }

                        <FormField
                            control={form.control}
                            name="stateId"
                            render={({ field }) => (
                                <FormToogleButtonField
                                    field={field}
                                    label={t('ADMINMODULE.FIELDNAMES.STATE')} // "State"
                                    description={t('ADMINMODULE.STATES.ACTIVE')}
                                />
                            )}
                        />
                    </div>
                    <div className="col-start-1 col-end-3">
                        <ButtonLoading loading={loading} type="submit">{t('ADMINMODULE.FIELDNAMES.SAVEBUTTON')}</ButtonLoading>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default AddEditSubjectForm;
