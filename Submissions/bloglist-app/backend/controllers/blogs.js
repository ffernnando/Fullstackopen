const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require('../models/comment')
const jwt = require("jsonwebtoken");
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const result = await Blog.find({}).populate("user");
  response.json(result);
});

blogRouter.get("/:id", async (request, response) => {
  const result = await Blog.findById(request.params.id).populate("user");
  response.json(result);
});

blogRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: "title or url undefined" }).end();
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  const foundBLog = await Blog.findById(savedBlog._id).populate("user", {
    username: 1,
    name: 1,
  });
  response.status(201).json(foundBLog);
});

blogRouter.post('/:id/comments', async (request, response) => {
   const { blog, content } = request.body
   console.log('blog: ', blog)
   console.log('content: ', content)
   if(!content){
    return response.status(400).json({error: `Can't submit empty comments!`})
   }
   const dbBlog = await Blog.findById(blog.id)
   //console.log('blogs.js - dbBlog: ', dbBlog)

   const comment = new Comment ({
    content: content,
    blog: dbBlog._id
   })
   const savedComment = await comment.save()
   //console.log('blogs.js - savedComment: ', savedComment)

   dbBlog.comments.push(savedComment._id)
   const savedBlog = await dbBlog.save()
   //console.log('blogs.js - savedBlog: ', savedBlog)

   const populatedBlog = await savedBlog.populate('comments')
   return response.status(201).json({ comment: savedComment, blog: populatedBlog})
}) 

blogRouter.get('/:id/comments', async (request, response) => {
  const id = request.params.id
  const comments = await Comment.find({blog: id})
  return response.status(200).json(comments)
})

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const user = request.user;

  if (
    blog.user === undefined ||
    !(blog.user.toString() === user._id.toString())
  ) {
    return response.status(401).json({ error: "unauthorized" });
  }

  const foundUser = await User.findById(user.id)
  foundUser.blogs = foundUser.blogs.filter(b => b.toString() !== blog._id.toString())
  await foundUser.save()

  await Blog.findByIdAndDelete(request.params.id);
  
  response.status(204).json(blog);
});

blogRouter.put("/:id", async (request, response) => {
  const oldBlog = await Blog.findById(request.params.id);
  oldBlog.likes = request.body.likes;
  response.status(201).json(await oldBlog.save());
});

module.exports = blogRouter;
