"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDebounce } from "use-debounce"
import { useEffect, useState } from "react"
import { z } from "zod"
import {
    Form,
    FormField,
} from "@/components/ui/form"
import { FormDatePickerField, FormInputField, FormTextAreaField, FormToogleButtonField } from "@/components/ui/custom/forms"
import { ButtonLoading, Heading } from "@/components/ui/custom"
import { IGuardianDTO, IGuardianForCreationDTO, IGuardianForUpdateDTO } from "../../models/IGuardian"
import { format } from "date-fns"
import { Separator } from "@/components/ui/separator"
import { useUsers } from "../../hooks"
import { IUserDTO } from "../../models/IUser"
import { useToast } from "@/components/ui/use-toast"

const newRecordformSchema = z.object({
    userName: z.string().min(2, { message: "Username must be at least 2 characters." }),
    rut: z.string().min(2, { message: "Required" }),
    firstName: z.string().min(2, { message: "Required" }),
    lastName: z.string().min(2, { message: "Required" }),
    email: z.string().email({ message: "Invalid email address" }).min(3, { message: "Required" }),
    phone: z.string().min(3, { message: "Required" }),
    address: z.string().min(3, { message: "Required" }),
    birthDate: z.date({ required_error: "Required", message: "Required" }),
    stateId: z.boolean(),
    relation: z.string().min(3, { message: "Required" }),
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
    rut: z.string().min(2, { message: "Required" }),
    firstName: z.string().min(2, { message: "Required" }),
    lastName: z.string().min(2, { message: "Required" }),
    email: z.string().email({ message: "Invalid email address" }).min(3, { message: "Required" }),
    phone: z.string().min(3, { message: "Required" }),
    address: z.string().min(3, { message: "Required" }),
    birthDate: z.date({ required_error: "Required", message: "Required" }),
    stateId: z.boolean(),
    relation: z.string().min(3, { message: "Required" }),
})

interface IProps {
    mode: 'ADD' | 'EDIT'
    guardian?: IGuardianDTO
    loading: boolean
    submit: (id: number | null, guardian: IGuardianForCreationDTO | IGuardianForUpdateDTO) => void
}

const AddEditGuardianForm = ({ guardian, mode, loading, submit }: IProps) => {

    const [user, setUser] = useState<IUserDTO | null>(null)

    const formSchema: any = mode === 'ADD' ? newRecordformSchema : existingRecordformSchema

    const { getUserByRut } = useUsers()

    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: mode === 'ADD' ? '' : guardian?.user.userName,
            rut: mode === 'ADD' ? '' : guardian?.user.rut,
            firstName: mode === 'ADD' ? '' : guardian?.user.firstName,
            lastName: mode === 'ADD' ? '' : guardian?.user.lastName,
            email: mode === 'ADD' ? '' : guardian?.user.email,
            phone: mode === 'ADD' ? '' : guardian?.user.phone,
            address: mode === 'ADD' ? '' : guardian?.user.address,
            // birthDate: mode === 'ADD' ? undefined : (guardian?.user?.birthDate ? new Date(guardian.user.birthDate) : undefined),
            birthDate: mode === 'ADD' ? undefined : new Date(guardian?.user.birthDate!),
            password: mode === 'ADD' ? '' : '',
            confirmPassword: mode === 'ADD' ? '' : '',
            relation: mode === 'ADD' ? '' : guardian!.relation
            // stateId: mode === 'ADD' ? true : guardian!.stateId === 1
        },
    })

    useEffect(() => {
        if (mode === 'EDIT' && guardian) {
            setUser(guardian.user)
        }
    }, [mode, guardian])

    const [rut, setRut] = useState('')
    const [debouncedRut] = useDebounce(rut, 500)

    const handleRutChange = async (rut: string) => {
        const existingUser = await getUserByRut(rut)
        if (!existingUser) {
            const prevSetUser: boolean = user !== null
            setUser(null)
            if (prevSetUser) {
                form.resetField('userName')
                form.resetField('firstName')
                form.resetField('lastName')
                form.resetField('email')
                form.resetField('phone')
                form.resetField('address')
                form.resetField('birthDate')
            }
            return
        }
        if (existingUser) {
            setUser(existingUser)
            toast({
                variant: "default",
                description: "A user with this UUID already exists. Please fill in the remaining fields to create a new user based on this information.",
            })
            console.log('user', existingUser)
            form.setValue('userName', existingUser.userName)
            form.setValue('firstName', existingUser.firstName)
            form.setValue('lastName', existingUser.lastName)
            form.setValue('email', existingUser.email)
            form.setValue('phone', existingUser.phone)
            form.setValue('address', existingUser.address)
            form.setValue('birthDate', existingUser.birthDate)
            form.setValue('rut', existingUser.rut)
        }
    }

    useEffect(() => {
        if (debouncedRut) {
            handleRutChange(debouncedRut)
        }
    }, [debouncedRut])

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (mode === 'ADD') {
            const newGuardian: IGuardianForCreationDTO = {
                relation: values.relation,
                stateId: values.stateId ? 1 : 2,
                user: {
                    userName: values.userName,
                    rut: values.rut,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phone: values.phone,
                    address: values.address,
                    birthDate: format(values.birthDate, 'yyyy-MM-dd'),
                    stateId: values.stateId ? 1 : 2,
                    password: values.password,
                    gender: 0
                }
            }
            submit(null, newGuardian)
        } else {
            const existingGuardian: IGuardianForUpdateDTO = {
                relation: values.relation,
                stateId: values.stateId ? 1 : 2,
            }
            submit(guardian!.id, existingGuardian)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Heading variant="subtitle2">User Info</Heading>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4 -mx-2">
                    <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                            <FormInputField
                                field={field}
                                label="Username"
                                placeholder="userName"
                                disabled={user !== null}
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rut"
                        render={({ field }) => (
                            <FormInputField
                                field={{
                                    ...field,
                                    onChange: (e: any) => {
                                        field.onChange(e)
                                        setRut(e.target.value)
                                    }
                                }}
                                label="UUID"
                                placeholder="rut"
                                description="Your unique identifier as a citizen in your country"
                                disabled={mode === 'EDIT' && user != null}
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
                                        type="password"
                                        placeholder="password"
                                        disabled={user !== null}
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
                                        type="password"
                                        placeholder="confirmPassword"
                                        disabled={user !== null}
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
                                disabled={user !== null}
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
                                disabled={user !== null}
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
                                disabled={user !== null}
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
                                disabled={user !== null}
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
                                disabled={user !== null}
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
                                disabled={user !== null}
                            />
                        )}
                    />
                </div>
                <Separator />
                <Heading variant="subtitle2" className="mt-4">Guardian Info</Heading>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4 -mx-2">
                    <FormField
                        control={form.control}
                        name="relationship"
                        render={({ field }) => (
                            <FormInputField
                                field={field}
                                label="Relationship"
                                placeholder="Relationship"
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

export default AddEditGuardianForm;
