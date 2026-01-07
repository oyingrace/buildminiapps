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