import React, { Fragment, useEffect, useState, memo } from "react";

import { observer, inject } from "mobx-react";

import "./style.scss";

const Modal = (props) => {
    const { storeModal } = props;

    const [show, setShow] = useState({
        display: "flex",
    });

    const handleModalBackClick = (ev) => {
        if (ev.target.id === "modalBack") handleModalClose();
    };

    const handleModalClose = () => {
        setShow({
            display: "none",
        });

        storeModal.modalClose();
    };

    return (
        <div
            id="modalBack"
            className="ModalBack"
            onClick={handleModalBackClick}
            style={show}
        >
            <div className={"modal " + storeModal.modalSize}>
                <div className="modalTitle">
                    <p className="titleStr">{storeModal.modalTitle}</p>
                    <div onClick={handleModalClose}>
                        <span className="modal_close">&times;</span>
                    </div>
                </div>
                <div className="modalContent">{props.children}</div>
            </div>
        </div>
    );
};

export default inject("storeModal")(observer(Modal));
