import { Modal } from "antd";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./components/form/index";
import {
  getProductsById,
  updateProduct,
} from "../../redux/actions/product.actions";

const ProductUpdate = ({ id, open, onClose }) => {
  const methods = useForm();
  const { handleSubmit, reset, watch } = methods;

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const productDetail = useSelector((state) => state.product.productDetail);

  useEffect(() => {
    reset(productDetail);
  }, [productDetail]);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(getProductsById(id));
  }, []);

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

  const onSubmit = (data) => {
    dispatch(
      updateProduct({
        ...data,
        category:
          data.category.length > 1
            ? data.category
            : createCategoriesArray(data.category),
      })
    );
  };

  return (
    <Modal
      title="Cập nhật sản phẩm"
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

export default ProductUpdate;
