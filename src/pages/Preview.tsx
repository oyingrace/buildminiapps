import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import ProjectPreview from "../components/ProjectPreview";
import type { Project, Version } from "../types";
import api from "@/configs/axios";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";


const Preview = () => {

    const { data: session, isPending } = authClient.useSession()
    const { projectId, versionId } = useParams()
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);