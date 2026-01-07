import React, { useEffect, useRef, useState } from 'react'
import type { Message, Project, Version } from '../types';
import { BotIcon, EyeIcon, Loader2Icon, SendIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '@/configs/axios';
import { toast } from 'sonner';

interface SidebarProps {
    isMenuOpen: boolean;
    project: Project,
    setProject: (project: Project) => void;
    isGenerating: boolean;
    setIsGenerating: (isGenerating: boolean) => void;
}

const Sidebar = ({ isMenuOpen, project, setProject, isGenerating, setIsGenerating }: SidebarProps) => {

    const messageRef = useRef<HTMLDivElement>(null)
    const [input, setInput] = useState('')

    const fetchProject = async () => {
        try {
            const { data } = await api.get(`/api/user/project/${project.id}`)
            setProject(data.project)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }
    }

    const handleRollback = async (versionId: string) => {
        try {
            const confirm = window.confirm('Are you sure you want to rollback to this version?')
            if (!confirm) return;
            setIsGenerating(true)
            const { data } = await api.get(`/api/project/rollback/${project.id}/${versionId}`);
            const { data: data2 } = await api.get(`/api/user/project/${project.id}`);
            toast.success(data.message)
            setProject(data2.project)
            setIsGenerating(false)

        } catch (error: any) {
            setIsGenerating(false)
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }
    }

    const handleRevisions = async (e: React.FormEvent) => {
        e.preventDefault()
        let interval: number | undefined;
        try {
            setIsGenerating(true);
            interval = setInterval(() => {
                fetchProject();
            }, 10000)
            const { data } = await api.post(`/api/project/revision/${project.id}`, { message: input })
            fetchProject();
            toast.success(data.message)
            setInput('')
            clearInterval(interval)
            setIsGenerating(false);
        } catch (error: any) {
            setIsGenerating(false);
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
            clearInterval(interval)
        }
    }