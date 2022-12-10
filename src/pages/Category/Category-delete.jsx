import { Modal, TreeSelect } from 'antd';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../redux/actions/category.actions';
import FormItem from '../component/FormItem';
import ProductForm from './components/form/index';

const CategoryDelete = ({ openModal, onClose, cateData }) => {
    const methods = useForm();
    // const [open, setOpen] = useState(openModal);
    const { handleSubmit, reset, control } = methods;
    const dispatch = useDispatch();
    const dataA = [];
    const format = (dataA) => {
        return dataA.map((item) => ({
            _id: item,
        }));
    };
    const onSubmit = (data) => {
        dispatch(deleteCategory(format(data.ids)));
        // console.log(format(data), '11');
        console.log(format(data.ids), '12');
        onClose();
    };

    return (
        <Modal
            title="Xóa danh mục sản phẩm"
            open={openModal}
            onCancel={onClose}
            width={640}
            onOk={handleSubmit(onSubmit)}
        >
            <FormProvider {...methods}>
                <Controller
                    name="ids"
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormItem title="Danh mục" error={fieldState.error} errorText={fieldState.error?.message}>
                            <TreeSelect
                                {...field}
                                value={field.value || []}
                                style={{ width: '100%' }}
                                multiple
                                treeData={cateData}
                                // onChange={setParentId(cateData.value)}
                            />
                        </FormItem>
                    )}
                />
            </FormProvider>
        </Modal>
    );
};

export default CategoryDelete;
