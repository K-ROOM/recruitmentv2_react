"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import axios from "axios";
import { redirect } from "next/navigation";
import bcrypt from 'bcrypt';
import { useState } from "react";

export async function CreateApplication(positionDesired: any, username: any, firstname: any, lastname: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = { Authorization: `Bearer ${access_Token}` }
    const data = {
        'positionDesired': positionDesired,
        'email': username,
        'inputBy': username,
        'firstnameeng': firstname,
        'lastnameeng': lastname,
        'registrationDate': new Date(),
    }
    const response = await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/rms', data, { headers })
    if (response.status === 201) {
        redirect("/main/application_form/" + response.data.recruitmentID);
    } else {
        redirect("/");
    }
}

export async function CheckAccount(obj: any) {
    try {
        const headers = { 'Content-Type': 'application/json' }
        const response = await axios.get('https://app.nipponexpress-necl.co.th:3000/rmslogin/' + obj, { headers })
        console.log(response.data);
        if (response.data != null && response.data != '') {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function CreateAccount(obj: any) {
    const hashedPassword = await bcrypt.hash(obj.password, 10);
    const headers = { 'Content-Type': 'application/json' }
    const data = {
        'username': obj.username,
        'password': hashedPassword,
        'firstnameEN': obj.firstnameEN,
        'lastnameEN': obj.lastnameEN,
        'role': 'USER',
    }

    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/rmslogin', data, { headers })
        if (response.status === 201) {
            return response.data;
        }
    } catch (error) {
        console.error('Error create account:', error);
        throw error;
    }
}

export async function GetOTP(email: any) {
    const headers = { 'Content-Type': 'application/json' }

    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/email/send_otp', { email }, { headers })
        return response.data;
    } catch (error) {
        console.error('Error get otp:', error);
        throw error;
    }
}

export async function verifyEmailOTP(email: any, otp: any, token: any) {
    const headers = { 'Content-Type': 'application/json' }

    const data = {
        'email': email,
        'otp': otp.otpdigit1 + otp.otpdigit2 + otp.otpdigit3 + otp.otpdigit4 + otp.otpdigit5 + otp.otpdigit6,
        'token': token,
    }

    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_KEY + '/email/verify_otp', data, { headers })
        return response.data;
    } catch (error) {
        console.error('Error verify otp:', error);
        throw error;
    }
}

export async function RepasswordAccount(obj: any) {
    const hashedPassword = await bcrypt.hash(obj.password, 10);
    const headers = { 'Content-Type': 'application/json' }
    const data = {
        'password': hashedPassword,
    }

    try {
        const response = await axios.patch(process.env.NEXT_PUBLIC_API_KEY + '/rmslogin/' + obj.username, data, { headers })
        return response.data;
    } catch (error) {
        console.error('Error reset password account:', error);
        throw error;
    }
}

export async function DeleteApplication(recruitmentID: any) {
    const session: any = await getServerSession(authOptions);
    const access_Token = session.accessToken;
    const headers = { Authorization: `Bearer ${access_Token}` }
    
    try {
        const response = await axios.delete(process.env.NEXT_PUBLIC_API_KEY + '/rms/' + recruitmentID, { headers })
        return response.data;
    } catch (error) {
        console.error('Error delete application:', error);
        throw error;
    }
}