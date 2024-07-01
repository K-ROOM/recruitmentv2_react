"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const backPage = () => {
    window.location.href="/main"
}

const my_application = () => {
    window.location.href="/my_application"
}

const Navbar = () => {

    return (
        <>
        <div className="container py-2">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                    <div className="flex text-sm bg-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <button type="button" className="text-gray-800 font-medium text-xs py-2text-center" onClick={backPage}>
                            <svg className="w-6 h-6 inline-flex text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="1 2 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                            </svg>
                            <p className="pl-2 inline-flex">back</p>
                        </button>
                    </div>
                    
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" className="text-gray-800 font-medium text-xs py-2 text-center" onClick={my_application}>
                            My Application
                        </button>
                        <button type="button" className="text-gray-800 font-medium text-xs py-2 text-center" onClick={() => signOut({ callbackUrl: 'http://localhost:3001' })}>
                         Log Out
                        </button>
                    </div>
                </div>
            </nav>
        </div>
        </>
    );
};
  
export default Navbar;