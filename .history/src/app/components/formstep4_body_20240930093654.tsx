"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import useSWR from "swr";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { PostAndPatchApplicationTrainingSeminarAndCertificate } from "../actions/actionForm";
import moment from "moment";
import { FaCirclePlus, FaCircleXmark } from "react-icons/fa6";
import { GrFormNextLink } from "react-icons/gr";

const Form4_Body = ({ session, header }: any) => {

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);

    const [formData, setformData] = useState({
        recruitmentID: header.recruitmentID,
        trainingSeminar: header.trainingSeminar,
        trainingSeminarNo: header.trainingSeminarNo,
        certificate: header.certificate,
        certificateNo: header.certificateNo,
        formStep4: header.formStep4,
    });

    const [countTrainingSeminarNo, setCountTrainingSeminarNo] = useState(header.trainingSeminarNo);
    const [trainingSeminarDetails, setTrainingSeminarDetails] = useState(header.rmsTrainingseminar);
    const [countCertificateNo, setCountCertificateNo] = useState(header.certificateNo);
    const [certificateDetails, setCertificateDetails] = useState(header.rmsCertificate);

    const [showModal, setShowModal] = useState(false);

    const addTrainingSeminar = () => {
        setTrainingSeminarDetails((trainingSeminarDetails: any) => [...trainingSeminarDetails,
        {
            trainingCourse: '',
            trainingInstitute: '',
            trainingPeriod: '',
            trainingYear: '',
            recruitmentID: header.recruitmentID,
        }]);
        let prevCount = 1;
        setCountTrainingSeminarNo((prevCount: any) => prevCount + 1);
    }

    const removeTrainingSeminar = (index: any) => {
        setTrainingSeminarDetails((trainingSeminarDetails: any[]) => {
            return trainingSeminarDetails.filter((_, i) => i !== index)
        })
        setCountTrainingSeminarNo((prevCount: any) => prevCount - 1);
    }

    const addCertificate = () => {
        setCertificateDetails((certificateDetails: any) => [...certificateDetails,
        {
            certificate: '',
            certificateDetail: '',
            recruitmentID: header.recruitmentID,
        }]);
        let prevCount = 1;
        setCountCertificateNo((prevCount: any) => prevCount + 1);
    }

    const removeCertificate = (index: any) => {
        setCertificateDetails((certificateDetails: any[]) => {
            return certificateDetails.filter((_, i) => i !== index)
        })
        setCountCertificateNo((prevCount: any) => prevCount - 1);
    }

    const handleChangeHeader = (e: any) => {
        const { name, value } = e.target;
        setformData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (name === 'trainingSeminar') {
            if (value === 'N') {
                setTrainingSeminarDetails([]);
                setCountTrainingSeminarNo(0);
            }
        }
        if (name === 'certificate') {
            if (value === 'N') {
                setCertificateDetails([]);
                setCountCertificateNo(0);
            }
        }
    };

    const handleChangeInputTrainingSeminar = async (e: { target: { name: any; value: any } }, index: any) => {
        const arr = [...trainingSeminarDetails]
        if (e.target.name === 'trainingPeriod') {
            const inputText = e.target.value;
            const numbersOnly = inputText.replaceAll(/\D/g, '');
            arr[index] = { ...arr[index], [e.target.name]: numbersOnly }
        } else {
            arr[index] = { ...arr[index], [e.target.name]: e.target.value }
        }
        setTrainingSeminarDetails(arr);
    }

    const handleChangeInputCertificate = async (e: { target: { name: any; value: any } }, index: any) => {
        const arr = [...certificateDetails]
        arr[index] = { ...arr[index], [e.target.name]: e.target.value }
        setCertificateDetails(arr);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (formData.trainingSeminar === 'Y') {
            formData.trainingSeminarNo = countTrainingSeminarNo;
        } else {
            formData.trainingSeminarNo = 0;
            setCountTrainingSeminarNo(0);
        }

        if (formData.certificate === 'Y') {
            formData.certificateNo = countCertificateNo;
        } else {
            formData.certificateNo = 0;
            setCountCertificateNo(0);
        }
        formData.formStep4 = true;

        try {
            await PostAndPatchApplicationTrainingSeminarAndCertificate(formData, trainingSeminarDetails, certificateDetails);
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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="col-span-10 ml-2">
                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-4 mr-2">
                            <p className="text-title">Course and Seminar</p>
                            <select id="trainingSeminar" name="trainingSeminar" className="input-formcontrol px-2" value={formData.trainingSeminar} onChange={handleChangeHeader} required>
                                <option value="">SELECT</option>
                                <option value="Y">Ever / เคย</option>
                                <option value="N">Never / ไม่เคย</option>
                            </select>
                            <p className=" text-th">อบรม (หลักสูตร)</p>
                            {
                                formData.trainingSeminar === "Y" ?
                                    <>
                                        <p className="text-xs mb-1 font-medium inline-flex text-red-600">Please add course or seminar at least 1</p>
                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </div>

                        {
                            formData.trainingSeminar === "Y" ?
                                <>
                                    {
                                        countTrainingSeminarNo >= 3 ?
                                            <>
                                                <div className="col-span-2 mr-2">
                                                    <p className="text-xs font-medium mt-5 text-gray-700"></p>
                                                    <FaCirclePlus className=" text-gray-400 bg-white w-[35px] h-[35px] hover:text-gray-500 cursor-no-drop" />
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="col-span-2 mr-2">
                                                    <p className="text-xs font-medium mt-5 text-gray-700"></p>
                                                    <FaCirclePlus className=" text-green-500 bg-white w-[35px] h-[35px] hover:text-green-700 cursor-pointer" onClick={addTrainingSeminar} />
                                                </div>
                                            </>
                                    }
                                </>
                                :
                                <>
                                </>
                        }
                    </div>

                    {
                        formData.trainingSeminar === "Y" ?
                            <>
                                <div className="card-body">
                                    {trainingSeminarDetails.map((e: any, index: any) => (
                                        <Fragment key={index}>
                                            <div className="grid grid-cols-12 gap-2 mt-6">
                                                <div className="col-span-4 mr-2">
                                                    <label className="text-title">Course</label>
                                                    <input type="text" id="trainingCourse" name="trainingCourse" value={e.trainingCourse} maxLength={100} onChange={(e) => handleChangeInputTrainingSeminar(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">หลักสูตร</p>
                                                </div>

                                                <div className="col-span-3 mr-2">
                                                    <label className="text-title">Institute</label>
                                                    <input type="text" id="trainingInstitute" name="trainingInstitute" value={e.trainingInstitute} maxLength={100} onChange={(e) => handleChangeInputTrainingSeminar(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">สถาบัน</p>
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <label className="text-title">Month and Year</label>
                                                    <input type="month" id="trainingYear" name="trainingYear" value={moment(e.trainingYear).format('YYYY-MM') === null ? '' : moment(e.trainingYear).format('YYYY-MM')} onChange={(e) => handleChangeInputTrainingSeminar(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">เดือน / ปี</p>
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <label className="text-title">Period</label>
                                                    <input type="text" id="trainingPeriod" name="trainingPeriod" value={e.trainingPeriod === null ? '' : e.trainingPeriod} maxLength={3} onChange={(e) => handleChangeInputTrainingSeminar(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">ระยะเวลาการอบรม (วัน)</p>
                                                </div>

                                                <div className="col-span-1">
                                                    <p className="text-xs mb-1 font-medium inline-flex text-gray-700"></p>
                                                    <FaCircleXmark className="text-red-600 bg-white w-[35px] h-[35px] hover:text-red-700 ml-2 sm:ml-0 cursor-pointer" onClick={() => removeTrainingSeminar(index)} />
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                            </>
                            :
                            <>
                            </>
                    }

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-3 mr-2">
                            <p className="text-title">Certificate</p>
                            <select id="certificate" name="certificate" className="input-formcontrol px-2" value={formData.certificate} onChange={handleChangeHeader} required>
                                <option value="">SELECT</option>
                                <option value="Y">Have / มี</option>
                                <option value="N">Do not have / ไม่มี</option>
                            </select>
                            <p className=" text-th">ใบรับรอง (หลักสูตร)</p>
                            {
                                formData.certificate === "Y" ?
                                    <>
                                        <p className="text-xs mb-1 font-medium inline-flex text-red-600">Please add certificate at least 1</p>
                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </div>

                        {
                            formData.certificate === "Y" ?
                                <>
                                    {
                                        countCertificateNo >= 3 ?
                                            <>
                                                <div className="col-span-2 mr-2">
                                                    <p className="text-xs font-medium mt-5 text-gray-700"></p>
                                                    <FaCirclePlus className=" text-gray-400 bg-white w-[35px] h-[35px] hover:text-gray-500 cursor-no-drop" />
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="col-span-2 mr-2">
                                                    <p className="text-xs font-medium mt-5 text-gray-700"></p>
                                                    <FaCirclePlus className=" text-green-500 bg-white w-[35px] h-[35px] hover:text-green-700 cursor-pointer" onClick={addCertificate} />
                                                </div>
                                            </>
                                    }
                                </>
                                :
                                <>
                                </>
                        }
                    </div>

                    {
                        formData.certificate === "Y" ?
                            <>
                                <div className="card-body">
                                    {certificateDetails.map((e: any, index: any) => (
                                        <Fragment key={index}>
                                            <div className="grid grid-cols-12 gap-2 mt-6">
                                                <div className="col-span-5 mr-2">
                                                    <label className="text-title">Certificate</label>
                                                    <input type="text" id="certificate" name="certificate" value={e.certificate} maxLength={100} onChange={(e) => handleChangeInputCertificate(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">ใบรับรอง</p>
                                                </div>

                                                <div className="col-span-6 mr-2">
                                                    <label className="text-title">Description</label>
                                                    <input type="text" id="certificateDetail" name="certificateDetail" value={e.certificateDetail} maxLength={100} onChange={(e) => handleChangeInputCertificate(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">รายละเอียด</p>
                                                </div>

                                                <div className="col-span-1">
                                                    <p className="text-xs mb-1 font-medium inline-flex text-gray-700"></p>
                                                    <FaCircleXmark className="text-red-600 bg-white w-[35px] h-[35px] hover:text-red-700 ml-2 sm:ml-0 cursor-pointer" onClick={() => removeCertificate(index)} />
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                            </>
                            :
                            <>
                            </>
                    }

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-4 mr-2">
                            {
                                formData.trainingSeminar === "N" && formData.certificate === "N" ?
                                    <>
                                        <button type="submit" className="btn btn-blue">Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
                                    </>
                                    :
                                    formData.trainingSeminar === "Y" && formData.certificate === "N" ?
                                        <>
                                            {
                                                countTrainingSeminarNo !== 0 ?
                                                    <>
                                                        <button type="submit" className="btn btn-blue">Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
                                                    </>
                                                    :
                                                    <>
                                                        <button type="submit" className="btn btn-gray cursor-no-drop" disabled>Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
                                                    </>
                                            }
                                        </>
                                        :
                                        formData.trainingSeminar === "N" && formData.certificate === "Y" ?
                                            <>
                                                {
                                                    countCertificateNo !== 0 ?
                                                        <>
                                                            <button type="submit" className="btn btn-blue">Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
                                                        </>
                                                        :
                                                        <>
                                                            <button type="submit" className="btn btn-gray cursor-no-drop" disabled>Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
                                                        </>
                                                }
                                            </>
                                            :
                                            <>
                                                {
                                                    countTrainingSeminarNo !== 0 && countCertificateNo !== 0 ?
                                                        <>
                                                            <button type="submit" className="btn btn-blue">Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
                                                        </>
                                                        :
                                                        <>
                                                            <button type="submit" className="btn btn-gray cursor-no-drop" disabled>Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
                                                        </>
                                                }
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
                                                <Image src="/check.gif" alt="Loading..." style={{ width: 150, height: 150 }} />
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
                                                <Image src="/error.gif" alt="Loading..." width={100} height={100} />
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

export default Form4_Body;