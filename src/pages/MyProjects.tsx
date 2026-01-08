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
