import MyNavbar from './Navbar'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice';

const Layout = ({children})=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        localStorage.setItem('user', null)
        const user = JSON.parse(localStorage.getItem('user'))
        console.log('cookie user', user)
        dispatch(setUser(user))
    }, [])
    return (
        <>
            <MyNavbar />
            {children}
        </>
    )
}

export default Layout;