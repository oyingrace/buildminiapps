import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react'

interface EditorPanelProps {
    selectedElement: {
        tagName: string;
        className: string;
        text: string;
        styles: {
            padding: string;
            margin: string;
            backgroundColor: string;
            color: string;
            fontSize: string;
        };
    } | null;
    onUpdate: (updates: any) => void;
    onClose: () => void;
}

const handleChange = (field: string, value: string) => {
    const newValues = { ...values, [field]: value };
    if (field in values.styles) {
        newValues.styles = { ...values.styles, [field]: value }
    }
    setValues(newValues)
    onUpdate({ [field]: value });
}

const handleStyleChange = (styleName: string, value: string) => {
    const newStyles = { ...values.styles, [styleName]: value };
    setValues({ ...values, styles: newStyles });
    onUpdate({ styles: { [styleName]: value } })
}

return (
    <div className='absolute top-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 animate-fade-in fade-in'>
        <div className='flex justify-between items-center mb-4'>
            <h3 className='font-semibold text-gray-800'>Edit Element</h3>
            <button onClick={onClose} className='p-1 hover:bg-gray-100 rounded-full'>
                <X className='w-4 h-4 text-gray-500' />
            </button>
        </div>