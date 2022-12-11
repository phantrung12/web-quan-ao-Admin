import { Modal } from "antd";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/actions/product.actions";
import ProductForm from "./components/form/index";

const ProductCreate = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const methods = useForm();
  const { handleSubmit, reset, watch } = methods;

  const dispatch = useDispatch();
  console.log(watch("productPictures"));

  const category = useSelector((state) => state.category);

  const createCategoriesArray = (cateId, arr = []) => {
    arr.push(cateId);
    const cate = category.categoryList.find((cat) => cat._id === cateId);
    if (cate.parentId) {
      createCategoriesArray(cate.parentId, arr);
    } else {
      return arr;
    }
    return arr;
  };

  const onSubmit = async (data) => {
    dispatch(
      addProduct({
        ...data,
        category: createCategoriesArray(data.category),
      })
    );
    onClose();
  };

  return (
    <Modal
      title="Thêm mới sản phẩm"
      open={open}
      onCancel={onClose}
      width={640}
      onOk={handleSubmit(onSubmit)}
    >
      <FormProvider {...methods}>
        <ProductForm />
      </FormProvider>
    </Modal>
  );
};

export default ProductCreate;
