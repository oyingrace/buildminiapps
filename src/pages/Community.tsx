import React, { useEffect, useState } from 'react'
import type { Project } from '../types';
import { Loader2Icon, PlusIcon, TrashIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import api from '@/configs/axios';
import { toast } from 'sonner';

const Community = () => {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([])
    const navigate = useNavigate()

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/api/project/published');
            setProjects(data.projects);
            setLoading(false);
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data?.message || error.message);
        }
    }
    useEffect(() => {
        fetchProjects()
    }, [])
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
                            <h1 className='text-2xl font-medium text-white'>Published Projects</h1>
                        </div>