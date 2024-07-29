"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormField,
} from "@/components/ui/form"
import { FormInputField, FormComboboxField, FormTextAreaField } from "@/components/ui/custom/forms"
import { ButtonLoading, Heading } from "@/components/ui/custom"
import { IPlanningDTO, IPlanningForCreationDTO, IPlanningForUpdateDTO } from "../../models/IPlanning"
import { useGrades, useSubjects } from "../../hooks"
import { useEffect, useState } from "react"
import { LabelValueDTO } from "@/models/TLabelValueDTO"

const formSchema = z.object({
    gradeId: z.string(),
    subjectId: z.string().min(2, { message: "Required" }),
    title: z.string().min(2, { message: "Required" }),
    description: z.string(),
    expectedLearning: z.string(),
    contents: z.string(),
    activities: z.string(),
    resources: z.string(),
    evaluationPlan: z.string(),
    estimatedDuration: z.string(),
})

interface IProps {
    mode: 'ADD' | 'EDIT'
    planning?: IPlanningDTO
    loading: boolean
    submit: (id: string | null, planning: IPlanningForCreationDTO | IPlanningForUpdateDTO) => void
}

const AddEditPlanningForm = ({ planning, mode, loading, submit }: IProps) => {

    const [subjectList, setSubjectsList] = useState<LabelValueDTO<string>[] | null>([])
    const [gradesList, setGradesList] = useState<LabelValueDTO<string>[] | null>([])

    const { getByGradeAndTeacherForList } = useSubjects()
    const { getGradesForListByTeacher } = useGrades()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gradeId: '',
            subjectId: mode === 'ADD' ? '' : planning?.subjectId,
            title: mode === 'ADD' ? '' : planning?.title,
            description: mode === 'ADD' ? '' : planning?.description,
            expectedLearning: mode === 'ADD' ? '' : planning?.expectedLearning,
            contents: mode === 'ADD' ? '' : planning?.contents,
            activities: mode === 'ADD' ? '' : planning?.activities,
            resources: mode === 'ADD' ? '' : planning?.resources,
            evaluationPlan: mode === 'ADD' ? '' : planning?.evaluationPlan,
            // estimatedDuration: mode === 'ADD' ? '' : (planning?.estimatedDuration ? planning?.estimatedDuration.toString() : 0),
            estimatedDuration: mode === 'ADD' ? '' : '0',
        },
    })

    useEffect(() => {
        loadData()
    }, [mode])

    const loadData = async () => {
        const _gradeList = await getGradesForListByTeacher()
        setGradesList(_gradeList)
    }

    const handleGradeChange = async (gradeId: string) => {
        const _subjectList = await getByGradeAndTeacherForList(gradeId)
        setSubjectsList(_subjectList)
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (mode === 'ADD') {
            const newPlanning: IPlanningForCreationDTO = {
                subjectId: values.subjectId,
                title: values.title,
                description: values.description,
                expectedLearning: values.expectedLearning,
                contents: values.contents,
                activities: values.activities,
                resources: values.resources,
                evaluationPlan: values.evaluationPlan,
                // estimatedDuration: values.estimatedDuration ? { ticks: Number(values.estimatedDuration) } : null,
                // estimatedDuration: null,
            }
            submit(null, newPlanning)
        } else {
            const existingPlanning: IPlanningForUpdateDTO = {
                id: planning!.id,
                subjectId: values.subjectId,
                title: values.title,
                description: values.description,
                expectedLearning: values.expectedLearning,
                contents: values.contents,
                activities: values.activities,
                resources: values.resources,
                evaluationPlan: values.evaluationPlan,
                // estimatedDuration: values.estimatedDuration ? { ticks: Number(values.estimatedDuration) } : null,
                // estimatedDuration: null,
            }
            submit(planning!.id, existingPlanning)
        }
    }

    return (
        <>
            {/* <pre>{JSON.stringify(form.getValues(), null, 4)}</pre> */}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Heading variant="subtitle2">User Info</Heading>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4 -mx-2">

                        {gradesList &&
                            <FormField
                                control={form.control}
                                name="gradeId"
                                render={({ field }) => (
                                    <FormComboboxField
                                        field={field}
                                        label="Grade"
                                        placeholder="Grade"
                                        options={gradesList}
                                        onChange={async (value) => await handleGradeChange(value as string)}
                                    />
                                )}
                            />
                        }

                        {subjectList &&
                            <FormField
                                control={form.control}
                                name="subjectId"
                                render={({ field }) => (
                                    <FormComboboxField
                                        field={field}
                                        label="Subject"
                                        placeholder="Subject"
                                        options={subjectList}
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
                                        label="Title"
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
                                        label="Description"
                                        placeholder="Description"
                                    />
                                )}
                            />
                        </div>

                        <div className="col-start-1 col-end-3">
                            <FormField
                                control={form.control}
                                name="expectedLearning"
                                render={({ field }) => (
                                    <FormTextAreaField
                                        field={field}
                                        label="Expected learning"
                                        placeholder=""
                                    />
                                )}
                            />
                        </div>
                        <div className="col-start-1 col-end-3">
                            <FormField
                                control={form.control}
                                name="contents"
                                render={({ field }) => (
                                    <FormTextAreaField
                                        field={field}
                                        label="Contents"
                                        placeholder=""
                                    />
                                )}
                            />
                        </div>
                        <div className="col-start-1 col-end-3">
                            <FormField
                                control={form.control}
                                name="activities"
                                render={({ field }) => (
                                    <FormTextAreaField
                                        field={field}
                                        label="Activities"
                                        placeholder=""
                                    />
                                )}
                            />
                        </div>
                        <div className="col-start-1 col-end-3">
                            <FormField
                                control={form.control}
                                name="resources"
                                render={({ field }) => (
                                    <FormTextAreaField
                                        field={field}
                                        label="Resources"
                                        placeholder=""
                                    />
                                )}
                            />
                        </div>
                        <div className="col-start-1 col-end-3">
                            <FormField
                                control={form.control}
                                name="evaluationPlan"
                                render={({ field }) => (
                                    <FormTextAreaField
                                        field={field}
                                        label="Evaluation plan"
                                        placeholder=""
                                    />
                                )}
                            />
                        </div>
                        {/* <div className="col-start-1 col-end-3"> */}
                        <FormField
                            control={form.control}
                            name="estimatedDuration"
                            render={({ field }) => (
                                <FormInputField
                                    field={field}
                                    label="Estimated duration"
                                    placeholder="10"
                                />
                            )}
                        />
                        {/* </div> */}

                    </div>
                    <div className="col-start-1 col-end-3">
                        <ButtonLoading loading={loading} type="submit">Submit</ButtonLoading>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default AddEditPlanningForm;
