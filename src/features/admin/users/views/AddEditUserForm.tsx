"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { FormDatePickerField, FormInputField, FormToogleButtonField } from "@/components/ui/custom/forms"

const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    rut: z.string().min(5, { message: "Required" }),
    firstName: z.string().min(2, { message: "Required" }),
    lastName: z.string().min(2, { message: "Required" }),
    email: z.string().email({ message: "Invalid email address" }).min(3, { message: "Required" }),
    phone: z.string().min(3, { message: "Required" }),
    address: z.string().min(3, { message: "Required" }),
    birthDate: z.date({ required_error: "Required", message: "Required" }),
    stateId: z.boolean(),
})

const AddEditUserForm = () => {

    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        // defaultValues: {
        //     username: "",
        //     rut: "",
        //     firstName: "",
        //     lastName: "",
        //     email: "",
        //     phone: "",
        //     address: "",
        //     birthDate: undefined,//new Date(),
        //     stateId: true,
        // },
        defaultValues: {
            username: "fvaras",
            rut: "15987640-4",
            firstName: "Fernando",
            lastName: "Varas",
            email: "fdovarasc@gmail.com",
            phone: "99999999",
            address: "Mi casita linda",
            birthDate: new Date(),
            stateId: true,
        },
    })

    const stateOptions = [
        { value: 1, label: "State 1" },
        { value: 2, label: "State 2" },
        { value: 3, label: "State 3" },
    ];

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('yeah!', values)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-4 -mx-2"
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormInputField
                            field={field}
                            label="Username"
                            placeholder="username"
                            description="This is your public display name."
                        />
                    )}
                />
                <FormField
                    control={form.control}
                    name="rut"
                    render={({ field }) => (
                        <FormInputField
                            field={field}
                            label="Rut"
                            placeholder="rut"
                            description="This is your public rut."
                        />
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormInputField
                            field={field}
                            label="FirstName"
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
                            label="LastName"
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
                    name="stateId"
                    render={({ field }) => (
                        <FormToogleButtonField
                            field={field}
                            label="State"
                            description="Active"
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
                            description="Your date of birth is used to calculate your age."
                        />
                    )}
                />
                <div className="col-start-1 col-end-3">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    )
}

export default AddEditUserForm;
