import api from '@/configs/axios';
import { authClient } from '@/lib/auth-client';
import { Loader2Icon } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Home = () => {

    const { data: session } = authClient.useSession()
    const navigate = useNavigate()

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!session?.user) {
                return toast.error('Please sign in to create a project')
            } else if (!input.trim()) {
                return toast.error('Please enter a message')
            }
            setLoading(true)
            const { data } = await api.post('/api/user/project', { initial_prompt: input });
            setLoading(false);
            navigate(`/projects/${data.projectId}`)
        } catch (error: any) {
            setLoading(false);
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }
    }

    return (

        <section className="flex flex-col items-center text-white text-sm pb-20 px-4 font-poppins">

