import { RubroForm } from "../../../components/indexComponents.js";

const AddRubro = ({ showCreateRubro, handleCloseCreateRubro }) => {

    return (
        <RubroForm
            show={showCreateRubro}
            handleClose={handleCloseCreateRubro}
            isEditing={false} 
        />
    )
};

export default AddRubro;