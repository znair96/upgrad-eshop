import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { AuthContextProvider } from "../src/common/Auth/AuthContext";
import ProductDetail from "../src/components/ProductDetails/ProductDetail";
import ProductsContainer from "../src/components/Products/Products";
import AddEditProduct from "./components/ProductAdd/ProductAdd";
import UserLogin from "./components/UserLogin/UserLogin";
import UserSignup from "./components/UserSignUp/UserSignUp";
import ProductOrder from "./components/ProductOrder/ProductOrder";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

const App=()=> {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={appTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/edit-product/:id" element={<AddEditProduct />} />
            <Route path="/add-product" element={<AddEditProduct />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route exact path="/products" element={<ProductsContainer />} />
            <Route exact path="/" element={<Navigate to="/login" />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/order" element={<ProductOrder />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
