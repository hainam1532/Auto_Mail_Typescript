'use client'

import {Home, Mail, MoreHorizontal} from 'lucide-react';
import { SidebarDesktop } from './sidebar-desktop';
import { SidebarItems } from '@/types';
import { SidebarButton } from './sidebar-button';


const sidbarItems: SidebarItems = {
    links: [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Mail Assemby', href: '/mailassembly', icon: Mail },
        { label: 'Mail Stitching', href: '/mailstitching', icon: Mail },
        { label: 'Mail Summary Production', href: '/mailsummary', icon: Mail },
        { label: 'Mail AEQS', href: '/mailaeqs', icon: Mail },
        { label: 'Mail TPM', href: '/mailtpm', icon: Mail },
        { label: 'Mail DB-Oracle capacity', href: '/mailoracledb', icon: Mail },
    ],
    extras: (
        <div className='flex flex-col gap-2'>
            <SidebarButton icon={MoreHorizontal} className='w-full' variant='ghost'>
                More
            </SidebarButton>
        </div>
    )
}


export function Sidebar() {
    return ( 

        <SidebarDesktop sidebarItems={sidbarItems}/>
        
    )
}