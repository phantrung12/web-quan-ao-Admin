import { Input, Modal, TreeSelect } from 'antd';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateCategory } from '../../redux/actions/category.actions';
import FormItem from '../component/FormItem';
import CategoryForm from './components/form';

const CategoryUpdate = ({ open, onClose, cateData }) => {
    const methods = useForm();
    const { handleSubmit, control } = methods;

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(updateCategory(data));
        onClose();
        console.log(data, 'up');
    };

    return (
        <Modal title="Sửa danh mục sản phẩm" open={open} onCancel={onClose} width={400} onOk={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <Controller
                    name="_id"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormItem title="Danh mục" error={fieldState.error} errorText={fieldState.error?.message}>
                            <TreeSelect
                                {...field}
                                value={field.value || []}
                                style={{ width: '100%' }}
                                treeData={cateData}
                            />
                        </FormItem>
                    )}
                />
                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormItem title="Tên danh mục" error={fieldState.error} errorText={fieldState.error?.message}>
                            <Input {...field} value={field.value || ''} maxLength={255} />
                        </FormItem>
                    )}
                />
            </FormProvider>
        </Modal>
    );
};

export default CategoryUpdate;
