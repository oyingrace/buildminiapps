import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { authClient } from '@/lib/auth-client';
import { UserButton } from '@daveyplate/better-auth-ui'
import api from '@/configs/axios';
import { toast } from 'sonner';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const navigate = useNavigate()
    const [credits, setCredits] = useState(0)

    const { data: session } = authClient.useSession()

    const getCredits = async () => {
        try {
            const { data } = await api.get('/api/user/credits');
            setCredits(data.credits)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message)
            console.log(error);
        }
    }

    useEffect(() => {
        if (session?.user) {
            getCredits()
        }
    }, [session?.user])

    eturn(
    <>
            <nav className="z-50 flex items-center justify-between w-full py-4 px-4 md:px-16 lg:px-24 xl:px-32 backdrop-blur border-b text-white border-slate-800">
                <Link to='/'>
                    <img src={assets.logo} alt="logo" className='h-5 sm:h-7' />
                </Link>

                <div className="hidden md:flex items-center gap-8 transition duration-500">
                    <Link to='/'>Home</Link>
                    <Link to='/projects'>My Projects</Link>
                    <Link to='/community'>Community</Link>
                    <Link to='/pricing'>Pricing</Link>

                </div>