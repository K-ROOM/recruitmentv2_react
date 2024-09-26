"use client";
import { useState } from "react";
import { PatchApplicationConfirm, PatchApplicationHeader } from "../actions/actionForm";
import { GrFormNextLink } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
import { SiMinutemailer } from "react-icons/si";

const Confirm_Body = ({ session, header }: any) => {

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);

    const access_Token = session.accessToken;

    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const [formData, setformData] = useState({
        recruitmentID: header.recruitmentID,
        confirmAndSendEmail: header.confirmAndSendEmail,
        trackingStatus: header.trackingStatus,
    });

    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        formData.confirmAndSendEmail = true;
        formData.trackingStatus = 'U';

        try {
            await PatchApplicationConfirm(formData);
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
                <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-11">
                        <p className="text-xs font-normal text-gray-700 mt-1">When you confirm the information You can change the information. Until the consideration is complete.</p>
                        <p className="text-xs text-gray-500 mt-[2px]">เมื่อคุณยืนยันข้อมูล คุณสามารถเปลี่ยนแปลงข้อมูลได้ จนกว่าการพิจารณาจะเสร็จสิ้น</p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-2 mt-6">
                    <div className="col-span-4 mr-2">
                        {
                            formData.confirmAndSendEmail === true ?
                                <>
                                    <p className="text-[13px] font-bold text-green-500">ทางบริษัทได้รับข้อมูลเรียบร้อย</p>
                                </>
                                :
                                <>
                                    <button type="submit" className="btn btn-blue">OK, Confirm and send <SiMinutemailer className="inline-flex w-[20px] h-[20px]" /> </button>
                                </>
                        }
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
                                                    Send success!
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
                                                    Send failed, Please try again!
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

export default Confirm_Body;