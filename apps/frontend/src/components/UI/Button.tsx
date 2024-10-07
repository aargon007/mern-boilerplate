import CancelIcon from '@/icons/CancelIcon';
import Loading from '@/icons/Loading';
import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { useNavigate } from 'react-router-dom';

// variants button
const buttonVariants = cva(
    'rounded text-sm text-center font-bold flex items-center justify-center disabled:opacity-30',
    {
        variants: {
            variant: {
                default: 'bg-primary text-white',
                primary: 'bg-secondary text-primary',
                secondary: 'bg-background-100 text-primary'
            },
            size: { default: 'h-12 px-10', icon: 'size-12 min-w-12' },
            width: { max: 'w-max', full: 'w-full' }
        },
        defaultVariants: { variant: 'default', size: 'default', width: 'max' }
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    to?: string;
    loading?: boolean;
    cancelButton?: boolean;
}

// cancel button
export default function Button({
    to,
    variant,
    size,
    width,
    cancelButton,
    loading,
    className,
    onClick,
    children,
    ...props
}: ButtonProps) {
    const navigate = useNavigate();
    if (cancelButton) {
        size = 'icon';
        variant = 'secondary';
    }

    return (
        <button
            {...props}
            onClick={to ? () => navigate(to) : onClick}
            className={cn(buttonVariants({ width, size, variant, className }))}
        >
            {cancelButton && <CancelIcon />}

            {loading && <Loading />}

            {!cancelButton && !loading && children}
        </button>
    );
}
