import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FormItem from '../../../component/FormItem';
import { Input, Select, Tree, TreeSelect } from 'antd';
import { productColorList, productSizeList } from '../../../../utils/contants';
import { useState } from 'react';

function CategoryForm({ cateData }) {
    const { control, watch } = useFormContext();
    const [parentId, setParentId] = useState();
    console.log(parentId);
    return (
        <div>
            <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                    <FormItem title="Tên danh mục" error={fieldState.error} errorText={fieldState.error?.message}>
                        <Input {...field} value={field.value || ''} maxLength={255} />
                    </FormItem>
                )}
            />
            <Controller
                name="parentId"
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
        </div>
    );
}

export default CategoryForm;
