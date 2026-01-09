import React from 'react'
import { appPlans } from '../assets/assets';
import Footer from '../components/Footer';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import api from '@/configs/axios';

interface Plan {
    id: string;
    name: string;
    price: string;
    credits: number;
    description: string;
    features: string[];
}


const { data: session } = authClient.useSession()
const [plans] = React.useState<Plan[]>(appPlans)

const handlePurchase = async (planId: string) => {
    try {
        if (!session?.user) return toast('Please login to purchase credits')
        const { data } = await api.post('/api/user/purchase-credits', { planId })
        window.location.href = data.payment_link;
    } catch (error: any) {
        toast.error(error?.response?.data?.message || error.message);
        console.log(error);
    }
}