import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface IProps {
    isOpen?: boolean | undefined
    triggerComponent?: React.ReactNode
    title?: string
    content?: React.ReactNode
    cancelActionText?: string
    confirmActionText?: string
    loading?: boolean
    onConfirm: (data: any) => void
    onCancel?: () => void
    data?: any
}

const ConfirmDialog = ({
    isOpen = undefined,
    triggerComponent = 'Open',
    title,
    content,
    cancelActionText = 'Cancel',
    confirmActionText = 'Continue',
    onConfirm,
    onCancel = () => { },
    loading = false,
    data = null
}: IProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={() => { }}>
            <AlertDialogTrigger>{triggerComponent}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {content}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onCancel()}>{cancelActionText}</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onConfirm(data)} disabled={loading}>{confirmActionText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmDialog