import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface IProps {
    isOpen?: boolean | undefined
    triggerComponent?: React.ReactNode
    title?: string
    description?: React.ReactNode
    onCancel?: () => void
    children: React.ReactNode
}

const ContainerDialog = ({
    isOpen = undefined,
    triggerComponent = 'Open',
    title,
    description,
    onCancel = () => { },
    children
}: IProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={() => { }}>
            <DialogTrigger asChild>
                {triggerComponent}
            </DialogTrigger>
            <DialogContent className="w-full overflow-auto">
                <DialogHeader>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                {children}
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={onCancel}>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ContainerDialog