import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicGroupList from "../pages/PublicGroupList.jsx";
import PrivateGroupList from "../pages/PrivateGroupList.jsx";
import CreateGroup from "../pages/CreateGroup.jsx";
import CheckPrivateGroup from "../pages/CheckPrivateGroup.jsx";
import ViewPublicGroupDetail from "../pages/ViewPublicGroupDetail.jsx";
import ViewPrivateGroupDetail from "../pages/ViewPrivateGroupDetail.jsx";
import CreatePost from "../pages/CreatePost.jsx";
import CheckPrivatePost from "../pages/CheckPrivatePost.jsx";
import ViewPostDetail from "../pages/ViewPostDetail.jsx";
import Not from "../pages/Not.jsx";
import Header from "../components/Common/Header.js";
import Footer from "../components/Common/Footer.js";

function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* 그룹 관련 라우트 */}
        <Route path="/" element={<PublicGroupList />} />
        <Route path="/private-group-list" element={<PrivateGroupList />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/check-private-group/:groupId" element={<CheckPrivateGroup />} />
        <Route path="/view-public-group-detail/:groupId" element={<ViewPublicGroupDetail />} />
        <Route path="/view-private-group-detail/:groupId" element={<ViewPrivateGroupDetail />} />

        {/* 포스트 관련 라우트 */}
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/check-private-post" element={<CheckPrivatePost />} />
        <Route path="/view-post-detail/:postId" element={<ViewPostDetail />} />

        {/* 404 페이지 */}
        <Route path="*" element={<Not />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRouter;
