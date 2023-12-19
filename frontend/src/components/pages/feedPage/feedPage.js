import React from "react";
import { Link } from "react-router-dom";
import getUserInfo from "../../../utilities/decodeJwt";
import PostList from "./postList";

function FeedPage() {
    const user = getUserInfo();

    if (!user) {
        return (
            <div>
                <h3>
                    You are not authorized to view this page. Please Login in{" "}
                    <Link to="/login">here</Link>
                </h3>
            </div>
        );
    }

    return (
        <div style={{background: '#5A5A5A'}}>
            <h2 style={{textAlign: 'center'}}>Welcome to your feed, {user.username}</h2>
            <PostList type="feed" username={user.username} />
        </div>
    );
}

export default FeedPage;
