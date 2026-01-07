import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { authClient } from '@/lib/auth-client';
import { UserButton } from '@daveyplate/better-auth-ui'
import api from '@/configs/axios';
import { toast } from 'sonner';