import MyNavbar from './Navbar'

const Layout = ({children})=>{
    return (
        <>
            <MyNavbar />
            {children}
        </>
    )
}

export default Layout;