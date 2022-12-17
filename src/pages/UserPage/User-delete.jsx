import { Modal, Typography } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/actions/user.actions';

const UserDelete = ({ open, onClose, id }) => {
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
                dispatch(deleteUser(id));
                console.log(id);
                onClose();
            }}
        >
            <Typography.Title level={4}>Bạn có chắc muốn xóa sản phẩm này?</Typography.Title>
        </Modal>
    );
};

export default UserDelete;
