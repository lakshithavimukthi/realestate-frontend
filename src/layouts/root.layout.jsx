import { NavBar } from "@/components/NavBar";
import { HeroBanner } from '@/components/HeroBanner'
import { Outlet } from "react-router";
import Footer from "@/components/Footer";

function RootLayout() {
    return (<>
        <NavBar />
        <HeroBanner/>
        <Outlet />
        <Footer />
    </>);
}

export default RootLayout;