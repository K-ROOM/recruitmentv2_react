"use client";
import { useState } from "react";
import { PatchApplicationHeader } from "../actions/actionForm";
import { GrFormNextLink } from "react-icons/gr";

const Form8_Body = ({ session, header }: any) => {

    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);

    const access_Token = session.accessToken;

    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const [formData, setformData] = useState({
        recruitmentID: header.recruitmentID,
        formStep8: header.formStep8,
        acceptAgreement: header.acceptAgreement,
    });

    const [showModal, setShowModal] = useState(false);

    const handleChangeHeader = (e: any) => {
        const checked = e.target.checked;
        const { name, value } = e.target;
        console.log(name + ' ' + checked);
        if (name === 'acceptAgreement') {
            if (checked === true) {
                setformData((prevData) => ({
                    ...prevData,
                    acceptAgreement: 'Y',
                }));
            } else {
                setformData((prevData) => ({
                    ...prevData,
                    acceptAgreement: 'N',
                }));
            }
        } else {
            setformData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }

    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        formData.formStep8 = true;

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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="col-span-10 ml-2">
                    <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-11">
                            <p className="text-xs font-normal text-gray-700">ข้าพเจ้าซึ่งเป็นผู้สมัครงานกับบริษัทฯ ทำการกรอกข้อมูลสมัครงาน ให้ความยินยอมกับบริษัทนิปปอน เอ็กเพรสซ์ เอ็นอีซี ลอจิสติกส์ (ประเทศไทย) จำกัด ในการเก็บรวบรวม
                                ใช้ และ/หรือเปิดเผยข้อมูลส่วนบุคคล อันเป็นความหมายของการประมวลผลข้อมูลส่วนบุคคลของข้าพเจ้า ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ดังต่อไปนี้</p>
                            <p className="text-xs font-bold text-gray-700 mt-4 mb-2">1. บทนำ</p>
                            <p className="text-xs font-normal text-gray-700">บริษัท นิปปอน เอ็กซ์เพรส เอ็นอีซี ลอจิสติกส์ (ประเทศไทย) จำกัด (ซึ่งต่อไปในประกาศนี้ เรียกว่า “<b>บริษัท</b>”) ตระหนัก และให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของบุคคลผู้ที่สมัครงานกับบริษัท และถือปฏิบัติอย่างเคร่งครัด ในเรื่องการเคารพสิทธิความเป็นส่วนตัวของผู้สมัครเป็นสำคัญ
                                คำประกาศเกี่ยวกับความเป็นส่วนตัว (“<b>ประกาศ</b>”) ฉบับนี้จึงถูกจัดทำขึ้นเพื่อให้ท่านในฐานะผู้สมัครงานได้ทราบและเข้าใจรูปแบบ วัตถุประสงค์ วิธีการเก็บรวบรวม ใช้ หรือเปิดเผย (รวมเรียกว่า “<b>ประมวลผล</b>”) ข้อมูลส่วนบุคคล รวมทั้งสิทธิต่าง ๆ ของท่านภายใต้พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
                                ทั้งนี้ การประมวลผลข้อมูลส่วนบุคคลของท่านตามวัตถุประสงค์ในประกาศนี้ บริษัทดำเนินการในฐานะผู้ควบคุมข้อมูล  ส่วนบุคคล (Data Controller) ซึ่งหมายความว่า บริษัทเป็นผู้มีอำนาจหน้าที่ตัดสินใจเกี่ยวกับการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล บริษัทขอแนะนำให้ท่านอ่านและทำความเข้าใจถึงข้อกำหนดต่าง ๆ ภายใต้ประกาศ ฯ โดยมีรายละเอียดดังต่อไปนี้
                            </p>
                            <p className="text-xs font-bold text-gray-700 mt-4 mb-2">คำนิยาม</p>
                            <p className="text-xs font-normal text-gray-700"><b>“ข้อมูลส่วนบุคคล”</b> หมายความว่า ข้อมูลเกี่ยวกับบุคคลซึ่งทำให้สามารถระบุตัวบุคคลนั้นได้ไม่ว่าทางตรง หรือทางอ้อมแต่ไม่รวมถึงข้อมูลของผู้ถึงแก่กรรมโดยเฉพาะ</p>
                            <p className="text-xs font-normal text-gray-700"><b>“บริษัท”</b> หมายความว่า บริษัท นิปปอน เอ็กซ์เพรส เอ็นอีซี ลอจิสติกส์ (ประเทศไทย) จำกัด</p>
                            <p className="text-xs font-normal text-gray-700"><b>“ผู้สมัครงาน”</b> หมายความว่า ผู้ที่มีความประสงค์จะร่วมงานกับบริษัท นิปปอน เอ็กซ์เพรส เอ็นอีซี ลอจิสติกส์ (ประเทศไทย) จำกัด และได้เปิดเผยข้อมูลส่วนบุคคลโดยกรอกใบสมัครให้แก่ทางบริษัท</p>
                            <p className="text-xs font-bold text-gray-700 mt-4 mb-2">บริษัทดำเนินการเกี่ยวกับการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของท่าน ดังนี้</p>
                            <p className="text-xs font-normal text-gray-700">1. ฐานกฎหมายในการประมวลผลข้อมูลส่วนบุคคล</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">1.1 บริษัทเก็บรวบรวมข้อมูลส่วนบุคคลของท่าน ภายใต้ฐานกฎหมายดังต่อไปนี้</p>
                            <p className="text-xs font-normal text-gray-700 ml-10">1.1.1 ความจำเป็นในการปฏิบัติตามสัญญาหรือความจำเป็นในการดำเนินการตามคำขอของเจ้าของข้อมูลส่วนบุคคลก่อนเข้าทำสัญญาจ้างแรงงานและการดำเนินการที่เกี่ยวข้องกับการเป็นผู้ปฏิบัติงานของบริษัท เช่น สิทธิประโยชน์และการบริหารจัดการด้านการสมัครและการจ้างแรงงาน ซึ่งการที่ท่านไม่ให้ข้อมูลส่วนบุคคล ที่มีความจำเป็นดังกล่าวจะมีผลทำให้บริษัทไม่สามารถดำเนินการรับสมัครและจ้างแรงงานได้</p>
                            <p className="text-xs font-normal text-gray-700 ml-10">1.1.2 ความจำเป็นเพื่อประโยชน์โดยชอบด้วยกฎหมายของบริษัท โดยประโยชน์ดังกล่าวมีความสำคัญ ไม่น้อยไปกว่าสิทธิขั้นพื้นฐานในข้อมูลส่วนบุคคลของท่าน เช่น การดำเนินการเพื่อรักษาความปลอดภัยอาคารสถานที่ ในความดูแลของบริษัทหรือการเก็บรวบรวมข้อมูลส่วนบุคคลของท่านก่อนเข้าสู่กระบวนการทำสัญญา การตรวจสอบรายชื่อผู้ล้มละลาย การตรวจสอบประวัติการทำงานย้อนหลังจากแหล่งข้อมูลอื่น การวิเคราะห์ความเหมาะสม เปรียบเทียบ คัดเลือกผู้สมัครงาน เป็นต้น</p>
                            <p className="text-xs font-normal text-gray-700 ml-10">1.1.3 ได้รับความยินยอมที่สมบูรณ์จากท่าน ในการประมวลผลข้อมูลส่วนบุคคลที่จำเป็นต้องได้รับความยินยอมของท่าน เช่น ข้อมูลประวัติอาชญากรรม ข้อมูลสุขภาพและการแพทย์ เป็นต้น</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">1.2 บริษัทเก็บรวบรวมข้อมูลส่วนบุคคลที่อ่อนไหวตามมาตรา 26 แห่งพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ซึ่งเข้าเงื่อนไขที่ไม่จำเป็นต้องได้รับความยินยอมโดยชัดแจ้ง เพื่อวัตถุประสงค์ดังต่อไปนี้</p>
                            <p className="text-xs font-normal text-gray-700 ml-10">1.2.1 เป็นการจำเป็นในการปฏิบัติตามกฎหมายเพื่อให้บรรลุวัตถุประสงค์เกี่ยวกับการคุ้มครองแรงงาน ซึ่งการเก็บรวบรวมข้อมูลดังกล่าวเป็นสิ่งจำเป็นในการปฏิบัติหน้าที่ของบริษัท ตามถึงระเบียบ ประกาศหรือข้อบังคับ ที่เกี่ยวข้องเพื่อการดำเนินการตามกฎหมายที่กำหนดคุณสมบัติผู้ปฏิบัติงานของบริษัท</p>
                            <p className="text-xs font-normal text-gray-700 mt-2">2. วัตถุประสงค์ในการเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลของท่าน</p>
                            <p className="text-xs font-normal text-gray-700">บริษัทดำเนินการเก็บรวบรวมข้อมูลส่วนบุคคลของท่านเพื่อวัตถุประสงค์ ดังต่อไปนี้</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">2.1 เพื่อการรับสมัครงานที่ดำเนินการโดยบริษัท ซึ่งผู้สมัครงานดำเนินการติดต่อเข้ามาด้วยตนเอง หรือเป็นการประกาศรับสมัครภายในบริษัท</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">2.2 การตรวจสอบคุณสมบัติของผู้สมัครงาน เช่น ข้อมูลส่วนตัว ข้อมูลสุขภาพและการแพทย์ ข้อมูลประวัติอาชญากรรม</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">2.3 เพื่อดำเนินการสัมภาษณ์งาน วิเคราะห์ตรวจสอบประวัติการศึกษา ประสบการณ์ทำงานที่เกี่ยวข้อง</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">2.4 เก็บรักษาไว้เพื่อพิจารณาตำแหน่งงานที่เปิดรับใหม่ในอนาคต สำหรับผู้สมัครงานที่ไม่ได้รับการบรรจุเป็นผู้ปฏิบัติงาน</p>
                            <p className="text-xs font-normal text-gray-700 mt-2">3. ข้อมูลส่วนบุคคลที่บริษัทเก็บรวบรวม</p>
                            <p className="text-xs font-normal text-gray-700">เพื่อวัตถุประสงค์ตามที่ได้แจ้งในข้อ 2. บริษัทเก็บรวบรวมข้อมูลส่วนบุคคลของท่านดังรายการต่อไปนี้</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">3.1 แหล่งข้อมูลและรายการข้อมูลส่วนบุคคลที่เก็บรวบรวม มีดังนี้</p>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                <p className="text-xs font-bold text-gray-700 mt-4 mb-2">แหล่ง/วิธีการเก็บรวบรวม</p>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <p className="text-xs font-bold text-gray-700 mt-4 mb-2">รายการข้อมูลส่วนบุคคล</p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <p className="text-xs font-normal text-gray-700">1. ข้อมูลที่เก็บโดยตรงผ่านการกรอกข้อมูลในเว็บไซต์ <a href="https://www.nipponexpress-necl.co.th" target="_blank">www.nipponexpress-necl.co.th</a><br></br> การกรอกใบสมัครงาน หรือการที่ท่านส่งข้อมูลส่วนบุคคลของท่านให้แก่บริษัทโดยตรง<br></br>ทั้งทางแอปพลิเคชั่นต่าง ๆ หรือมาส่งข้อมูลด้วยตนเอง รวมถึงขั้นตอนการสัมภาษณ์งาน</p>
                                            </th>
                                            <td className="px-6 py-4">
                                                <p className="text-xs font-normal text-gray-700">ชื่อ นามสกุล ชื่อเล่น วัน/เดือน/ปีเกิด อายุ เพศ รูปถ่าย สัญชาติ ที่อยู่ที่ติดต่อได้ เบอร์โทรศัพท์มือถือ เลขบัตรประจำตัวประชาชน ใบขับขี่ ข้อมูลผู้ติดต่อสำรอง สถานะทางการทหาร ประวัติการศึกษา ประวัติการทำงาน เป็นต้น</p>
                                            </td>
                                        </tr>

                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <p className="text-xs font-normal text-gray-700">2. ข้อมูลที่เก็บโดยการใช้เทคโนโลยีตรวจจับหรือติดตามพฤติกรรมการใช้งานเว็บไซต์<br></br> www.nipponexpress-necl.co.th</p>
                                            </th>
                                            <td className="px-6 py-4">
                                                <p className="text-xs font-normal text-gray-700">เว็บไซต์คุกกี้ ข้อมูลการจราจรทางคอมพิวเตอร์ ข้อมูลการใช้อุปกรณ์สื่อสาร คอมพิวเตอร์ อีเมล อินเตอร์เน็ต เป็นต้น</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs font-normal text-gray-700 ml-5 mt-4 mb-2">3.2 รายละเอียดข้อมูลส่วนบุคคลที่เก็บรวบรวม วัตถุประสงค์ และฐานทางกฎหมาย</p>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                <p className="text-xs font-bold text-gray-700 mt-4 mb-2">ข้อมูลส่วนบุคคลที่เก็บรวบรวม</p>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <p className="text-xs font-bold text-gray-700 mt-4 mb-2">วัตถุประสงค์ของการเก็บ รวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล</p>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                <p className="text-xs font-bold text-gray-700 mt-4 mb-2">ฐานทางกฎหมาย</p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <p className="text-xs font-normal text-gray-700">ข้อมูลส่วนตัว</p>
                                                <p className="text-xs font-normal text-gray-700">ข้อมูลการติดต่อ</p>
                                                <p className="text-xs font-normal text-gray-700">ข้อมูลเกี่ยวกับครอบครัว, ผู้เกี่ยวข้อง</p>
                                                <p className="text-xs font-normal text-gray-700">ข้อมูลการศึกษา</p>
                                                <p className="text-xs font-normal text-gray-700">ข้อมูลประวัติการทำงาน</p>
                                                <p className="text-xs font-normal text-gray-700">ข้อมูลส่วนบุคคลอื่นใดที่ผู้สมัครได้ยื่นในกระบวนการจ้างงาน</p>
                                            </th>
                                            <td className="px-6 py-4">
                                                <p className="text-xs font-normal text-gray-700">พิจารณาคุณสมบัติ และดําเนินการใด ๆ <br></br>อันเกี่ยวข้องกับการสมัครงาน</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-xs font-normal text-gray-700">ฐานสัญญา</p>
                                                <p className="text-xs font-normal text-gray-700">ฐานหน้าที่ตามกฎหมาย</p>
                                            </td>
                                        </tr>

                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <p className="text-xs font-normal text-gray-700">ข้อมูลสุขภาพและการแพทย์, ความพิการ</p>
                                            </th>
                                            <td className="px-6 py-4">
                                                <p className="text-xs font-normal text-gray-700">เพื่อประเมินความเหมาะสมของผู้สมัคร</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-xs font-normal text-gray-700">ฐานความยินยอม</p>
                                            </td>
                                        </tr>

                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <p className="text-xs font-normal text-gray-700">ข้อมูลประวัติอาชญากรรม</p>
                                            </th>
                                            <td className="px-6 py-4">
                                                <p className="text-xs font-normal text-gray-700">เพื่อประเมินความเหมาะสมของผู้สมัคร</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-xs font-normal text-gray-700">ฐานความยินยอม</p>
                                            </td>
                                        </tr>

                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <p className="text-xs font-normal text-gray-700">เพื่อประเมินความเหมาะสมของผู้สมัคร</p>
                                            </th>
                                            <td className="px-6 py-4">
                                                <p className="text-xs font-normal text-gray-700">ฐานหน้าที่ตามกฎหมาย</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-xs font-normal text-gray-700">ฐานประโยชน์อันชอบธรรม</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs font-normal text-gray-700 ml-5 mt-4">เนื่องจากข้อมูลส่วนบุคคลของท่านที่บริษัทจะดำเนินการประมวลผลเพื่อวัตถุประสงค์ที่กำหนดข้างต้น ในส่วนที่มีความเกี่ยวเนื่องกับการปฏิบัติตามกฎหมายหรือสัญญาหรือมีความจำเป็นเพื่อเข้าทำสัญญากับท่าน เป็นข้อมูลที่จำเป็นต่อการบรรลุวัตถุประสงค์ดังกล่าว หากท่านไม่ประสงค์ที่จะให้ข้อมูลส่วนบุคคลดังกล่าวแก่บริษัท อาจมีผลกระทบทางกฎหมาย หรืออาจทำให้บริษัทไม่สามารถปฏิบัติหน้าที่ภายใต้สัญญาที่ได้ทำกับท่าน หรือไม่สามารถเข้าทำสัญญากับท่านได้ (แล้วแต่กรณี) ในกรณีดังกล่าว บริษัทอาจมีความจำเป็นต้องปฏิเสธการเข้าทำสัญญากับท่านหรือการให้บริการที่เกี่ยวข้องกับท่าน ไม่ว่าทั้งหมดหรือบางส่วน ในกรณีที่บริษัทจะดำเนินการประมวลผลข้อมูลส่วนบุคคลของท่านในลักษณะ และ/หรือเพื่อวัตถุประสงค์ที่ไม่สอดคล้องกับวัตถุประสงค์ที่ระบุไว้ข้างต้น บริษัทจะจัดให้มีนโยบายหรือประกาศเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคลเพิ่มเติม และ/หรือมีหนังสือไปยังท่านเพื่ออธิบายการประมวลผลในข้อมูลลักษณะดังกล่าว โดยท่านควรอ่านนโยบายหรือประกาศเพิ่มเติมที่เกี่ยวข้องร่วมกับประกาศฉบับนี้ และ/หรือหนังสือดังกล่าว (แล้วแต่กรณี)</p>
                            <p className="text-xs font-normal text-gray-700 mt-2">4. การเปิดเผยข้อมูลส่วนบุคคลของท่าน</p>
                            <p className="text-xs font-normal text-gray-700">บริษัทอาจเปิดเผยข้อมูลส่วนบุคคลของท่านต่อบุคคลหรือนิติบุคคลประเภทดังต่อไปนี้</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">4.1 ผู้มีส่วนเกี่ยวข้องในการพิจารณาสรรหา คัดเลือก สัมภาษณ์ผู้สมัครงาน กรรมการ ผู้จัดการ ผู้ปฏิบัติหน้าที่ที่เกี่ยวข้องกับตำแหน่งงานนั้น</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">4.2 เจ้าหน้าที่ของรัฐหรือหน่วยงานที่มีอำนาจหน้าที่ หรือมีคำสั่งโดยชอบด้วยกฎหมาย เพื่อดำเนินการตามที่กฎหมายกำหนด เช่น การรายงานข้อมูลที่กฎหมายกำหนด หรือการเปิดเผยข้อมูลส่วนบุคคลตามคำสั่งศาล เป็นต้น</p>
                            <p className="text-xs font-normal text-gray-700 mt-2">5. สิทธิของท่านในฐานะเจ้าของข้อมูลส่วนบุคคล</p>
                            <p className="text-xs font-normal text-gray-700">พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 มีวัตถุประสงค์เพื่อให้ข้อมูลส่วนบุคคลของท่าน อยู่ในความควบคุมของท่านได้มากขึ้น โดยท่านสามารถใช้สิทธิตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 เมื่อบทบัญญัติในส่วนที่เกี่ยวกับสิทธิของเจ้าของข้อมูลส่วนบุคคลมีผลใช้บังคับ ซึ่งมีรายละเอียดดังต่อไปนี้</p>
                            <p className="text-xs font-normal text-gray-700 ml-5"><b>5.1 สิทธิในการขอเข้าถึงข้อมูลส่วนบุคคล</b> ท่านมีสิทธิขอเข้าถึง รับสำเนาและขอให้เปิดเผยที่มาของข้อมูลส่วนบุคคลที่บริษัท เก็บรวบรวมไว้โดยปราศจากความยินยอมของท่าน เว้นแต่กรณีที่บริษัทมีสิทธิปฏิเสธคำขอของท่านด้วยเหตุตามกฎหมายหรือคำสั่งศาล หรือกรณีที่การใช้สิทธิของท่านจะมีผลกระทบที่อาจก่อให้เกิดความเสียหายต่อสิทธิและเสรีภาพของบุคคลอื่น</p>
                            <p className="text-xs font-normal text-gray-700 ml-5"><b>5.2 สิทธิในการขอแก้ไขข้อมูลส่วนบุคคลให้ถูกต้อง สมบูรณ์และเป็นปัจจุบัน</b> หากท่านพบว่าข้อมูลส่วนบุคคลของท่านไม่ถูกต้อง ไม่ครบถ้วนหรือไม่เป็นปัจจุบัน ท่านมีสิทธิขอให้แก้ไขเพื่อให้มีความถูกต้อง เป็นปัจจุบัน สมบูรณ์และไม่ก่อให้เกิดความเข้าใจผิดได้</p>
                            <p className="text-xs font-normal text-gray-700 ml-5"><b>5.3 สิทธิในการลบหรือทำลายข้อมูลส่วนบุคคล</b> ท่านมีสิทธิขอให้ บริษัท ลบหรือทำลายข้อมูลส่วนบุคคลของท่านหรือทำให้ข้อมูลส่วนบุคคลของท่านไม่สามารถระบุตัวบุคคลที่เป็นเจ้าของข้อมูลได้ต่อไป ทั้งนี้ การใช้สิทธิลบ หรือทำลายข้อมูลส่วนบุคคลนี้จะต้องอยู่ภายใต้เงื่อนไขตามที่กฎหมายกำหนด</p>
                            <p className="text-xs font-normal text-gray-700 ml-5"><b>5.4 สิทธิในการขอให้ระงับการใช้ข้อมูลส่วนบุคคล</b> ท่านมีสิทธิขอให้ระงับการใช้ข้อมูลส่วนบุคคลของท่าน ทั้งนี้ ในกรณีดังต่อไปนี้</p>
                            <p className="text-xs font-normal text-gray-700 ml-10">5.4.1 เมื่ออยู่ในช่วงเวลาที่บริษัททำการตรวจสอบตามคำร้องขอของเจ้าของข้อมูลส่วนบุคคลให้แก้ไขข้อมูลส่วนบุคคลให้ถูกต้อง สมบูรณ์และเป็นปัจจุบัน</p>
                            <p className="text-xs font-normal text-gray-700 ml-10">5.4.2 ข้อมูลส่วนบุคคลของเจ้าของข้อมูลส่วนบุคคลถูกเก็บรวบรวม ใช้หรือเปิดเผยโดยมิชอบด้วยกฎหมาย</p>
                            <p className="text-xs font-normal text-gray-700 ml-10">5.4.3 เมื่อข้อมูลส่วนบุคคลของเจ้าของข้อมูลส่วนบุคคลหมดความจำเป็นในการเก็บรักษาไว้ตามวัตถุประสงค์ ที่บริษัทได้แจ้งในการเก็บรวบรวม แต่เจ้าของข้อมูลส่วนบุคคลประสงค์ให้บริษัทเก็บรักษาข้อมูลนั้นต่อไปเพื่อประกอบการใช้สิทธิตามกฎหมาย</p>
                            <p className="text-xs font-normal text-gray-700 ml-10">5.4.4 เมื่ออยู่ในช่วงเวลาที่บริษัทกำลังพิสูจน์ถึงเหตุอันชอบด้วยกฎหมายในการเก็บรวบรวมข้อมูลส่วนบุคคลของเจ้าของข้อมูลส่วนบุคคล หรือตรวจสอบความจำเป็นในการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลเพื่อประโยชน์สาธารณะ อันเนื่องมาจากการที่เจ้าของข้อมูลส่วนบุคคลได้ใช้สิทธิคัดค้านการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล</p>
                            <p className="text-xs font-normal text-gray-700 ml-5"><b>5.5 สิทธิในการคัดค้านการประมวลผลข้อมูลส่วนบุคคล</b> ท่านมีสิทธิคัดค้านการเก็บรวบรวม ใช้หรือเปิดเผยข้อมูลส่วนบุคคลที่เกี่ยวกับท่าน เว้นแต่กรณีที่บริษัทมีเหตุในการปฏิเสธคำขอโดยชอบด้วยกฎหมาย (เช่น บริษัทสามารถแสดงให้เห็นว่าการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของท่านมีเหตุอันชอบด้วยกฎหมายยิ่งกว่า หรือเพื่อการก่อตั้งสิทธิเรียกร้องตามกฎหมาย การปฏิบัติตามหรือการใช้สิทธิเรียกร้องทางกฎหมาย หรือเพื่อประโยชน์สาธารณะของบริษัท)</p>
                            <p className="text-xs font-normal text-gray-700 ml-5"><b>5.6 สิทธิในการขอถอนความยินยอม</b> ในกรณีที่ท่านได้ให้ความยินยอมแก่บริษัทในการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคล (ไม่ว่าความยินยอมนั้นจะได้ให้ไว้ก่อนหรือหลังพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 มีผลใช้บังคับ) ท่านมีสิทธิถอนความยินยอมเมื่อใดก็ได้ตลอดระยะเวลาที่ข้อมูลส่วนบุคคลของท่านถูกเก็บรักษา โดยบริษัทเว้นแต่มีข้อจำกัดสิทธิโดยกฎหมายให้บริษัทจำเป็นต้องเก็บรักษาข้อมูลต่อไปหรือยังคงมีสัญญาระหว่างท่านกับบริษัทที่ให้ประโยชน์แก่ท่านอยู่</p>
                            <p className="text-xs font-normal text-gray-700 ml-5"><b>5.7 สิทธิในการขอรับ ส่งหรือโอนข้อมูลส่วนบุคคล</b> ท่านมีสิทธิในการขอรับข้อมูลส่วนบุคคลของท่านจากบริษัท ในรูปแบบที่สามารถอ่านหรือใช้งานโดยทั่วไปได้ด้วยเครื่องมือหรืออุปกรณ์ที่ทำงานได้โดยอัตโนมัติและสามารถใช้หรือเปิดเผยข้อมูลส่วนบุคคลได้โดยวิธีการอัตโนมัติ รวมถึงอาจขอให้บริษัทส่งหรือโอนข้อมูลในรูปแบบดังกล่าวไปยังผู้ควบคุมข้อมูลส่วนบุคคลรายอื่น ทั้งนี้ การใช้สิทธินี้จะต้องอยู่ภายใต้เงื่อนไข ตามที่กฎหมายกำหนด</p>
                            <p className="text-xs font-normal text-gray-700 ml-5"><b>5.8 สิทธิในการยื่นข้อร้องเรียน</b> ท่านมีสิทธิยื่นข้อร้องเรียนต่อหน่วยงานของรัฐที่เกี่ยวข้อง รวมไปถึงคณะกรรมการคุ้มครองข้อมูลส่วนบุคคลในกรณีที่ท่านเห็นว่าบริษัทฯ หรือพนักงานของบริษัทฯ หรือผู้ให้บริการฝ่าฝืนหรือไม่ปฏิบัติตามพ.ร.บ.ฯ หรือประกาศอื่น ๆ ที่ออกโดยอาศัยอำนาจตามพ.ร.บ.ฯ ดังกล่าว</p>
                            <p className="text-xs font-normal text-gray-700 mt-2">6. ระยะเวลาในการเก็บรักษาข้อมูลส่วนบุคคล</p>
                            <p className="text-xs font-normal text-gray-700">เก็บรักษาข้อมูลส่วนบุคคลของท่านเป็นระยะเวลาดังต่อไปนี้</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">6.1 สำหรับผู้สมัครงานที่ไม่ได้รับการแต่งตั้งเป็นผู้ปฏิบัติงาน เก็บรักษาไว้ 60 วันนับแต่วันที่บริษัทได้รับข้อมูลส่วนบุคคล ทั้งนี้ เมื่อพ้นระยะเวลาดังกล่าวแล้ว บริษัทจะทำการลบ ทำลายข้อมูลส่วนบุคคลของท่านเมื่อหมดความจำเป็นในการใช้ข้อมูลส่วนบุคคลนั้น อย่างไรก็ตาม ในกรณีที่มีข้อพิพาทหรือคดีความเกี่ยวกับการสมัครงานหรือสัญญาจ้างงานของท่าน บริษัทขอสงวนสิทธิในการเก็บรักษาข้อมูลนั้นต่อไปจนกว่าข้อพิพาทนั้นจะได้มีคำสั่งหรือคำพิพากษาถึงที่สุดแล้ว</p>
                            <p className="text-xs font-normal text-gray-700 mt-2">7. การรักษาความมั่นคงปลอดภัยข้อมูลส่วนบุคคล</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">บริษัทมีมาตรการในการรักษาความมั่นคงปลอดภัยข้อมูลส่วนบุคคลของท่านอย่างเหมาะสม ทั้งในเชิงเทคนิค และการบริหารจัดการ เพื่อป้องกันมิให้ข้อมูลสูญหาย หรือมีการเข้าถึง ทำลาย ใช้ เปลี่ยนแปลง แก้ไข หรือเปิดเผยข้อมูลส่วนบุคคลโดยไม่ได้รับอนุญาต ซึ่งสอดคล้องกับนโยบายและแนวปฏิบัติด้านความมั่นคงปลอดภัยสารสนเทศ (Information Security Policy) ของบริษัท</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">นอกจากนี้ บริษัทได้กำหนดให้มีนโยบายการคุ้มครองข้อมูลส่วนบุคคล (Privacy Policy) ขึ้นโดยประกาศให้ทราบ พร้อมแนวทางปฏิบัติเพื่อให้เกิดความมั่นคงปลอดภัยในการเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคล โดยธำรงไว้ซึ่งความเป็นความลับ (Confidentiality) ความถูกต้องครบถ้วน (Integrity) และสภาพพร้อมใช้งาน (Availability) ของข้อมูลส่วนบุคคล โดยได้จัดให้มีการทบทวนนโยบายดังกล่าวรวมถึงประกาศนี้ในระยะเวลาตามที่เหมาะสม</p>
                            <p className="text-xs font-normal text-gray-700 mt-2">8. การมีส่วนร่วมของเจ้าของข้อมูลส่วนบุคคล</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">บริษัทอาจเปิดเผยข้อมูลส่วนบุคคลของท่านเมื่อได้รับคำร้องขอจากท่าน ผู้สืบสิทธิ์ ทายาท ผู้แทนโดยชอบธรรม หรือผู้อนุบาลหรือผู้พิทักษ์ตามกฎหมายของท่าน โดยส่งคำร้องขอผ่าน อีเมล <a href="mailto:hr@nipponexpress-necl.co.th">hr@nipponexpress-necl.co.th</a> ในกรณีที่ท่าน ผู้สืบสิทธิ์ ทายาท ผู้แทนโดยชอบธรรม หรือผู้อนุบาลหรือผู้พิทักษ์ตามกฎหมายมีการคัดค้านการจัดเก็บ ความถูกต้อง หรือการกระทำใด ๆ เช่น การแจ้งดำเนินการปรับปรุงแก้ไขข้อมูลส่วนบุคคล บริษัทจะดำเนินการบันทึกหลักฐานคำคัดค้านดังกล่าวไว้เป็นหลักฐานด้วย ทั้งนี้ บริษัทอาจปฏิเสธสิทธิตามวรรคสองได้ในกรณีที่มีกฎหมายกำหนด หรือในกรณีที่ข้อมูลส่วนบุคคลของท่านถูกทำให้ไม่ปรากฏชื่อหรือสิ่งบอกลักษณะอันสามารถระบุตัวท่านได้</p>
                            <p className="text-xs font-normal text-gray-700 mt-2">9. การเข้าถึงข้อมูลส่วนบุคคล</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">บริษัทได้กำหนดให้พนักงาน เจ้าหน้าที่และบุคคลเฉพาะผู้ที่มีอำนาจหน้าที่เกี่ยวข้องในการจัดเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของกิจกรรมการประมวลผลนี้เท่านั้นที่จะสามารถเข้าถึงข้อมูลส่วนบุคคลของท่านได้ โดยองค์กรจะดำเนินการให้เจ้าหน้าที่และบุคคลดังกล่าวปฏิบัติตามประกาศนี้อย่างเคร่งครัด</p>
                            <p className="text-xs font-normal text-gray-700 mt-2">10. การเปลี่ยนแปลงแก้ไขประกาศเกี่ยวกับความเป็นส่วนตัว</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">บริษัทอาจพิจารณาปรับปรุง แก้ไขหรือเปลี่ยนแปลงประกาศนี้ตามที่เห็นสมควร และจะทำการแจ้งให้ท่านทราบ ผ่านช่องทาง <a href="https://www.nipponexpress-necl.co.th" target="_blank">www.nipponexpress-necl.co.th</a> โดยมีวันที่ของเวอร์ชันล่าสุดกำกับอยู่ตอนท้าย อย่างไรก็ดี บริษัทขอแนะนำให้ท่านโปรดตรวจสอบเพื่อรับทราบประกาศฉบับใหม่อย่างสม่ำเสมอ โดยเฉพาะก่อนที่ท่านจะทำการเปิดเผยข้อมูลส่วนบุคคล</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">การยื่นสมัครงานของท่าน ถือเป็นการรับทราบตามข้อตกลงในประกาศนี้ ทั้งนี้ โปรดระงับการยื่นสมัครงานหรือติดต่อฝ่ายทรัพยากรบุคคลท่านไม่เห็นด้วยกับข้อตกลงในประกาศฉบับนี้ มิเช่นนั้นบริษัทจะถือว่าท่านได้รับทราบ การเปลี่ยนแปลงข้อตกลงในประกาศดังกล่าวแล้ว</p>
                            <p className="text-xs font-normal text-gray-700 mt-2">11. การติดต่อสอบถาม</p>
                            <p className="text-xs font-normal text-gray-700 ml-5">หากท่านมีความประสงค์ที่จะใช้สิทธิของท่านที่เกี่ยวข้องกับข้อมูลส่วนบุคคลของท่าน หรือหากท่านมีข้อสงสัยเกี่ยวกับข้อมูลส่วนบุคคลของท่านภายใต้ประกาศความเป็นส่วนตัวฉบับนี้ โปรดติดต่อ</p>
                            <p className="text-xs font-normal text-gray-700 ml-5"><b>ฝ่ายทรัพยากรบุคคล</b>บริษัท นิปปอน เอ็กซ์เพรส เอ็นอีซี ลอจิสติกส์ (ประเทศไทย) จำกัด</p>
                            <p className="text-xs font-normal text-gray-700 ml-5"><b>ที่อยู่</b>เลขที่ 52 ชั้น 12 อาคารธนิยะพลาซ่า แขวงสุริยวงศ์ เขตบางรัก กรุงเทพมหานคร 10500</p>
                            <p className="text-xs font-normal text-gray-700 ml-5"><b>อีเมล : </b><a href="mailto:hr@nipponexpress-necl.co.th">hr@nipponexpress-necl.co.th</a></p>
                            <p className="text-xs font-normal text-gray-700 ml-5"><b>เบอร์โทร : </b>02-2381370 ต่อแผนก HR</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-4">
                        <div className="col-span-1">
                            <div className="flex flex-col mt-5">
                                {
                                    formData.acceptAgreement === 'Y' ?
                                        <>
                                            <input
                                                type="checkbox"
                                                name="acceptAgreement"
                                                onChange={handleChangeHeader}
                                                value={formData.acceptAgreement}
                                                checked
                                            />
                                        </>
                                        :
                                        <>
                                            <input
                                                type="checkbox"
                                                name="acceptAgreement"
                                                onChange={handleChangeHeader}
                                                value={formData.acceptAgreement}
                                            />
                                        </>
                                }
                            </div>
                        </div>

                        <div className="col-span-9">
                            <p className="text-xs font-normal inline-flex text-gray-700">ข้าพเจ้าได้อ่านรับทราบและเข้าใจข้อความข้างต้นเกี่ยวกับ การเก็บรวมรวม ใช้ และ/หรือเปิดเผยข้อมูลส่วนบุคคล ที่เก็บรวบรวมซึ่งเกี่ยวกับข้าพเจ้าในหนังสือฉบับนี้โดยตลอด
                                แล้วเห็นว่าถูกต้องตรงตามเจตนาและความประสงค์ของข้าพเจ้าทุกประการ รวมทั้ง ข้าพเจ้ายินยอมให้ บริษัทฯ ดำเนินการประมวลผลโดยเก็บรวบรวมข้อมูล ใช้/หรือเปิดเผยข้อมูลที่ระบุ</p>
                        </div>

                        <div className="col-span-1">

                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-2 mt-6">
                        <div className="col-span-4 mr-2">
                            {
                                formData.acceptAgreement === 'Y' ?
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
                                                <Image src="/error.gif" alt="Loading..." style={{ width: 100, height: 100 }} />
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

export default Form8_Body;