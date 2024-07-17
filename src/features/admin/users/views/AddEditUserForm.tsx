"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormField,
} from "@/components/ui/form"
import { FormDatePickerField, FormInputField, FormToogleButtonField } from "@/components/ui/custom/forms"
import { ButtonLoading } from "@/components/ui/custom"
import { IUser, IUserForCreationDTO, IUserForUpdateDTO } from "../../models/IUser"
import { format } from "date-fns"

const newRecordformSchema = z.object({
    userName: z.string().min(2, { message: "Username must be at least 2 characters." }),
    rut: z.string().min(5, { message: "Required" }),
    firstName: z.string().min(2, { message: "Required" }),
    lastName: z.string().min(2, { message: "Required" }),
    email: z.string().email({ message: "Invalid email address" }).min(3, { message: "Required" }),
    phone: z.string().min(3, { message: "Required" }),
    address: z.string().min(3, { message: "Required" }),
    birthDate: z.date({ required_error: "Required", message: "Required" }),
    stateId: z.boolean(),
    password: z.string().min(4, { message: "Required" }),
    confirmPassword: z.string().min(4, { message: "Required" }),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
});

const existingRecordformSchema = z.object({
    userName: z.string().min(2, { message: "Username must be at least 2 characters." }),
    rut: z.string().min(5, { message: "Required" }),
    firstName: z.string().min(2, { message: "Required" }),
    lastName: z.string().min(2, { message: "Required" }),
    email: z.string().email({ message: "Invalid email address" }).min(3, { message: "Required" }),
    phone: z.string().min(3, { message: "Required" }),
    address: z.string().min(3, { message: "Required" }),
    birthDate: z.date({ required_error: "Required", message: "Required" }),
    stateId: z.boolean(),
})

interface IProps {
    mode: 'ADD' | 'EDIT'
    user?: IUser
    loading: boolean
    submit: (id: number | null, user: IUserForCreationDTO | IUserForUpdateDTO) => void
}

const AddEditUserForm = ({ user, mode, loading, submit }: IProps) => {
    const formSchema: any = mode === 'ADD' ? newRecordformSchema : existingRecordformSchema
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: mode === 'ADD' ? '' : user!.userName,
            rut: mode === 'ADD' ? '' : user!.rut,
            firstName: mode === 'ADD' ? '' : user!.firstName,
            lastName: mode === 'ADD' ? '' : user!.lastName,
            email: mode === 'ADD' ? '' : user!.email,
            phone: mode === 'ADD' ? '' : user!.phone,
            address: mode === 'ADD' ? '' : user!.address,
            birthDate: mode === 'ADD' ? undefined : user!.birthDate,
            stateId: mode === 'ADD' ? true : user!.stateId === 1,
            password: mode === 'ADD' ? '' : 'abc',
            confirmPassword: mode === 'ADD' ? '' : 'abc',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (mode === 'ADD') {
            const newUser: IUserForCreationDTO = {
                userName: values.userName,
                rut: values.rut,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                address: values.address,
                gender: 0,
                birthDate: format(values.birthDate, 'yyyy-MM-dd'),
                stateId: values.stateId ? 1 : 2,
                password: values.password
            }
            submit(null, newUser)
        }
        else {
            const existingUser: IUserForUpdateDTO = {
                userName: values.userName,
                rut: values.rut,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                address: values.address,
                gender: 0,
                birthDate: format(values.birthDate, 'yyyy-MM-dd'),
                stateId: values.stateId ? 1 : 2
            }
            submit(user!.id, existingUser)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4 -mx-2">
                    <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                            <FormInputField
                                field={field}
                                label="Username"
                                placeholder="userName"
                            // description="This is your public display name."
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rut"
                        render={({ field }) => (
                            <FormInputField
                                field={field}
                                label="UUID"
                                placeholder="rut"
                                description="Your unique identifier as a citizen in your country"
                            />
                        )}
                    />
                    {(mode === 'ADD') && (
                        <>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormInputField
                                        field={field}
                                        label="Password"
                                        // @ts-ignore
                                        type="password"
                                        placeholder="password"
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormInputField
                                        field={field}
                                        label="Re password"
                                        // @ts-ignore
                                        type="password"
                                        placeholder="confirmPassword"
                                    />
                                )}
                            />
                        </>
                    )}
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormInputField
                                field={field}
                                label="First name"
                                placeholder="firstName"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormInputField
                                field={field}
                                label="Last name"
                                placeholder="lastName"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormInputField
                                field={field}
                                label="Email"
                                placeholder="email"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormInputField
                                field={field}
                                label="Phone"
                                placeholder="phone"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormInputField
                                field={field}
                                label="Address"
                                placeholder="address"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                            <FormDatePickerField
                                field={field}
                                label="Date of birth"
                                placeholder="Pick a date"
                            // description="Your date of birth is used to calculate your age."
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stateId"
                        render={({ field }) => (
                            <FormToogleButtonField
                                field={field}
                                label="State"
                                description="Active"
                            />
                        )}
                    />
                </div>
                <div className="col-start-1 col-end-3">
                    <ButtonLoading loading={loading} type="submit">Submit</ButtonLoading>
                </div>
            </form>
        </Form>
    )
}

export default AddEditUserForm;
