const express = require("express");
const { auth } = require("../../middleware/auth");
const { Post } = require("../../models/post");
const { Category } = require("../../models/category");
const { User } = require("../../models/user");
const { Comment } = require("../../models/comment");
require("@babel/polyfill");

const router = express.Router();

// const multer = require("multer");
// const multerS3 = require("multer-s3");
// const AWS = require("aws-sdk");
const path = require("path");
const dotenv = require("dotenv");
const moment = require("moment");
const { isNullOrUndefined } = require("util");

dotenv.config();

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_KEY,
//   secretAccessKey: process.env.AWS_PRIVATE_KEY,
// });

// const uploadS3 = multer({
//   storage: multerS3({
//     s3,
//     bucket: "jehyeokblog2021/upload",
//     region: "ap-northeast-2",
//     key(req, file, cb) {
//       const ext = path.extname(file.originalname);
//       const basename = path.basename(file.originalname, ext);

//       cb(null, basename + new Date().valueOf() + ext);
//     },
//   }),
//   limits: { fileSize: 100 * 1024 * 1024 },
// });

// LOADING ALL POSTS / GET
router.get("/skip/:skip", async (req, res) => {
  try {
    const postCount = await Post.countDocuments();
    const postFindResult = await Post.find()
      .skip(Number(req.params.skip))
      .limit(6)
      .sort({ date: -1 });

    const categoryFindResult = await Category.find();
    const result = { postFindResult, categoryFindResult, postCount };

    res.json(result);
  } catch (e) {
    console.log(e);
    res.json({ msg: "No Post" });
  }
});

// CREATE A POST / POST
// router.post("/image", uploadS3.array("upload", 5),async (req, res, next) => {
//   try {
//     res.json({ upload: true, url: req.files.map((v) => v.location) });
//   } catch (e) {
//     console.error(e);
//     res.json({ upload: false, url: null });
//   }
// });

// WRITE A POST / POST
router.post(
  "/write",
  auth,
  /*uploadS3.none(),*/ async (req, res, next) => {
    try {
      const { title, contents, fileUrl, creator, category } = req.body;
      const newPost = await Post.create({
        title,
        contents,
        fileUrl,
        creator: req.user.id,
        date: moment().format("MMMM DD, YYYY"),
      });

      const categoryFindResult = await Category.findOne({
        categoryName: category,
      });

      if (isNullOrUndefined(categoryFindResult)) {
        const newCategory = await Category.create({
          categoryName: category,
        });

        await Post.findByIdAndUpdate(newPost._id, {
          $push: {
            category: newCategory._id,
          },
        });
        await Category.findByIdAndUpdate(newCategory._id, {
          $push: {
            posts: newPost._id,
          },
        });
        await User.findByIdAndUpdate(req.user.id, {
          $push: {
            posts: newPost._id,
          },
        });
      } else {
        await Category.findByIdAndUpdate(categoryFindResult._id, {
          $push: { posts: newPost._id },
        });
        await Post.findByIdAndUpdate(newPost._id, {
          category: categoryFindResult._id,
        });
        await User.findByIdAndUpdate(req.user.id, {
          $push: {
            posts: newPost._id,
          },
        });
      }

      return res.redirect(`/api/post/${newPost._id}`);
    } catch (e) {
      console.log(e);
    }
  }
);

// POST DETAIL / GET
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("creator", "name")
      .populate({ path: "category", select: "categoryName" });

    post.views += 1;
    post.save();

    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// DELETE POST / DELETE
router.delete("/:id", auth, async (req, res) => {
  await Post.deleteMany({ _id: req.params.id });
  await Comment.deleteMany({ post: req.params.id });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: {
      posts: req.params.id,
      comments: { post_id: req.params.id },
    },
  });

  const CategoryUpdateResult = await Category.findOneAndUpdate(
    { posts: req.params.id },
    { $pull: { posts: req.params.id } },
    { new: true }
  );

  if (CategoryUpdateResult.posts.length === 0) {
    await Category.deleteMany({ _id: CategoryUpdateResult });
  }

  return res.json({ success: true });
});

// EDIT POST / POST

router.get("/:id/edit", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("creator", "name");
    res.json(post);
  } catch (e) {
    console.log(e);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  const {
    body: { title, contents, fileUrl, id },
  } = req;

  try {
    const modified_post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        contents,
        fileUrl,
        date: moment().format("MMMM DD, YYYY"),
      },
      { new: true }
    );

    res.redirect(`/api/post/${modified_post.id}`);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// Find Category
router.get("/category/:categoryName", async (req, res, next) => {
  try {
    const result = await Category.findOne(
      {
        categoryName: {
          $regex: req.params.categoryName,
          $options: "i",
        },
      },
      "posts"
    ).populate({ path: "posts" });

    res.send(result);
  } catch (e) {
    next(e);
  }
});

///////////////////////////////////////////////
// Comments Route

// GET ALL COMMENTS
router.get("/:id/comments", async (req, res) => {
  try {
    const comment = await Post.findById(req.params.id).populate({
      path: "comments",
    });

    const result = comment.comments;

    res.json(result);
  } catch (e) {
    console.log(e);
  }
});

// WRITE COMMENT
router.post("/:id/comments", async (req, res) => {
  const newComment = await Comment.create({
    contents: req.body.contents,
    creator: req.body.userId,
    creatorName: req.body.userName ? req.body.userName : "Visitor",
    post: req.body.id,
    date: moment().format("MMMM DD, YYYY"),
  });

  try {
    await Post.findByIdAndUpdate(req.body.id, {
      $push: {
        comments: newComment._id,
      },
    });

    await User.findByIdAndUpdate(req.body.userId, {
      $push: {
        comments: {
          post_id: req.body.id,
          comment_id: newComment._id,
        },
      },
    });

    res.json(newComment);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// DELETE COMMENT / DELETE
router.delete("/comment/:id", async (req, res) => {
  await Comment.deleteOne({ _id: req.params.id });

  return res.json({ success: true });
});

module.exports = router;
