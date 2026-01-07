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