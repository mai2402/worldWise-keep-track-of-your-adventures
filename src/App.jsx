import {lazy, Suspense} from "react"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import {CitiesProvider} from "./contexts/CitiesContext"
import {AuthProvider} from "./contexts/AuthContext"
import ProtectedRoute from "./pages/ProtectedRoute"

// import Product from "./pages/Product" import Pricing from "./pages/Pricing"
// import HomePage from "./pages/HomePage" import PageNotFound from
// "./pages/PageNotFound" import AppLayout from "./pages/AppLayout" import Login
// from "./pages/Login"

const Product = lazy(() => import ("./pages/Product"))
const Pricing = lazy(() => import ("./pages/Pricing"))
const HomePage = lazy(() => import ("./pages/HomePage"))
const PageNotFound = lazy(() => import ("./pages/PageNotFound"))
const AppLayout = lazy(() => import ("./pages/AppLayout"))
const Login = lazy(() => import ("./pages/Login"))

import CityList from "./components/city_component/CityList"
import CountryList from "./components/country_component/CountryList"
import City from "./components/city_component/City"
import Form from "./components/form_component/Form"
import SpinnerFullPage from "./components/spinner_component/SpinnerFullPage"

function App() {

    return (

        <AuthProvider>

            <CitiesProvider>
                <BrowserRouter>
                    <Suspense fallback={<SpinnerFullPage/>}>

                        <Routes>
                            <Route index element={< HomePage />}/>
                            <Route path="product" element={< Product />}/>

                            <Route path="pricing" element={< Pricing />}/>

                            <Route path="app" element={< ProtectedRoute > < AppLayout /> </ProtectedRoute>}>
                                <Route index element={< Navigate replace to = "cities" />}/>
                                <Route path="cities" element={< CityList />}/>
                                <Route path="cities/:id" element={< City />}/>
                                <Route path="countries" element={< CountryList />}/>
                                <Route path="form" element={< Form />}/>
                            </Route>
                            <Route path="login" element={< Login />}/>
                            <Route path="*" element={< PageNotFound />}/>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>

    )
}

export default App
