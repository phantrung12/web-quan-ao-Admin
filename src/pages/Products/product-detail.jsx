import { Input, InputNumber, Modal, Select, Space, Switch, TreeSelect } from 'antd';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from './components/form/index';
import { getProductsById, updateProduct } from '../../redux/actions/product.actions';
import FormItem from '../component/FormItem';
import { productColorList, productSizeList } from '../../utils/contants';

const ProductDetail = ({ id, open, onClose }) => {
    const methods = useForm();
    const { handleSubmit, reset, watch, control } = methods;

    const watchIsSale = watch('isSale');
    const watchImage = watch('image');

    const formatCategory = (category) => {
        return category.map((item) => ({
            title: item?.name,
            value: item?._id,
            children: item?.children ? formatCategory(item?.children) : [],
        }));
    };

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
        onClose();
    };

    return (
        <Modal title="Chi tiết sản phẩm" open={open} onCancel={onClose} width={640} onOk={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <Controller
                    name="image"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormItem title="Ảnh sản phẩm" error={fieldState.error} errorText={fieldState.error?.message}>
                            <div style={{ display: 'flex' }}>
                                {productDetail.productPictures?.map((data) => (
                                    <img
                                        style={{ marginRight: '2%', width: '150px', height: '150px' }}
                                        src={data.img}
                                    />
                                ))}{' '}
                            </div>
                        </FormItem>
                    )}
                />
                <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormItem title="Tên sản phẩm" error={fieldState.error} errorText={fieldState.error?.message}>
                            <Input {...field} defaultValue={field.value || ''} maxLength={255} />
                        </FormItem>
                    )}
                />
                <Controller
                    name="price"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormItem title="Giá" error={fieldState.error} errorText={fieldState.error?.message}>
                            <InputNumber
                                style={{ width: '100%' }}
                                {...field}
                                value={field.value || ''}
                                maxLength={255}
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
                <Controller
                    name="description"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormItem title="Mô tả" error={fieldState.error} errorText={fieldState.error?.message}>
                            <Input {...field} value={field.value || ''} maxLength={255} />
                        </FormItem>
                    )}
                />
                <Controller
                    name="category"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormItem title="Thể loại" error={fieldState.error} errorText={fieldState.error?.message}>
                            <TreeSelect
                                {...field}
                                showSearch
                                style={{
                                    width: '100%',
                                }}
                                allowClear
                                value={field.value || null}
                                treeData={formatCategory(category.categories)}
                            />
                        </FormItem>
                    )}
                />
                <Controller
                    name="size"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormItem title="Kích cỡ" error={fieldState.error} errorText={fieldState.error?.message}>
                            <Select
                                {...field}
                                value={field.value || []}
                                mode="multiple"
                                style={{ width: '100%' }}
                                options={productSizeList.map((size) => ({
                                    label: size.label,
                                    value: size.value,
                                }))}
                            />
                        </FormItem>
                    )}
                />
                <Controller
                    name="color"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormItem title="Màu sắc" error={fieldState.error} errorText={fieldState.error?.message}>
                            <Select
                                {...field}
                                value={field.value || []}
                                mode="multiple"
                                style={{ width: '100%' }}
                                options={productColorList.map((color) => ({
                                    label: color.label,
                                    value: color.value,
                                }))}
                            />
                        </FormItem>
                    )}
                />
                <FormItem title="Giảm giá">
                    <Space>
                        <Controller
                            name="isSale"
                            control={control}
                            render={({ field, fieldState }) => <Switch {...field} checked={field.value || false} />}
                        />
                        {watchIsSale && (
                            <Controller
                                name="salePercent"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <InputNumber
                                        {...field}
                                        value={field.value || 0}
                                        max={99}
                                        placeholder="Nhập % giảm giá"
                                        style={{ width: '200px' }}
                                    />
                                )}
                            />
                        )}
                    </Space>
                </FormItem>
            </FormProvider>
        </Modal>
    );
};

export default ProductDetail;
