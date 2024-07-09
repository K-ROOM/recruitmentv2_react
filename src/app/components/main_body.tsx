"use client";
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { CreateApplication, DeleteApplication } from '../actions/actionMain';
import Link from 'next/link';
import { MdOutlineEdit } from 'react-icons/md';
import Loading from '../loading';
import { IoWarning } from 'react-icons/io5';
import moment from 'moment';
import Popup from './popup';
import { RiErrorWarningFill } from "react-icons/ri";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import Profile_Image from './profile_image';
import { signOut, useSession } from "next-auth/react";
const Cookies = require('js-cookie');

const MainBody = ({ session }: any) => {

  const [popupKey, setPopupKey] = useState(Date.now());

  const handleClearCookies = () => {
    Cookies.remove(`dontShowPopup_${session.username}`);
    setPopupKey(Date.now());
  };

  const fetcher = async (url: any) => {
    const response = await axios.get(url);
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
  const [jobDeatil1, setJobDeatil1] = useState([]);
  const [jobDeatil2, setJobDeatil2] = useState([]);
  const getMasterDetail = (header: any, detail1: any, detail2: any) => {
    setJobHeader({
      ...jobHeader,
      positionDesired: header.positionDesired,
      propertyAge: header.propertyAge,
      propertyEducation: header.propertyEducation,
      propertyExp: header.propertyExp,
      positionActiveDate: header.positionActiveDate,
      salaryMin: header.salaryMin,
      salaryMax: header.salaryMax,
    })
    setJobDeatil1(detail1)
    setJobDeatil2(detail2)
    setPositionSelected(header.positionDesired);
    setBtnVisible(true);
  }

  const [selectedDiv, setSelectedDiv] = useState<number | null>(null);
  const divRefs = useRef<Element[]>([]);

  const handleClick = (index: any) => {
    setSelectedDiv(index);
    divRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const [positionSelected, setPositionSelected] = useState('');
  const [btnVisible, setBtnVisible] = useState(false);

  const CreateApplicationClient = (positionDesired: any, username: any, firstname: any, lastname: any) => {
    CreateApplication(positionDesired, username, firstname, lastname);
  }

  const { data, error } = useSWR(process.env.NEXT_PUBLIC_API_KEY + '/master_position/active', fetcher, { refreshInterval: 3000 });
  if (error) return <div>Error fetching data</div>;
  if (!data) return <Loading />;

  return (
    <>
      <div className="container px-8">
        <div className="flex justify-between pt-3 mb-6 sticky top-0 bg-stone-100 z-10">
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
        <Popup username={session?.username} key={popupKey} />

        <button className="text-red-600 text-xs items-center mb-3" onClick={handleClearCookies}><RiErrorWarningFill className="h-5 w-5 me-1 inline-flex" /> Notice</button>
        <div className="flex sm:flex-col items-stretch gap-4">
          <div className="basis-4/12 sm:basis-full">
            <div className="bg-white p-4 border shadow-sm rounded-lg fixed z-10 sm:relative">
              <div className="flex flex-col p-4 gap-2">
                <p className="text-base font-bold mb-4">Position</p>
                {data.map((item: any) => (
                  <div key={item.positionID} className="flex flex-col sm:flex-row">
                    {
                      item.positionID === selectedDiv ?
                        <>
                          <IoMdRadioButtonOn className="hidden sm:block text-blue-700 my-1 me-2" />
                          <div className="content-center cursor-pointer text-blue-700 text-sm" key={item.positionID} onClick={() => handleClick(item.positionID)}>
                            {item.positionDesired}
                          </div>
                        </>
                        :
                        <>
                          <IoMdRadioButtonOff className="hidden sm:block text-gray-500 my-1 me-2" />
                          <div className="content-center cursor-pointer menu-navy text-sm" key={item.positionID} onClick={() => handleClick(item.positionID)}>
                            {item.positionDesired}
                          </div>
                        </>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="basis-8/12 sm:basis-full h-full">
            {data.map((item: any) => (
              <div key={item.positionID} className="bg-white p-10 sm:p-6 border shadow-sm rounded-lg mb-4" ref={(el) => (divRefs.current[item.positionID] = el as Element)}>
                <div className="py-4">
                  <div className="flex justify-between gap-4">
                    <p className="text-xl font-bold text-blue-800">{item.positionDesired}</p>
                    <p className="text-xs text-gray-500 text-right self-center">{moment(item.positionActiveDate).fromNow()}</p>
                  </div>
                </div>
                <div className="flex sm:flex-col mb-4">
                  <div className="flex-1">
                    <div className="py-1">
                      <p className="text-sm font-semibold">Age</p>
                      {
                        item.propertyAge ?
                          <>
                            <p className="text-detail">{item.propertyAge}</p>
                          </>
                          :
                          <></>
                      }
                    </div>
                    <div className="py-1">
                      <p className="text-sm font-semibold">Salary</p>
                      <p className="text-detail">{Intl.NumberFormat('th-TH', {
                        style: 'currency',
                        currency: 'THB',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(item.salaryMin)} ~ {Intl.NumberFormat('th-TH', {
                        style: 'currency',
                        currency: 'THB',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(item.salaryMax)} THB</p>
                    </div>
                  </div>

                  <div className="flex-1">

                    <div className="py-1">
                      <p className="text-sm font-semibold">Education</p>
                      {
                        item.propertyEducation ?
                          <>
                            <p className="text-detail">{item.propertyEducation}</p>
                          </>
                          :
                          <></>
                      }
                    </div>
                    <div className="py-1">
                      <p className="text-sm font-semibold">Experience </p>
                      {
                        item.propertyExp ?
                          <>
                            <p className="text-detail">{item.propertyExp}</p>
                          </>
                          :
                          <></>
                      }
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <p className="text-sm font-semibold headline-blue">
                    {
                      item.rmsMasterPositiondetail.length > 0 ?
                        <>
                          <p className="py-1 ml-2">Responsibilities</p>
                        </>
                        :
                        <></>
                    }
                  </p>
                  <div className="text-detail">
                    <ul className="list-disc list-outside">
                      {item.rmsMasterPositiondetail.map((item: any) => (
                        <li key={item.id}>
                          {item.positionResponsibility}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-sm font-semibold headline-blue">
                    {
                      item.rmsMasterPositionotherdetail.length > 0 ?
                        <>
                          <p className="py-1 ml-2">Others</p>
                        </>
                        :
                        <></>
                    }
                  </p>
                  <div className="text-[13px] text-gray-700 pr-10 mt-2">
                    <ul className="list-disc list-outside">
                      {item.rmsMasterPositionotherdetail.map((item: any) => (
                        <li key={item.id}>
                          {item.propertyOther}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex my-2">
                  {
                    item.positionDesired === 'นักศึกษาฝึกงาน' ?
                      <>
                      </>
                      :
                      <>
                        <button type="button" className="btn btn-orange px-4 w-fit sm:w-full" onClick={() => CreateApplicationClient(item.positionDesired, session?.username, session?.firstname, session?.lastname)}>Apply Now</button>
                      </>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBody;

