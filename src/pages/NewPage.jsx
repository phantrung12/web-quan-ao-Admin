import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Layout from "../components/Layout";
import NewModal from "../components/Modal";
import linearCategories from "../helpers/linearCategory";

const NewPage = () => {
  const [createPage, setCreatePage] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  useEffect(() => {
    console.log(page);
    if (!page.loading) {
      setCreatePage(false);
      setTitle("");
      setCategoryId("");
      setDesc("");
      setProducts([]);
      setBanners([]);
    }
  }, [page]);

  const handleBannerImage = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    setProducts([...banners, e.target.files[0]]);
  };

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value === e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };

  const submitPageForm = (e) => {
    if (title === "") {
      alert("Title is required");
      setCreatePage(false);
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });

    dispatch(createPage(form));
  };

  const renderCreatePageModal = () => {
    return (
      <NewModal
        show={createPage}
        handleClose={() => setCreatePage(false)}
        modalTitle="Create New Page"
        onSubmit={submitPageForm}
      >
        <Row>
          <Col>
            <select
              className="form-control"
              value={categoryId}
              onChange={onCategoryChange}
            >
              <option value="">Select Category</option>
              {categories.map((cate) => (
                <option key={cate._id} value={cate._id}>
                  {cate.name}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Page Title"}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              className="form-control"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={"Page Description"}
            />
          </Col>
        </Row>
        {banners.length > 0
          ? banners.map((banner, index) => (
              <Row key={index}>
                <Col>{banner.name}</Col>
              </Row>
            ))
          : null}
        <Row>
          <Col>
            <input
              type="file"
              name="banners"
              onChange={handleBannerImage}
              className="form-control"
            />
          </Col>
        </Row>
        {products.length > 0
          ? products.map((product, index) => (
              <Row key={index}>
                <Col>{product.name}</Col>
              </Row>
            ))
          : null}
        <Row>
          <Col>
            <input
              type="file"
              name="products"
              onChange={handleProductImages}
              className="form-control"
            />
          </Col>
        </Row>
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      {page.loading ? (
        <p>Creating Page...please wait</p>
      ) : (
        <>
          {renderCreatePageModal()}
          <Button onClick={() => setCreatePage(true)}>Create Page</Button>
        </>
      )}
    </Layout>
  );
};

export default NewPage;
