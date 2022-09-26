import { Box, Button, IconButton, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Layout from "../components/Layout";
import NewModal from "../components/Modal";
import {
  addProduct,
  deleteProduct,
  updateProduct,
  updateSale,
} from "../redux/actions/product.actions";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./Products.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  AddOutlined,
  AttachMoneyOutlined,
  CreateOutlined,
  DeleteOutline,
  ImportExportOutlined,
  RemoveRedEye,
} from "@material-ui/icons";
import { addImexport } from "../redux/actions/imexport.actions";

const Products = () => {
  const [_id, setId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [salePercent, setSalePercent] = useState("");
  const [isSale, setIsSale] = useState(false);
  const [type, setType] = useState("");
  const [count, setCount] = useState("");
  const [images, setImages] = useState([]);

  const [productPictures, setProductPictures] = useState([]);
  const [productUrls, setProductUrls] = useState([]);

  const [productDetails, setProductDetails] = useState(null);
  const [productUpdate, setProductUpdate] = useState(null);

  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productUpdateModal, setProductUpdateModal] = useState(false);
  const [productDeleteModal, setProductDeleteModal] = useState(false);
  const [productSaleModal, setProductSaleModal] = useState(false);
  const [productImExModal, setProductImExModal] = useState(false);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      width: 350,
    },
    {
      field: "price",
      headerName: "Giá",
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      width: 150,
    },
    {
      field: "category",
      headerName: "Thể loại",
      width: 150,
      renderCell: (params) => {
        return params?.row?.category[0].name;
      },
    },
    {
      field: "actions",
      headerName: "Hành động",
      width: 250,
      renderCell: (params) => {
        return (
          <div>
            <Tooltip title="Xem">
              <IconButton
                color="primary"
                variant="contained"
                onClick={() => showProductDetailsModal(params?.row)}
              >
                <RemoveRedEye />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sửa">
              <IconButton
                color="primary"
                variant="contained"
                onClick={() => showProductUpdateModal(params?.row)}
              >
                <CreateOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                color="secondary"
                variant="contained"
                onClick={() => showProductDeleteModal(params?.row)}
              >
                <DeleteOutline />
              </IconButton>
            </Tooltip>
            <Tooltip title="Nhập/Xuất hàng">
              <IconButton
                color="primary"
                variant="contained"
                onClick={() => showProductImexModal(params?.row)}
              >
                <ImportExportOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sale">
              <IconButton
                color="primary"
                variant="contained"
                onClick={() => showProductSaleModal(params?.row)}
              >
                <AttachMoneyOutlined />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

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

  const handleShow = () => setShow(true);

  const uploadImg = () => {
    const promises = [];
    images.map((img) => {
      const fileName = new Date().getTime() + img.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, img);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProductUrls((prev) => [...prev, { img: downloadURL }]);
          });
        }
      );
    });
    Promise.all(promises)
      .then(() => {
        alert("All images uploaded");
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    const newProduct = {
      name,
      description,
      price,
      quantity,
      size,
      color,
      category: createCategoriesArray(categoryId),
      productPictures: productUrls,
    };
    dispatch(addProduct(newProduct));
    setShow(false);
  };

  const createCategoryList = (categories, option = []) => {
    for (let category of categories) {
      option.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, option);
      }
    }
    return option;
  };

  // const handleProductPictures = (e) => {
  //   setProductPictures([...productPictures, e.target.files[0]]);
  // };

  const handleImageChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const renderProducts = () => {
    const proList = product.products.map((item, index) => {
      return {
        id: index,
        ...item,
      };
    });
    return (
      <Box sx={{ height: "100vh" }}>
        <DataGrid
          columns={columns}
          rows={proList}
          rowsPerPageOptions={[10]}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    );
  };

  const renderAddProductModal = () => {
    return (
      <NewModal
        show={show}
        handleClose={() => setShow(false)}
        modalTitle="Add new Product"
        onSubmit={handleClose}
      >
        <Input
          label="Name"
          value={name}
          type="text"
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          type="text"
          placeholder={`Product Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          type="text"
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          type="text"
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          label="Size"
          value={size}
          type="text"
          placeholder={`Size: S,M,L,XL,...`}
          onChange={(e) => setSize(e.target.value.split(","))}
        />
        <Input
          label="Color"
          value={color}
          type="text"
          placeholder={`Color`}
          onChange={(e) => setColor(e.target.value.split(","))}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          multiple
          onChange={handleImageChange}
        />
        <button onClick={uploadImg}>Uploads</button>
      </NewModal>
    );
  };

  //////////////////////////// ON SUBMIT MODAL //////////////////////////////

  const handleCloseProductDetailModal = () => {
    setProductDetailModal(false);
  };

  const onUpdateProduct = () => {
    const newProductUpdate = {
      _id,
      name,
      description,
      price,
      quantity,
      size,
      color,
      category: createCategoriesArray(categoryId),
      productPictures: productUrls,
    };

    dispatch(updateProduct(newProductUpdate));
    setProductUpdateModal(false);
  };

  const onUpdateSale = () => {
    const saledProduct = {
      isSale,
      salePercent,
    };
    dispatch(updateSale(saledProduct, _id));
    setProductSaleModal(false);
  };

  const onDeleteProduct = () => {
    dispatch(deleteProduct(_id));
    setProductDeleteModal(false);
  };

  const onImExportProduct = () => {
    const newImexport = {
      productId: _id,
      type,
      quantity: count,
    };
    dispatch(addImexport(newImexport));
    setProductImExModal(false);
  };

  ////////////////////// SHOW MODAL ///////////////////////////////////

  const showProductDetailsModal = (product) => {
    setProductDetailModal(true);
    setProductDetails(product);
    // console.log(product);
  };

  const showProductUpdateModal = (product) => {
    setProductUpdateModal(true);
    setProductUpdate(product);
    setName(product.name);
    setPrice(product.price);
    setQuantity(product.quantity);
    setDescription(product.description);
    setCategoryId(product.category[0]._id);
    setId(product._id);
  };

  const showProductDeleteModal = (product) => {
    setProductDeleteModal(true);
    setId(product._id);
  };

  const showProductSaleModal = (product) => {
    setProductSaleModal(true);
    setIsSale(product?.isSale);
    setSalePercent(product?.salePercent);
    setId(product._id);
  };

  const showProductImexModal = (product) => {
    setProductImExModal(true);
    setId(product._id);
  };

  /////////////////////////// RENDER MODAL ///////////////////////////

  const renderProductDetailModal = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <NewModal
        show={productDetailModal}
        handleClose={handleCloseProductDetailModal}
        modalTitle="Product Details"
        size="lg"
      >
        <Row>
          <Col md={6}>
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md={6}>
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md={6}>
            <label className="key">Category</label>
            <p className="value">{productDetails.category[0].name}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label className="key">Size</label>
            <p className="value">{productDetails.size}</p>
          </Col>
          <Col md={6}>
            <label className="key">Color</label>
            <p className="value">{productDetails.color}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label className="key">Sale</label>
            <p className="value">
              {productDetails?.salePercent > 0
                ? productDetails?.salePercent + "%"
                : "Không Sale"}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Product Images</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((pic) => (
                <div className="productImgContainer">
                  <img src={pic.img} alt="" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  };

  const renderUpdateProductModal = () => {
    return (
      <NewModal
        show={productUpdateModal}
        handleClose={() => setProductUpdateModal(false)}
        modalTitle="Product Details"
        size="lg"
        onSubmit={onUpdateProduct}
      >
        <Input
          label="Name"
          value={name}
          type="text"
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          type="text"
          placeholder={`Product Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          type="text"
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          type="text"
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          label="Size"
          value={size}
          type="text"
          placeholder={`Size: S,M,L,XL,...`}
          onChange={(e) => setSize(e.target.value.split(","))}
        />
        <Input
          label="Color"
          value={color}
          type="text"
          placeholder={`Color`}
          onChange={(e) => setColor(e.target.value.split(","))}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          multiple
          onChange={handleImageChange}
        />
        <button onClick={uploadImg}>Uploads</button>
      </NewModal>
    );
  };

  const renderUpdateSaleModal = () => {
    return (
      <NewModal
        show={productSaleModal}
        handleClose={() => setProductSaleModal(false)}
        modalTitle="Update Sale Product"
        onSubmit={onUpdateSale}
      >
        <select
          className="form-control"
          value={isSale}
          onChange={(e) => setIsSale(e.target.value)}
        >
          <option>Select Sale</option>
          <option value={true}>Sale</option>
          <option value={false}>Không Sale</option>
        </select>
        <Input
          label="Sale Perceent"
          value={salePercent}
          type="text"
          onChange={(e) => setSalePercent(e.target.value)}
        />
      </NewModal>
    );
  };

  const renderDeleteModal = () => {
    return (
      <NewModal
        show={productDeleteModal}
        handleClose={() => setProductDeleteModal(false)}
        modalTitle="Xóa sản phẩm"
        size="lg"
        buttons={[
          {
            label: "Yes",
            color: "danger",
            onClick: onDeleteProduct,
          },
        ]}
      >
        Bạn có chắc muốn xóa sản phẩm này??
      </NewModal>
    );
  };

  const renderImExportModal = () => {
    return (
      <NewModal
        show={productImExModal}
        handleClose={() => setProductImExModal(false)}
        modalTitle="Nhập xuất hàng hóa"
        onSubmit={onImExportProduct}
      >
        <select
          className="form-control"
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option>Chọn loại</option>
          <option value="import">Nhập hàng</option>
          <option value="export">Xuất hàng</option>
        </select>
        <Input
          label="Số lượng nhập/xuất"
          type="text"
          onChange={(e) => setCount(e.target.value)}
          required
        />
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <h3>Products</h3>
              <Button
                variant="contained"
                color="primary"
                onClick={handleShow}
                startIcon={<AddOutlined />}
              >
                Thêm mới sản phẩm
              </Button>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailModal()}
      {renderUpdateProductModal()}
      {renderDeleteModal()}
      {renderUpdateSaleModal()}
      {renderImExportModal()}
    </Layout>
  );
};

export default Products;
