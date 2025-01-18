import './App.css'
import {BrowserRouter, Route, Routes,} from "react-router";
import Index from "./pages";
import Auth from "./pages/auth.tsx";
import RouteApi from "./config/route_api.ts";
import ApolloClientTest from "./tests/ApolloClientTest.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/*"} element={<Index/>}/>
                    <Route path={RouteApi.login} element={<Auth/>}/>
                    <Route path={"/test/apolloclient"} element={<ApolloClientTest/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
