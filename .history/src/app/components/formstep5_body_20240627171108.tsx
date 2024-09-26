"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import useSWR from "swr";
import { DeleteApplicationFileupload, PatchApplicationHeader } from "../actions/actionForm";
import moment from "moment";
import { GrFormNextLink } from "react-icons/gr";
import { IoLockClosed } from "react-icons/io5";
import ProgressBar from "./progressbar";

const Form5_Body = ({ session, header }: any) => {

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);

    const access_Token = session.accessToken;

    const [formData, setformData] = useState({
        recruitmentID: header.recruitmentID,
        interestsandHobbies: header.interestsandHobbies,
        listeningTH: header.listeningTH,
        speakingTH: header.speakingTH,
        readingTH: header.readingTH,
        writingTH: header.writingTH,
        listeningEN: header.listeningEN,
        speakingEN: header.speakingEN,
        readingEN: header.readingEN,
        writingEN: header.writingEN,
        languageOTH: header.languageOTH,
        listeningOTH: header.listeningOTH,
        speakingOTH: header.speakingOTH,
        readingOTH: header.readingOTH,
        writingOTH: header.writingOTH,
        toeicScore: header.toeicScore,
        ieltsScore: header.ieltsScore,
        otherLanguageTest: header.otherLanguageTest,
        msword: header.msword,
        msexcel: header.msexcel,
        mspowerpoint: header.mspowerpoint,
        chkcar1: header.chkcar1,
        chkcar2: header.chkcar2,
        chkcar3: header.chkcar3,
        carLicenseno: header.carLicenseno,
        carIssuesDate: header.carIssuesDate,
        carExpiredDate: header.carExpiredDate,
        chkMotorcycle1: header.chkMotorcycle1,
        chkMotorcycle2: header.chkMotorcycle2,
        chkMotorcycle3: header.chkMotorcycle3,
        motorcycleLicenseno: header.motorcycleLicenseno,
        motorcycleIssuesDate: header.motorcycleIssuesDate,
        motorcycleExpiredDate: header.motorcycleExpiredDate,
        toeic_FileName: header.toeic_FileName,
        ielts_FileName: header.ielts_FileName,
        other_FileName: header.other_FileName,
        formStep5: header.formStep5,
    });

    const [percentage, setPercentage] = useState(0);
    const [visibleToeic, setVisibleToeic] = useState(false);
    const [visibleIelts, setVisibleIelts] = useState(false);
    const [visibleOther, setVisibleOther] = useState(false);
    const [uploadFileName, setUploadFileName] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const handleFileChange = async (e: any, filetype: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        const filename = file.name;
        setUploadFileName(filename);
        if (filetype === 'TOEIC') {
            formData.toeic_FileName = filename;
            setVisibleToeic(true);
        } else if (filetype === 'IELTS') {
            formData.ielts_FileName = filename;
            setVisibleIelts(true);
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
                        setVisibleToeic(false);
                        setVisibleIelts(false);
                        setVisibleOther(false);
                        setPercentage(0);
                    }, 1000);
                }
            },
        })
    };

    const removeFileUpload = (filename: any, filetype: any) => {
        if (filetype === 'TOEIC') {
            formData.toeic_FileName = null;
        } else if (filetype === 'IELTS') {
            formData.ielts_FileName = null;
        } else if (filetype === 'OTHER') {
            formData.other_FileName = null;
        }
        DeleteApplicationFileupload(formData, filename, filetype);
    }

    const [textInputToeicScore, setTextInputToeicScore] = useState(header.toeicScore);
    const [textInputIeltsScore, setTextInputIeltsScore] = useState(header.ieltsScore);

    const handleChangeHeader = (e: any) => {
        const { name, value } = e.target;
        const inputText = e.target.value;
        const numbersOnly = inputText.replaceAll(/[^\d.]/g, '');
        const numbersOnly1 = inputText.replaceAll(/\D/g, '');
        if (name === 'toeicScore') {
            setTextInputToeicScore(numbersOnly);
            if (value !== '' || value !== null) {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: numbersOnly,
                }));
            }
        }
        console.log(name);
        if (name === 'ieltsScore') {
            setTextInputIeltsScore(numbersOnly);
            if (value !== '' || value !== null) {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: numbersOnly,
                }));
            }
        } else {
            setformData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        if (name === 'otherLanguageTest') {
            if (value === 'IELTS') {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
                if (formData.other_FileName != null) {
                    removeFileUpload(formData.other_FileName, 'OTHER');
                }
            } else {
                setformData((prevData) => ({
                    ...prevData,
                    ieltsScore: null,
                }));
                if (formData.ielts_FileName != null) {
                    removeFileUpload(formData.ielts_FileName, 'IELTS');
                }
            }
        }

        if (name === 'driving') {
            if (value === 'N') {
                formData.chkcar1 = null;
                formData.chkcar2 = null;
                formData.chkcar3 = null;
                formData.carLicenseno = null;
                formData.carIssuesDate = null;
                formData.carExpiredDate = null;
                formData.chkMotorcycle1 = null;
                formData.chkMotorcycle2 = null;
                formData.chkMotorcycle3 = null;
                formData.motorcycleLicenseno = null;
                formData.motorcycleIssuesDate = null;
                formData.motorcycleExpiredDate = null;
            }
        }
        if (name === 'carLicenseno') {
            setformData((prevData) => ({
                ...prevData,
                [name]: numbersOnly1,
            }));
        } else if (name === 'motorcycleLicenseno') {
            setformData((prevData) => ({
                ...prevData,
                [name]: numbersOnly1,
            }));
        } else {
            setformData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (formData.toeicScore === '') {
            formData.toeicScore = null;
        }
        if (formData.ieltsScore === '') {
            formData.ieltsScore = null;
        }
        if (formData.otherLanguageTest === '') {
            formData.otherLanguageTest = null;
        }
        formData.formStep5 = true;

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

    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const fetcherMasterLanguageTest = async (url: any) => {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${access_Token}` } });
        const data = await response.data;
        return data;
    };

    const { data, error }: any = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/master_languageTest', fetcherMasterLanguageTest);

    if (error) return <div>Error fetching data</div>;
    if (!data) return <div></div>;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="col-span-10 ml-2">
                    <div className="grid grid-cols-12 gap-2 mb-6 mr-2">
                        <div className="col-span-8">
                            <p className="text-title">Interests and Hobbies</p>
                            <input type="text" id="interestsandHobbies" name="interestsandHobbies" value={formData.interestsandHobbies} onChange={handleChangeHeader} className="input-formcontrol" />
                            <p className=" text-th">งานอดิเรก</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mb-6 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-blue-100 border-blue-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Language ability</p>
                        </div>
                    </div>

                    {/* <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Language<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                            <input type="text" id="" name="" value="Thai" className="input-formcontrol cursor-no-drop" disabled />
                            <p className=" text-th">ภาษาไทย</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Listening</p>
                            <select id="listeningTH" name="listeningTH" value={formData.listeningTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                            <p className=" text-th">การฟัง</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Speaking</p>
                            <select id="speakingTH" name="speakingTH" value={formData.speakingTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                            <p className=" text-th">การพูด</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Reading</p>
                            <select id="readingTH" name="readingTH" value={formData.readingTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                            <p className=" text-th">การอ่าน</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Writing</p>
                            <select id="writingTH" name="writingTH" value={formData.writingTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                            <p className=" text-th">การเขียน</p>
                        </div>
                    </div> */}

                    <div className="grid grid-cols-12 mt-6 gap-2">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Language<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                            <input type="text" id="" name="" value="English" className="input-formcontrol cursor-no-drop" disabled />
                            <p className=" text-th">ภาษาอังกฤษ</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Listening</p>
                            <select id="listeningEN" name="listeningEN" value={formData.listeningEN} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                            <p className=" text-th">การฟัง</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Speaking</p>
                            <select id="speakingEN" name="speakingEN" value={formData.speakingEN} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                            <p className=" text-th">การพูด</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Reading</p>
                            <select id="readingEN" name="readingEN" value={formData.readingEN} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                            <p className=" text-th">การอ่าน</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Writing</p>
                            <select id="writingEN" name="writingEN" value={formData.writingEN} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                            <p className=" text-th">การเขียน</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 my-6 gap-2">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Language</p>
                            <input type="text" id="languageOTH" name="languageOTH" value={formData.languageOTH} className="input-formcontrol" onChange={handleChangeHeader} />
                            <p className=" text-th">ภาษาอื่น</p>
                        </div>

                        {
                            formData.languageOTH !== null && formData.languageOTH !== '' ?
                                <>
                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Listening</p>
                                        <select id="listeningOTH" name="listeningOTH" value={formData.listeningOTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                        <p className=" text-th">การฟัง</p>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Speaking</p>
                                        <select id="speakingOTH" name="speakingOTH" value={formData.speakingOTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                        <p className=" text-th">การพูด</p>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Reading</p>
                                        <select id="readingOTH" name="readingOTH" value={formData.readingOTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                        <p className=" text-th">การอ่าน</p>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Writing</p>
                                        <select id="writingOTH" name="writingOTH" value={formData.writingOTH} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                        <p className=" text-th">การเขียน</p>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Listening<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                                        <select id="listeningOTH" name="listeningOTH" value={formData.listeningOTH} className="input-formcontrol px-2 cursor-no-drop" onChange={handleChangeHeader} disabled>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                        <p className=" text-th">การฟัง</p>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Speaking<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                                        <select id="speakingOTH" name="speakingOTH" value={formData.speakingOTH} className="input-formcontrol px-2 cursor-no-drop" onChange={handleChangeHeader} disabled>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                        <p className=" text-th">การพูด</p>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Reading<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                                        <select id="readingOTH" name="readingOTH" value={formData.readingOTH} className="input-formcontrol px-2 cursor-no-drop" onChange={handleChangeHeader} disabled>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                        <p className=" text-th">การอ่าน</p>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Writing<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                                        <select id="writingOTH" name="writingOTH" value={formData.writingOTH} className="input-formcontrol px-2 cursor-no-drop" onChange={handleChangeHeader} disabled>
                                            <option value="">Select</option>
                                            <option value="P">Poor / อ่อน</option>
                                            <option value="F">Fair / พอใช้</option>
                                            <option value="G">Good / ดี</option>
                                        </select>
                                        <p className=" text-th">การเขียน</p>
                                    </div>
                                </>
                        }
                    </div>

                    <div className="grid grid-cols-12 mb-6 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-blue-100 border-blue-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Language test</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Language Test<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                            <input type="text" id="" name="" value="TOEIC" maxLength={6} className="input-formcontrol cursor-no-drop" disabled />
                            <p className=" text-th">ใบรับรองด้านภาษา</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Score</p>
                            <input type="text" id="toeicScore" name="toeicScore" value={textInputToeicScore} maxLength={3} onChange={handleChangeHeader} className="input-formcontrol" />
                            <p className=" text-th">คะแนน</p>
                        </div>

                        {
                            formData.toeicScore !== '' && formData.toeicScore !== null ?
                                <>
                                    {
                                        formData.toeic_FileName !== '' && formData.toeic_FileName !== null ?
                                            <>
                                                <div className="col-span-3 mr-2 opacity-50 pointer-events-none">
                                                    <p className="text-title">Toeic Attachment</p>
                                                    <input type="file" name="files" className=" bg-gray-100 rounded-lg text-transparent w-full" onChange={(e) => handleFileChange(e, 'TOEIC')} />
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="col-span-3 mr-2">
                                                    <p className="text-title">Toeic Attachment</p>
                                                    <input type="file" name="files" className=" bg-gray-100 rounded-lg text-transparent w-full" onChange={(e) => handleFileChange(e, 'TOEIC')} />
                                                </div>
                                            </>
                                    }
                                </>
                                :
                                <>
                                    <div className="col-span-3 mr-2 opacity-50 pointer-events-none">
                                        <p className="text-title">Toeic Attachment</p>
                                        <input type="file" name="files" className=" bg-gray-100 rounded-lg text-transparent w-full" onChange={(e) => handleFileChange(e, 'TOEIC')} />
                                    </div>
                                </>
                        }

                        <div className="col-span-1 mr-2"></div>

                        <div className="col-span-4 mt-5">
                            {
                                visibleToeic ?
                                    <>
                                        <ProgressBar filename={uploadFileName} percentage={percentage} />
                                    </>
                                    :
                                    <>
                                        {
                                            formData.toeic_FileName ?
                                                <>
                                                    <p className="text-[11px] font-normal inline-flex text-gray-600">{formData.toeic_FileName}</p>
                                                    <svg className="w-4 h-4 text-red-700 inline-flex dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-3 -1 24 24" onClick={() => removeFileUpload(formData.toeic_FileName, 'TOEIC')}>
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
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Language Test</p>
                            <select id="otherLanguageTest" name="otherLanguageTest" className="input-formcontrol px-2" value={formData.otherLanguageTest} onChange={handleChangeHeader}>
                                <option value="">SELECT</option>
                                {data.map((item: any) => (
                                    <option key={item.languageTest} value={item.languageTest}>
                                        {item.languageTest}
                                    </option>
                                ))}
                            </select>
                            <p className=" text-th">ใบรับรองด้านภาษา</p>
                        </div>

                        <div className="col-span-2 mr-2 mb-6">
                            {
                                formData.otherLanguageTest === 'IELTS' ?
                                    <>
                                        <p className="text-title">Score</p>
                                        <input type="text" id="ieltsScore" name="ieltsScore" value={textInputIeltsScore} maxLength={3} onChange={handleChangeHeader} className="input-formcontrol" required />
                                    </>
                                    :
                                    <>
                                        <p className="text-title">Score<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                                        <input type="text" id="ieltsScore" name="ieltsScore" value="" maxLength={3} onChange={handleChangeHeader} className="input-formcontrol cursor-no-drop" disabled />
                                    </>
                            }
                            <p className=" text-th">คะแนน</p>
                        </div>

                        {
                            formData.ieltsScore !== '' && formData.ieltsScore !== null ?
                                <>
                                    {
                                        formData.ielts_FileName !== '' && formData.ielts_FileName !== null ?
                                            <>
                                                <div className="col-span-3 mr-2 opacity-50 pointer-events-none">
                                                    <p className="text-title">Ielts Attachment</p>
                                                    <input type="file" name="files" className=" bg-gray-100 rounded-lg text-transparent w-full" onChange={(e) => handleFileChange(e, 'IELTS')} />
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="col-span-3 mr-2">
                                                    <p className="text-title">Ielts Attachment</p>
                                                    <input type="file" name="files" className=" bg-gray-100 rounded-lg text-transparent w-full" onChange={(e) => handleFileChange(e, 'IELTS')} />
                                                </div>
                                            </>
                                    }
                                </>
                                :
                                <>
                                    <div className="col-span-3 mr-2 opacity-50 pointer-events-none">
                                        <p className="text-title">Ielts Attachment</p>
                                        <input type="file" name="files" className=" bg-gray-100 rounded-lg text-transparent w-full" onChange={(e) => handleFileChange(e, 'IELTS')} />
                                    </div>
                                </>
                        }

                        <div className="col-span-1 mr-2"></div>

                        <div className="col-span-4 mt-5">
                            {
                                visibleIelts ?
                                    <>
                                        <ProgressBar filename={uploadFileName} percentage={percentage} />
                                    </>
                                    :
                                    <>
                                        {
                                            formData.ielts_FileName ?
                                                <>
                                                    <p className="text-[11px] font-normal inline-flex text-gray-600">{formData.ielts_FileName}</p>
                                                    <svg className="w-4 h-4 text-red-700 inline-flex dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-3 -1 24 24" onClick={() => removeFileUpload(formData.ielts_FileName, 'IELTS')}>
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
                    </div>

                    <div className="grid grid-cols-12 gap-2 mb-6">
                        <div className="col-span-2 mr-2"></div>
                        <div className="col-span-2 mr-2"></div>
                        {
                            formData.otherLanguageTest !== 'IELTS' && formData.otherLanguageTest !== '' ?
                                <>
                                    {
                                        formData.other_FileName !== '' && formData.other_FileName !== null ?
                                            <>
                                                <div className="col-span-3 mr-2 opacity-50 pointer-events-none">
                                                    <p className="text-title">Japan Test Attachment</p>
                                                    <input type="file" name="files" className=" bg-gray-100 rounded-lg text-transparent w-full" onChange={(e) => handleFileChange(e, 'OTHER')} />
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="col-span-3 mr-2">
                                                    <p className="text-title">Japan Test Attachment</p>
                                                    <input type="file" name="files" className=" bg-gray-100 rounded-lg text-transparent w-full" onChange={(e) => handleFileChange(e, 'OTHER')} />
                                                </div>
                                            </>
                                    }
                                </>
                                :
                                <>
                                    <div className="col-span-3 mr-2 opacity-50 pointer-events-none">
                                        <p className="text-title">Japan Test Attachment</p>
                                        <input type="file" name="files" className=" bg-gray-100 rounded-lg text-transparent w-full" onChange={(e) => handleFileChange(e, 'OTHER')} />
                                    </div>
                                </>
                        }


                        <div className="col-span-1 mr-2"></div>

                        <div className="col-span-4 mt-5">
                            {
                                visibleOther ?
                                    <>
                                        <ProgressBar filename={uploadFileName} percentage={percentage} />
                                    </>
                                    :
                                    <>
                                        {
                                            formData.other_FileName ?
                                                <>
                                                    <p className="text-[11px] font-normal inline-flex text-gray-600">{formData.other_FileName}</p>
                                                    <svg className="w-4 h-4 text-red-700 inline-flex dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-3 -1 24 24" onClick={() => removeFileUpload(formData.other_FileName, 'OTHER')}>
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
                    </div>

                    <div className="grid grid-cols-12 mb-6 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-blue-100 border-blue-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Software ability</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6 mr-2">
                        <div className="col-span-3">
                            <p className="text-title">Software<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                            <input type="text" id="" name="" value="Microsoft Word" className="input-formcontrol cursor-no-drop" disabled />
                            <p className=" text-th">โปรแกรม</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Level</p>
                            <select id="msword" name="msword" value={formData.msword} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                            <p className=" text-th">ระดับความสามารถ</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6 mr-2">
                        <div className="col-span-3">
                            <p className="text-title">Software<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                            <input type="text" id="" name="" value="Microsoft Excel" className="input-formcontrol cursor-no-drop" disabled />
                            <p className=" text-th">โปรแกรม</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Level</p>
                            <select id="msexcel" name="msexcel" value={formData.msexcel} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                            <p className=" text-th">ระดับความสามารถ</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 my-6 mr-2">
                        <div className="col-span-3">
                            <p className="text-title">Software<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                            <input type="text" id="" name="" value="Microsoft PowerPoint" className="input-formcontrol cursor-no-drop" disabled />
                            <p className=" text-th">โปรแกรม</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Level</p>
                            <select id="mspowerpoint" name="mspowerpoint" value={formData.mspowerpoint} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="P">Poor / อ่อน</option>
                                <option value="F">Fair / พอใช้</option>
                                <option value="G">Good / ดี</option>
                            </select>
                            <p className=" text-th">ระดับความสามารถ</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mb-6 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-blue-100 border-blue-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Car details</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mt-4 pb-8 gap-2">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Driving can be</p>
                            <select id="chkcar1" name="chkcar1" value={formData.chkcar1} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Yes / ใช่</option>
                                <option value="N">No / ไม่ใช่</option>
                            </select>
                            <p className=" text-th">สามารถขับขี่ได้</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Have a license</p>
                            <select id="chkcar2" name="chkcar2" value={formData.chkcar2} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Have / มี</option>
                                <option value="N">Do not have / ไม่มี</option>
                            </select>
                            <p className=" text-th">มีใบอนุญาตขับขี่</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Have a vehicle</p>
                            <select id="chkcar3" name="chkcar3" value={formData.chkcar3} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Have / มี</option>
                                <option value="N">Do not have / ไม่มี</option>
                            </select>
                            <p className=" text-th">มียานพาหนะส่วนตัว</p>
                        </div>

                        {
                            formData.chkcar2 === "Y" ?
                                <>
                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">License No</p>
                                        <input type="text" id="carLicenseno" name="carLicenseno" value={formData.carLicenseno} maxLength={8} className="input-formcontrol" onChange={handleChangeHeader} required />
                                        <p className=" text-th">ใบอนุญาติขับขี่หมายเลข</p>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Issues Date</p>
                                        <input type="date" id="carIssuesDate" name="carIssuesDate" value={formData.carIssuesDate} className="input-formcontrol" onChange={handleChangeHeader} required />
                                        <p className=" text-th">วันที่ออกให้</p>
                                    </div>

                                    <div className="col-span-2">
                                        <p className="text-title">Expired Date</p>
                                        <input type="date" id="carExpiredDate" name="carExpiredDate" value={formData.carExpiredDate} className="input-formcontrol" onChange={handleChangeHeader} required />
                                        <p className=" text-th">วันหมดอายุ</p>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">License No<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                                        <input type="text" id="carLicenseno" name="carLicenseno" value={formData.carLicenseno} className="input-formcontrol cursor-no-drop" disabled />
                                        <p className=" text-th">ใบอนุญาติขับขี่หมายเลข</p>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Issues Date<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                                        <input type="date" id="carIssuesDate" name="carIssuesDate" value={formData.carIssuesDate} className="input-formcontrol cursor-no-drop" disabled />
                                        <p className=" text-th">วันที่ออกให้</p>
                                    </div>

                                    <div className="col-span-2">
                                        <p className="text-title">Expired Date<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                                        <input type="date" id="carExpiredDate" name="carExpiredDate" value={formData.carExpiredDate} className="input-formcontrol cursor-no-drop" disabled />
                                        <p className=" text-th">วันหมดอายุ</p>
                                    </div>
                                </>
                        }
                    </div>

                    <div className="grid grid-cols-12 mb-6 gap-2">
                        <div className="col-span-12 border-l-[6px] bg-blue-100 border-blue-500">
                            <p className="text-xs ml-2 mb-1 font-bold inline-flex text-gray-700">Motorcycle details</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mt-4 gap-2">
                        <div className="col-span-2 mr-2">
                            <p className="text-title">Driving can be</p>
                            <select id="chkMotorcycle1" name="chkMotorcycle1" value={formData.chkMotorcycle1} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Yes / ใช่</option>
                                <option value="N">No / ไม่ใช่</option>
                            </select>
                            <p className=" text-th">สามารถขับขี่ได้</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Have a license</p>
                            <select id="chkMotorcycle2" name="chkMotorcycle2" value={formData.chkMotorcycle2} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Have / มี</option>
                                <option value="N">Do not have / ไม่มี</option>
                            </select>
                            <p className=" text-th">มีใบอนุญาตขับขี่</p>
                        </div>

                        <div className="col-span-2 mr-2">
                            <p className="text-title">Have a vehicle</p>
                            <select id="chkMotorcycle3" name="chkMotorcycle3" value={formData.chkMotorcycle3} className="input-formcontrol px-2" onChange={handleChangeHeader} required>
                                <option value="">Select</option>
                                <option value="Y">Have / มี</option>
                                <option value="N">Do not have / ไม่มี</option>
                            </select>
                            <p className=" text-th">มียานพาหนะส่วนตัว</p>
                        </div>

                        {
                            formData.chkMotorcycle2 === "Y" ?
                                <>
                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">License No</p>
                                        <input type="text" id="motorcycleLicenseno" name="motorcycleLicenseno" value={formData.motorcycleLicenseno} maxLength={8} className="input-formcontrol" onChange={handleChangeHeader} required />
                                        <p className=" text-th">ใบอนุญาติขับขี่หมายเลข</p>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Issues Date</p>
                                        <input type="date" id="motorcycleIssuesDate" name="motorcycleIssuesDate" value={formData.motorcycleIssuesDate} className="input-formcontrol" onChange={handleChangeHeader} required />
                                        <p className=" text-th">วันที่ออกให้</p>
                                    </div>

                                    <div className="col-span-2">
                                        <p className="text-title">Expired Date</p>
                                        <input type="date" id="motorcycleExpiredDate" name="motorcycleExpiredDate" value={formData.motorcycleExpiredDate} className="input-formcontrol" onChange={handleChangeHeader} required />
                                        <p className=" text-th">วันหมดอายุ</p>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">License No<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                                        <input type="text" id="motorcycleLicenseno" name="motorcycleLicenseno" value={formData.motorcycleLicenseno} className="input-formcontrol cursor-no-drop" disabled />
                                        <p className=" text-th">ใบอนุญาติขับขี่หมายเลข</p>
                                    </div>

                                    <div className="col-span-2 mr-2">
                                        <p className="text-title">Issues Date<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                                        <input type="date" id="motorcycleIssuesDate" name="motorcycleIssuesDate" value={formData.motorcycleIssuesDate} className="input-formcontrol cursor-no-drop" disabled />
                                        <p className=" text-th">วันที่ออกให้</p>
                                    </div>

                                    <div className="col-span-2">
                                        <p className="text-title">Expired Date<IoLockClosed className="inline-flex text-red-500 text-xs ms-1" /></p>
                                        <input type="date" id="motorcycleExpiredDate" name="motorcycleExpiredDate" value={formData.motorcycleExpiredDate} className="input-formcontrol cursor-no-drop" disabled />
                                        <p className=" text-th">วันหมดอายุ</p>
                                    </div>
                                </>
                        }
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-4 mr-2">
                            <button type="submit" className="btn btn-blue">Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
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

export default Form5_Body;