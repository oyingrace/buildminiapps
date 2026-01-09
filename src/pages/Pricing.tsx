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

const Pricing = () => {

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

    return (
    <>
            <div className='w-full max-w-5xl mx-auto z-20 max-md:px-4 min-h-[80vh]'>
                <div className='text-center mt-16'>
                    <h2 className='text-gray-100 text-3xl font-medium'>Choose Your Plan</h2>
                    <p className='text-gray-400 text-sm max-w-md mx-auto mt-2'>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
                </div>
                <div className='pt-14 py-4 px-4 '>
                    <div className='grid grid-cols-1 md:grid-cols-3 flex-wrap gap-4'>
                        {plans.map((plan, idx) => (
                            <div key={idx} className="p-6 bg-black/20 ring ring-indigo-950 mx-auto w-full max-w-sm rounded-lg text-white shadow-lg hover:ring-indigo-500 transition-all duration-400">
                                <h3 className="text-xl font-bold">{plan.name}</h3>
                                <div className="my-2">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-gray-300"> / {plan.credits} credits</span>
                                </div>