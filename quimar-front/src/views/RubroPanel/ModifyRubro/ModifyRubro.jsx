import { RubroForm } from "../../../components/indexComponents.js";

const ModifyRubro = ({ showModifyRubros, handleCloseModifyRubros, rubro }) => {

    return (
        <RubroForm
            show={showModifyRubros}
            handleClose={handleCloseModifyRubros}
            rubro={rubro}
            isEditing={true} 
        />
    );
};

export default ModifyRubro;