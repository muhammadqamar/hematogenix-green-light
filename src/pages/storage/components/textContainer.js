import React from "react";
import Spinner from 'react-bootstrap/Spinner';


export default function TextContainer({ text, showSpinner }) {

    return (
        <div className="text-center mt-8 mb-8">
            {showSpinner &&
                <div className="mb-2">
                    <Spinner animation="border" role="status" variant="info"> </Spinner>
                </div>
            }
            <span className="text-[16px] leading-[24px] font-medium text-[black]"> {text} </span>
        </div>);
}