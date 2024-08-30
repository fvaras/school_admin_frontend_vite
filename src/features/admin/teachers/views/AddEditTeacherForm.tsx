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
import { ITeacherDTO, ITeacherForCreationDTO, ITeacherForUpdateDTO } from "../../models/ITeacher"
import { format } from "date-fns"
import { Separator } from "@/components/ui/separator"
import { useUsers } from "../../hooks"
import { IUserDTO } from "../../models/IUser"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "react-i18next"

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
    corporative_phone: z.string().min(3, { message: "Required" }),
    corporative_email: z.string().email({ message: "Invalid email address" }).min(3, { message: "Required" }),
    education: z.string().min(5, { message: "Required" }),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
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
    corporative_phone: z.string().min(3, { message: "Required" }),
    corporative_email: z.string().email({ message: "Invalid email address" }).min(3, { message: "Required" }),
    education: z.string().min(5, { message: "Required" }),
})

interface IProps {
    mode: 'ADD' | 'EDIT'
    teacher?: ITeacherDTO
    loading: boolean
    submit: (id: string | null, teacher: ITeacherForCreationDTO | ITeacherForUpdateDTO) => void
}

const AddEditTeacherForm = ({ teacher, mode, loading, submit }: IProps) => {
    const [user, setUser] = useState<IUserDTO | null>(null)

    const { t } = useTranslation()

    const formSchema: any = mode === 'ADD' ? newRecordformSchema : existingRecordformSchema

    const { getUserByRut } = useUsers()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: mode === 'ADD' ? '' : teacher?.user.userName,
            rut: mode === 'ADD' ? '' : teacher?.user.rut,
            firstName: mode === 'ADD' ? '' : teacher?.user.firstName,
            lastName: mode === 'ADD' ? '' : teacher?.user.lastName,
            email: mode === 'ADD' ? '' : teacher?.user.email,
            phone: mode === 'ADD' ? '' : teacher?.user.phone,
            address: mode === 'ADD' ? '' : teacher?.user.address,
            birthDate: mode === 'ADD' ? undefined : (teacher?.user?.birthDate ? new Date(teacher.user.birthDate) : undefined),
            password: '',
            confirmPassword: '',
            corporative_phone: mode === 'ADD' ? '' : teacher!.contactPhone,
            corporative_email: mode === 'ADD' ? '' : teacher!.contactEmail,
            education: mode === 'ADD' ? '' : teacher!.education,
            stateId: mode === 'ADD' ? true : teacher!.stateId === 1
        },
    })

    useEffect(() => {
        if (mode === 'EDIT' && teacher) {
            setUser(teacher.user)
        }
    }, [mode, teacher])

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
                form.resetField('password')
                form.resetField('confirmPassword')
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
            form.setValue('birthDate', existingUser.birthDate ? new Date(existingUser.birthDate) : null)
            form.setValue('rut', existingUser.rut)
        }
    }

    useEffect(() => {
        if (debouncedRut) {
            handleRutChange(debouncedRut)
        }
    }, [debouncedRut])

    const validatePasswordFields = (values: z.infer<typeof formSchema>) => {
        if (!user && (!values.password || !values.confirmPassword)) {
            return "Password and confirm password are required";
        }
        if (values.password !== values.confirmPassword) {
            return "Passwords do not match";
        }
        return null;
    }

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const passwordError = validatePasswordFields(values);
        if (passwordError) {
            form.setError("password", { message: passwordError });
            form.setError("confirmPassword", { message: passwordError });
            return;
        }
        if (mode === 'ADD') {
            const newTeacher: ITeacherForCreationDTO = {
                contactEmail: values.corporative_email,
                contactPhone: values.corporative_phone,
                education: values.education,
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
            submit(null, newTeacher)
        } else {
            const existingTeacher: ITeacherForUpdateDTO = {
                contactEmail: values.corporative_email,
                contactPhone: values.corporative_phone,
                education: values.education,
                stateId: values.stateId ? 1 : 2,
            }
            submit(teacher!.id, existingTeacher)
        }
    }

    return (
        <>
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
                                    label={t('ADMINMODULE.FIELDNAMES.USERNAME')} //"Username"
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
                                    label={t('ADMINMODULE.FIELDNAMES.UUIDRUT')} //"UUID"
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
                                            label={t('ADMINMODULE.FIELDNAMES.PASSWORD')} //"Password"
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
                                            label={t('ADMINMODULE.FIELDNAMES.REPASSWORD')} //"Re password"
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
                                    label={t('ADMINMODULE.FIELDNAMES.NAME')} //"First name"
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
                                    label={t('ADMINMODULE.FIELDNAMES.LASTNAME')} //"Last name"
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
                                    label={t('ADMINMODULE.FIELDNAMES.EMAIL')} //"Email"
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
                                    label={t('ADMINMODULE.FIELDNAMES.PHONE')} //"Phone"
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
                                    label={t('ADMINMODULE.FIELDNAMES.ADDRESS')} //"Address"
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
                                    label={t('ADMINMODULE.FIELDNAMES.BIRTHDATE')} //"Date of birth"
                                    placeholder="Pick a date"
                                    disabled={user !== null}
                                />
                            )}
                        />
                    </div>
                    <Separator />
                    <Heading variant="subtitle2" className="mt-4">{t('ADMINMODULE.TEACHER.TEXTS.TEACHER_INFO')}</Heading>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4 -mx-2">
                        <FormField
                            control={form.control}
                            name="corporative_phone"
                            render={({ field }) => (
                                <FormInputField
                                    field={field}
                                    label={t('ADMINMODULE.FIELDNAMES.PHONE')} //"Corporative phone"
                                    placeholder="phone"
                                />
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="corporative_email"
                            render={({ field }) => (
                                <FormInputField
                                    field={field}
                                    label={t('ADMINMODULE.FIELDNAMES.EMAIL')} //"Corporative email"
                                    placeholder="email"
                                />
                            )}
                        />
                        <div className="col-start-1 col-end-3">
                            <FormField
                                control={form.control}
                                name="education"
                                render={({ field }) => (
                                    <FormTextAreaField
                                        field={field}
                                        label={t('ADMINMODULE.FIELDNAMES.EDUCATION')} //"Education Level"
                                        placeholder="Education Level: This information will be displayed to students and their guardians."
                                    />
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="stateId"
                            render={({ field }) => (
                                <FormToogleButtonField
                                    field={field}
                                    label={t('ADMINMODULE.FIELDNAMES.STATE')} //"State"
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

export default AddEditTeacherForm;

