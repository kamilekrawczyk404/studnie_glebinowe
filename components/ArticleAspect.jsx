import React from "react";
import { motion } from "framer-motion";
import { Icon } from "./Icon";

const ArticleAspect = ({ title = "" }) => {
  return (
    <motion.div
      whileInView={{ x: 0, opacity: 1 }}
      initial={{ opacity: 0, x: -50 }}
      className={"opacity-0 -translate-x-12"}
      viewport={{
        once: true,
      }}
      transition={{
        delay: 0.5,
      }}
    >
      <p
        className={
          "flex gap-2 justify-start transition hover:-translate-x-[-.5rem]"
        }
      >
        <Icon.AnglesRight
          className={"text-light-orange text-lg font-semibold"}
        />
        {title}
      </p>
    </motion.div>
  );
};

export default ArticleAspect;
