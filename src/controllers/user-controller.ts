import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get a single user
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');

    if (!user) return res.status(404).json({ message: 'No user with that ID' });

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).json({ message: 'No user with that ID' });

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete a user and their thoughts
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) return res.status(404).json({ message: 'No user with that ID' });

    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    res.json({ message: 'User and thoughts deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

//add a friend
export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'No user with that ID' });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// remove a friend
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'No user with that ID' });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
