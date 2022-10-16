import React from "react";
import { useHistory } from "react-router-dom";
const BackHistoryButton = () => {
    const history = useHistory();
    return (
        <button className="btn btn-primary" onClick={() => history.goBack()}>
            <i className="bi bi-caret-left"></i>
            Назад
        </button>
    );
};

export default BackHistoryButton;
