import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import "./index.css"
import Login from "./pages/Login.jsx";
import {CityList} from "./components/CityList.jsx";
import {CountriesList} from "./components/CountriesList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import {CitiesProvider} from "./contexts/CitiesContext.jsx";
import {AuthProvider} from "./contexts/FakeAuthContext.jsx";
import {ProtectedRoute} from "./pages/ProtectedRoute.jsx";


function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Homepage/>}></Route>
                        <Route path="product" element={<Product/>}></Route>
                        <Route path="pricing" element={<Pricing/>}></Route>
                        <Route path="login" element={<Login/>}></Route>
                        <Route path="app" element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
                            <Route index element={<Navigate to={"cities"}/>}></Route>
                            <Route path="cities" element={<CityList/>}></Route>
                            <Route path="cities/:id" element={<City/>}></Route>
                            <Route path="countries" element={<CountriesList/>}></Route>
                            <Route path="form" element={<Form/>}></Route>
                        </Route>
                        <Route path="*" element={<PageNotFound/>}></Route>
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}

export default App