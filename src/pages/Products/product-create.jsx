import { Modal } from "antd";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import ProductForm from "./components/form/index";

const ProductCreate = ({ open, onClose }) => {
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    console.log(data);
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
