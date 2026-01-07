import { CircleIcon, ScanLineIcon, SquareIcon, TriangleIcon } from "lucide-react"
import { useEffect, useState } from "react"

const steps = [
    { icon: ScanLineIcon, label: "Analyzing your request…" },
    { icon: SquareIcon, label: "Generating layout structure…" },
    { icon: TriangleIcon, label: "Assembling UI components…" },
    { icon: CircleIcon, label: "Finalizing your website…" },
]