import { Button, Modal, Popconfirm, TreeSelect, Typography } from 'antd';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../redux/actions/category.actions';
import { deleteProduct } from '../../redux/actions/product.actions';
import FormItem from '../component/FormItem';
import ProductForm from './components/form/index';

const ProductDelete = ({ open, onClose, id }) => {
    const methods = useForm();
    // const [open, setOpen] = useState(openModal);
    const { handleSubmit, reset, control } = methods;
    const dispatch = useDispatch();

    return (
        <Modal
            title="Xóa danh mục sản phẩm"
            open={open}
            onCancel={onClose}
            width={640}
            onOk={() => {
                dispatch(deleteProduct(id));
                console.log(id);
                onClose();
            }}
        >
            <Typography.Title level={3}>Bạn có chắc muốn xóa sản phẩm này?</Typography.Title>
        </Modal>
    );
};

export default ProductDelete;
