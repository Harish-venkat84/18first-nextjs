"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";
import Loader from "@/components/loader/Loader";

function Dashboard() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [img, setImg] = useState();
  const [content, setContent] = useState();

  const { setRoutePath } = useContext(ThemeContext);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, isLoading, error } = useSWR(`/api/posts?username=${session?.user?.name}`, fetcher);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dashboard/login");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session?.user?.name,
        }),
      });
      mutate();
      e.target.reset();
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {}
  };

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading ? (
            <Loader />
          ) : (
            data?.map((post) => (
              <div className={styles.postBroder} key={post._id}>
                <div className={styles.post}>
                  <div className={styles.imgContainer}>
                    <Image
                      className={styles.img}
                      src={post.img}
                      alt=""
                      width={200}
                      height={100}
                      onClick={() => {
                        router.push(`/blog/${post._id}`);
                        setRoutePath("/blog");
                      }}
                    />
                  </div>
                  <h4
                    className={styles.postTitle}
                    onClick={() => {
                      router.push(`/blog/${post._id}`);
                      setRoutePath("/blog");
                    }}
                  >
                    {post.title.length > 100 ? `${post.title.substring(0, 40)}....` : post.title}
                  </h4>
                  <span className={styles.delete} onClick={() => handleDelete(post._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder="Title" className={styles.input} onChange={(e) => setTitle(e.target.value)} maxLength={100} required />
          <input type="text" placeholder="Desc" className={styles.input} onChange={(e) => setDesc(e.target.value)} maxLength={250} required />
          <input type="text" placeholder="Image URL" className={styles.input} onChange={(e) => setImg(e.target.value)} required />
          <textarea placeholder="Content" className={styles.textArea} cols="30" rows="10" onChange={(e) => setContent(e.target.value)} required />
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }
}



export default Dashboard;
