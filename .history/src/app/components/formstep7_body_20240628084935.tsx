"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { PatchApplicationHeader, DeleteApplicationFileupload } from "../actions/actionForm";
import moment from "moment";
import ProgressBar from "./progressbar";
import { GrFormNextLink } from "react-icons/gr";

const Form7_Body = ({ session, header }: any) => {

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);

    const [percentage, setPercentage] = useState(0);
    const [visibleImage, setVisibleImage] = useState(false);
    const [visibleToeic, setVisibleToeic] = useState(false);
    const [visibleResume, setVisibleResume] = useState(false);
    const [visibleIelts, setVisibleIelts] = useState(false);
    const [visibleOther, setVisibleOther] = useState(false);
    const [uploadFileName, setUploadFileName] = useState(null);

    const access_Token = session.accessToken;

    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const [formData, setformData] = useState({
        recruitmentID: header.recruitmentID,
        formStep7: header.formStep7,
        image_FileName: header.image_FileName,
        toeic_FileName: header.toeic_FileName,
        ielts_FileName: header.ielts_FileName,
        other_FileName: header.other_FileName,
        resume_FileName: header.resume_FileName,
    });

    const [showModal, setShowModal] = useState(false);

    const handleFileChange = async (e: any, filetype: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        const filename = file.name;
        setUploadFileName(filename);
        if (filetype === 'IMAGE') {
            formData.image_FileName = filename;
            setVisibleImage(true);
        } else if (filetype === 'TOEIC') {
            formData.toeic_FileName = filename;
            setVisibleToeic(true);
        } else if (filetype === 'IELTS') {
            formData.ielts_FileName = filename;
            setVisibleIelts(true);
        } else if (filetype === 'RESUME') {
            formData.resume_FileName = filename;
            setVisibleResume(true);
        } else if (filetype === 'OTHER') {
            formData.other_FileName = filename;
            setVisibleOther(true);
        }
        const fileData = new FormData();
        fileData.append('files', file);
        await PatchApplicationHeader(formData);
        await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/rms/upload/' + header.recruitmentID + '/' + filetype, fileData, {
            headers, onUploadProgress: (progressEvent: any) => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setPercentage(progress);
                if (progress === 100) {
                    setTimeout(() => {
                        setVisibleImage(false);
                        setVisibleToeic(false);
                        setVisibleResume(false);
                        setVisibleIelts(false);
                        setVisibleOther(false);
                        setUploadFileName(null);
                        setPercentage(0);
                    }, 1000);
                }
            },
        })
    };

    const removeFileUpload = (filename: any, filetype: any) => {
        if (filetype === 'IMAGE') {
            formData.image_FileName = null;
        } else if (filetype === 'TOEIC') {
            formData.toeic_FileName = null;
        } else if (filetype === 'IELTS') {
            formData.ielts_FileName = null;
        } else if (filetype === 'RESUME') {
            formData.resume_FileName = null;
        } else if (filetype === 'OTHER') {
            formData.other_FileName = null;
        }
        DeleteApplicationFileupload(formData, filename, filetype);
    }

    const handleChangeHeader = (e: any) => {
        const { name, value } = e.target;
        setformData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        formData.formStep7 = true;

        try {
            await PatchApplicationHeader(formData);
            setShowModal(true);
            setSubmitStatus(true);
            setTimeout(() => {
                setShowModal(false);
                window.location.href = '/main/application_form/' + header.recruitmentID;
            }, 3000)
        } catch (err) {
            setShowModal(true);
            setSubmitStatus(false);
            setTimeout(() => {
                setShowModal(false);
            }, 3000)
        }
    };

    const fetcherFileUpload = async (url: any) => {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${access_Token}` } });
        const data = await response.data;
        return data;
    };

    // const fetcherProfile = async (url: any) => {
    //     const response = await axios.get(url, { headers: { Authorization: `Bearer ${access_Token}` }, responseType: 'blob' });
    //     const fileReaderInstance = new FileReader();
    //     fileReaderInstance.readAsDataURL(new Blob([response.data]));
    //     fileReaderInstance.onload = () => {
    //         let base64data: any;
    //         base64data = fileReaderInstance.result;
    //         setImageBlob(base64data)
    //     }
    //     const data = await response.data;
    //     return data;
    // };

    const { data, error }: any = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/rms/' + header.recruitmentID, fetcherFileUpload, { refreshInterval: 3000 });

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="col-span-10 ml-2">
                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-12 mr-2">
                            <label className="text-title">Please upload profile image and certificate of language test.</label>
                            <p className="text-th">โปรดอัปโหลดรูปโปรไฟล์และใบรับรองการอบรมหรือใบรับรองการสอบ</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2">
                        {
                            formData.image_FileName !== '' && formData.image_FileName !== null ?
                                <>
                                    <div className="col-span-3 mt-6 mr-2 opacity-50 pointer-events-none">
                                        <label className="text-title">Profile Image</label>
                                        <input type="file" name="files" className="mt-4 bg-gray-100 rounded-lg text-transparent" accept=".jpg, .jpeg, .png" onChange={(e) => handleFileChange(e, 'IMAGE')} />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-span-3 mt-6 mr-2">
                                        <label className="text-title">Profile Image</label>
                                        <input type="file" name="files" className="mt-4 bg-gray-100 rounded-lg text-transparent" accept=".jpg, .jpeg, .png" onChange={(e) => handleFileChange(e, 'IMAGE')} />
                                    </div>
                                </>
                        }

                        <div className="col-span-2 mt-6 mr-2"></div>

                        <div className="col-span-4 mt-6 mr-2"></div>
                    </div>

                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-5 mt-6 mr-2">
                            {
                                visibleImage ?
                                    <>
                                        <ProgressBar filename={uploadFileName} percentage={percentage} />
                                    </>
                                    :
                                    <>
                                        {
                                            formData.image_FileName ?
                                                <>
                                                    <p className="text-[11px] font-normal inline-flex text-gray-600">{formData.image_FileName}</p>
                                                    <svg className="w-4 h-4 text-red-700 inline-flex dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-3 -1 24 24" onClick={() => removeFileUpload(formData.image_FileName, 'IMAGE')}>
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6m0 12L6 6" />
                                                    </svg>
                                                </>
                                                :
                                                <>
                                                </>
                                        }
                                    </>
                            }
                        </div>

                        <div className="col-span-5 mt-6 mr-2"></div>
                        <div className="col-span-2 mt-6"></div>
                    </div>

                    <div className="grid grid-cols-12 gap-2">
                        {
                            formData.resume_FileName !== '' && formData.resume_FileName !== null ?
                                <>
                                    <div className="col-span-3 mt-6 mr-2 opacity-50 pointer-events-none">
                                        <label className="text-[11px] font-bold text-gray-700">Resume</label>
                                        <input type="file" name="files" className="mt-4 bg-gray-100 rounded-lg text-transparent" accept=".pdf" onChange={(e) => handleFileChange(e, 'RESUME')} />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-span-3 mt-6 mr-2">
                                        <label className="text-[11px] font-bold text-gray-700">Resume</label>
                                        <input type="file" name="files" className="mt-4 bg-gray-100 rounded-lg text-transparent" accept=".pdf" onChange={(e) => handleFileChange(e, 'RESUME')} />
                                    </div>
                                </>
                        }


                        <div className="col-span-2 mt-6 mr-2"></div>
                        <div className="col-span-4 mt-6 mr-2"></div>
                    </div>

                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-5 mt-6 mr-2">
                            {
                                visibleResume ?
                                    <>
                                        <ProgressBar filename={uploadFileName} percentage={percentage} />
                                    </>
                                    :
                                    <>
                                        {
                                            formData.resume_FileName ?
                                                <>
                                                    <p className="text-[11px] font-normal inline-flex text-gray-600">{formData.resume_FileName}</p>
                                                    <svg className="w-4 h-4 text-red-700 inline-flex dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-3 -1 24 24" onClick={() => removeFileUpload(formData.resume_FileName, 'RESUME')}>
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 18 6m0 12L6 6" />
                                                    </svg>
                                                </>
                                                :
                                                <>
                                                </>
                                        }
                                    </>
                            }
                        </div>

                        <div className="col-span-5 mt-6 mr-2"></div>
                        <div className="col-span-2 mt-6"></div>
                    </div>



                    <p className="text-title"><span className="text-red-500 font-semibold">* หมายเหตุ</span> ถ้าหากไม่อัปโหลดรูปโปรไฟล์จะไม่สามารถไปขั้นตอนถัดไปได้</p>
                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-4 mr-2">
                            {
                                formData.image_FileName ?
                                    <>
                                        <button type="submit" className="btn btn-blue">Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
                                    </>
                                    :
                                    <>
                                        <button type="submit" className="btn btn-gray cursor-no-drop" disabled>Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </form>

            <div className={`popup z-20 ${showModal ? 'fade-in' : 'fade-out'}`}>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
                    <div className="relative w-[500px] my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {
                                submitStatus ?
                                    <>
                                        <div className="flex self-center px-5 pt-5">
                                            <h3 className="text-xl font-semibold">
                                                <img src="/check.gif" alt="Loading..." style={{ width: 150, height: 150 }} />
                                            </h3>
                                        </div>
                                        <div className="relative px-8 pt-4 pb-8 flex-auto text-center">
                                            <p className="my-4 text-lg leading-relaxed">
                                                <p className="text-green-500 font-bold">
                                                    Success!
                                                </p>
                                            </p>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="flex self-center px-5 pt-9 pb-6   rounded-t">
                                            <h3 className="text-xl font-semibold">
                                                <img src="/error.gif" alt="Loading..." style={{ width: 100, height: 100 }} />
                                            </h3>
                                        </div>
                                        <div className="relative px-8 pt-4 pb-8 flex-auto text-center">
                                            <p className="my-4 text-lg leading-relaxed">
                                                <p className="text-red-600 font-bold">
                                                    Failed, Please try again!
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

export default Form7_Body;