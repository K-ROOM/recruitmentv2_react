"use client";

import Link from "next/link";

const FormSignup_Navbar = () => {

    return (
        <>
            <nav className="dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                    <div className="flex text-sm text-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <Link href="" as={`/login`} className="btn btn-navy px-4 w-fit sm:w-full">
                            <svg className="w-6 h-6 inline-flex text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="1 2 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                            </svg>
                            Back
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default FormSignup_Navbar;