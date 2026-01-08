import React, { useEffect, useState } from 'react'
import type { Project } from '../types';
import { Loader2Icon, PlusIcon, TrashIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dummyProjects } from '../assets/assets';
import Footer from '../components/Footer';
import api from '@/configs/axios';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

const MyProjects = () => {
    const { data: session, isPending } = authClient.useSession()
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([])
    const navigate = useNavigate()

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/api/user/projects')
            setProjects(data.projects)
            setLoading(false)
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    const deleteProject = async (projectId: string) => {
        try {
            const confirm = window.confirm('Are you sure you want to delete this project?');
            if (!confirm) return;
            const { data } = await api.delete(`/api/project/${projectId}`)
            toast.success(data.message);
            fetchProjects()
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        if (session?.user && !isPending) {
            fetchProjects()
        } else if (!isPending && !session?.user) {
            navigate('/');
            toast('Please login to view your projects');
        }
    }, [session?.user])
    return (
    <>
            <div className='px-4 md:px-16 lg:px-24 xl:px-32'>
                {loading ? (
                    <div className='flex items-center justify-center h-[80vh]'>
                        <Loader2Icon className='size-7 animate-spin text-indigo-200' />
                    </div>
                ) : projects.length > 0 ? (
                    <div className='py-10 min-h-[80vh]' >
                        <div className='flex items-center justify-between mb-12'>
                            <h1 className='text-2xl font-medium text-white'>My Projects</h1>
                            <button onClick={() => navigate('/')} className='flex items-center gap-2 text-white px-3 sm:px-6 py-1 sm:py-2 rounded bg-linear-to-br from-indigo-500 to-indigo-600 hover:opacity-90 active:scale-95 transition-all'>
                                <PlusIcon size={18} /> Create New
                            </button>
                        </div>
