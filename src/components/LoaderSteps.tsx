import { CircleIcon, ScanLineIcon, SquareIcon, TriangleIcon } from "lucide-react"
import { useEffect, useState } from "react"

const steps = [
    { icon: ScanLineIcon, label: "Analyzing your request…" },
    { icon: SquareIcon, label: "Generating layout structure…" },
    { icon: TriangleIcon, label: "Assembling UI components…" },
    { icon: CircleIcon, label: "Finalizing your website…" },
]

const STEP_DURATION = 45000

const LoaderSteps = () => {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((s) => (s + 1) % steps.length)
        }, STEP_DURATION);
        return () => clearInterval(interval)
    }, [])
    const Icon = steps[current].icon;