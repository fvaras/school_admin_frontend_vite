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
import { FormComboboxField, FormDatePickerField, FormInputField, FormToogleButtonField } from "@/components/ui/custom/forms"
import { ButtonLoading, Heading } from "@/components/ui/custom"
import { IStudentDTO, IStudentForCreationDTO, IStudentForUpdateDTO } from "../../models/IStudent"
import { format } from "date-fns"
import { Separator } from "@/components/ui/separator"
import { useGrades, useGuardians, useUsers } from "../../hooks"
import { IUserDTO } from "../../models/IUser"
import { useToast } from "@/components/ui/use-toast"
import { LabelValueDTO } from "@/models/TLabelValueDTO"
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
    gradeId: z.string().min(3, { message: "Required" }),
    guardian1Id: z.string().optional(),
    guardian2Id: z.string().optional(),
    joiningDate: z.date({ required_error: "Required", message: "Required" }),
    allergies: z.string(),
    bloodGroup: z.string(),
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
    gradeId: z.string().min(3, { message: "Required" }),
    guardian1Id: z.string().optional(),
    guardian2Id: z.string().optional(),
    joiningDate: z.date({ required_error: "Required", message: "Required" }),
    allergies: z.string(),
    bloodGroup: z.string(),
})

interface IProps {
    mode: 'ADD' | 'EDIT'
    student?: IStudentDTO
    loading: boolean
    submit: (id: string | null, student: IStudentForCreationDTO | IStudentForUpdateDTO) => void
}

const AddEditStudentForm = ({ student, mode, loading, submit }: IProps) => {

    const { t } = useTranslation()

    const [user, setUser] = useState<IUserDTO | null>(null)
    const [gradeList, setGradeList] = useState<LabelValueDTO<string>[] | null>(null)
    const [guardianList, setGuardianList] = useState<LabelValueDTO<string>[] | null>(null)

    const formSchema: any = mode === 'ADD' ? newRecordformSchema : existingRecordformSchema

    const { getUserByRut } = useUsers()
    const { getGradesForList } = useGrades()
    const { getGuardiansForList } = useGuardians()

    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: mode === 'ADD' ? '' : student?.user.userName,
            rut: mode === 'ADD' ? '' : student?.user.rut,
            firstName: mode === 'ADD' ? '' : student?.user.firstName,
            lastName: mode === 'ADD' ? '' : student?.user.lastName,
            email: mode === 'ADD' ? '' : student?.user.email,
            phone: mode === 'ADD' ? '' : student?.user.phone,
            address: mode === 'ADD' ? '' : student?.user.address,
            // birthDate: mode === 'ADD' ? undefined : (student?.user?.birthDate ? new Date(student.user.birthDate) : undefined),
            birthDate: mode === 'ADD' ? undefined : (student?.user?.birthDate ? new Date(student.user.birthDate) : undefined),
            password: mode === 'ADD' ? '' : '',
            confirmPassword: mode === 'ADD' ? '' : '',
            gradeId: mode === 'ADD' ? '' : student?.gradeId,
            guardian1Id: mode === 'ADD' ? undefined : student?.guardian1Id,
            guardian2Id: mode === 'ADD' ? undefined : student?.guardian2Id,
            joiningDate: mode === 'ADD' ? undefined : (student?.joiningDate ? new Date(student.joiningDate) : undefined),
            allergies: mode === 'ADD' ? '' : student?.allergies,
            bloodGroup: mode === 'ADD' ? '' : student?.bloodGroup,
            stateId: mode === 'ADD' ? true : student!.stateId === 1
        },
    })

    useEffect(() => {
        loadData()
    }, [student])

    const loadData = async () => {
        const [_gradeList, _guardiansList] = await Promise.all([getGradesForList(), getGuardiansForList('')])
        setGradeList(_gradeList)
        setGuardianList(_guardiansList)

        if (mode === 'EDIT' && student) {
            setUser(student.user)
        }
    }

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
            form.setValue('birthDate', existingUser.birthDate ? new Date(existingUser.birthDate) : undefined)
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

    function onSubmit(values: z.infer<typeof formSchema>) {
        const passwordError = validatePasswordFields(values);
        if (passwordError) {
            form.setError("password", { message: passwordError });
            form.setError("confirmPassword", { message: passwordError });
            return;
        }
        if (mode === 'ADD') {
            const newStudent: IStudentForCreationDTO = {
                gradeId: values.gradeId,
                guardian1Id: values.guardian1Id ?? null,
                guardian2Id: values.guardian2Id ?? null,
                joiningDate: values.joiningDate,
                allergies: values.allergies,
                bloodGroup: values.bloodGroup,
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
            submit(null, newStudent)
        } else {
            const existingStudent: IStudentForUpdateDTO = {
                gradeId: values.gradeId,
                guardian1Id: values.guardian1Id,
                guardian2Id: values.guardian2Id,
                joiningDate: values.joiningDate,
                allergies: values.allergies,
                bloodGroup: values.bloodGroup,
                stateId: values.stateId ? 1 : 2,
            }
            submit(student!.id, existingStudent)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Heading variant="subtitle2">{t('ADMINMODULE.STUDENT.TEXTS.USERINFO')}</Heading>
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
                <Heading variant="subtitle2" className="mt-4">{t('ADMINMODULE.STUDENT.TEXTS.STUDENTINFO')}</Heading>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4 -mx-2">
                    <FormField
                        control={form.control}
                        name="joiningDate"
                        render={({ field }) => (
                            <FormDatePickerField
                                field={field}
                                label={t('ADMINMODULE.FIELDNAMES.ADMISSIONDATE')} //"Joining Date"
                                placeholder="Pick a date"
                            />
                        )}
                    />

                    {gradeList &&
                        <FormField
                            control={form.control}
                            name="gradeId"
                            render={({ field }) => (
                                <FormComboboxField
                                    field={field}
                                    label={t('ADMINMODULE.FIELDNAMES.GRADE')} //"Grade"
                                    placeholder="Current grade"
                                    options={gradeList}
                                />
                            )}
                        />
                    }

                    {guardianList &&
                        <>
                            <FormField
                                control={form.control}
                                name="guardian1Id"
                                render={({ field }) => (
                                    <FormComboboxField
                                        field={field}
                                        label={t('ADMINMODULE.FIELDNAMES.FIRSTGUARDIAN')} //"First Guardian"
                                        placeholder="One of the student guardians"
                                        options={guardianList}
                                    />
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="guardian2Id"
                                render={({ field }) => (
                                    <FormComboboxField
                                        field={field}
                                        label={t('ADMINMODULE.FIELDNAMES.SECONDGUARDIAN')} //"Second Guardian"
                                        placeholder="One of the student guardians"
                                        options={guardianList}
                                    />
                                )}
                            />
                        </>
                    }

                    <FormField
                        control={form.control}
                        name="allergies"
                        render={({ field }) => (
                            <FormInputField
                                field={field}
                                label={t('ADMINMODULE.FIELDNAMES.ALLERGIES')} //"Allergies"
                                placeholder="Allergies"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bloodGroup"
                        render={({ field }) => (
                            <FormInputField
                                field={field}
                                label={t('ADMINMODULE.FIELDNAMES.BLOODGROUP')} //"Blood Group"
                                placeholder="Blood group"
                            />
                        )}
                    />
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
    )
}

export default AddEditStudentForm;
