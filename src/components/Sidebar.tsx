import React, { useEffect, useRef, useState } from 'react'
import type { Message, Project, Version } from '../types';
import { BotIcon, EyeIcon, Loader2Icon, SendIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '@/configs/axios';
import { toast } from 'sonner';