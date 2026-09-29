import PostModel from "../models/Post.js";

export const getAll = async (request, response) => {
  try {
    const posts = await PostModel.find()
      .populate({
        path: "author",
        select: ["fullName", "avatarUrl"],
      })
      .exec();

    response.json(posts);
  } catch (err) {
    console.log(err);
    response.status(500).json({
      message: "Failed to get posts",
    });
  }
};

export const getOne = async (request, response) => {
  try {
    const postId = request.params.id;

    const doc = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" }
    );

    if (!doc) {
      return response.status(404).json({
        message: "Post not found",
      });
    }

    response.json(doc);
  } catch (err) {
    console.log(err);
    response.status(500).json({
      message: "Failed to get a post",
    });
  }
};

export const create = async (request, response) => {
  try {
    const doc = new PostModel({
      title: request.body.title,
      text: request.body.text,
      tags: request.body.tags,
      imageUrl: request.body.imageUrl,
      author: request.userId,
    });

    const post = await doc.save();
    response.json(post);
  } catch (err) {
    console.log(err);
    response.status(500).json({
      message: "Failed to create a post",
    });
  }
};

export const update = async (request, response) => {
  try {
    const postId = request.params.id;

    const doc = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        title: request.body.title,
        text: request.body.text,
        tags: request.body.tags,
        imageUrl: request.body.imageUrl,
        author: request.body.author,
      },
      { returnDocument: "after" }
    );

    response.json(doc);
  } catch (err) {
    console.log(err);
    response.status(500).json({
      message: "Failed to update a post",
    });
  }
};

export const remove = async (request, response) => {
  try {
    const postId = request.params.id;

    const doc = await PostModel.findOneAndDelete({
      _id: postId,
    });

    if (!doc) {
      return response.status(404).json({
        message: "Post not found",
      });
    }

    response.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    response.status(500).json({
      message: "Failed to delete a post",
    });
  }
};
