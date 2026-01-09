import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { dummyProjects } from "../assets/assets";
import { Loader2Icon } from "lucide-react";
import ProjectPreview from "../components/ProjectPreview";
import type { Project } from "../types";
import api from "@/configs/axios";
import { toast } from "sonner";

const View = () => {
    const { projectId } = useParams();
    const [code, setCode] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchCode = async () => {
    try {
      const { data } = await api.get(`/api/project/published/${projectId}`);
      setCode(data.code)
      setLoading(false)