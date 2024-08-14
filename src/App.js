import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicGroupList from "./pages/PublicGroupList";
import PrivateGroupList from "./pages/PrivateGroupList";
import CreateGroup from "./pages/CreateGroup";
import CheckPrivateGroup from "./pages/CheckPrivateGroup";
import ViewPublicGroupDetail from "./pages/ViewPublicGroupDetail";
import ViewPrivateGroupDetail from "./pages/ViewPrivateGroupDetail";
import CreatePost from "./pages/CreatePost";
import CheckPrivatePost from "./pages/CheckPrivatePost";
import ViewPostDetail from "./pages/ViewPostDetail";
import Not from "./pages/Not";

import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
    return(
        <BrowserRouter>
          
            <Routes>
                <Route path="/" element={<PublicGroupList />}/>
                <Route path="/PivateGroupList" element={<PrivateGroupList />}/>
                <Route path="/CreateGroup" element={<CreateGroup />}/>
                <Route path="/CheckPrivateGroup" element={<CheckPrivateGroup />}/>
                <Route path="/ViewPublicGroupDetail" element={<ViewPublicGroupDetail />}/>
                <Route path="/ViewPrivateGroupDetail" element={<ViewPrivateGroupDetail />}/>
                <Route path="/CreatePost" element={<CreatePost />}/>
                <Route path="/CheckPrivatePost" element={<CheckPrivatePost />}/>
                <Route path="/ViewPostDetail/:postId" element={<ViewPostDetail />}/>
                <Route path="*" element={<Not />}/>


            </Routes>
        
        </BrowserRouter>
    );
}






export default App;
