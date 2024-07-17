import { ReloadIcon } from "@radix-ui/react-icons";
import { Button, ButtonProps } from "@/components/ui/button";

interface IProps extends ButtonProps {
    loading: boolean;
}

const ButtonLoading: React.FC<IProps> = ({ loading, children, ...rest }) => {
    return (
        <Button disabled={loading} {...rest}>
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </Button>
    );
};

export default ButtonLoading;
