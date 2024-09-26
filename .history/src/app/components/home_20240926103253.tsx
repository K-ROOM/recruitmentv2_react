"use client";
import { signIn } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import Link from "next/link";
import { redirect } from 'next/dist/server/api-utils';
import { IoIosGlobe, IoIosMail, IoIosPin, IoIosTime, IoMdCall, IoMdClock, IoMdClose, IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { FaCopyright, FaRegCheckCircle } from "react-icons/fa";
import Loading from '../loading';
import { CheckAccount, GetOTP, RepasswordAccount, verifyEmailOTP } from '../actions/actionMain';
import { GrFormNextLink } from "react-icons/gr";
import { RxUpdate } from "react-icons/rx";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import moment from 'moment';
import React from 'react';
import { IoMdArrowDropright } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa";
import Image from "next/image";

const fetcher = async (url: any) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const GetData = () => {

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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            username: credentials.username,
            password: credentials.password,
            role: 'USER',
        });
        if (!result?.error) {
            window.location.href = '/main';
        } else {
            console.log('else ' + result?.error);
        }
    };

    const [jobHeader, setJobHeader] = useState({
        positionDesired: '',
        propertyAge: '',
        propertyEducation: '',
        propertyExp: '',
        positionActiveDate: '',
        salaryMin: 0,
        salaryMax: 0,
    });

    const [selectedDiv, setSelectedDiv] = useState<number | null>(null);
    const divRefs: any = useRef<Element[]>([]);

    const handleClick = (index: any) => {
        setSelectedDiv(index);
        divRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const { data, error } = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/master_position/active', fetcher);

    if (error) return <div>Error fetching data</div>;
    if (!data) return <Loading />;

    return (
        <>
            <div className="container px-8">
                <div className="flex justify-between pb-4 pt-1 mb-2 sticky top-0 bg-stone-100 z-10">
                    <Image src="/logo-necl.svg" className="block sm:hidden" alt="Loading..." style={{ width: 500, height: 42 }} />
                    <Link href="" as={`/login`} className="btn btn-navy self-end">Log In</Link>
                </div>
                <div className="flex sm:flex-col items-stretch gap-4 relative z-0">
                    <div className="basis-4/12 sm:basis-full">
                        <div className="bg-white p-4 border shadow-sm rounded-lg fixed sm:relative">
                            <div className="flex flex-col p-4 gap-2">
                                <p className="text-base font-bold mb-4">Position</p>
                                {data.map((item: any) => (
                                    <div key={item.positionID} className="flex flex-col sm:flex-row">
                                        {
                                            item.positionID === selectedDiv ?
                                                <>
                                                    <IoMdRadioButtonOn className="hidden sm:block text-blue-700 my-1 me-2" />
                                                    <div className="content-center cursor-pointer text-blue-700 text-sm" key={item.positionID} onClick={() => handleClick(item.positionID)}>
                                                        {item.positionDesired}
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <IoMdRadioButtonOff className="hidden sm:block text-gray-500 my-1 me-2" />
                                                    <div className="content-center cursor-pointer menu-navy text-sm" key={item.positionID} onClick={() => handleClick(item.positionID)}>
                                                        {item.positionDesired}
                                                    </div>
                                                </>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className="basis-8/12 sm:basis-full h-full">
                        {data.map((item: any) => (
                            <div key={item.positionID} className="bg-white p-10 sm:p-4 border shadow-sm rounded-lg mb-4" ref={(el) => (divRefs.current[item.positionID] = el as Element)}>
                                <div className="py-4">
                                    <div className="flex justify-between gap-4">
                                        <p className="text-xl font-bold text-blue-800">{item.positionDesired}</p>
                                        <p className="text-xs text-gray-500 text-right self-center">{moment(item.positionActiveDate).fromNow()}</p>
                                    </div>
                                </div>
                                <div className="flex sm:flex-col mb-4">
                                    <div className="flex-1">
                                        <div className="py-1">
                                            <p className="text-sm font-semibold">Age</p>
                                            {
                                                item.propertyAge ?
                                                    <>
                                                        <p className="text-detail">{item.propertyAge}</p>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                        </div>
                                        <div className="py-1">
                                            <p className="text-sm font-semibold">Salary</p>
                                            <p className="text-detail">{Intl.NumberFormat('th-TH', {
                                                style: 'currency',
                                                currency: 'THB',
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            }).format(item.salaryMin)} ~ {Intl.NumberFormat('th-TH', {
                                                style: 'currency',
                                                currency: 'THB',
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            }).format(item.salaryMax)} THB</p>
                                        </div>
                                    </div>

                                    <div className="flex-1">

                                        <div className="py-1">
                                            <p className="text-sm font-semibold">Education</p>
                                            {
                                                item.propertyEducation ?
                                                    <>
                                                        <p className="text-detail">{item.propertyEducation}</p>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                        </div>
                                        <div className="py-1">
                                            <p className="text-sm font-semibold">Experience </p>
                                            {
                                                item.propertyExp ?
                                                    <>
                                                        <p className="text-detail">{item.propertyExp}</p>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold headline-blue">
                                        {
                                            item.rmsMasterPositiondetail.length > 0 ?
                                                <>
                                                    <p className="py-1 ml-2">Responsibilities</p>
                                                </>
                                                :
                                                <></>
                                        }
                                    </p>
                                    <div className="text-detail">
                                        <ul className="list-disc list-outside">
                                            {item.rmsMasterPositiondetail.map((item: any) => (
                                                <li key={item.id}>
                                                    {item.positionResponsibility}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <p className="text-sm font-semibold headline-blue">
                                        {
                                            item.rmsMasterPositionotherdetail.length > 0 ?
                                                <>
                                                    <p className="py-1 ml-2">Others</p>
                                                </>
                                                :
                                                <></>
                                        }
                                    </p>
                                    <div className="text-[13px] text-gray-700 pr-10 mt-2">
                                        <ul className="list-disc list-outside">
                                            {item.rmsMasterPositionotherdetail.map((item: any) => (
                                                <li key={item.id}>
                                                    {item.propertyOther}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex my-2">
                                    {/* <button type="button" className="btn btn-orange px-4 w-fit sm:w-full" onClick={login}>Apply Now</button> */}
                                    {
                                        item.positionID === 'RMS-POS-00028' ?
                                        <>
                                        </>
                                        :
                                        <>
                                            <Link href="" as={`/login`} className="btn btn-orange px-4 w-fit sm:w-full">Apply Now</Link>
                                        </>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-3 sm:gap-4 px-8 pt-8 mt-8 sm:mt-8 bg-navy z-20">
                <p className="text-xl font-medium text-white">
                    Nippon Express NEC Logistics (Thailand) Co., Ltd.
                </p>
                <p className="text-[13px] text-white">
                    <IoIosPin className="inline-flex w-5 h-5 text-orange-500 me-4" />12<sup>th</sup> Floor, Thaniya Plaza Building, 52 Silom Road, Suriyawongse, Bangrak, Bangkok 10500
                </p>
                <p className="text-[13px] text-white">
                    <IoIosTime className="inline-flex w-5 h-5 text-orange-500 me-4" /><span className="font-semibold">Office Hour :</span> Monday to Friday 08.30 - 17.30
                </p>
                <p className="text-[13px] text-white">
                    <IoMdCall className="inline-flex w-5 h-5 text-orange-500 me-4" />02 238 1370-9 <span className="font-semibold">Ext. 1103, 1104</span>
                </p>
                <p className="text-[13px] text-white">
                    <IoIosGlobe className="inline-flex w-5 h-5 text-orange-500 me-4" /><a href="https://www.nipponexpress-necl.co.th/career.html" className="text-link">www.nipponexpress-necl.co.th</a>
                </p>
                <p className="text-[13px] text-white">
                    <IoIosMail className="inline-flex w-5 h-5 text-orange-500 me-4" /><span className="font-semibold">E-mail :</span> <a href="mailto:hr_job@nipponexpress-necl.co.th" className="text-link">hr_job@nipponexpress-necl.co.th</a>
                </p>
                <div className="border-t border-t-gray-100 py-3">
                    <p className="text-[11px] text-white text-left sm:text-center">
                        <FaCopyright className="inline-flex w-3 h-3 text-white me-1" /> Nippon Express NEC Logistics (Thailand) Co., Ltd. All rights reserved.
                    </p>
                </div>
            </div>
        </>
    );
};

export default GetData;

