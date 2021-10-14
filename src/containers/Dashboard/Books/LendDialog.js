import React, { useState, useEffect } from "react"; 

import { Button, FlexRow, Select } from "../../../components/CommonComponents"; 
import { Modal, DialogBox } from "../../../components/Modal";
import Spinner from "../../../components/Spinner";

import { getMembers } from "../../../api/memberAPI"; 

export default function LendDialog({ handleClose, show }) { 
    const [member, setMember] = useState(""); 
    const [isLoading, setIsLoading] = useState(false);
    const [members, setMembers] = useState(null);

    const sendConfirm = () => {
        if (member !== "") {
            handleClose(true, member);
        } else {
            window.alert("Please Select a Member First.");
        }
    };

    const sendCancel = () => handleClose(false, null); 

    useEffect(() => {
        setIsLoading(true);
        const response = getMembers();
        setMembers(response);
        setIsLoading(false);
    }, []);

    return ( 
        <Modal show={show}> 
            <DialogBox> 
                <h2>Lend book</h2>
                <p>Select menber to continue and confirm</p>
            </DialogBox>
        </Modal>
    );
}