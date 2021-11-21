import React, { useState } from "react";

import {
    Button,
    Container,
    FlexRow,
} from "../../../components/CommonComponents";
import { Modal, DialogBox } from "../../../components/Modal";
import Input from "../../../components/Input";

export default function AddMemberDialog({ handleClose, show }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const clearInputs = () => {
        setName("");
        setPhone("");
    };
    const sendDone = () => {
        if (name !== "" && phone !== "") {
            const data = { name, phoneNo: phone };
            clearInputs();
            handleClose(true, data);
        } else if (name === "") {
            window.alert("Please enter member name.");
        } else {
            window.alert("Please enter the member's phone number.");
        }
    };

    const sendCancel = () => {
        clearInputs();
        handleClose(false, null);
    };

    return (
        <Modal show={show}>
            <DialogBox>
                <h2>Add member</h2>
                <p>Enter the below details of the member</p>
                <Container alignItems="center" disableFullWidth>
                    <Input
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        id="name"
                        name="name"
                        required
                        minLength="1"
                    />
                    <Input
                        label="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        id="phone"
                        name="phone"
                        required
                        minLength="1"
                    />
                </Container>

                <FlexRow>
                    <Button onClick={sendDone}>Done</Button>
                    <Button onClick={sendCancel} color="secondary">
                        Cancel
                    </Button>
                </FlexRow>
            </DialogBox>
        </Modal>
    );
}