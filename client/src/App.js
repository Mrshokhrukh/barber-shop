import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHome from "./admin/adminPages/adminHome/AdminHome";
import List from "./admin/adminPages/list/List";
import New from "./admin/adminPages/new/New";
import Layout from "./layout";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
import Main from "./pages/main/Main";
import Masters from "./pages/masters/Masters";
import Services from "./pages/services/Services";
import "./admin/adminStyle/dark.scss";
import "./style/main.style.scss";
import AdminRoutes from "./admin/adminRoutes";
import AdminTable from "./admin/adminComponents/table/Table";
import SingleUser from "./admin/adminPages/single/Single";
import Verify from "./pages/auth/Verify";
import ScheduleTime from "./components/scheduled/ScheduleTime";
import NavigateServices from "./components/path-indexFile/NavigateServices";

const App = () => {
  const MyContext = React.createContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="uz/barbershop" element={<Main />}>
            <Route index element={<NavigateServices />}></Route>
            <Route path="services" element={<Services />}></Route>
            <Route path="masters" element={<Masters />}></Route>
            <Route path="master-and-date" element={<ScheduleTime />}></Route>

            <Route path="auth" element={<Auth />}>
              <Route path="login" element={<Login />}></Route>
              <Route path="register" element={<Register />}></Route>
              <Route path="verify" element={<Verify />}></Route>
            </Route>
            
          </Route>

          <Route path="admin/dashboard" element={<AdminRoutes />}>
            <Route index element={<AdminHome />} />
            <Route path="workers">
              <Route index element={<List />} />
              <Route path=":userId" element={<SingleUser />} />
              <Route path="new" element={<New title="Add New Masters" />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
