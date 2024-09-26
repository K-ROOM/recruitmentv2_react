"use server";
import { getServerSession } from "next-auth";

import axios from "axios";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export async function PatchApplicationHeader(obj: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    console.log(obj.dateofBirth);

    try {
        const response = await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/rms/' + obj.recruitmentID, obj, { headers })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function PostAndPatchApplicationRelationshipAndAddress(obj_header: any, obj_children: any, obj_sibling: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const data = {
        'header': {
            'maritalStatus': obj_header.maritalStatus,
            'spouseFirstname': obj_header.spouseFirstname,
            'spouseLastname': obj_header.spouseLastname,
            'spouseAge': obj_header.spouseAge,
            'spouseNationality': obj_header.spouseNationality,
            'spouseMobileno': obj_header.spouseMobileno,
            'spousePlaceofWork': obj_header.spousePlaceofWork,
            'spouseOccupation': obj_header.spouseOccupation,
            'children': obj_header.children,
            'childrenNo': obj_header.childrenNo,
            'fatherFirstname': obj_header.fatherFirstname,
            'fatherLastname': obj_header.fatherLastname,
            'fatherAge': obj_header.fatherAge,
            'fatherLivingStatus': obj_header.fatherLivingStatus,
            'fatherOccupation': obj_header.fatherOccupation,
            'fatherPlaceofWork': obj_header.fatherPlaceofWork,
            'fatherMobileno': obj_header.fatherMobileno,
            'motherFirstname': obj_header.motherFirstname,
            'motherLastname': obj_header.motherLastname,
            'motherAge': obj_header.motherAge,
            'motherLivingStatus': obj_header.motherLivingStatus,
            'motherOccupation': obj_header.motherOccupation,
            'motherPlaceofWork': obj_header.motherPlaceofWork,
            'motherMobileno': obj_header.motherMobileno,
            'homeAddress': obj_header.
            'sibling': obj_header.sibling,
            'siblingNo': obj_header.siblingNo,
            'formStep2': obj_header.formStep2,
        },
        'rmsChildren': obj_children,
        'rmsSibling': obj_sibling,
    }

    try {
        const response = await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/rms/transaction_step2/' + obj_header.recruitmentID, data, { headers })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function PostAndPatchApplicationEducationAndWorkExperience(obj_header: any, obj_education: any, obj_workexperience: any, obj_internship: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const data = {
        'header': {
            'educationNo': obj_header.educationNo,
            'newGraduate': obj_header.newGraduate,
            'workExperienceNo': obj_header.workExperienceNo,
            'internship': obj_header.internship,
            'internshipNo': obj_header.internshipNo,
            'presentJobOrProject': obj_header.presentJobOrProject,
            'formStep3': obj_header.formStep3,
        },
        'rmsEducation': obj_education,
        'rmsWorkexperience': obj_workexperience,
        'rmsInternship': obj_internship,
    }

    try {
        const response = await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/rms/transaction_step3/' + obj_header.recruitmentID, data, { headers })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function PostAndPatchApplicationTrainingSeminarAndCertificate(obj_header: any, obj_training: any, obj_certificate: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const data = {
        'header': {
            'trainingSeminar': obj_header.trainingSeminar,
            'trainingSeminarNo': obj_header.trainingSeminarNo,
            'certificate': obj_header.certificate,
            'certificateNo': obj_header.certificateNo,
            'formStep4': obj_header.formStep4,
        },
        'rmsTrainingseminar': obj_training,
        'rmsCertificate': obj_certificate,
    }

    try {
        const response = await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/rms/transaction_step4/' + obj_header.recruitmentID, data, { headers })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function DeleteApplicationFileupload(obj_header: any, filename: any, filetype: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    if (filename !== null && filename !== '') {
        await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/rms/' + obj_header.recruitmentID + '/' + filename + '/' + filetype, { headers })
    }
    await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/rms/' + obj_header.recruitmentID, obj_header, { headers })

    redirect("/main/application_form/" + obj_header.recruitmentID);
}

export async function PatchApplicationConfirm(obj: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = {
        Authorization: `Bearer ${access_Token}`
    }

    const email_text = {
        'subject': '[RMS] New Application // ' + obj.recruitmentID,
        'text': 'Dear <b>HR-ADMIN</b> <br> Please check new application <a href="' + process.env.NEXTEMAIL_URL + '" style="color: #7e3af2"><b>Click here</b></a> <br><br><div style="color: #ff0000;">[Auto Email]</div>Recruitment System',
    }

    await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/email/send_newapplication/', email_text, { headers })

    try {
        const response = await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/rms/' + obj.recruitmentID, obj, { headers })
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

