// components/Popup.js
import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { TfiAnnouncement } from "react-icons/tfi";
const Cookies = require('js-cookie');

const Popup = ({ username }: any) => {
    const [showPopup, setShowPopup] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    useEffect(() => {
        const popupStatus = Cookies.get(`dontShowPopup_${username}`);
        if (!popupStatus) {
            setShowPopup(true);
        }
    }, [username]);

    const handleClose = () => {
        if (dontShowAgain) {
            Cookies.set(`dontShowPopup_${username}`, 'true', { expires: 7 }); // Set cookie for 7 days
        }
        setShowPopup(false);
    };

    return (
        <>
            <div className={`popup z-20 ${showPopup ? 'fade-in' : 'fade-out'}`}>
                <div className="flex flex-col justify-center">
                    <div className="w-3/5 bg-white rounded p-8 mx-auto">
                        <h2 className="text-xl font-bold text-blue-700 my-4 sm:my-2 text-center">Announcement</h2>
                        <div className="text-left font-normal bg-gray-100 px-3 py-3 mt-2 rounded-md">
                            <p className="font-bold text-[13px]">Please read understand</p>
                            <p className="text-xs">
                                Please fill out personal information on this form. To be used for consideration of accepting you to work In addition, in the event that you do not pass the consideration of admission Information on the application will be maintained for a period of 60 days
                                To consider suitability for other positions in the event that you have passed the consideration of accepting work The information in the application will be maintained throughout the period of staff / employees. And kept for a period of 10 years
                                For the case to be used as evidence of the use of claims under labor law.
                            </p>
                        </div>

                        <div className="text-left font-normal bg-gray-100 px-3 py-3 my-3 rounded-md">
                            <p className="font-semibold text-sm font-prompt">โปรดอ่านทำความเข้าใจ</p>
                            <p className="text-xs">
                                โปรดกรอกข้อมูลส่วนบุคคลลงในแบบฟอร์มนี้ เพื่อใช้ประกอบการพิจารณาการรับท่านเข้าทำงาน อนึ่งในกรณีที่ท่าน ไม่ผ่าน การพิจารณารับเข้าทำงาน ข้อมูลในใบสมัครจะถูกเก็บรักษาไว้อีกเป็นระยะเวลา 60 วัน
                                เพื่อพิจารณาความเหมาะสมกับตำแหน่งงานอื่น ในกรณีที่ท่าน ผ่าน การพิจารณารับเข้าทำงาน ข้อมูลในใบสมัครจะถูกเก็บรักษาไว้ตลอดระยะเวลาการเป็นพนักงาน/ลูกจ้าง และเก็บต่อเนื่องอีกเป็นระยะเวลา 10 ปี
                                เพื่อกรณีต้องใช้เป็นหลักฐานประกอบการใช้สิทธิเรียกร้องตามกฎหมายแรงงาน
                            </p>
                        </div>

                        <div className="text-center mt-6">
                            <label className="text-xs">
                                <input className="rounded-sm me-2"
                                    type="checkbox"
                                    checked={dontShowAgain}
                                    onChange={() => setDontShowAgain(!dontShowAgain)}
                                />
                                I got it, Don&apos;t show this message again.
                            </label>
                        </div>
                        <div className="flex justify-center">
                            <button className="btn btn-navy duration-200 ease-in-out my-2 " onClick={handleClose}>I Understand</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Popup;
