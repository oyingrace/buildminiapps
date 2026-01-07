import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { Project } from '../types';
import { iframeScript } from '../assets/assets';
import EditorPanel from './EditorPanel';
import LoaderSteps from './LoaderSteps';

interface ProjectPreviewProps {
    project: Project;
    isGenerating: boolean;
    device?: 'phone' | 'tablet' | 'desktop';
    showEditorPanel?: boolean;
}

export interface ProjectPreviewRef {
    getCode: () => string | undefined;
}

const ProjectPreview = forwardRef<ProjectPreviewRef, ProjectPreviewProps>(({ project, isGenerating, device = 'desktop', showEditorPanel = true }, ref) => {

    const iframeRef = useRef<HTMLIFrameElement>(null)
    const [selectedElement, setSelectedElement] = useState<any>(null)

    const resolutions = {
        phone: 'w-[412px]',
        tablet: 'w-[768px]',
        desktop: 'w-full'
    }

    useImperativeHandle(ref, () => ({
        getCode: () => {
            const doc = iframeRef.current?.contentDocument;
            if (!doc) return undefined;

            // 1. Remove our selection class / attributes / outline from all elements
            doc.querySelectorAll('.ai-selected-element,[data-ai-selected]').forEach((el) => {
                el.classList.remove('ai-selected-element');
                el.removeAttribute('data-ai-selected');
                (el as HTMLElement).style.outline = '';
            })

            // 2. Remove injected style + script from the document
            const previewStyle = doc.getElementById('ai-preview-style');
            if (previewStyle) previewStyle.remove();

            const previewScript = doc.getElementById('ai-preview-script');
            if (previewScript) previewScript.remove()

            // 3. Serialize clean HTML
            const html = doc.documentElement.outerHTML;
            return html;
        }
    }))