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