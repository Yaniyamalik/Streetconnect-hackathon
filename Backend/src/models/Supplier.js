
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import crypto from "crypto"

dotenv.config({
    path: "./.env"  
});

const supplierchema = new Schema({
    fullname: {
    type: String,
    required: true,
  },
   username: {
    type: String,
    required: true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
    refreshToken: {
        type: String
    }

}, { timestamps: true });


supplierchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    try {
     
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (err) {
      next(err);
    }
  });

supplierchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};


supplierchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Use your desired expiry time
        }
    );
};


supplierchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Use your desired expiry time
        }
    );
};


export const Supplier= mongoose.model("Supplier", supplierchema);
