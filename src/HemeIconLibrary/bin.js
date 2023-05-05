import React from "react";
export const DustBin = ({color}) => {
    return (
        <svg width="11" height="15" viewBox="0 0 11 15" fill={color || 'white'} xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.07221 4.68066H1.92884C1.53451 4.68066 1.21484 5.00033 1.21484 5.39466V11.1092C1.21484 12.2926 2.17423 13.252 3.35768 13.252H7.64336C8.21168 13.252 8.75672 13.0263 9.15858 12.6244C9.56044 12.2225 9.7862 11.6775 9.7862 11.1092V5.39466C9.7862 5.00033 9.46654 4.68066 9.07221 4.68066Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.82085 7.53725C4.82085 7.12303 4.48506 6.78725 4.07085 6.78725C3.65663 6.78725 3.32085 7.12303 3.32085 7.53725H4.82085ZM3.32085 10.3941C3.32085 10.8083 3.65663 11.1441 4.07085 11.1441C4.48506 11.1441 4.82085 10.8083 4.82085 10.3941H3.32085ZM7.68116 7.53725C7.68116 7.12303 7.34537 6.78725 6.93116 6.78725C6.51694 6.78725 6.18116 7.12303 6.18116 7.53725H7.68116ZM6.18116 10.3941C6.18116 10.8083 6.51694 11.1441 6.93116 11.1441C7.34537 11.1441 7.68116 10.8083 7.68116 10.3941H6.18116ZM7.01091 2.00195C7.42512 2.00195 7.76091 1.66617 7.76091 1.25195C7.76091 0.83774 7.42512 0.501953 7.01091 0.501953V2.00195ZM4.15407 0.501953C3.73986 0.501953 3.40407 0.83774 3.40407 1.25195C3.40407 1.66617 3.73986 2.00195 4.15407 2.00195V0.501953ZM9.7862 3.71625C10.2004 3.71625 10.5362 3.38047 10.5362 2.96625C10.5362 2.55204 10.2004 2.21625 9.7862 2.21625V3.71625ZM1.21484 2.21625C0.80063 2.21625 0.464844 2.55204 0.464844 2.96625C0.464844 3.38047 0.80063 3.71625 1.21484 3.71625V2.21625ZM3.32085 7.53725V10.3941H4.82085V7.53725H3.32085ZM6.18116 7.53725V10.3941H7.68116V7.53725H6.18116ZM7.01091 0.501953H4.15407V2.00195H7.01091V0.501953ZM9.7862 2.21625H1.21484V3.71625H9.7862V2.21625Z" fill="white" />
        </svg>
    )
}