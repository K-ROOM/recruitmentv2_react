"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import FormBody1 from "@/app/components/formstep1_body";
import FormBody2 from "@/app/components/formstep2_body";
import FormBody3 from "@/app/components/formstep3_body";
import FormBody4 from "@/app/components/formstep4_body";
import FormBody5 from "@/app/components/formstep5_body";
import FormBody6 from "@/app/components/formstep6_body";
import FormBody7 from "@/app/components/formstep7_body";
import FormBody8 from "@/app/components/formstep8_body";
import ConfirmFormBody from "@/app/components/confirmstep_body";
import LastFormBody from "@/app/components/lastform_body";
import { GiHouse, GiWorld } from "react-icons/gi";
import { FaGraduationCap, FaRegIdCard, FaSignature, FaUserAlt, FaUserFriends, FaLocationArrow } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import Loading from "../loading";
import Link from "next/link";

const backPage = () => {
    window.location.href = "/main"
}

const ApplicationForm_Main = ({ session, header, stepForm }: any) => {
    const [stepState, setStepState] = useState(stepForm);

    const tabStep = (value: any) => {
        if (value === 1) {
            setStepState(1);
        } else if (value === 2) {
            setStepState(2);
        } else if (value === 3) {
            setStepState(3);
        } else if (value === 4) {
            setStepState(4);
        } else if (value === 5) {
            setStepState(5);
        } else if (value === 6) {
            setStepState(6);
        } else if (value === 7) {
            setStepState(7);
        } else if (value === 8) {
            setStepState(8);
        } else if (value === 9) {
            setStepState(9);
        } else if (value === 10) {
            setStepState(10);
        }
    }

    useEffect(() => {
        setStepState(stepForm);
    }, [stepForm]);
    return (
        <>
            <div className="container px-8 pb-8">
                <div className="flex justify-between py-3 mb-6 sticky top-0 bg-stone-100 z-10">
                    <div className="flex sm:flex-col text-sm md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" header-dropdown-toggle="user-dropdown" header-dropdown-placement="bottom">
                        <div className="mt-2">
                            <Link href="" as={`/main`}  className="btn-back">
                                <svg className="w-6 h-6 inline-flex me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="1 1 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                                </svg>
                                Back
                            </Link>
                        </div>

                        <div className="px-2 pt-2 sm:pt-4 self-center">
                            <p className="text-xs font-normal inline-flex">Application Ticket / </p>
                            <p className="text-xs font-semibold inline-flex text-blue-500 pl-1">{header.recruitmentID}</p>
                        </div>
                    </div>

                    <div className="flex gap-x-4 items-center sm:items-start">
                        <Link href="" as={`/main`} className="text-gray-800 font-medium text-xs py-2 text-center">
                            Home
                        </Link>
                        <Link href="" as={`/my_application`} className="text-gray-800 font-medium text-xs py-2 text-center">
                            My Application
                        </Link>
                        <button className="text-gray-800 font-medium text-xs py-2 text-center" onClick={() => signOut({ callbackUrl: 'http://localhost:3001' })}>
                            Log Out
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-2 my-4">
                    <div className="col-span-10 col-start-3 sm:col-start-1 ml-2">
                        {
                            stepState === 1 ?
                                <>
                                    <p className="text-base font-medium text-gray-700">Step 1 - Personal Details</p>
                                </>
                                :
                                stepState === 2 ?
                                    <>
                                        <p className="text-base font-medium inline-flex text-gray-700">Step 2 - Relationship and Address</p>
                                    </>
                                    :
                                    stepState === 3 ?
                                        <>
                                            <p className="text-base font-medium inline-flex text-gray-700">Step 3 - Education and Work</p>
                                        </>
                                        :
                                        stepState === 4 ?
                                            <>
                                                <p className="text-base font-medium inline-flex text-gray-700">Step 4 - Training and Seminar</p>
                                            </>
                                            :
                                            stepState === 5 ?
                                                <>
                                                    <p className="text-base font-medium inline-flex text-gray-700">Step 5 - Language and Ability</p>
                                                </>
                                                :
                                                stepState === 6 ?
                                                    <>
                                                        <p className="text-base font-medium inline-flex text-gray-700">Step 6 - Question and References</p>
                                                    </>
                                                    :
                                                    stepState === 7 ?
                                                        <>
                                                            <p className="text-base font-medium inline-flex text-gray-700">Step 7 - Profile and Attachment</p>
                                                        </>
                                                        :
                                                        stepState === 8 ?
                                                            <>
                                                                <p className="text-base font-medium inline-flex text-gray-700">Step 8 - Terms and Conditions</p>
                                                            </>
                                                            :
                                                            stepState === 9 ?
                                                                <>
                                                                    <p className="text-base font-medium inline-flex text-gray-700">Step 9 - Confirm Application</p>
                                                                </>
                                                                :
                                                                <></>
                        }
                    </div>
                </div>

                <div className="grid grid-cols-12 lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-2 gap-2 mt-4 bg-white border shadow-sm rounded-md">
                    <div className="col-span-2 sm:border-r-0 sm:border-b sm:my-4 sm:pb-4 pl-6 py-6">
                        <p className="text-gray-700 text-xs font-medium mb-4">Application Progress</p>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap text-[10.5px] font-normal text-gray-600">
                            <div className="me-1 sm:me-4">
                                {
                                    stepState === 1 ?
                                        <>
                                            {
                                                header.formStep1 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <FaUserAlt className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <p className="font-semibold">Personal Details</p>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <div role="status">
                                                                <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                            <p className="font-semibold">Personal Details</p>
                                                        </div>
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(1)}>
                                                <FaUserAlt className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                <p className="font-semibold">Personal Details</p>
                                            </div>
                                        </>
                                }

                            </div>
                            <div className="me-1 sm:me-4">
                                {
                                    header.formStep2 ?
                                        <>
                                            {
                                                stepState === 2 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <GiHouse className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Relationship and Address</span>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(2)}>
                                                            <GiHouse className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Relationship and Address</span>
                                                        </div>
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                stepState === 2 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <div role="status">
                                                                <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                            <p className="font-semibold">Relationship and Address</p>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            header.formStep1 ?
                                                                <>
                                                                    <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(2)}>
                                                                        <div role="status">
                                                                            <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>
                                                                        <p className="font-semibold">Relationship and Address</p>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="flex my-2.5">
                                                                        <GiHouse className="w-4 h-4 me-2 text-neutral-200 dark:text-gray-600" />
                                                                        <p className="text-neutral-400">Relationship and Address</p>
                                                                    </div>
                                                                </>
                                                        }
                                                    </>
                                            }
                                        </>
                                }
                            </div>
                            <div className="me-1 sm:me-4">
                                {
                                    header.formStep3 ?
                                        <>
                                            {
                                                stepState === 3 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <FaGraduationCap className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Education and Work</span>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(3)}>
                                                            <FaGraduationCap className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Education and Work</span>
                                                        </div>
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                stepState === 3 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <div role="status">
                                                                <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                            <p className="font-semibold">Education and Work</p>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            header.formStep2 ?
                                                                <>
                                                                    <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(3)}>
                                                                        <div role="status">
                                                                            <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>
                                                                        <p className="font-semibold">Education and Work</p>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="flex my-2.5">
                                                                        <FaGraduationCap className="w-4 h-4 me-2 text-neutral-200 dark:text-gray-600" />
                                                                        <p className="text-neutral-400">Education and Work</p>
                                                                    </div>
                                                                </>
                                                        }
                                                    </>
                                            }
                                        </>
                                }
                            </div>
                            <div className="me-1 sm:me-4">
                                {
                                    header.formStep4 ?
                                        <>
                                            {
                                                stepState === 4 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <GrCertificate className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Training and Seminar</span>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(4)}>
                                                            <GrCertificate className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Training and Seminar</span>
                                                        </div>
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                stepState === 4 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <div role="status">
                                                                <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                            <p className="font-semibold">Training and Seminar</p>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            header.formStep3 ?
                                                                <>
                                                                    <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(4)}>
                                                                        <div role="status">
                                                                            <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>
                                                                        <p className="font-semibold">Training and Seminar</p>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="flex my-2.5">
                                                                        <GrCertificate className="w-4 h-4 me-2 text-neutral-200 dark:text-gray-600" />
                                                                        <p className="text-neutral-400">Training and Seminar</p>
                                                                    </div>
                                                                </>
                                                        }
                                                    </>
                                            }
                                        </>
                                }
                            </div>
                            <div className="me-1 sm:me-4">
                                {
                                    header.formStep5 ?
                                        <>
                                            {
                                                stepState === 5 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <GiWorld className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Language and Ability</span>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(5)}>
                                                            <GiWorld className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Language and Ability</span>
                                                        </div>
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                stepState === 5 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <div role="status">
                                                                <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                            <p className="font-semibold">Language and Ability</p>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            header.formStep4 ?
                                                                <>
                                                                    <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(5)}>
                                                                        <div role="status">
                                                                            <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>
                                                                        <p className="font-semibold">Language and Ability</p>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="flex my-2.5">
                                                                        <GiWorld className="w-4 h-4 me-2 text-neutral-200 dark:text-gray-600" />
                                                                        <p className="text-neutral-400">Language and Ability</p>
                                                                    </div>
                                                                </>
                                                        }
                                                    </>
                                            }

                                        </>
                                }
                            </div>
                            <div className="me-1 sm:me-4">
                                {
                                    header.formStep6 ?
                                        <>
                                            {
                                                stepState === 6 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <FaUserFriends className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Question and References</span>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(6)}>
                                                            <FaUserFriends className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Question and References</span>
                                                        </div>
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                stepState === 6 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <div role="status">
                                                                <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                            <p className="font-semibold">Question and References</p>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            header.formStep5 ?
                                                                <>
                                                                    <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(6)}>
                                                                        <div role="status">
                                                                            <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>
                                                                        <p className="font-semibold">Question and References</p>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="flex my-2.5">
                                                                        <FaUserFriends className="w-4 h-4 me-2 text-neutral-200 dark:text-gray-600" />
                                                                        <p className="text-neutral-400">Question and References</p>
                                                                    </div>
                                                                </>
                                                        }
                                                    </>
                                            }

                                        </>
                                }
                            </div>
                            <div className="me-1 sm:me-4">
                                {
                                    header.formStep7 ?
                                        <>
                                            {
                                                stepState === 7 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <FaRegIdCard className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Profile and Attachment</span>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(7)}>
                                                            <FaRegIdCard className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Profile and Attachment</span>
                                                        </div>
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                stepState === 7 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <div role="status">
                                                                <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                            <p className="font-semibold">Profile and Attachment</p>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            header.formStep6 ?
                                                                <>
                                                                    <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(7)}>
                                                                        <div role="status">
                                                                            <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>
                                                                        <p className="font-semibold">Profile and Attachment</p>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="flex my-2.5">
                                                                        <FaRegIdCard className="w-4 h-4 me-2 text-neutral-200 dark:text-gray-600" />
                                                                        <p className="text-neutral-400">Profile and Attachment</p>
                                                                    </div>
                                                                </>
                                                        }
                                                    </>
                                            }

                                        </>
                                }
                            </div>
                            <div className="me-1 sm:me-4">
                                {
                                    header.formStep8 ?
                                        <>
                                            {
                                                stepState === 8 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <FaSignature className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Terms and Conditions</span>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(8)}>
                                                            <FaSignature className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Terms and Conditions</span>
                                                        </div>
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                stepState === 8 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <div role="status">
                                                                <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                            <p className="font-semibold">Terms and Conditions</p>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            header.formStep7 ?
                                                                <>
                                                                    <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(8)}>
                                                                        <div role="status">
                                                                            <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>
                                                                        <p className="font-semibold">Terms and Conditions</p>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="flex my-2.5">
                                                                        <FaSignature className="w-4 h-4 me-2 text-neutral-200 dark:text-gray-600" />
                                                                        <p className="text-neutral-400">Terms and Conditions</p>
                                                                    </div>
                                                                </>
                                                        }
                                                    </>
                                            }

                                        </>
                                }
                            </div>

                            <div className="me-1 sm:me-4">
                                {
                                    header.confirmAndSendEmail ?
                                        <>
                                            {
                                                stepState === 9 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <FaLocationArrow className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Comfirm Application</span>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(9)}>
                                                            <FaLocationArrow className="w-4 h-4 me-2 text-blue-500 dark:text-blue-500" />
                                                            <span className="font-semibold">Comfirm Application</span>
                                                        </div>
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                stepState === 9 ?
                                                    <>
                                                        <div className="flex my-2.5">
                                                            <div role="status">
                                                                <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                <span className="sr-only">Loading...</span>
                                                            </div>
                                                            <p className="font-semibold">Comfirm Application</p>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            header.formStep8 ?
                                                                <>
                                                                    <div className="flex my-2.5 cursor-pointer" onClick={() => tabStep(9)}>
                                                                        <div role="status">
                                                                            <svg aria-hidden="true" className="w-4 h-4 me-2 text-neutral-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>
                                                                        <p className="font-semibold">Comfirm Application</p>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className="flex my-2.5">
                                                                        <FaLocationArrow className="w-4 h-4 me-2 text-neutral-200 dark:text-gray-600" />
                                                                        <p className="text-neutral-400">Comfirm ASpplication</p>
                                                                    </div>
                                                                </>
                                                        }
                                                    </>
                                            }

                                        </>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-span-10 sm:col-span-2 sm:ml-0 px-6 py-6 border-l">
                        {
                            stepState === 1 && header.hr_SubmitStatus === null ?
                                <>
                                    <FormBody1 session={session} header={header} />
                                </>
                                :
                                stepState === 2 && header.hr_SubmitStatus === null ?
                                    <>
                                        <FormBody2 session={session} header={header} />
                                    </>
                                    :
                                    stepState === 3 && header.hr_SubmitStatus === null ?
                                        <>
                                            <FormBody3 session={session} header={header} />
                                        </>
                                        :
                                        stepState === 4 && header.hr_SubmitStatus === null ?
                                            <>
                                                <FormBody4 session={session} header={header} />
                                            </>
                                            :
                                            stepState === 5 && header.hr_SubmitStatus === null ?
                                                <>
                                                    <FormBody5 session={session} header={header} />
                                                </>
                                                :
                                                stepState === 6 && header.hr_SubmitStatus === null ?
                                                    <>
                                                        <FormBody6 session={session} header={header} />
                                                    </>
                                                    :
                                                    stepState === 7 && header.hr_SubmitStatus === null ?
                                                        <>
                                                            <FormBody7 session={session} header={header} />
                                                        </>
                                                        :
                                                        stepState === 8 && header.hr_SubmitStatus === null ?
                                                            <>
                                                                <FormBody8 session={session} header={header} />
                                                            </>
                                                            :
                                                            stepState === 9 && header.hr_SubmitStatus === null ?
                                                                <>
                                                                    <ConfirmFormBody session={session} header={header} />
                                                                </>
                                                                :
                                                                header.formStep1 === true && header.formStep2 === true && header.formStep3 === true && header.formStep4 === true && header.formStep5 === true && header.formStep6 === true && header.formStep7 === true && header.formStep8 === true && header.hr_SubmitStatus !== null ?
                                                                    <>
                                                                        <LastFormBody session={session} header={header} />
                                                                    </>
                                                                    :
                                                                    <>
                                                                    </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default ApplicationForm_Main;