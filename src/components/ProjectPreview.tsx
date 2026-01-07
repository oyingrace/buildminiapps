import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import type { Project } from '../types';
import { iframeScript } from '../assets/assets';
import EditorPanel from './EditorPanel';
import LoaderSteps from './LoaderSteps';