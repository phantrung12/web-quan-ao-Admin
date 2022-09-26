import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Layout from "../components/Layout";
import NewModal from "../components/Modal";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../redux/actions/category.actions";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import "./Category.css";

const Category = () => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!category.loading) {
      setShow(false);
    }
  }, [category.loading]);

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const handleClose = () => {
    if (categoryName === "") {
      alert("Category name is required");
      setShow(false);
      return;
    }

    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const createCategoryList = (categories, option = []) => {
    for (let category of categories) {
      option.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, option);
      }
    }
    return option;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCate = () => {
    setUpdateCategoryModal(true);
    updateCheckedAndExpandedCategories();
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkArray = [];
    const expandArray = [];

    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const cate = categories.find(
          (category, _i) => categoryId === category.value
        );
        cate && checkArray.push(cate);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const cate = categories.find(
          (category, _i) => categoryId === category.value
        );
        cate && expandArray.push(cate);
      });

    setCheckedArray(checkArray);
    setExpandedArray(expandArray);

    // console.log({ checked, expanded, categories, checkArray, expandArray });
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updateCheckedArr = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updateCheckedArr);
    } else if (type === "expanded") {
      const updateExpandedArr = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updateExpandedArr);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    dispatch(updateCategory(form));

    setUpdateCategoryModal(false);
  };

  const deleteCate = () => {
    setDeleteCategoryModal(true);
    updateCheckedAndExpandedCategories();
  };

  const deleteCategories = () => {
    const checkedIdArr = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdArr = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const IdArr = expandedIdArr.concat(checkedIdArr);

    if (checkedIdArr.length > 0) {
      dispatch(deleteCategory(checkedIdArr)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
          setDeleteCategoryModal(false);
        }
      });
    }

    setDeleteCategoryModal(false);
  };

  const renderUpdateCategoryModal = () => {
    return (
      <NewModal
        show={updateCategoryModal}
        modalTitle="Update Category"
        handleClose={() => setUpdateCategoryModal(false)}
        size="lg"
        onSubmit={updateCategoriesForm}
      >
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  type="text"
                  placeholder={`Category Name`}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option>Select Category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option value="">Select type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          ))}

        <h6>Checked Category</h6>

        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  type="text"
                  placeholder={`Category Name`}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option>Select Category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option value="">Select type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          ))}
      </NewModal>
    );
  };

  const renderAddCategoryModal = () => {
    return (
      <NewModal
        show={show}
        modalTitle="Add new Category"
        handleClose={() => setShow(false)}
        onSubmit={handleClose}
      >
        <Row>
          <Col>
            <Input
              value={categoryName}
              type="text"
              placeholder={`Category Name`}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Col>
          <Col>
            <select
              className="form-control"
              value={parentCategoryId}
              onChange={(e) => setParentCategoryId(e.target.value)}
            >
              <option>Select Category</option>
              {createCategoryList(category.categories).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </Col>
        </Row>

        <Row>
          <Col>
            <input
              className="form-control"
              type="file"
              name="categoryImage"
              onChange={handleCategoryImage}
            ></input>
          </Col>
        </Row>
      </NewModal>
    );
  };

  const renderDeleteCategoryModal = () => {
    return (
      <NewModal
        modalTitle="Xác nhận"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        size="md"
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("NO");
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        Bạn có chắc chắn muốn xóa??????
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
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
              <h3>Category</h3>
              <div className="actionBtnContainer">
                <Button onClick={handleShow}> Add Category</Button>
                <Button onClick={updateCate}>Edit</Button>
                <Button variant="danger" onClick={deleteCate}>
                  Delete
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </Container>
      {renderAddCategoryModal()}
      {renderUpdateCategoryModal()}
      {renderDeleteCategoryModal()}
    </Layout>
  );
};

export default Category;
