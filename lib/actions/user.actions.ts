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

interface UpdateParams {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  bio: string | null;
  profile_image: string | null | undefined;
}

type LoginUserResponse =
  | {
      success: true;
      user: {
        id: string;
        fullName: string;
        email: string;
        phoneNumber: string;
        bio: string | null;
      };
    }
  | {
      success: false;
      error: string;
      errorField: 'email' | 'password'; // Тільки "email" або "password"
    };

export async function createUser({
  fullName,
  email,
  password,
  phoneNumber,
  bio,
}: CreatingUserParams) {
  try {
    await connectToDataBase();

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      bio,
      profile_image: '',
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

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      throw new Error('No authentication token found');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId).select('-password'); // Виключаємо пароль
    if (!user) {
      throw new Error('User not found');
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
}

export async function updateUser({
  userId,
  fullName,
  email,
  phoneNumber,
  bio,
  profile_image,
}: UpdateParams) {
  try {
    await connectToDataBase();

    await User.findOneAndUpdate(
      { _id: userId },
      {
        fullName,
        email,
        phoneNumber,
        bio,
        profile_image,
      },
      { upsert: true }
    );

    return {
      success: true,
    };
  } catch (error: any) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<LoginUserResponse> {
  try {
    await connectToDataBase();

    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: 'User with this email does not exist',
        errorField: 'email',
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Invalid password',
        errorField: 'password',
      };
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

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
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        bio: user.bio,
      },
    };
  } catch {
    return {
      success: false,
      error: 'Something went wrong. Please try again.',
      errorField: 'email',
    };
  }
}

export async function checkAuth() {
  try {
    await connectToDataBase();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return { isAuthenticated: false };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return { isAuthenticated: false };
    }

    return {
      isAuthenticated: true,
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        bio: user.bio,
      },
    };
  } catch (error: any) {
    return { isAuthenticated: false, error: error.message };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  return { success: true };
}
