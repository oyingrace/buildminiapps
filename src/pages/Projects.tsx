import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { Project } from '../types'
import { ArrowBigDownDashIcon, EyeIcon, EyeOffIcon, FullscreenIcon, LaptopIcon, Loader2Icon, MessageSquareIcon, SaveIcon, SmartphoneIcon, TabletIcon, XIcon } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import ProjectPreview, { type ProjectPreviewRef } from '../components/ProjectPreview'
import api from '@/configs/axios'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'


const Projects = () => {
    const { projectId } = useParams()
    const navigate = useNavigate()
    const { data: session, isPending } = authClient.useSession()

    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)

    const [isGenerating, setIsGenerating] = useState(true)
    const [device, setDevice] = useState<'phone' | 'tablet' | 'desktop'>("desktop")

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const previewRef = useRef<ProjectPreviewRef>(null)

    const fetchProject = async () => {
        try {
            const { data } = await api.get(`/api/user/project/${projectId}`);
            setProject(data.project)
            setIsGenerating(data.project.current_code ? false : true)
            setLoading(false)
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message);
            console.log(error);
        }
    }