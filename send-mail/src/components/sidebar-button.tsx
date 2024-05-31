import { Button, ButtonProps } from './ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';


interface SidebarButtonProps extends ButtonProps {
    icon?: LucideIcon;
}

export function SidebarButton({ icon: Icon, className, children, ...props } : SidebarButtonProps) {
    return (
        <Button className={cn('gap-4 justify-start w-full hover:bg-slate-200')} {...props}>
            {Icon && <Icon /> }

            <span>{children}</span>
        </Button>
    )
}