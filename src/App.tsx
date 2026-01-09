import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Projects from './pages/Projects'
import MyProjects from './pages/MyProjects'
import Preview from './pages/Preview'
import Community from './pages/Community'
import View from './pages/View'
import Navbar from './components/Navbar'
import { Toaster } from 'sonner'
import AuthPage from './pages/auth/AuthPage'
import Settings from './pages/Settings'
import Loading from './pages/Loading'


const App = () => {

    const { pathname } = useLocation()