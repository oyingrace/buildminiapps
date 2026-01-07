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
