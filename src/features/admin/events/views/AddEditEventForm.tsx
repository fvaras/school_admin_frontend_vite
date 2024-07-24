"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormField,
} from "@/components/ui/form"
import { FormInputField, FormToogleButtonField, FormComboboxField, FormDatePickerField, FormTextAreaField } from "@/components/ui/custom/forms"
import { ButtonLoading, Heading } from "@/components/ui/custom"
import { ICalendarEventDTO, ICalendarEventForCreationDTO, ICalendarEventForUpdateDTO } from "../../models/IEvent"
import { useEvents } from "../../hooks"
import { useEffect, useState } from "react"
import { LabelValueDTO } from "@/models/TLabelValueDTO"
import { format } from "date-fns"

const formSchema = z.object({
    title: z.string().min(2, { message: "Required" }),
    startDate: z.date({ required_error: "Required", message: "Required" }),
    endDate: z.date({ required_error: "Required", message: "Required" }),
    type: z.number().min(0, { message: "Required" }),
    details: z.string(),
})

interface IProps {
    mode: 'ADD' | 'EDIT'
    event?: ICalendarEventDTO
    loading: boolean
    submit: (id: string | null, event: ICalendarEventForCreationDTO | ICalendarEventForUpdateDTO) => void
}

const AddEditEventForm = ({ event, mode, loading, submit }: IProps) => {

    const [eventTypesList, setEventTypesList] = useState<LabelValueDTO<number>[] | null>(null)

    const { getEventTypes } = useEvents()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: mode === 'ADD' ? '' : event?.title,
            startDate: mode === 'ADD' ? undefined : (event!.startDate ? new Date(event!.startDate) : undefined),
            endDate: mode === 'ADD' ? undefined : (event!.endDate ? new Date(event!.endDate) : undefined),
            type: mode === 'ADD' ? undefined : event?.type,
            details: mode === 'ADD' ? '' : event?.details
        },
    })

    useEffect(() => {
        loadData()
    }, [mode])

    const loadData = async () => {
        const [_eventTypesList] = await Promise.all([getEventTypes()])
        setEventTypesList(_eventTypesList)

        if (mode === 'EDIT')
            form.setValue('type', event?.type!)
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (mode === 'ADD') {
            const newEvent: ICalendarEventForCreationDTO = {
                title: values.title,
                startDate: values.startDate,
                endDate: values.endDate,
                startISODate: format(values.startDate, 'yyyyMMddHHmmss'),
                endISODate: format(values.endDate, 'yyyyMMddHHmmss'),
                type: values.type,
                details: values.details,
                stateId: 1,
                calendarId: '0cd91eac-3acb-4538-9377-d6be9bf5a7ec'  // TODO: In order to work with the main calendar
            }
            submit(null, newEvent)
        } else {
            const existingEvent: ICalendarEventForUpdateDTO = {
                title: values.title,
                startDate: values.startDate,
                endDate: values.endDate,
                startISODate: format(values.startDate, 'yyyyMMddHHmmss'),
                endISODate: format(values.endDate, 'yyyyMMddHHmmss'),
                type: values.type,
                details: values.details,
                stateId: 1,
                calendarId: '0cd91eac-3acb-4538-9377-d6be9bf5a7ec'  // TODO: In order to work with the main calendar
            }
            submit(event!.id, existingEvent)
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
                            name="title"
                            render={({ field }) => (
                                <FormInputField
                                    field={field}
                                    label="Title"
                                    placeholder="A new funny activity"
                                />
                            )}
                        />
                        
                        {eventTypesList &&
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormComboboxField
                                        field={field}
                                        label="Type"
                                        placeholder="Event type"
                                        options={eventTypesList}
                                    />
                                )}
                            />
                        }

                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormDatePickerField
                                    field={field}
                                    label="Start date"
                                    placeholder="Pick a date"
                                />
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormDatePickerField
                                    field={field}
                                    label="End date"
                                    placeholder="Pick a date"
                                />
                            )}
                        />
                        <div className="col-start-1 col-end-3">
                            <FormField
                                control={form.control}
                                name="details"
                                render={({ field }) => (
                                    <FormTextAreaField
                                        field={field}
                                        label="Details"
                                        placeholder="More information about the event"
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

export default AddEditEventForm;
