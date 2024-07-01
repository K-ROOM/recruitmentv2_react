"use client";
import axios from 'axios';
import { useState } from 'react';
import useSWR from 'swr';
import { CreateApplication, DeleteApplication } from '../actions/actionMain';
import Link from 'next/link';
import { MdOutlineEdit } from 'react-icons/md';
import Loading from '../loading';
import { IoWarning } from 'react-icons/io5';
import moment from 'moment';
import Profile_Image from './profile_image';
import { signOut } from 'next-auth/react';

const MyApplicationBody = ({ session }: any) => {

    const access_Token = session.accessToken;

    const fetcher = async (url: any) => {
        const response = await axios.get(url);
        const data = await response.data;
        return data;
    };

    const fetcherApplication = async (url: any) => {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${access_Token}` } });
        const data = await response.data;
        return data;
    };

    const [jobHeader, setJobHeader] = useState({
        positionDesired: '',
        propertyAge: '',
        propertyEducation: '',
        propertyExp: '',
        propertyComEngSkill: '',
        positionActiveDate: '',
        salaryMin: 0,
        salaryMax: 0,
    });

    const [checkDeleteApplicationStatus, setCheckDeleteApplicationStatus] = useState(false);
    const [showApplicationDeleteModal, setShowApplicationDeleteModal] = useState(false);
    const [applicationDelete, setApplicationDelete]: any = useState({
        recruitmentID: '',
        positionDesired: '',
    });

    const deleteApplication = (recruitmentID: any) => {
        DeleteApplication(recruitmentID);
        setCheckDeleteApplicationStatus(true);
        setTimeout(() => {
            setShowModal(false);
            setTimeout(() => {
                setCheckDeleteApplicationStatus(false);
            }, 2000)
        }, 3000)
    };

    const [showModal, setShowModal] = useState(false);

    const delete_application = () => {
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    };

    const { data: data1, error: error1 } = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/master_position/active', fetcher, { refreshInterval: 3000 });
    const { data: data2, error: error2 }: any = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/rms/application/' + session.username, fetcherApplication, { refreshInterval: 3000 });
    if (error1 || error2) return <div>Error fetching data</div>;
    if (!data1 || !data2) return <Loading />;

    return (
        <>
            <div className="container px-8">
                <div className="flex justify-between pb-4 pt-3 mb-2 sticky top-0 bg-stone-100 z-10">
                    <div className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 self-center" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                        <Profile_Image name={session?.firstname + ' ' + session?.lastname} />
                        <p className="font-medium text-xs text-gray-800 pt-4 pl-4">{session?.firstname} {session?.lastname}</p>
                    </div>

                    <div className="flex gap-x-4 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <Link href="" as={`/main`} className="text-gray-800 font-medium text-xs py-2 text-center self-center">
                            Home
                        </Link>
                        <Link href="" as={`/my_application`} className="text-gray-800 font-medium text-xs py-2 text-center self-center">
                            My Application
                        </Link>
                        <button className="text-gray-800 font-medium text-xs py-2 text-center" onClick={() => signOut({ callbackUrl: 'http://localhost:3001' })}>
                            Log Out
                        </button>
                    </div>
                </div>
                <div className="flex">
                    <div className="bg-white p-8 border shadow-sm rounded-lg block h-full w-full">
                        <div className="flex border-l-[6px] border-blue-500 mb-4">
                            <p className="text-base font-bold ms-4">My Application</p>
                        </div>

                        <div>
                            {data2.map((item: any) => (
                                <div key={item.recruitmentID} className="grid grid-cols-12 gap-4 border-b-0 sm:border-b-1 py-2 sm:py-4">
                                    <div className="col-span-11 sm:col-span-10">
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="col-span-5 sm:col-span-10">
                                                <p className="text-[11px] font-normal text-zinc-400">ตำแหน่งที่สมัคร</p>
                                                <p className="text-[13px] sm:text-base font-medium sm:font-semibold text-gray-800">{item.positionDesired}</p>
                                            </div>
                                            <div className="col-span-2 sm:col-span-4">
                                                <p className="text-[11px] text-zinc-400">เงินเดือนที่ต้องการ</p>
                                                <p className="text-[13px] text-gray-800">{item.expectedSalary}</p>
                                            </div>
                                            <div className="col-span-2 sm:col-span-4">
                                                <p className="text-[11px] text-zinc-400">วันที่สมัคร</p>
                                                <p className="text-[13px] text-gray-800">{item.registrationDate}</p>
                                            </div>
                                            <div className="col-span-3 sm:col-span-4 self-center">
                                                <p className="text-[13px] font-normal text-gray-800 flex">
                                                    {
                                                        item.confirmAndSendEmail === true ?
                                                            <>
                                                                <svg className="w-5 h-5 sm:w-4 sm:h-4 mr-2 sm:mr-1 text-green-500 dark:text-white inline-flex" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 24 24">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                </svg>
                                                                ส่งใบสมัครเรียบร้อย
                                                            </>
                                                            :
                                                            <>
                                                                <div role="status">
                                                                    <svg aria-hidden="true" className="w-4 h-4 sm:w-3.5 sm:h-3.5 mr-2 text-gray-200 inline-flex animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                                                    <span className="sr-only">Loading...</span>
                                                                </div>
                                                                กำลังดำเนินการ
                                                            </>
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-1 sm:col-span-2 self-center">
                                        <div className="flex justify-end">
                                            <Link href="" as={`/main/application_form/${item.recruitmentID}`}>
                                                <svg className="w-3.5 h-3.5 sm:w-3 sm:h-3 self-center inline-flex cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill="#2563eb" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" /></svg>

                                            </Link>

                                            {
                                                item.confirmAndSendEmail === true ?
                                                    <>

                                                    </>
                                                    :
                                                    <>
                                                        <svg className="w-4 h-4 sm:w-3.5 sm:h-3.5 ms-2 mt-1 sm:mt-0.5 self-center inline-flex cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" onClick={() => {
                                                            delete_application(); setApplicationDelete({
                                                                recruitmentID: item.recruitmentID,
                                                                positionDesired: item.positionDesired,
                                                            })
                                                        }}>
                                                            <path fill="#dc2626" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                                                    </>
                                            }
                                        </div>
                                    </div>

                                    {/* <div className="grid grid-cols-12 gap-2">
									<div className="col-span-4 sm:col-span-12">
										<p className="text-[11px] font-normal text-zinc-400">ตำแหน่งที่สมัคร</p>
										<p className="text-[13px] font-medium text-gray-800">{item.positionDesired}</p>
									</div>

									<div className="col-span-2 sm:col-span-3 font-normal">
										<p className="text-[11px] text-zinc-400">เงินเดือนที่ต้องการ</p>
										<p className="text-[13px] text-gray-800">{item.expectedSalary}</p>
									</div>

									<div className="col-span-2 sm:col-span-4 font-normal">
										<p className="text-[11px] text-zinc-400">วันที่สมัคร</p>
										<p className="text-[13px] text-gray-800">{item.registrationDate}</p>
									</div>

									<div className="col-span-3 sm:col-span-4 mt-2">
										<p className="text-[13px] font-normal text-gray-800 flex">
											{
												item.confirmAndSendEmail === true ?
													<>
														<svg className="w-5 h-5 mr-2 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 2 24 24">
															<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
														</svg>
														ส่งใบสมัครเรียบร้อย
													</>
													:
													<>
														<div role="status">
															<svg aria-hidden="true" className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
															<span className="sr-only">Loading...</span>
														</div>
														กำลังดำเนินการ
													</>
											}
										</p>
									</div>

									<div className="col-span-1">

										<Link href="" as={`/main/application_form/${item.recruitmentID}`}>
											<MdOutlineEdit className="w-5 h-5 inline-flex text-yellow-400 cursor-pointer mt-2" />
										</Link>

										{
											item.confirmAndSendEmail === true ?
												<>

												</>
												:
												<>
													<svg className="w-5 h-5 ml-2 mt-2 text-red-600 inline-flex dark:text-white cursor-pointer" onClick={() => {
														setShowApplicationDeleteModal(true); setApplicationDelete({
															recruitmentID: item.recruitmentID,
															positionDesired: item.positionDesired,
														})
													}} aria-hidden="true" xmlns="http://www.w3.org/3000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
														<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" />
													</svg>
												</>
										}

									</div>
								</div> */}

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`popup z-20 ${showModal ? 'fade-in' : 'fade-out'}`}>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
                    <div className="relative w-3/5 sm:w-5/6 px-4 my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="relative px-8 py-4 text-center self-center">
                                <div className="mt-10">
                                    {
                                        checkDeleteApplicationStatus ?
                                            <>
                                                <img src="/check.gif" className="mx-auto" alt="Loading..." style={{ width: 150, height: 150 }} />
                                            </>
                                            :
                                            <>
                                                <IoWarning className="w-48 h-48 sm:w-24 sm:h-24 mx-auto text-red-600" />
                                            </>
                                    }
                                </div>
                                <p className="mb-4 text-lg sm:text-base leading-relaxed">
                                    {
                                        checkDeleteApplicationStatus ?
                                            <>
                                                <p className="text-green-500 font-bold">
                                                    Delete application success!
                                                </p>
                                            </>
                                            :
                                            <>

                                                <p> Are you sure you want to delete this application</p>
                                                <p><span className="font-bold text-red-600">{applicationDelete.positionDesired}</span> ?</p>
                                                {/* Do you want delete application <br></br><b>{applicationDelete.positionDesired}</b> ? */}
                                            </>
                                    }
                                </p>
                            </div>
                            <div className="flex items-center justify-center gap-2 mb-8">
                                {
                                    checkDeleteApplicationStatus ?
                                        <></>
                                        :
                                        <>

                                            <button
                                                className="btn btn-outlineGray"
                                                type="button"
                                                onClick={() => handleClose()}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className="btn btn-red ase-linear ms-2"
                                                type="button"
                                                onClick={() => deleteApplication(applicationDelete.recruitmentID)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyApplicationBody;

