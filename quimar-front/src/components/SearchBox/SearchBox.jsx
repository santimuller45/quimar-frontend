import React from "react";
import style from "./SearchBox.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CUSTOM HOOK ---->
import { useProducts } from "../../customHooks/useProducts.js";
import { useUser } from "../../customHooks/useUser.js";
import { useOrders } from "../../customHooks/useOrders.js";
// <----------------

// REACT BOOSTRAP
import { Form, Col, Row, Button } from "react-bootstrap";
//------------>

//FONT-AWESOME ------->
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// <-------------------

// ---- COMPONENTS ----
import { LoadingComponent } from "../indexComponents.js";
// --------------------

const SearchBox = ({ urlNavigate, isProduct, isUser, isOrder, userOrder }) => {
  // HOOKS
  const { getProductByName, getAllProducts } = useProducts();
  const { getByOrderID, getOrderByUser, getAllOrders } = useOrders();
  const { getAllUsers, getUserByNameOrNumber } = useUser();

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const searchBoxHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      if (isProduct) {
        await getProductByName(input);
      } else if (isUser) {
        await getUserByNameOrNumber(input);
      } else if (isOrder) {
        await getByOrderID(input);
      } else if (userOrder) {
        await getOrderByUser(input);
      }

      setInput("");
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(urlNavigate);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetHandler = async () => {
    setInput("");
    setLoading(true);

    try {
      if (isProduct) {
        await getAllProducts();
      } else if (isOrder) {
        await getAllOrders();
      } else if (isUser) {
        await getAllUsers();
      }
    } catch (error) {
      console.error("Error fetching all data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading) return <LoadingComponent />;

  return (
    <Form onSubmit={searchBoxHandler} className={style.searchForm}>
      <Row>
        <Col>
          <div className={style.searchContainer}>
            <Form.Control
              name="input"
              type="text"
              placeholder="Buscar..."
              className={style.searchInput}
              value={input}
              onChange={inputHandler}
            />
            <Button type="submit" className={style.searchButton}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
            <Button
              onClick={() => resetHandler()}
              className={style.resetButton}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
