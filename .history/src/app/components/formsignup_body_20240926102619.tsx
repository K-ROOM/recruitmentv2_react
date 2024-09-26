"use client";
import { Fragment, useState } from "react";
import { CheckAccount, CreateAccount } from "../actions/actionMain";
import { LuPencilLine, LuClipboardSignature } from "react-icons/lu";
import { IoClipboardOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const FormSignup_Body = () => {

    const [formData, setformData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        firstnameEN: "",
        lastnameEN: "",
    });

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);

    const [visibleUsername, setVisibleUsername] = useState(false);
    const [visibleConfirmPwd, setVisibleConfirmPwd] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const handleChangeHeader = async (e: any) => {
        const { name, value } = e.target;
        const inputText = e.target.value;
        const englishOnly = inputText.replaceAll(/[^a-zA-Z\s]/g, '');

        if (name === 'firstnameEN') {
            setformData((prevData) => ({
                ...prevData,
                [name]: englishOnly,
            }));
        } else if (name === 'lastnameEN') {
            setformData((prevData) => ({
                ...prevData,
                [name]: englishOnly,
            }));
        } else {
            setformData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }


        if (name === 'username') {
            if (value !== '') {
                const result = await CheckAccount(value);
                if (result !== null && result !== '') {
                    setVisibleUsername(true);
                } else {
                    setVisibleUsername(false);
                }
            }
        }

        if (name === 'password') {
            if (value !== '') {
                if (value === formData.confirmPassword) {
                    setVisibleConfirmPwd(true);
                } else {
                    setVisibleConfirmPwd(false);
                }
            }
        }

        if (name === 'confirmPassword') {
            if (value !== '') {
                if (value === formData.password) {
                    setVisibleConfirmPwd(true);
                } else {
                    setVisibleConfirmPwd(false);
                }
            }
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await CreateAccount(formData);
            setShowModal(true);
            setSubmitStatus(true);
            setTimeout(() => {
                setShowModal(false);
                window.location.href = '/login';
            }, 3000)
        } catch (err) {
            setShowModal(true);
            setSubmitStatus(false);
            setTimeout(() => {
                setShowModal(false);
            }, 3000)
        }
    };

    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="flex justify-between p-2 sticky top-0 bg-stone-100 z-10 px-8 sm:px-4">
                    <Link href="" as={`/login`} className="btn btn-navy px-4 w-fit sm:w-full">
                        <svg className="w-6 h-6 inline-flex text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="1 2 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                        </svg>
                        Back
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center mt-10 sm:mt-4">
                        <div className="basis-5/12 sm:basis-full px-4">
                            <div className="bg-white p-8 rounded-lg shadow w-full">
                                <div className="flex flex-col gap-2">
                                    <div className="py-4">
                                        <p className="text-2xl font-bold mb-2 text-blue-700">Sign Up</p>
                                        <p className="text-gray-500">Create an account to fill out application information.</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-normal inline-flex text-gray-700">Email
                                            {
                                                visibleUsername ?
                                                    <>
                                                        <p className="text-xs text-red-600 ml-1">อีเมลนี้มีการใช้งานแล้ว!</p>
                                                    </>
                                                    :
                                                    <>
                                                    </>
                                            }
                                        </label>
                                        <input type="email" id="username" name="username" value={formData.username} maxLength={150} onChange={(e) => handleChangeHeader(e)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <label className="text-xs font-normal inline-flex text-gray-700">Password
                                                {
                                                    visibleConfirmPwd ?
                                                        <>
                                                            <svg className="w-4 h-4 text-green-500 ml-1 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd" />
                                                            </svg>
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                }
                                            </label>
                                            <button type="button" onClick={togglePasswordVisibility}>
                                                {showPassword ? <FaRegEye className="pl-1 text-blue-600" /> : <FaRegEyeSlash className="pl-1 text-gray-600" />}
                                            </button>
                                        </div>
                                        <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} maxLength={150} onChange={(e) => handleChangeHeader(e)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <label className="text-xs font-normal inline-flex text-gray-700">Confirm Password
                                                {
                                                    visibleConfirmPwd ?
                                                        <>
                                                            <svg className="w-4 h-4 text-green-500 ml-1 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd" />
                                                            </svg>
                                                        </>
                                                        :
                                                        <>
                                                        </>
                                                }
                                            </label>
                                            <button type="button" onClick={togglePasswordVisibility}>
                                                {showPassword ? <FaRegEye className="pl-1 text-blue-600" /> : <FaRegEyeSlash className="pl-1 text-gray-600" />}
                                            </button>
                                        </div>
                                        <input type={showPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} maxLength={50} onChange={(e) => handleChangeHeader(e)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label className="text-xs font-normal inline-flex text-gray-700">Firstname (EN)</label>
                                        <input type="text" id="firstnameEN" name="firstnameEN" value={formData.firstnameEN} maxLength={50} onChange={(e) => handleChangeHeader(e)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label className="text-xs font-normal inline-flex text-gray-700">Lastname (EN)</label>
                                        <input type="text" id="lastnameEN" name="lastnameEN" value={formData.lastnameEN} maxLength={50} onChange={(e) => handleChangeHeader(e)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        {
                                            visibleUsername === false && visibleConfirmPwd === true ?
                                                <>
                                                    <button type="submit" className="btn btn-navy w-auto sm:w-full mt-6 sm:mt-2">Create Account</button>
                                                </>
                                                :
                                                <>
                                                    <button type="submit" className="text-white bg-gray-300 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4" disabled>Create Account</button>
                                                </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className={`popup z-20 ${showModal ? 'fade-in' : 'fade-out'}`}>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
                    <div className="relative w-[500px] my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {
                                submitStatus ?
                                    <>
                                        <div className="flex self-center px-5 pt-5">
                                            <h3 className="text-xl font-semibold">
                                                <Image src="/check.gif" alt="Loading..." style={{ width: 150, height: 150 }} />
                                            </h3>
                                        </div>
                                        <div className="relative px-8 pt-4 pb-8 flex-auto text-center">
                                            <p className="my-4 text-lg leading-relaxed">
                                                <p className="text-green-500 font-bold">
                                                    สร้างบัญชีสำเร็จ!
                                                </p>
                                            </p>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="flex self-center px-5 pt-9 pb-6   rounded-t">
                                            <h3 className="text-xl font-semibold">
                                                <Image src="/error.gif" alt="Loading..." style={{ width: 100, height: 100 }} />
                                            </h3>
                                        </div>
                                        <div className="relative px-8 pt-4 pb-8 flex-auto text-center">
                                            <p className="my-4 text-lg leading-relaxed">
                                                <p className="text-red-600 font-bold">
                                                    สร้างบัญชีล้มเหลว โปรดลองอีกครั้ง!
                                                </p>
                                            </p>
                                        </div>
                                    </>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormSignup_Body;