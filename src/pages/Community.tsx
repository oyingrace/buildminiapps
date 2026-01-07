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
                        <div className='flex flex-wrap gap-3.5'>
                            {projects.map((project) => (
                                <Link
                                    key={project.id}
                                    to={`/view/${project.id}`}
                                    target='_blank'
                                    className='w-72 max-sm:mx-auto cursor-pointer bg-gray-900/60 border border-gray-700 rounded-lg overflow-hidden group hover:border-indigo-800/80 transition-all duration-300'>
                                    {/* Desktop-like Mini Preview */}
                                    <div className='relative w-full h-40 bg-gray-900 overflow-hidden border-b border-gray-800'>
                                        {project.current_code ? (
                                            <iframe
                                                srcDoc={project.current_code}
                                                className='absolute top-0 left-0 w-[1200px] h-[800px] origin-top-left pointer-events-none'
                                                sandbox='allow-scripts allow-same-origin'
                                                style={{ transform: 'scale(0.25)' }} />
                                        )