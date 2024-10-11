import { ProductForm } from "../../../../components/indexComponents.js";

const ModifyProduct = ({ showModifyProduct, handleCloseModifyProduct, product }) => {

    return (
        <ProductForm
            show={showModifyProduct} 
            handleClose={handleCloseModifyProduct} 
            product={product} 
            isEditing={true} 
        />
    );
};

export default ModifyProduct;