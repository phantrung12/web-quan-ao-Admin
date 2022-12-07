import {
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import React, { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { productColorList, productSizeList } from "../../../../utils/contants";
import FormItem from "../../../component/FormItem";
import { PlusOutlined } from "@ant-design/icons";

const ProductForm = () => {
  const { control, watch } = useFormContext();
  const category = useSelector((state) => state.category);

  const watchIsSale = watch("isSale");
  const watchImage = watch("image");

  const formatCategory = (category) => {
    return category.map((item) => ({
      title: item?.name,
      value: item?._id,
      children: item?.children ? formatCategory(item?.children) : [],
    }));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <div>
      <Controller
        name="image"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem
            title="Chọn ảnh sản phẩm"
            error={fieldState.error}
            errorText={fieldState.error?.message}
          >
            <Upload
              {...field}
              fileList={field.value || []}
              onChange={(info) => {
                if (info.file) {
                  field.onChange(info.fileList);
                }
              }}
              maxCount={3}
              listType="picture-card"
              beforeUpload={() => false}
              accept="image/*"
            >
              {watchImage?.length >= 3 ? null : uploadButton}
            </Upload>
          </FormItem>
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem
            title="Tên sản phẩm"
            error={fieldState.error}
            errorText={fieldState.error?.message}
          >
            <Input {...field} value={field.value || ""} maxLength={255} />
          </FormItem>
        )}
      />
      <Controller
        name="price"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem
            title="Giá"
            error={fieldState.error}
            errorText={fieldState.error?.message}
          >
            <InputNumber
              style={{ width: "100%" }}
              {...field}
              value={field.value || ""}
              maxLength={255}
            />
          </FormItem>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem
            title="Mô tả"
            error={fieldState.error}
            errorText={fieldState.error?.message}
          >
            <Input {...field} value={field.value || ""} maxLength={255} />
          </FormItem>
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem
            title="Thể loại"
            error={fieldState.error}
            errorText={fieldState.error?.message}
          >
            <TreeSelect
              {...field}
              showSearch
              style={{
                width: "100%",
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
          <FormItem
            title="Kích cỡ"
            error={fieldState.error}
            errorText={fieldState.error?.message}
          >
            <Select
              {...field}
              value={field.value || []}
              mode="multiple"
              style={{ width: "100%" }}
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
          <FormItem
            title="Màu sắc"
            error={fieldState.error}
            errorText={fieldState.error?.message}
          >
            <Select
              {...field}
              value={field.value || []}
              mode="multiple"
              style={{ width: "100%" }}
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
            render={({ field, fieldState }) => (
              <Switch {...field} checked={field.value || false} />
            )}
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
                  style={{ width: "200px" }}
                />
              )}
            />
          )}
        </Space>
      </FormItem>
    </div>
  );
};

export default memo(ProductForm);
