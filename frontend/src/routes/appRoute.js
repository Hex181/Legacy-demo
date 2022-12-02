import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from "react-dom";
import Home from "../pages/home";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import AOS from "aos";
import CheckInterval from "../pages/checkInterval";
import Form from "../pages/form";
import SelectTokens from "../pages/selectTokens";
import SuccessMessage from "../pages/successMsg";
import Edit from "../pages/edit";
import 'aos/dist/aos.css';

const AppRoute = () => {

    const legacy = localStorage.getItem('has_legacy');

    useEffect(() => {
      AOS.init();
    }, [])
    
  return render(
    <BrowserRouter>
     <ChakraProvider theme={theme} resetCSS>
      <Routes>
        <Route index path="/" element={legacy ? <CheckInterval /> : <Home />} />
        <Route path="/get-started" element={<Form />} />
        <Route path="/select-token" element={<SelectTokens />} />
        <Route path="/profile" element={<CheckInterval />} />
        <Route path="/success" element={<SuccessMessage />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
     </ChakraProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

export default AppRoute;
