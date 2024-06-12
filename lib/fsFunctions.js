"use server";
import fs from "fs/promises";

export const readFile = async (filePath) => {
  return await fs.readFile(filePath, {
    encoding: "utf-8",
  });
};

export const writeFile = async (filePath, content) => {
  return await fs.writeFile(filePath, content, { encoding: "utf-8" });
};
