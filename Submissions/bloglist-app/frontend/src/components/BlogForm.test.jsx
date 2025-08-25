import { render, screen } from "@testing-library/react";
import { test, expect, describe, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";
import AddNewBlogForm from "./BlogForm";
const blog = {
  title: "Test blog title",
  author: "John Doe",
  url: "www.randomSite.com",
};
const blogs = [blog, blog, blog];

const blogService = {};

test("<AddNewBlogForm /> calls provided event handler with right details", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<AddNewBlogForm createBlog={createBlog} />);
  let title = await screen.findByPlaceholderText("Title...");
  let author = await screen.findByPlaceholderText("Author...");
  let url = await screen.findByPlaceholderText("URL...");
  const createButton = await screen.findByText("create");

  await user.type(title, "Title");
  await user.type(author, "John Doe");
  await user.type(url, "www.exampleurl.com");
  await user.click(createButton);

  expect(createBlog).toHaveBeenCalledWith(
    "Title",
    "John Doe",
    "www.exampleurl.com",
  );
});
