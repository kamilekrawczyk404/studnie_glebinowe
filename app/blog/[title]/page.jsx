"use client";

import { blogPosts } from "../../../utils/blogPosts";
import { useEffect, useState } from "react";
import { Container } from "../../../components/Container";
import Image from "next/image";
import { motion } from "framer-motion";
import PostBasicInfo from "../../../components/PostBasicInfo";
import PostTitle from "../../../components/PostTitle";
import HorizontalLine from "../../../components/HorizontalLine";
import StaggerList from "../../../components/StaggerList";
import { PostPreview } from "../../../components/PostPreview";
import MotionContainer from "../../../components/MotionContainer";
import CommentForm from "../../../components/CommentForm";
import Loading from "../../../components/Loading";
import Warning from "../../../components/Warning";
import Comment from "../../../components/Comment";
import { getPosts } from "../../api/actions";
import Seo from "../../../components/Seo";

export default function Post({ params }) {
  const { title } = params;

  const [currentPost, setCurrentPost] = useState({});
  const [remainingPosts, setRemainingPosts] = useState([]);
  const [postId, setPostId] = useState(0);
  const [comments, setComments] = useState([]);

  const { data, isPending, isError } = getPosts();

  useEffect(() => {
    setCurrentPost(...blogPosts.filter((post) => post.title === title));

    if (!isPending && !isError) {
      const index = data.findIndex((post) => post.title === title);

      setPostId(data[index].id);
      setCurrentPost((prev) => ({ ...prev, createdAt: data[index].createdAt }));
      setComments(data[index].comments);

      setRemainingPosts(
        blogPosts
          .filter((post) => post.title !== title)
          .map((post, index) => ({
            ...post,
            createdAt: data[index].createdAt,
          })),
      );
    }
  }, [isPending]);

  return (
    <>
      <Seo
        title={`And-Wiert - ${isPending ? "" : currentPost.title}`}
        image={`https://and-wiert.pl${isPending ? currentPost.imageSrc : ""}`}
        url={`https://and-wiert.pl/blog/${title}`}
      />
      {isPending || !currentPost.hasOwnProperty("title") ? (
        <Loading title={"Trwa pobieranie posta"} />
      ) : isError ? (
        <Warning title={"Nastąpił problem podczas pobierania danych"} />
      ) : (
        <>
          <div className={"relative h-[30rem] group overflow-hidden"}>
            <Image
              className={
                "absolute group-hover:scale-[1.05] transition duration-800 brightness-50"
              }
              layout={"fill"}
              objectFit={"cover"}
              src={currentPost.imageSrc}
              alt={currentPost.titleAsString}
            />
            <div
              className={
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:py-8 py-4 w-full before:bg-white before:top-1/2 before:left-0 before:absolute before:w-full before:h-full before:-translate-y-1/2 before:opacity-75 before:shadow-md"
              }
            >
              <MotionContainer
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className={
                  "gap-4 flex flex-col items-center relative md:w-3/4 mx-auto"
                }
              >
                <PostBasicInfo
                  props={currentPost}
                  className={"self-start gap-4"}
                />
                <h1
                  className={
                    "z-10 md:text-5xl text-3xl font-semibold text-dark-blue self-start"
                  }
                >
                  {currentPost.titleAsString}
                </h1>
              </MotionContainer>
            </div>
          </div>

          <Container
            className={
              "bg-white py-8 text-dark-blue flex flex-col md:gap-8 gap-4"
            }
          >
            {currentPost.body.map((item, index) => (
              <div key={index}>
                <motion.div
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{ delay: 0.25 }}
                  className={"md:w-2/3 mx-auto space-y-6"}
                >
                  <PostTitle title={item.title} />

                  <div
                    className={
                      "flex items-center flex-col justify-center gap-8"
                    }
                  >
                    {Array.isArray(item.content)
                      ? item.content.map((paragraph, index) => (
                          <p
                            key={index}
                            className={!index ? "initial-letter" : ""}
                          >
                            {paragraph}
                          </p>
                        ))
                      : item.content}

                    {item.hasOwnProperty("imageSrc") && (
                      <div
                        className={
                          "relative w-full flex flex-col items-center gap-2"
                        }
                      >
                        <div className={"relative w-full h-[30vh]"}>
                          <Image
                            src={item.imageSrc}
                            className={"object-contain"}
                            alt={item.imageAlt}
                            title={item.imageAlt}
                            fill
                          />
                        </div>
                        <p className={"italic md:w-2/3"}>{item.imageAlt}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
                <HorizontalLine className={"mt-8 md:w-2/3 w-full"} accent />
              </div>
            ))}

            <div className={"md:w-2/3 mx-auto flex flex-col md:gap-8 gap-4"}>
              <PostTitle title={"Tagi"} />
              <StaggerList
                className={"flex flex-wrap gap-4"}
                inView={true}
                items={currentPost.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={"bg-dark-blue p-2 -mx-1 rounded text-white"}
                  >
                    {tag}
                  </span>
                ))}
              />

              <HorizontalLine accent className={"w-full md:mt-8 mt-4"} />
              <PostTitle
                title={`Komentarze ${
                  comments.length ? `(${comments.length})` : ""
                }`}
              />
              <div
                className={"w-full flex items-center md:gap-4 gap-2 flex-col"}
              >
                {!comments.length ? (
                  <p className={"md:mb-8 mb-4"}>
                    Bądź pierwszą osobą, która skomentuje ten post!
                  </p>
                ) : (
                  comments.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                  ))
                )}
              </div>
              <CommentForm postId={postId} />
            </div>

            <PostTitle title={"Zobacz również nasze inne posty"} />
            <div className={"grid md:grid-cols-2 md:gap-4 gap-2"}>
              {remainingPosts.map((post, index) => (
                <PostPreview postProperties={post} key={index} inColumn />
              ))}
            </div>
          </Container>
        </>
      )}
    </>
  );
}
