import React from "react";
export const Delete = ({color}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M16.3721 9.35229H7.62791C7.14521 9.35229 6.75391 9.7436 6.75391 10.2263V17.2214C6.75391 18.6701 7.92828 19.8445 9.37695 19.8445H14.623C15.3187 19.8445 15.9859 19.5681 16.4778 19.0762C16.9697 18.5843 17.2461 17.9171 17.2461 17.2214V10.2263C17.2461 9.7436 16.8548 9.35229 16.3721 9.35229Z" stroke="#3D88E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.997 12.8497C10.997 12.4355 10.6613 12.0997 10.247 12.0997C9.83282 12.0997 9.49704 12.4355 9.49704 12.8497H10.997ZM9.49704 16.3467C9.49704 16.7609 9.83282 17.0967 10.247 17.0967C10.6613 17.0967 10.997 16.7609 10.997 16.3467H9.49704ZM14.4998 12.8497C14.4998 12.4355 14.164 12.0997 13.7498 12.0997C13.3356 12.0997 12.9998 12.4355 12.9998 12.8497H14.4998ZM12.9998 16.3467C12.9998 16.7609 13.3356 17.0967 13.7498 17.0967C14.164 17.0967 14.4998 16.7609 14.4998 16.3467H12.9998ZM13.8464 5.90567C14.2607 5.90567 14.5964 5.56988 14.5964 5.15567C14.5964 4.74145 14.2607 4.40567 13.8464 4.40567V5.90567ZM10.3494 4.40567C9.93519 4.40567 9.5994 4.74145 9.5994 5.15567C9.5994 5.56988 9.93519 5.90567 10.3494 5.90567V4.40567ZM17.2461 8.0042C17.6603 8.0042 17.9961 7.66842 17.9961 7.2542C17.9961 6.83999 17.6603 6.5042 17.2461 6.5042V8.0042ZM6.75391 6.5042C6.33969 6.5042 6.00391 6.83999 6.00391 7.2542C6.00391 7.66842 6.33969 8.0042 6.75391 8.0042V6.5042ZM9.49704 12.8497V16.3467H10.997V12.8497H9.49704ZM12.9998 12.8497V16.3467H14.4998V12.8497H12.9998ZM13.8464 4.40567H10.3494V5.90567H13.8464V4.40567ZM17.2461 6.5042H6.75391V8.0042H17.2461V6.5042Z" fill={color || '#3D88E0'} />
        </svg>
    );
};