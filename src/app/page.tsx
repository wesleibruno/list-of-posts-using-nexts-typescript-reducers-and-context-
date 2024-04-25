"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PostList from "@/components/PostList";
import { PostProvider } from "@/contexts/PostsContext";

export default function Home() {
  return (
    <PostProvider>
      <div className="container mx-auto">
        <Header />
        <PostList />
        <Footer />
      </div>
    </PostProvider>
  );
}
