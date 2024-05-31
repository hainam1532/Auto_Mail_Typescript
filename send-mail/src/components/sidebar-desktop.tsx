import { SidebarButton } from '@/components/sidebar-button';
import { SidebarItems } from '@/types';
import { Separator } from '@/components/ui/separator';
import {Popover, PopoverTrigger} from './ui/popover';
import {Button} from './ui/button';
import Link from 'next/link';
import { Send } from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from './ui/avatar';
import {usePathname} from 'next/navigation';



interface SidebarDesktopProps {
    sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
    const pathname = usePathname();
    
    return (
       <aside className="w-[300px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r-2">
            <div className="h-full px-3 py-4">
                <div className="flex flex-1 gap-2 mx-2 text-lg text-foreground">
                    <Send className='text-blue-400' />
                    <div className='font-extrabold text-gray-500'>Auto - Send Mail System</div>
                </div>
                <div className="mt-8">
                    <div className="flex flex-col gap-4 w-full">
                        {props.sidebarItems.links.map((link, index) => (
                            <Link key={index} href={link.href}>
                                <SidebarButton variant={pathname === link.href ? 'secondary' : 'ghost'} 
                                    className='w-full'
                                    key={index}
                                    icon={link.icon}
                                >
                                    {link.label}
                                </SidebarButton>
                            </Link>
                        ))}
                        {props.sidebarItems.extras}
                    </div>

                    <div className='absolute left-0 bottom-3 w-full px-3'>
                        <Separator className='absolute -top-3 left-0 w-full' />
                        <Popover>
                            <PopoverTrigger>
                                <Button className='w-full justify-start' variant='ghost'>
                                    <div>
                                        <div className='flex gap-2'>
                                            <Avatar>
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>APH - IT Software</AvatarFallback>
                                            </Avatar>
                                            <span>APH - IT Software</span>
                                        </div>
                                    </div>
                                </Button>
                            </PopoverTrigger>
                        </Popover>
                    </div>
                </div>
            </div>
       </aside>
    )
}