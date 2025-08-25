fimport { render, screen } from "@testing-library/react";
import { test, expect, describe, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";
const blog = {
  id: "asf4tzhd5e4u43532rfdfs",
  title: "Test blog title",
  author: "John Doe",
  url: "www.randomSite.com",
  likes: 356,
  user: "689de41f6e074a12094344e9",
};
const blogs = [blog, blog, blog];
const setBlogs = vi.fn();

const blogService = {};

test("<Blog /> by default only displays title and author", async () => {
  const { container } = render(
    <Blog blog={blog} setBlogs={setBlogs} blogs={blogs} />,
  );
  const shownByDef = container.querySelector(".alwaysVisible");
  const hiddenByDef = container.querySelector(".togglableVisibility");
  expect(shownByDef).not.toHaveStyle("display: none");
  expect(hiddenByDef).toHaveStyle("display: none");
});

test("<Blog /> shows url and likes after toggling", async () => {
  let { container } = render(
    <Blog blog={blog} setBlogs={setBlogs} blogs={blogs} />,
  );
  const hiddenByDef = container.querySelector(".togglableVisibility");
  const button = container.querySelector("#detailsBtn");

  const user = userEvent.setup();
  await user.click(button);

  expect(hiddenByDef).not.toHaveStyle("display: none");
});

test("<Blog /> like clicked twice - event handler called twice", async () => {
  const changeLikes = vi.fn();
  blogService.changeLikes = changeLikes;

  let { container } = render(
    <Blog
      blog={blog}
      setBlogs={setBlogs}
      blogs={blogs}
      blogService={blogService}
    />,
  );
  const user = userEvent.setup();
  let likeButton = await screen.findByText("like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(changeLikes.mock.calls).toHaveLength(2);
});
