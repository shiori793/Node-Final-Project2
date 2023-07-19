import Post from "../model/Post.js";
import User from '../model/User.js';
import fs from 'fs'

const getAllController = async (req, res, next) => {
  try {

      const posts = await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20);
      res.status(200).json(posts);

  } catch (err) {
      res.status(400).json(err);
  }
};

const getController = async (req, res, next) => {
  try {

      const { id } = req.params;
      const post = await Post.findById(id)
        .populate('author', ['username'])
      res.status(200).json(post);

  } catch (err) {
      res.status(400).json(err);
  }
};

const createController = async (req, res, next) => {
  try {

    const { title, summary, content } = req.body;
    const { id } = req.user;

    const user = await User.findById(id);
    
    if (user){

      const post = new Post({
        title, 
        summary,
        content,
        author: id
      });
      if(req.file){
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length -1];
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath);
        post.file = newPath
      }
      await post.save();
      
      user.posts.push(post._id);
      await user.save();

      res.status(200).json('Post created');

    } else {
      res.status(400).json('User not found');
    }

  } catch (err) {
      res.status(400).json(err);
  }
};

const deleteController = async (req, res, next) => {
  try {

    const { id } = req.params;
    const { author } = req.body;
    // const user = req.user;

    // const post = await Post.findById(id);

    // if(user.id === post.author.toString() || user.isAdmin){
      await Post.findByIdAndRemove(id);
      await User.findByIdAndUpdate(author, {$pull: {posts: id}});
    // } else {
    //   res.status(401).json("You should login as your user account or admin");
    // }    

    res.status(200).json('Post deleted');

  } catch (err) {
      res.status(400).json(err);
  }
};

const updateController = async (req, res) => {
  try {

    const { id, title, summary, content } = req.body;

    const post = await Post.findById(id);
    
    if (post){
      post.title = title;
      post.summary = summary;
      post.content = content;
      if(req.file){
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length -1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        post.file = newPath;
      }
      await post.save();

      res.status(200).json('Post created');

    } else {
      res.status(400).json('User or post not found');
    }

  } catch (err) {
      res.status(400).json(err);
  }
}


export { getAllController, getController, createController, deleteController, updateController };
