import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import PublicGroupList from "../pages/PublicGroupList";
import PrivateGroupList from "../pages/PrivateGroupList";
import CreateGroup from "../pages/CreateGroup";
import CheckPrivateGroup from "../pages/CheckPrivateGroup";
import ViewPublicGroupDetail from "../pages/ViewPublicGroupDetail";
import ViewPrivateGroupDetail from "../pages/ViewPrivateGroupDetail";
import CreatePost from "../pages/CreatePost";
import CheckPrivatePost from "../pages/CheckPrivatePost";
import ViewPostDetail from "../pages/ViewPostDetail";
import Not from "../pages/Not";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";

function AppRouter(){
    return(
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<PublicGroupList />}/>
                <Route path="/private-group-list" element={<PrivateGroupList />}/>
                <Route path="/create-group" element={<CreateGroup />}/>
                <Route path="/check-private-group" element={<CheckPrivateGroup />}/>
                <Route path="/view-public-group-detail" element={<ViewPublicGroupDetail />}/>
                <Route path="/view-private-group-detail" element={<ViewPrivateGroupDetail />}/>
                <Route path="/create-post" element={<CreatePost />}/>
                <Route path="/check-private-post" element={<CheckPrivatePost />}/>
                <Route path="/view-post-detail/:postId" element={<ViewPostDetail />}/>
                <Route path="*" element={<Not />}/> {/*404페이지*/}
                
                
            </Routes>
            
        </Router>
    );
}

export default AppRouter;