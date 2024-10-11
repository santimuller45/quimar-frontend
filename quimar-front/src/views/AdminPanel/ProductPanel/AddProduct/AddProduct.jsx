import { ProductForm } from "../../../../components/indexComponents.js";

const AddProduct = ({ showCreateProduct, handleCloseCreateProduct }) => {

    return (
        <ProductForm
            show={showCreateProduct} 
            handleClose={handleCloseCreateProduct} 
            isEditing={false}
        />
    );
};

export default AddProduct;