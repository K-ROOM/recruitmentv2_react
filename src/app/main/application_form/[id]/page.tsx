"use server";
import { getServerSession } from "next-auth";

import axios from "axios";
import ApplicationForm_Main from "@/app/components/applicationform_main";
import { Suspense } from "react";
import Loading from "@/app/loading";
import Login from "@/app/components/login";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export default async function ApplicationForm({ params }: any) {
  const session: any = await getServerSession(authOptions)
  if (session) {
    const access_Token = session.accessToken;
    const headers = {
      Authorization: `Bearer ${access_Token}`
    }

    type children_new = {
      firstname: string,
      lastname: string,
      age: string,
      gender: string,
      occupation: string,
      recruitmentID: string,
    }

    type sibling_new = {
      firstname: string,
      lastname: string,
      age: string,
      gender: string,
      occupation: string,
      recruitmentID: string,
    }

    type education_new = {
      degreeobtained: string,
      eduFrom: Date,
      eduTo: Date,
      education: string,
      gpa: number,
      institute: string,
      major: string,
      recruitmentID: string,
    }

    type workexperience_new = {
      company: string,
      currentlyWorking: string,
      lastSalary: number,
      position: string,
      responsibility: string,
      reasonofLeaving: string,
      typeofBusiness: string,
      workExpFrom: Date,
      workExpTo: Date,
      recruitmentID: string,
    }

    type internship_new = {
      internshipCompany: string,
      internshipPosition: string,
      internshipTypeofBusiness: string,
      internshipExpFrom: Date,
      internshipExpTo: Date,
      recruitmentID: string,
    }

    type trainingseminar_new = {
      trainingCourse: string,
      trainingInstitute: string,
      trainingPeriod: number,
      trainingYear: Date,
      recruitmentID: string,
    }

    type certificate_new = {
      certificate: string,
      certificateDetail: string,
      recruitmentID: string,
    }

    const response = await axios.get(process.env.NEXT_PUBLIC_API_KEY + "/rms/" + params.id, { headers });
    const data = response.data;

    const children_Data: children_new[] = data.rmsChildren?.map((item: {
      detailID: number,
      firstname: string,
      lastname: string,
      age: number,
      gender: string,
      occupation: string,
      recruitmentID: string
    }) => ({
      firstname: item.firstname,
      lastname: item.lastname,
      age: item.age,
      gender: item.gender,
      occupation: item.occupation,
      recruitmentID: item.recruitmentID,
    }));

    const sibling_Data: sibling_new[] = data.rmsSibling?.map((item: {
      detailID: number,
      firstname: string,
      lastname: string,
      age: number,
      gender: string,
      occupation: string,
      recruitmentID: string
    }) => ({
      firstname: item.firstname,
      lastname: item.lastname,
      age: item.age,
      gender: item.gender,
      occupation: item.occupation,
      recruitmentID: item.recruitmentID,
    }));

    const education_Data: education_new[] = data.rmsEducation?.map((item: {
      detailID: number,
      degreeobtained: string;
      eduFrom: Date;
      eduTo: Date;
      education: string;
      gpa: number;
      institute: string;
      major: string;
      recruitmentID: string;
    }) => ({
      degreeobtained: item.degreeobtained,
      eduFrom: item.eduFrom,
      eduTo: item.eduTo,
      education: item.education,
      gpa: item.gpa,
      institute: item.institute,
      major: item.major,
      recruitmentID: item.recruitmentID,
    }));

    const workexperience_Data: workexperience_new[] = data.rmsWorkexperience?.map((item: {
      detailID: number,
      company: string,
      currentlyWorking: string,
      lastSalary: number,
      position: string,
      responsibility: string,
      reasonofLeaving: string,
      typeofBusiness: string,
      workExpFrom: Date,
      workExpTo: Date,
      recruitmentID: string,
    }) => ({
      company: item.company,
      currentlyWorking: item.currentlyWorking,
      lastSalary: item.lastSalary,
      position: item.position,
      responsibility: item.responsibility,
      reasonofLeaving: item.reasonofLeaving,
      typeofBusiness: item.typeofBusiness,
      workExpFrom: item.workExpFrom,
      workExpTo: item.workExpTo,
      recruitmentID: item.recruitmentID,
    }));

    const internship_Data: internship_new[] = data.rmsInternship?.map((item: {
      detailID: number,
      internshipCompany: string,
      internshipPosition: string,
      internshipTypeofBusiness: string,
      internshipExpFrom: Date,
      internshipExpTo: Date,
      recruitmentID: string,
    }) => ({
      internshipCompany: item.internshipCompany,
      internshipPosition: item.internshipPosition,
      internshipTypeofBusiness: item.internshipTypeofBusiness,
      internshipExpFrom: item.internshipExpFrom,
      internshipExpTo: item.internshipExpTo,
      recruitmentID: item.recruitmentID,
    }));

    const trainingseminar_Data: trainingseminar_new[] = data.rmsTrainingseminar?.map((item: {
      detailID: number,
      trainingCourse: string,
      trainingInstitute: string,
      trainingPeriod: number,
      trainingYear: Date,
      recruitmentID: string,
    }) => ({
      trainingCourse: item.trainingCourse,
      trainingInstitute: item.trainingInstitute,
      trainingPeriod: item.trainingPeriod,
      trainingYear: item.trainingYear,
      recruitmentID: item.recruitmentID,
    }));

    const certificate_Data: certificate_new[] = data.rmsCertificate?.map((item: {
      detailID: number,
      certificate: string,
      certificateDetail: string,
      recruitmentID: string,
    }) => ({
      certificate: item.certificate,
      certificateDetail: item.certificateDetail,
      recruitmentID: item.recruitmentID,
    }));

    if (typeof data === 'object' && data !== null) {
      data.rmsChildren = children_Data;
      data.rmsCertificate = certificate_Data;
      data.rmsTrainingseminar = trainingseminar_Data;
      data.rmsInternship = internship_Data;
      data.rmsWorkexperience = workexperience_Data;
      data.rmsEducation = education_Data;
      data.rmsSibling = sibling_Data;
    } else {
      console.error('Invalid data format:', data);
    }

    let stepForm = 0;
    if (data.formStep1 === false && data.formStep2 === false && data.formStep3 === false && data.formStep4 === false && data.formStep5 === false && data.formStep6 === false && data.formStep7 === false && data.formStep8 === false && data.hr_SubmitStatus === null) {
      stepForm = 1;
    } else if (data.formStep1 === true && data.formStep2 === false && data.formStep3 === false && data.formStep4 === false && data.formStep5 === false && data.formStep6 === false && data.formStep7 === false && data.formStep8 === false && data.hr_SubmitStatus === null) {
      stepForm = 2;
    } else if (data.formStep1 === true && data.formStep2 === true && data.formStep3 === false && data.formStep4 === false && data.formStep5 === false && data.formStep6 === false && data.formStep7 === false && data.formStep8 === false && data.hr_SubmitStatus === null) {
      stepForm = 3;
    } else if (data.formStep1 === true && data.formStep2 === true && data.formStep3 === true && data.formStep4 === false && data.formStep5 === false && data.formStep6 === false && data.formStep7 === false && data.formStep8 === false && data.hr_SubmitStatus === null) {
      stepForm = 4;
    } else if (data.formStep1 === true && data.formStep2 === true && data.formStep3 === true && data.formStep4 === true && data.formStep5 === false && data.formStep6 === false && data.formStep7 === false && data.formStep8 === false && data.hr_SubmitStatus === null) {
      stepForm = 5;
    } else if (data.formStep1 === true && data.formStep2 === true && data.formStep3 === true && data.formStep4 === true && data.formStep5 === true && data.formStep6 === false && data.formStep7 === false && data.formStep8 === false && data.hr_SubmitStatus === null) {
      stepForm = 6;
    } else if (data.formStep1 === true && data.formStep2 === true && data.formStep3 === true && data.formStep4 === true && data.formStep5 === true && data.formStep6 === true && data.formStep7 === false && data.formStep8 === false && data.hr_SubmitStatus === null) {
      stepForm = 7;
    } else if (data.formStep1 === true && data.formStep2 === true && data.formStep3 === true && data.formStep4 === true && data.formStep5 === true && data.formStep6 === true && data.formStep7 === true && data.formStep8 === false && data.hr_SubmitStatus === null) {
      stepForm = 8;
    } else if (data.formStep1 === true && data.formStep2 === true && data.formStep3 === true && data.formStep4 === true && data.formStep5 === true && data.formStep6 === true && data.formStep7 === true && data.formStep8 === true && data.hr_SubmitStatus === null) {
      stepForm = 9;
    } else if (data.formStep1 === true && data.formStep2 === true && data.formStep3 === true && data.formStep4 === true && data.formStep5 === true && data.formStep6 === true && data.formStep7 === true && data.formStep8 === true && data.hr_SubmitStatus !== null) {
      stepForm = 10;
    }
    return (
      <>
        <Suspense fallback={<Loading />}>
          <ApplicationForm_Main session={session} header={data} stepForm={stepForm} />
        </Suspense>
      </>
    )
  } else {
    return (
      <>
        <Login />
      </>
    )
  }
}