"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import useSWR from "swr";
import { PostAndPatchApplicationEducationAndWorkExperience } from "../actions/actionForm";
import moment from "moment";
import { FaCirclePlus, FaCircleXmark } from "react-icons/fa6";
import { GrFormNextLink } from "react-icons/gr";

const Form3_Body = ({ session, header }: any) => {

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);

    const access_Token = session.accessToken;

    const [formData, setformData] = useState({
        recruitmentID: header.recruitmentID,
        educationNo: header.educationNo,
        newGraduate: header.newGraduate,
        workExperienceNo: header.workExperienceNo,
        internship: header.internship,
        internshipNo: header.internshipNo,
        presentJobOrProject: header.presentJobOrProject,
        formStep3: header.formStep3,
    });

    const [countEducationNo, setCountEducationNo] = useState(header.educationNo);
    const [educationDetails, setEducationDetails] = useState(header.rmsEducation);
    const [countWorkExperienceNo, setCountWorkExperienceNo] = useState(header.workExperienceNo);
    const [workExperienceDetails, setWorkExperienceDetails] = useState(header.rmsWorkexperience);
    const [countInternshipNo, setCountInternshipNo] = useState(header.internshipNo);
    const [internshipDetails, setInternshipDetails] = useState(header.rmsInternship);

    const [showModal, setShowModal] = useState(false);

    const addEducation = () => {
        setEducationDetails((educationDetails: any) => [...educationDetails,
        {
            degreeobtained: '',
            eduFrom: '',
            eduTo: '',
            education: '',
            gpa: '',
            institute: '',
            major: '',
            recruitmentID: header.recruitmentID,
        }]);
        let prevCount = 1;
        setCountEducationNo((prevCount: any) => prevCount + 1);
    }

    const removeEducation = (index: any) => {
        setEducationDetails((educationDetails: any[]) => {
            return educationDetails.filter((_, i) => i !== index)
        })
        setCountEducationNo((prevCount: any) => prevCount - 1);
    }

    const addWorkExperience = () => {
        setWorkExperienceDetails((workExperienceDetails: any) => [...workExperienceDetails,
        {
            company: '',
            currentlyWorking: '',
            lastSalary: '',
            position: '',
            responsibility: '',
            reasonofLeaving: '',
            typeofBusiness: '',
            workExpFrom: '',
            workExpTo: '',
            recruitmentID: header.recruitmentID,
        }]);
        let prevCount = 1;
        setCountWorkExperienceNo((prevCount: any) => prevCount + 1);
    }

    const removeWorkExperience = (index: any) => {
        setWorkExperienceDetails((workExperienceDetails: any[]) => {
            return workExperienceDetails.filter((_, i) => i !== index)
        })
        setCountWorkExperienceNo((prevCount: any) => prevCount - 1);
    }

    const addInternship = () => {
        setInternshipDetails((internshipDetails: any) => [...internshipDetails,
        {
            internshipCompany: '',
            internshipPosition: '',
            internshipTypeofBusiness: '',
            internshipExpFrom: '',
            internshipExpTo: '',
            recruitmentID: header.recruitmentID,
        }]);
        let prevCount = 1;
        setCountInternshipNo((prevCount: any) => prevCount + 1);
    }

    const removeInternship = (index: any) => {
        setInternshipDetails((internshipDetails: any[]) => {
            return internshipDetails.filter((_, i) => i !== index)
        })
        setCountInternshipNo((prevCount: any) => prevCount - 1);
    }

    const handleChangeInputEducation = async (e: { target: { name: any; value: any } }, index: any) => {
        const arr = [...educationDetails]
        if (e.target.name === 'gpa') {
            const inputText = e.target.value;
            const numbersOnly = inputText.replaceAll(/[^\d.]/g, '');
            arr[index] = { ...arr[index], [e.target.name]: numbersOnly }
        } else if (e.target.name === 'eduFrom') {
            const formattedDate = moment(e.target.value).format('YYYY-MM');
            arr[index] = { ...arr[index], [e.target.name]: formattedDate }
        } else if (e.target.name === 'eduTo') {
            const formattedDate = moment(e.target.value).format('YYYY-MM');
            arr[index] = { ...arr[index], [e.target.name]: formattedDate }
        } else {
            arr[index] = { ...arr[index], [e.target.name]: e.target.value }
        }
        setEducationDetails(arr);
    }

    const handleChangeInputWorkExperience = async (e: { target: { name: any; value: any } }, index: any) => {
        const arr = [...workExperienceDetails]
        if (e.target.name === 'lastSalary') {
            const inputText = e.target.value;
            const numbersOnly = inputText.replaceAll(/\D/g, '');
            arr[index] = { ...arr[index], [e.target.name]: numbersOnly }
        } else {
            arr[index] = { ...arr[index], [e.target.name]: e.target.value }
        }
        setWorkExperienceDetails(arr);
    }

    const handleChangeInputInternship = async (e: { target: { name: any; value: any } }, index: any) => {
        const arr = [...internshipDetails]
        arr[index] = { ...arr[index], [e.target.name]: e.target.value }
        setInternshipDetails(arr);
    }

    const handleChangeHeader = (e: any) => {
        const { name, value } = e.target;
        setformData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (name === 'newGraduate') {
            if (value === 'Y') {
                setWorkExperienceDetails([]);
                setCountWorkExperienceNo(0);
            }
        }
        if (name === 'internship') {
            if (value === 'N') {
                setInternshipDetails([]);
                setCountInternshipNo(0);
            }
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        formData.educationNo = countEducationNo;
        if (formData.newGraduate === 'N') {
            formData.workExperienceNo = countWorkExperienceNo;
            formData.presentJobOrProject = null;
        } else {
            formData.workExperienceNo = 0;
            setCountWorkExperienceNo(0);
        }
        if (formData.internship === 'Y') {
            formData.internshipNo = countInternshipNo;
        } else {
            formData.internshipNo = 0;
            setCountInternshipNo(0);
        }
        formData.formStep3 = true;

        try {
            await PostAndPatchApplicationEducationAndWorkExperience(formData, educationDetails, workExperienceDetails, internshipDetails);
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

    const fetcherMasterEducation = async (url: any) => {
        const response = await axios.get(url, { headers: { Authorization: `Bearer ${access_Token}` } });
        const data = await response.data;
        return data;
    };

    const { data, error }: any = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/master_education/active', fetcherMasterEducation);

    if (error) return <div>Error fetching data</div>;
    if (!data) return <div></div>;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="col-span-10 sm:col-span-2">
                    <div className="grid grid-cols-12">
                        <div className="col-span-3 sm:col-span-full">
                            <div className="flex items-center text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="me-2">
                                    <div className="text-sm text-gray-700 font-medium">Education</div>
                                    <div className="text-xs text-red-600 font-medium">Please add education at least 1</div>
                                </div>
                                {
                                    countEducationNo >= 3 ?
                                        <>
                                            <FaCirclePlus className="ml-auto inline-flex text-gray-400 bg-white w-[35px] h-[35px] hover:text-gray-500 cursor-no-drop" />
                                        </>
                                        :
                                        <>
                                            <div className="col-span-2 mr-2">
                                                <p className="text-xs font-medium inline-flex text-gray-700"></p>
                                                <FaCirclePlus className="ml-auto inline-flex text-green-500 bg-white w-[35px] h-[35px] hover:text-green-700 cursor-pointer" onClick={addEducation} />
                                            </div>
                                        </>
                                }

                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        {educationDetails.map((e: any, index: any) => (
                            <Fragment key={index}>
                                <div className="grid grid-cols-12 gap-2 mt-6">
                                    <div className="col-span-4 sm:col-span-10 order-1 sm:order-1 mr-2">
                                        <p className="text-title">Education</p>
                                        <select id="education" name="education" className="input-formcontrol px-2" value={e.education} onChange={(e) => handleChangeInputEducation(e, index)} required>
                                            <option value="">Select</option>
                                            {data.map((item: any) => (
                                                <option key={item.educationEN} value={item.educationEN + ' / ' + item.educationTH}>
                                                    {item.educationEN} / {item.educationTH}
                                                </option>
                                            ))}
                                        </select>
                                        <p className=" text-th">ระดับการศึกษา</p>
                                    </div>

                                    <div className="col-span-4 sm:col-span-full order-2 sm:order-3 mr-2">
                                        <p className="text-title">Institute</p>
                                        <input type="text" id="institute" name="institute" value={e.institute} maxLength={1000} onChange={(e) => handleChangeInputEducation(e, index)} className="input-formcontrol" required />
                                        <p className=" text-th">สถาบันการศึกษา</p>
                                    </div>

                                    <div className="col-span-2 sm:col-span-full order-3 sm:order-4 mr-2">
                                        <p className="text-title">From</p>
                                        <input type="month" id="eduFrom" name="eduFrom" value={moment(e.eduFrom).format('YYYY-MM') === null ? '' : moment(e.eduFrom).format('YYYY-MM')} onChange={(e) => handleChangeInputEducation(e, index)} className="input-formcontrol" required />
                                        <p className=" text-th">จาก (เดือน / ปี)</p>
                                    </div>

                                    <div className="col-span-2 sm:col-span-full order-4 sm:order-5">
                                        <p className="text-title">To</p>
                                        <input type="month" id="eduTo" name="eduTo" value={moment(e.eduTo).format('YYYY-MM') === null ? '' : moment(e.eduTo).format('YYYY-MM')} onChange={(e) => handleChangeInputEducation(e, index)} className="input-formcontrol" required />
                                        <p className=" text-th">ถึง (เดือน / ปี)</p>
                                    </div>

                                    <div className="col-span-4 sm:col-span-full order-5 sm:order-6 mr-2">
                                        <p className="text-title">Degree Obtained</p>
                                        <input type="text" id="degreeobtained" name="degreeobtained" value={e.degreeobtained} maxLength={100} onChange={(e) => handleChangeInputEducation(e, index)} className="input-formcontrol" required />
                                        <p className=" text-th">วุฒิที่ได้รับ</p>
                                    </div>

                                    <div className="col-span-4 sm:col-span-full order-6 sm:order-7 mr-2">
                                        <p className="text-title">Major</p>
                                        <input type="text" id="major" name="major" value={e.major} maxLength={100} onChange={(e) => handleChangeInputEducation(e, index)} className="input-formcontrol" required />
                                        <p className=" text-th">สาขาวิชา</p>
                                    </div>

                                    <div className="col-span-1 sm:col-span-full order-7 sm:order-8 mr-2">
                                        <p className="text-title">GPA</p>
                                        <input type="text" id="gpa" name="gpa" value={e.gpa} maxLength={4} onChange={(e) => handleChangeInputEducation(e, index)} className="input-formcontrol" required />
                                        <p className=" text-th">เกรดเฉลี่ย</p>
                                    </div>

                                    <div className="col-span-1 sm:col-span-2 order-8 sm:order-2 items-center">
                                        <p className="text-xs font-medium mt-5 text-gray-700"></p>
                                        <FaCircleXmark className="text-red-600 bg-white w-[35px] h-[35px] hover:text-red-700 ml-2 sm:ml-0 cursor-pointer" onClick={() => removeEducation(index)} />
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-3 sm:col-span-full mr-2">
                            <p className="text-xs font-medium inline-flex text-gray-700">Are you a new graduate?</p>
                            <select id="newGraduate" name="newGraduate" className="input-formcontrol px-2" value={formData.newGraduate} onChange={handleChangeHeader} required>
                                <option value="">SELECT</option>
                                <option value="Y">Yes / ใช่</option>
                                <option value="N">No / ไม่ใช่</option>
                            </select>
                            <p className=" text-th">นักศึกษาจบใหม่</p>
                            {
                                formData.newGraduate === "N" ?
                                    <>
                                        <p className="text-xs mb-1 font-medium inline-flex text-red-600">Please add children at least 1 person</p>
                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </div>

                        {
                            formData.newGraduate === "N" ?
                                <>
                                    {
                                        countWorkExperienceNo >= 3 ?
                                            <>
                                                <div className="col-span-2 mr-2">
                                                    <p className="text-xs font-medium inline-flex text-gray-700"></p>
                                                    <FaCirclePlus className=" text-gray-400 bg-white w-[35px] h-[35px] hover:text-gray-500 cursor-no-drop" />
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="col-span-2 mr-2">
                                                    <p className="text-xs font-medium inline-flex text-gray-700"></p>
                                                    <FaCirclePlus className=" text-green-500 bg-white w-[35px] h-[35px] hover:text-green-700 cursor-pointer" onClick={addWorkExperience} />
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
                        formData.newGraduate === "N" ?
                            <>
                                <div className="card-body">
                                    {workExperienceDetails.map((e: any, index: any) => (
                                        <Fragment key={index}>
                                            <div className="grid grid-cols-12 gap-2 mt-6">
                                                <div className="col-span-3 mr-2">
                                                    <p className="text-title">Company</p>
                                                    <input type="text" id="company" name="company" value={e.company} maxLength={50} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">บริษัท</p>
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <p className="text-title">Business Type</p>
                                                    <input type="text" id="typeofBusiness" name="typeofBusiness" value={e.typeofBusiness} maxLength={50} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">ประเภทธุรกิจ</p>
                                                </div>

                                                <div className="col-span-3 mr-2">
                                                    <p className="text-title">Position</p>
                                                    <input type="text" id="position" name="position" value={e.position} maxLength={50} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">ตำแหน่ง</p>
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <p className="text-title">From</p>
                                                    <input type="month" id="workExpFrom" name="workExpFrom" value={moment(e.workExpFrom).format('YYYY-MM') === null ? '' : moment(e.workExpFrom).format('YYYY-MM')} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">จาก (เดือน / ปี)</p>
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <p className="text-title">To</p>
                                                    <input type="month" id="workExpTo" name="workExpTo" value={moment(e.workExpTo).format('YYYY-MM') === null ? '' : moment(e.workExpTo).format('YYYY-MM')} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">ถึง (เดือน / ปี)</p>
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <p className="text-title">Salary</p>
                                                    <input type="text" id="lastSalary" name="lastSalary" value={e.lastSalary === null ? '' : e.lastSalary} maxLength={6} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">เงินเดือนสุดท้าย</p>
                                                </div>

                                                <div className="col-span-3">
                                                    <p className="text-title">Responsibility</p>
                                                    <input type="text" id="responsibility" name="responsibility" value={e.responsibility} maxLength={100} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">หน้าที่รับผิดชอบ</p>
                                                </div>

                                                <div className="col-span-3">
                                                    <p className="text-title">Reason of Leaving</p>
                                                    <input type="text" id="reasonofLeaving" name="reasonofLeaving" value={e.reasonofLeaving} maxLength={100} onChange={(e) => handleChangeInputWorkExperience(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">เหตุผลที่ลาออก</p>
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <p className="text-title">Currently Working</p>
                                                    <select id="currentlyWorking" name="currentlyWorking" className="input-formcontrol px-2" value={e.currentlyWorking} onChange={(e) => handleChangeInputWorkExperience(e, index)} required>
                                                        <option value="">SELECT</option>
                                                        <option value="Y">Yes / ใช่</option>
                                                        <option value="N">No / ไม่ใช่</option>
                                                    </select>
                                                    <p className=" text-th">ปัจจุบันทำงานอยู่</p>
                                                </div>

                                                <div className="col-span-1">
                                                    <p className="text-xs font-medium mt-5 text-gray-700"></p>
                                                    <FaCircleXmark className="text-red-600 bg-white w-[35px] h-[35px] hover:text-red-700 ml-2 sm:ml-0 cursor-pointer" onClick={() => removeWorkExperience(index)} />
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                            </>
                            :
                            <>
                                <div className="card-body">
                                    <div className="grid grid-cols-12 gap-2 mt-6">
                                        <div className="col-span-12 mr-2">
                                            <p className="text-title">Present job or project and internship responsibility</p>
                                            <p className="text-[11px] text-gray-500 my-1">ระบุงานปัจจุบันหรือโปรเจกต์และความรับผิดชอบในการฝึกงาน</p>
                                            <textarea id="presentJobOrProject" name="presentJobOrProject" value={formData.presentJobOrProject} maxLength={500} onChange={handleChangeHeader} rows={16} cols={50} className="input-formcontrol resize-none" />
                                        </div>
                                    </div>
                                </div>
                            </>
                    }

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-4 mr-2">
                            <p className="text-xs mb-1 font-medium inline-flex text-gray-700">Internship</p>
                            <select id="internship" name="internship" className="input-formcontrol px-2" value={formData.internship} onChange={handleChangeHeader} required>
                                <option value="">SELECT</option>
                                <option value="Y">I&apos;ve had an internship / เคยฝึกงาน</option>
                                <option value="N">I&apos;ve never had an internship / ไม่เคยฝึกงาน</option>
                            </select>
                            <p className=" text-th">ประสบการณ์การฝึกงาน (ที่)</p>
                            {
                                formData.internship === "Y" ?
                                    <>
                                        <p className="text-xs mb-1 font-medium inline-flex text-red-600">Please add internship at least 1</p>
                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </div>

                        {
                            formData.internship === "Y" ?
                                <>
                                    {
                                        countInternshipNo >= 3 ?
                                            <>
                                                <div className="col-span-2 mr-2">
                                                    <p className="text-xs mb-1 font-medium inline-flex text-gray-700"></p>
                                                    <FaCirclePlus className=" text-gray-400 bg-white w-[35px] h-[35px] mt-1 hover:text-gray-500 cursor-no-drop" />
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="col-span-2 mr-2">
                                                    <p className="text-xs mb-1 font-medium inline-flex text-gray-700"></p>
                                                    <FaCirclePlus className=" text-green-500 bg-white w-[35px] h-[35px] mt-1 hover:text-green-700 cursor-pointer" onClick={addInternship} />
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
                        formData.internship === "Y" ?
                            <>
                                <div className="card-body">
                                    {internshipDetails.map((e: any, index: any) => (
                                        <Fragment key={index}>
                                            <div className="grid grid-cols-12 gap-2 mt-6">
                                                <div className="col-span-3 mr-2">
                                                    <label className="text-title mb-1">Company</label>
                                                    <input type="text" id="internshipCompany" name="internshipCompany" value={e.internshipCompany} maxLength={50} onChange={(e) => handleChangeInputInternship(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">ชื่อบริษัท</p>
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <label className="text-title mb-1">Business Type</label>
                                                    <input type="text" id="internshipTypeofBusiness" name="internshipTypeofBusiness" value={e.internshipTypeofBusiness} maxLength={50} onChange={(e) => handleChangeInputInternship(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">ประเภทของธุรกิจ</p>
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <label className="text-title mb-1">Division</label>
                                                    <input type="text" id="internshipPosition" name="internshipPosition" value={e.internshipPosition} maxLength={50} onChange={(e) => handleChangeInputInternship(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">ตำแหน่ง</p>
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <label className="text-title mb-1">From</label>
                                                    <input type="month" id="internshipExpFrom" name="internshipExpFrom" value={moment(e.internshipExpFrom).format('YYYY-MM') === null ? '' : moment(e.internshipExpFrom).format('YYYY-MM')} onChange={(e) => handleChangeInputInternship(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">จาก (เดือน / ปี)</p>
                                                </div>

                                                <div className="col-span-2 mr-2">
                                                    <label className="text-title mb-1">To</label>
                                                    <input type="month" id="internshipExpTo" name="internshipExpTo" value={moment(e.internshipExpTo).format('YYYY-MM') === null ? '' : moment(e.internshipExpTo).format('YYYY-MM')} onChange={(e) => handleChangeInputInternship(e, index)} className="input-formcontrol" required />
                                                    <p className=" text-th">ถึง (เดือน / ปี)</p>
                                                </div>

                                                <div className="col-span-1">
                                                    <p className="text-xs mb-1 font-medium inline-flex text-gray-700"></p>
                                                    <FaCircleXmark className="text-red-600 bg-white w-[35px] h-[35px] hover:text-red-700 ml-2 sm:ml-0 cursor-pointer" onClick={() => removeInternship(index)} />
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
                                formData.newGraduate === "N" && formData.internship === "N" ?
                                    <>
                                        {
                                            countWorkExperienceNo !== 0 ?
                                                <>
                                                    {
                                                        countEducationNo !== 0 ?
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
                                                    <button type="submit" className="btn btn-gray cursor-no-drop" disabled>Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
                                                </>
                                        }
                                    </>
                                    :
                                    formData.newGraduate === "Y" && formData.internship === "N" ?
                                        <>
                                            {
                                                countWorkExperienceNo === 0 ?
                                                    <>
                                                        {
                                                            countEducationNo !== 0 ?
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
                                                        <button type="submit" className="btn btn-gray cursor-no-drop" disabled>Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
                                                    </>
                                            }
                                        </>
                                        :
                                        formData.newGraduate === "N" && formData.internship === "Y" ?
                                            <>
                                                {
                                                    countInternshipNo !== 0 && countWorkExperienceNo === 0 ?
                                                        <>
                                                            {
                                                                countEducationNo !== 0 ?
                                                                    <>
                                                                        <button type="submit" className="btn btn-gray cursor-no-drop" disabled>Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <button type="submit" className="btn btn-gray cursor-no-drop" disabled>Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
                                                                    </>
                                                            }
                                                        </>
                                                        :
                                                        countInternshipNo !== 0 && countWorkExperienceNo !== 0 ?
                                                            <>
                                                                {
                                                                    countEducationNo !== 0 ?
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
                                                                <button type="submit" className="btn btn-gray cursor-no-drop" disabled>Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
                                                            </>
                                                }
                                            </>
                                            :
                                            <>
                                                {
                                                    formData.newGraduate === "Y" && formData.internship === "Y" ?
                                                        <>
                                                            {
                                                                countInternshipNo !== 0 ?
                                                                    <>
                                                                        {
                                                                            countEducationNo !== 0 ?
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
                                                                        <button type="submit" className="btn btn-gray cursor-no-drop" disabled>Save and Next <GrFormNextLink className="inline-flex w-[20px] h-[20px]" /> </button>
                                                                    </>
                                                            }
                                                        </>
                                                        :
                                                        <>
                                                            {
                                                                countEducationNo !== 0 ?
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

export default Form3_Body;