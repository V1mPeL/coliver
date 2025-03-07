'use server';

import User from '../models/user.model';
import { connectToDataBase } from '../mongoose';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

interface CreatingUserParams {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  bio: string | null;
}

export async function createUser({
  fullName,
  email,
  password,
  phoneNumber,
  bio,
}: CreatingUserParams) {
  try {
    connectToDataBase();

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      bio,
    });

    const token = jwt.sign(
      { userId: createdUser._id, email: createdUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Зберігаємо токен у HttpOnly cookies
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
      sameSite: 'strict',
    });

    return {
      success: true,
      user: {
        id: createdUser._id.toString(),
        fullName: createdUser.fullName,
        email: createdUser.email,
        phoneNumber: createdUser.phoneNumber,
        bio: createdUser.bio,

        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt,
      },
    };
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

export async function getUser() {
  try {
    await connectToDataBase();

    // Отримуємо токен із cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Валідуємо токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    // Знаходимо користувача за _id
    const user = await User.findById(decoded.userId).select('-password'); // Виключаємо пароль
    if (!user) {
      throw new Error('User not found');
    }

    return JSON.parse(JSON.stringify(user)); // Перетворюємо MongoDB документ у JSON
  } catch (error: any) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
}
