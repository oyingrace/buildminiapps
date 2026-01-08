import { Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'

const Loading = () => {

    useEffect(() => {
        setTimeout(() => {
            window.location.href = '/'
        }, 6000)
    }, [])