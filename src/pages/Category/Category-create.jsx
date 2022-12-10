import { Modal } from 'antd';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../redux/actions/category.actions';
import CategoryForm from './components/form';

const CategoryCreate = ({ open, onClose, cateData }) => {
    const methods = useForm();
    const { handleSubmit, reset } = methods;

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(addCategory(data));
        onClose();
        console.log(data, 'dâta');
    };

    return (
        <Modal title="Thêm mới loại hàng" open={open} onCancel={onClose} width={400} onOk={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <CategoryForm cateData={cateData} />
            </FormProvider>
        </Modal>
    );
};

export default CategoryCreate;
