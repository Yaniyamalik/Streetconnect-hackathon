import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import uploadonCloudinary from "../cloudinary.js";
import jwt from "jsonwebtoken";
import { WarehouseOwner } from "../models/Warehouseowner.js";

// Function to generate access and refresh tokens
const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await WarehouseOwner.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found while generating tokens");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Token generation error:", error);
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const {  fullname, email, password,  } = req.body;

    if ( !fullname || !email ||  !password ) {
        throw new ApiError(400, "All fields are required");
    }

   const existedUser = await WarehouseOwner.findOne({
  $or: [
    { email: email.trim() },
    { fullname: fullname.trim() } // only if you treat fullname as unique
  ]
});
    if (existedUser) {
        throw new ApiError(400, "User with email or fullname already exists");      
    }
    const user = await WarehouseOwner.create({
        fullname,
       
        email,
        password,
       
    });

    const createdUser = await WarehouseOwner.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await WarehouseOwner.findOne({ email: email.trim() });

    if (!user) {
        throw new ApiError(401, "User does not exist");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);
    const loggedInUser = await WarehouseOwner.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };

    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "Login successful"));
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
    await WarehouseOwner.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    };

    res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});

// Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized: No refresh token found");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await Warehouseowner.findById(decodedToken?._id);

        if (!user || incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Invalid refresh token");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        };

        res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken }, "Token refreshed"));
    } catch (error) {
        throw new ApiError(401, "Invalid or expired refresh token");
    }
});

// Get User Profile
const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized");
    }

    const user = await WarehouseOwner.findById(userId).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getUserProfile
};

