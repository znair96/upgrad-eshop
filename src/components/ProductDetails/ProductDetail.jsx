import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../common/Auth/AuthContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Chip,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import NavigationBar from "../../common/NavBar/NavBar";
import MuiButtonPlaceOrder from "../../common/MuiComponents/Buttons/MuiButtonPlaceOrder";
import { ErrorToast } from "../../common/Toasts/Toasts";

import "./ProductDetail.css";

const ProductDetail=()=> {
  const { authToken, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    if (authToken) {
      axios
        .get("http://localhost:8080/api/products/categories", {
          headers: {
            "x-auth-token": `${authToken}`,
          },
        })
        .then((response)=> {
          setCategoryList(response.data);
        })
        .catch(()=> {
          ErrorToast(
            "Error: There was an issue in retrieving categories list."
          );
        });
      axios
        .get(`http://localhost:8080/api/products/${id}`, {
          headers: {
            "x-auth-token": `${authToken}`,
          },
        })
        .then((response) => {
          setProduct(response.data);
        })
        .catch(() =>
          ErrorToast(
            "Error: There was an issue in fetching the product details."
          )
        );
    } else {
      navigate("/login");
    }
  }, [authToken, id, navigate]);

  return authToken ? (
    <div>
      <NavigationBar isLogged={!!(authToken)} isAdmin={isAdmin} />
      {product ? (
        <Fragment>
          <div className="categorySection">
            <ToggleButtonGroup
              color="primary"
              value={product.category}
              exclusive
              disabled
              aria-label="Category"
            >
              <ToggleButton key="all" value="all">
                ALL
              </ToggleButton>
              {categoryList.map((category) => (
                <ToggleButton key={category} value={category}>
                  {category.toUpperCase()}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
          <div className="detailContainer">
            <div className="child-divs">
              <img
                src={product.imageUrl}
                alt={`${product.name}`}
                width={250}
                height={250}
              />
            </div>
            <div className="child-divs">
              <div className="nameContainer">
                <Typography gutterBottom variant="h5" component="p">
                  {product.name}
                </Typography>
                <Chip
                  label={`Available Quantity: ${product.availableItems}`}
                  color="primary"
                />
              </div>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                sx={{ mb: 2 }}
              >
                Category: {product.category}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="p"
                sx={{ fontStyle: "italic" }}
              >
                {product.description}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ color: "red", my: 2 }}
              >
                ₹{product.price}
              </Typography>
              <TextField
                label="Enter Quantity"
                onChange={(e) => setQuantity(e.target.value)}
                required
                variant="outlined"
                type="number"
                sx={{ my: 2, width: "75%" }}
                value={quantity}
              />

              <MuiButtonPlaceOrder
                onClick={() =>
                  navigate("/order", {
                    state: { ...product, quantity: quantity },
                  })
                }
                disabled={!(quantity >= 1)}
              />
            </div>
          </div>
        </Fragment>
      ) : null}
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProductDetail;
