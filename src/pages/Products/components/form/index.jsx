import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import React, { memo, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { productColorList, productSizeList } from "../../../../utils/contants";
import FormItem from "../../../component/FormItem";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../../../firebase";

const ProductForm = () => {
  const { control, watch, setValue } = useFormContext();
  const category = useSelector((state) => state.category);
  const [productPictures, setProductPictures] = useState([]);

  const watchIsSale = watch("isSale");
  const watchImage = watch("image");

  const formatCategory = (category) => {
    return category.map((item) => ({
      title: item?.name,
      value: item?._id,
      children: item?.children ? formatCategory(item?.children) : [],
    }));
  };

  useEffect(() => {
    setValue("productPictures", productPictures);
  }, [productPictures]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Add image
      </div>
    </div>
  );

  const uploadImage = () => {
    const promises = [];
    watchImage.map(async (img) => {
      const fileName = new Date().getTime() + img.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, img);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProductPictures((prev) => [...prev, { img: downloadURL }]);
            setValue("productPictures", productPictures);
          });
        }
      );
    });
    Promise.all(promises)
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Controller
        name="image"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem
            title="Ch???n ???nh s???n ph???m"
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
            {watchImage?.length >= 1 && (
              <Button
                icon={<UploadOutlined />}
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => uploadImage()}
              >
                Upload
              </Button>
            )}
          </FormItem>
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem
            title="T??n s???n ph???m"
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
            title="Gi??"
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
        name="quantity"
        control={control}
        render={({ field, fieldState }) => (
          <FormItem
            title="S??? l?????ng"
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
            title="M?? t???"
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
            title="Th??? lo???i"
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
            title="K??ch c???"
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
            title="M??u s???c"
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
      <FormItem title="Gi???m gi??">
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
                  placeholder="Nh???p % gi???m gi??"
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
