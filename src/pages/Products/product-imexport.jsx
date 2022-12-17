import { Input, InputNumber, Modal, Select, Space, Switch, TreeSelect } from 'antd';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from './components/form/index';
import { getProductsById, updateProduct } from '../../redux/actions/product.actions';
import { addImexport } from '../../redux/actions/imexport.actions';
import FormItem from '../component/FormItem';

const ProductImexport = ({ id, open, onClose }) => {
    const methods = useForm();
    const { handleSubmit, reset, control } = methods;

    const dispatch = useDispatch();
    const category = useSelector((state) => state.category);
    const productDetail = useSelector((state) => state.product.productDetail);

    // useEffect(() => {
    //     reset(productDetail);
    //     console.log(productDetail);
    // }, [productDetail]);

    useEffect(() => {
        if (!id) {
            return;
        }
        dispatch(getProductsById(id));
    }, []);

    // const createCategoriesArray = (cateId, arr = []) => {
    //     arr.push(cateId);
    //     const cate = category.categoryList.find((cat) => cat._id === cateId);
    //     if (cate.parentId) {
    //         createCategoriesArray(cate.parentId, arr);
    //     } else {
    //         return arr;
    //     }
    //     return arr;
    // };
    const onImExportProduct = (data) => {
        const newImexport = {
            productId: id,
            type: data.type,
            quantity: data.quantity,
        };
        dispatch(addImexport(newImexport));
        console.log(data);
        onClose();
    };
    // const onSubmit = (data) => {
    //     dispatch(
    //         updateProduct({
    //             ...data,
    //             category: data.category.length > 1 ? data.category : createCategoriesArray(data.category),
    //         }),
    //     );
    //     onClose();
    // };

    return (
        <Modal
            title="Nhập/xuất sản phẩm"
            open={open}
            onCancel={onClose}
            width={640}
            onOk={handleSubmit(onImExportProduct)}
        >
            <FormProvider {...methods}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue={productDetail.name}
                    render={({ field, fieldState }) => (
                        <FormItem title="Tên sản phẩm" error={fieldState.error} errorText={fieldState.error?.message}>
                            <Input {...field} defaultValue={field.value || ''} maxLength={255} />
                        </FormItem>
                    )}
                />
                <Controller
                    name="type"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormItem title="Nhập/Xuất" error={fieldState.error} errorText={fieldState.error?.message}>
                            <Select
                                {...field}
                                value={field.value || []}
                                style={{ width: '100%' }}
                                options={[
                                    { label: 'Nhập', value: 'import' },
                                    { label: 'Xuất', value: 'export' },
                                ].map((size) => ({
                                    label: size.label,
                                    value: size.value,
                                }))}
                            />
                        </FormItem>
                    )}
                />
                <Controller
                    name="quantity"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormItem title="Số lượng" error={fieldState.error} errorText={fieldState.error?.message}>
                            <InputNumber
                                style={{ width: '100%' }}
                                {...field}
                                value={field.value || ''}
                                maxLength={255}
                            />
                        </FormItem>
                    )}
                />
            </FormProvider>
        </Modal>
    );
};

export default ProductImexport;
