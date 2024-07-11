"use client";
import { signIn } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import Link from "next/link";
import { redirect } from 'next/dist/server/api-utils';
import { IoIosPin, IoIosTime, IoMdCall, IoMdClock, IoMdClose, IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { FaRegCheckCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Loading from '../loading';
import { CheckAccount, GetOTP, RepasswordAccount, verifyEmailOTP } from '../actions/actionMain';
import { GrFormNextLink } from "react-icons/gr";
import { RxUpdate } from "react-icons/rx";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import moment from 'moment';
import React from 'react';
import { IoMdArrowDropright } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa";
import { FaCopyright } from "react-icons/fa6";

const fetcher = async (url: any) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const GetData = () => {

    const [visible, setVisible] = useState(false);

    const [email, setEmail] = useState('');
    const [otpConfirm, setOtpConfirm] = useState({
        otpdigit1: '',
        otpdigit2: '',
        otpdigit3: '',
        otpdigit4: '',
        otpdigit5: '',
        otpdigit6: '',
    });
    const [token, setToken] = useState('');
    const [refNo, setRefNo] = useState('');

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        role: "",
    });

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const otp1 = useRef(null);
    const otp2 = useRef(null);
    const otp3 = useRef(null);
    const otp4 = useRef(null);
    const otp5 = useRef(null);
    const otp6 = useRef(null);

    const [visibleEmail, setVisibleEmail] = useState(false);
    const [showForgetModal, setShowForgetModal] = useState(false);
    const [submitEmailStatus, setSubmitEmailStatus] = useState(false);
    const [submitVerifyStatus, setSubmitVerifyStatus] = useState('');
    const [showVerifyStatus, setShowVerifyStatus] = useState(false);
    const [btnReOTP, setBtnReOTP] = useState(false);
    const initialTime = 60;
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const [verifyPass, setVerifyPass] = useState(false);
    const [visiblePasswordConfirmPwd, setVisiblePasswordConfirmPwd] = useState(false);
    const [submitRePwd, setSubmitRePwd] = useState(false);
    const [checkSubmitRePwd, setCheckSubmitRePwd] = useState(false);
    const [checkEmailStatus, setCheckEmailStatus] = useState(false);

    const [visibleError, setVisibleError] = useState(false);

    const showForgetPasswordModal = () => {
        setVisible(true);
        setShowForgetModal(true);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            username: credentials.username,
            password: credentials.password,
            role: 'USER',
        });
        console.log(result);
        if (!result?.error) {
            window.location.href = '/main';
        } else {
            setVisibleError(true);
            setTimeout(() => {
                setVisibleError(false);
            }, 2000)
        }
    };

    const handleChangeEmail = async (e: any) => {
        const { name, value } = e.target;
        if (name === 'email') {
            if (value !== '' && value !== null) {
                setVisibleEmail(true);
                setEmail(value);
            } else {
                setVisibleEmail(false);
            }
        }
    };

    const getOTP = async (email: any) => {
        const checkForGetOTP = await CheckAccount(email);
        if (checkForGetOTP !== null && checkForGetOTP !== '') {
            try {
                const data = await GetOTP(email);
                setToken(data.token);
                setRefNo(data.refNo);
                setSubmitEmailStatus(true);
            } catch (err) {
                setSubmitEmailStatus(false);
            }
        } else {
            setCheckEmailStatus(true);
            setTimeout(() => {
                setCheckEmailStatus(false);
            }, 3000)
        }

    };

    const reGetOTP = async (email: any) => {
        try {
            const data = await GetOTP(email);
            setBtnReOTP(true);
            setToken(data.token);
            setRefNo(data.refNo);
            setIsRunning(true);
            let remainingTime = initialTime;
            const intervalId = setInterval(() => {
                remainingTime -= 1;
                setTime(remainingTime);
                if (remainingTime <= 0) {
                    clearInterval(intervalId);
                    setIsRunning(false);
                    setBtnReOTP(false);
                }
            }, 1000);
        } catch (err) {
        }
    };

    const verifyOTP = async (email: any, otp: any, token: any) => {
        const messageConfirm = await verifyEmailOTP(email, otp, token);
        setShowVerifyStatus(true);
        if (messageConfirm.verify === true) {
            setVerifyPass(true);
        } else {
            setSubmitVerifyStatus(messageConfirm.message);
            setTimeout(() => {
                setVerifyPass(false);
                setShowVerifyStatus(false);
            }, 3000)
        }

    };

    const handleChangeOtp = async (event: any, nextInputRef: any) => {
        if (event.target.value.length >= 1 && nextInputRef.current) {
            nextInputRef.current.focus();
            const { name, value } = event.target;
            setOtpConfirm((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleKeyDownOtp = (event: any, prevInputRef: any) => {
        const { name, value } = event.target;
        if (event.key === 'Backspace' && value.length === 0 && prevInputRef.current) {
            prevInputRef.current.focus();
            setOtpConfirm((prevData) => ({
                ...prevData,
                [name]: '',
            }));
        }
    };

    const formatTime = (seconds: any) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleChangePassword = async (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === 'password') {
            if (value !== '') {
                if (value === formData.confirmPassword) {
                    setVisiblePasswordConfirmPwd(true);
                } else {
                    setVisiblePasswordConfirmPwd(false);
                }
            }
        }

        if (name === 'confirmPassword') {
            if (value !== '') {
                if (value === formData.password) {
                    setVisiblePasswordConfirmPwd(true);
                } else {
                    setVisiblePasswordConfirmPwd(false);
                }
            }
        }
    };

    const handleChangeConfirmPassword = async () => {
        try {
            formData.username = email;
            await RepasswordAccount(formData);
            setSubmitRePwd(true);
            setCheckSubmitRePwd(true);
            setTimeout(() => {
                setVisible(false);
                if (visible === false) {
                    setShowForgetModal(false);
                }
                setSubmitVerifyStatus('');
                setShowVerifyStatus(false);
                setOtpConfirm({
                    otpdigit1: '',
                    otpdigit2: '',
                    otpdigit3: '',
                    otpdigit4: '',
                    otpdigit5: '',
                    otpdigit6: '',
                });
                setFormData({
                    username: '',
                    password: '',
                    confirmPassword: '',
                });
                setEmail('');
                setToken('');
                setRefNo('');
                setTimeout(() => {
                    setSubmitEmailStatus(false);
                    setVisibleEmail(false);
                    setVerifyPass(false);
                    setVisiblePasswordConfirmPwd(false);
                    setSubmitRePwd(false);
                    setCheckSubmitRePwd(false);
                }, 2000)
            }, 3000)
        } catch (err) {
            setSubmitRePwd(false);
            setCheckSubmitRePwd(false);
            setTimeout(() => {
                setCheckSubmitRePwd(false);
            }, 3000)
        }
    };

    const closeModalForget = () => {
        setVisible(false);
        if (visible === false) {
            setShowForgetModal(false);
        }
        setSubmitEmailStatus(false);
        setSubmitVerifyStatus('');
        setShowVerifyStatus(false);
        setOtpConfirm({
            otpdigit1: '',
            otpdigit2: '',
            otpdigit3: '',
            otpdigit4: '',
            otpdigit5: '',
            otpdigit6: '',
        });
        setFormData({
            username: '',
            password: '',
            confirmPassword: '',
        });
        setEmail('');
        setToken('');
        setRefNo('');
        setVisibleEmail(false);
        setVerifyPass(false);
        setVisiblePasswordConfirmPwd(false);
        setSubmitRePwd(false);
        setCheckSubmitRePwd(false);
    }

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="flex flex-col h-screen">
                <div className="flex justify-between p-2 sticky top-0 bg-stone-100 z-10 px-8">
                    <img src="/logo-necl.svg" className="block sm:hidden" alt="Loading..." style={{ width: 500, height: 42 }} />
                    <Link href="" as={`/`} className="btn btn-navy self-end">Career</Link>
                </div>

                <div className="flex items-center justify-center h-screen">
                    <div className="basis-4/12 sm:basis-full px-4">
                        <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
                            <div className="flex flex-col p-4">
                                <p className="text-2xl font-bold text-blue-700 uppercase">We are hiring</p>
                                <p className="text-base text-gray-500 mb-8 sm:mb-4">Log In to join our company</p>
                                {
                                    visibleError ?
                                        <>
                                            <div className="bg-red-100 rounded-[5px] p-1 mb-2 fade-in">
                                                <p className="text-[10px] font-bold text-red-700 text-center">Email or password is incorrect!</p>
                                            </div>
                                        </>
                                        :
                                        <>
                                        </>
                                }

                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-normal text-gray-700">Email</label>
                                        <input type="text" id="username" name="username" value={credentials.username} maxLength={50} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-2" />

                                        <div className="flex justify-between">
                                            <label className="text-xs font-normal text-gray-700">Password</label>
                                            <button type="button" onClick={togglePasswordVisibility} className="ml-auto text-lg">
                                                {showPassword ? <FaRegEye className="pl-1 text-blue-600" /> : <FaRegEyeSlash className="pl-1 text-gray-600" />}
                                            </button>
                                        </div>
                                        <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={credentials.password} maxLength={50} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                                        <p className="text-[10px] text-gray-400 font-normal cursor-pointer" onClick={() => showForgetPasswordModal()}>Forget password</p>

                                        <button type="submit" className="btn btn-navy w-full mt-6">Log In</button>
                                    </div>
                                </form>

                                <div className="border-t mt-5">
                                    <p className="text-[12px] font-normal inline-flex text-gray-700 mt-2">Not registered yet ?</p>
                                    <Link href="" as={`/signup`} className="text-[13px] font-bold ms-1 text-orange-500 mt-2">Sign Up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-start sm:justify-center p-4 my-0 sm:my-2 border-t border-t-gray-200">
                    <p className="text-[11px] text-gray-700 text-left sm:text-center">
                        <FaCopyright className="inline-flex w-3 h-3 me-1 pb-0.5" /> Nippon Express NEC Logistics (Thailand) Co., Ltd. All rights reserved.
                    </p>
                </div>
            </div>

            <div className={`popup z-20 ${visible ? 'fade-in' : 'fade-out'}`}>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 modal-div outline-none focus:outline-none popup-repassword">
                    <div className="relative w-[500px] h-[600px] my-6 mx-[10px]">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-11"></div>
                                <div className="col-span-1 py-3">
                                    <p className="cursor-pointer" onClick={() => closeModalForget()}><IoMdClose /></p>
                                </div>
                            </div>
                            {
                                submitEmailStatus ?
                                    <>
                                        {
                                            verifyPass ?
                                                <>
                                                    {
                                                        submitRePwd ?
                                                            <>
                                                                <div className="px-5 pb-3">
                                                                    <div className="grid grid-cols-12 sm:grid-cols-2 gap-4">
                                                                        <div className="col-span-12 sm:col-span-full px-8 text-center">
                                                                            <p className="text-lg font-bold">
                                                                                เปลี่ยนรหัสผ่าน
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-12 pb-10">
                                                                    <div className="col-span-3"></div>
                                                                    <div className="col-span-6 text-center">
                                                                        {
                                                                            checkSubmitRePwd ?
                                                                                <>
                                                                                    <div className="px-[49px] mb-5">
                                                                                        <img src="/check.gif" alt="Loading..." style={{ width: 150, height: 150, }} />
                                                                                    </div>
                                                                                    <p className="text-md font-bold text-green-600">
                                                                                        เปลี่ยนรหัสผ่านสำเร็จ!
                                                                                    </p>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <div className="px-[49px] mb-5">
                                                                                        <img src="/error.gif" alt="Loading..." style={{ width: 100, height: 100, }} />
                                                                                    </div>
                                                                                    <p className="text-md font-bold text-red-600">
                                                                                        เปลี่ยนรหัสผ่านไม่สำเร็จ โปรดลองอีกครั้ง!
                                                                                    </p>
                                                                                </>
                                                                        }
                                                                    </div>
                                                                    <div className="col-span-3"></div>
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                <div className="px-5 pb-3">
                                                                    <div className="grid grid-cols-12 sm:grid-cols-2 gap-4">
                                                                        <div className="col-span-12 sm:col-span-full px-8 text-center">
                                                                            <p className="text-lg font-bold">
                                                                                เปลี่ยนรหัสผ่าน
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-12 sm:grid-cols-2 gap-4 mt-1">
                                                                        <div className="col-span-12 sm:col-span-full px-8 text-center">
                                                                            <p className="text-xs font-normal">
                                                                                โปรดกรอกรหัสผ่านใหม่ที่ท่านต้องการ
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-12">
                                                                    <div className="col-span-3 sm:col-span-full pt-2"></div>
                                                                    <div className="col-span-6 px-1 pt-2">
                                                                        <p className="text-xs font-normal">
                                                                            รหัสผ่าน
                                                                            {
                                                                                visiblePasswordConfirmPwd ?
                                                                                    <>
                                                                                        <p className="text-xs font-normal inline-flex text-green-600 ml-2">รหัสผ่านตรงกัน</p>
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                    </>
                                                                            }
                                                                        </p>
                                                                        <input type="password" name="password" value={formData.password} onChange={(e) => handleChangePassword(e)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required autoComplete='off' />
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-full pt-2"></div>
                                                                </div>

                                                                <div className="grid grid-cols-12 mt-1">
                                                                    <div className="col-span-3 sm:col-span-full pt-2"></div>
                                                                    <div className="col-span-6 px-1 pt-2">
                                                                        <p className="text-xs font-normal">
                                                                            ยืนยันรหัสผ่าน
                                                                            {
                                                                                visiblePasswordConfirmPwd ?
                                                                                    <>
                                                                                        <p className="text-xs font-normal inline-flex text-green-600 ml-2">รหัสผ่านตรงกัน</p>
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                    </>
                                                                            }
                                                                        </p>
                                                                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={(e) => handleChangePassword(e)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required autoComplete='off' />
                                                                    </div>
                                                                    <div className="col-span-3 sm:col-span-full pt-2"></div>
                                                                </div>

                                                                <div className="grid grid-cols-12 sm:grid-cols-2 gap-4 py-6 px-8">
                                                                    <div className="col-span-3"></div>
                                                                    <div className="col-span-6">
                                                                        {
                                                                            visiblePasswordConfirmPwd ?
                                                                                <>
                                                                                    <button type="button" className="btn btn-navy w-full" onClick={() => handleChangeConfirmPassword()}>ยืนยัน เปลี่ยนรหัสผ่าน <MdOutlinePublishedWithChanges className="inline-flex w-[17px] h-[17px]" /></button>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <button type="button" className="btn btn-gray w-full" disabled>ยืนยัน เปลี่ยนรหัสผ่าน <MdOutlinePublishedWithChanges className="inline-flex w-[17px] h-[17px]" /></button>
                                                                                </>
                                                                        }
                                                                    </div>
                                                                    <div className="col-span-3"></div>
                                                                </div>
                                                            </>
                                                    }
                                                </>
                                                :
                                                <>
                                                    <div className="px-5 pb-3">
                                                        <div className="grid grid-cols-12 sm:grid-cols-2 gap-4">
                                                            <div className="col-span-12 sm:col-span-full px-8 text-center">
                                                                <p className="text-lg font-bold">
                                                                    โปรดยืนยันรหัส OTP
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-12 sm:grid-cols-2 gap-4 mt-1">
                                                            <div className="col-span-12 sm:col-span-full px-8 text-center">
                                                                <p className="text-xs font-normal">
                                                                    ระบบได้ส่งรหัส OTP ไปยังอีเมล {email}
                                                                </p>
                                                                <p className="text-xs font-normal mt-1">
                                                                    รหัสอ้างอิง <b>{refNo}</b>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-12 sm:grid-cols-2 gap-4">
                                                        <div className="col-span-12 sm:col-span-full px-8">
                                                            <p className="text-xs text-center font-normal text-red-600">
                                                                {
                                                                    showVerifyStatus ?
                                                                        <>
                                                                            {submitVerifyStatus}
                                                                        </>
                                                                        :
                                                                        <>
                                                                        </>
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12">
                                                        <div className="col-span-3 sm:col-span-full pt-2"></div>
                                                        <div className="col-span-1 px-1 pt-2">
                                                            <input type="text" name="otpdigit1" ref={otp1} maxLength={1} onChange={(e) => handleChangeOtp(e, otp2)} onKeyDown={(e) => handleKeyDownOtp(e, otp1)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-center dark:text-white" required autoComplete='off' />
                                                        </div>
                                                        <div className="col-span-1 px-1 pt-2">
                                                            <input type="text" name="otpdigit2" ref={otp2} maxLength={1} onChange={(e) => handleChangeOtp(e, otp3)} onKeyDown={(e) => handleKeyDownOtp(e, otp1)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-center dark:text-white" required autoComplete='off' />
                                                        </div>
                                                        <div className="col-span-1 px-1 pt-2">
                                                            <input type="text" name="otpdigit3" ref={otp3} maxLength={1} onChange={(e) => handleChangeOtp(e, otp4)} onKeyDown={(e) => handleKeyDownOtp(e, otp2)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-center dark:text-white" required autoComplete='off' />
                                                        </div>
                                                        <div className="col-span-1 px-1 pt-2">
                                                            <input type="text" name="otpdigit4" ref={otp4} maxLength={1} onChange={(e) => handleChangeOtp(e, otp5)} onKeyDown={(e) => handleKeyDownOtp(e, otp3)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-center dark:text-white" required autoComplete='off' />
                                                        </div>
                                                        <div className="col-span-1 px-1 pt-2">
                                                            <input type="text" name="otpdigit5" ref={otp5} maxLength={1} onChange={(e) => handleChangeOtp(e, otp6)} onKeyDown={(e) => handleKeyDownOtp(e, otp4)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-center dark:text-white" required autoComplete='off' />
                                                        </div>
                                                        <div className="col-span-1 px-1 pt-2">
                                                            <input type="text" name="otpdigit6" ref={otp6} maxLength={1} onChange={(e) => handleChangeOtp(e, otp6)} onKeyDown={(e) => handleKeyDownOtp(e, otp5)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-center dark:text-white" required autoComplete='off' />
                                                        </div>
                                                        <div className="col-span-3 sm:col-span-full pt-2"></div>
                                                    </div>

                                                    <div className="grid grid-cols-12 sm:grid-cols-2 gap-4 py-6 px-8">
                                                        <div className="col-span-2 sm:col-span-full"></div>
                                                        {
                                                            otpConfirm.otpdigit1 !== '' || otpConfirm.otpdigit2 !== '' || otpConfirm.otpdigit3 !== '' || otpConfirm.otpdigit4 !== '' || otpConfirm.otpdigit5 !== '' || otpConfirm.otpdigit6 !== '' ?
                                                                <>
                                                                    <div className="col-span-4">
                                                                        <button type="button" className="btn btn-navy w-full" onClick={() => verifyOTP(email, otpConfirm, token)}>ยืนยันรหัส <GrFormNextLink className="inline-flex w-[17px] h-[17px]" /></button>
                                                                    </div>

                                                                    <div className="col-span-4">
                                                                        {
                                                                            btnReOTP ?
                                                                                <>
                                                                                    {
                                                                                        initialTime >= 0 ?
                                                                                            <>
                                                                                                <button type="button" className="btn btn-amber w-full" disabled>{formatTime(time)} <RxUpdate className="inline-flex w-[17px] h-[17px]" /></button>
                                                                                            </>
                                                                                            :
                                                                                            <>
                                                                                                <button type="button" className="btn btn-amber w-full" onClick={() => reGetOTP(email)}>ส่งรหัสอีกครั้ง <RxUpdate className="inline-flex w-[17px] h-[17px]" /></button>
                                                                                            </>
                                                                                    }
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <button type="button" className="btn btn-amber w-full" onClick={() => reGetOTP(email)}>ส่งรหัสอีกครั้ง <RxUpdate className="inline-flex w-[17px] h-[17px]" /></button>
                                                                                </>
                                                                        }
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="col-span-4">
                                                                        <button type="button" className="btn btn-gray w-full" disabled>ยืนยันรหัส <GrFormNextLink className="inline-flex w-[17px] h-[17px]" /></button>
                                                                    </div>

                                                                    <div className="col-span-4">
                                                                        {
                                                                            btnReOTP ?
                                                                                <>
                                                                                    {
                                                                                        initialTime >= 0 ?
                                                                                            <>
                                                                                                <button type="button" className="btn btn-amber w-full" disabled>{formatTime(time)} <RxUpdate className="inline-flex w-[17px] h-[17px]" /></button>
                                                                                            </>
                                                                                            :
                                                                                            <>
                                                                                                <button type="button" className="btn btn-amber w-full" onClick={() => reGetOTP(email)}>ส่งรหัสอีกครั้ง <RxUpdate className="inline-flex w-[17px] h-[17px]" /></button>
                                                                                            </>
                                                                                    }
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <button type="button" className="btn btn-amber w-full" onClick={() => reGetOTP(email)}>ส่งรหัสอีกครั้ง <RxUpdate className="inline-flex w-[17px] h-[17px]" /></button>
                                                                                </>
                                                                        }
                                                                    </div>
                                                                </>
                                                        }
                                                        <div className="col-span-2 sm:col-span-full"></div>
                                                    </div>
                                                </>
                                        }
                                    </>
                                    :
                                    <>
                                        <div className="px-5 pb-3">
                                            <div className="grid grid-cols-12 sm:grid-cols-2 gap-4">
                                                <div className="col-span-12 sm:col-span-full px-8 text-center">
                                                    <p className="text-lg font-bold">
                                                        โปรดระบุอีเมลที่ใช้เข้าสู่ระบบ
                                                    </p>
                                                    <p className="text-xs text-center font-normal text-red-600">
                                                        {
                                                            checkEmailStatus ?
                                                                <>
                                                                    ไม่พบอีเมลล์ในระบบ
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-12 sm:grid-cols-2 gap-4">
                                            <div className="col-span-1 sm:col-span-full pt-2 px-8"></div>
                                            <div className="col-span-10 sm:col-span-full pt-2 px-8">
                                                <input type="email" id="email" name="email" maxLength={150} onChange={(e) => handleChangeEmail(e)} className="bg-gray-100 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required autoComplete='off' />
                                            </div>
                                            <div className="col-span-1 sm:col-span-full pt-2 px-8"></div>
                                        </div>

                                        <div className="grid grid-cols-12 sm:grid-cols-2 gap-4 py-6 px-8">
                                            <div className="col-span-4 sm:col-span-full"></div>
                                            <div className="col-span-4 sm:col-span-full">
                                                {
                                                    email ?
                                                        <>
                                                            <button type="button" className="btn btn-navy w-full" onClick={() => getOTP(email)}>ยืนยันอีเมล <GrFormNextLink className="inline-flex w-[17px] h-[17px]" /></button>
                                                        </>
                                                        :
                                                        <>
                                                            <button type="button" className="btn btn-gray w-full" disabled>ยืนยันอีเมล <GrFormNextLink className="inline-flex w-[17px] h-[17px]" /></button>
                                                        </>
                                                }
                                            </div>
                                            <div className="col-span-4 sm:col-span-full"></div>
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

export default GetData;

