import React from "react";

// COMPONENT ------->
import { UserForm } from "../../../../components/indexComponents.js";
// <-----------------

const ModifyUser = ({ showModifyUser, handleCloseModifyUser, viewUser }) => {
    return (
        <UserForm
            show={showModifyUser}
            handleClose={handleCloseModifyUser}
            user={viewUser}
            isEditing={true}
        />
    )
};

export default ModifyUser;