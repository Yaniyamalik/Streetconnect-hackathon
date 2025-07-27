
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import crypto from "crypto"

dotenv.config({
    path: "./.env"  
});

const warehouseschema = new Schema({
    fullname: {
    type: String,
    required: true,
  },
   
  email: {
    type: String,
    required: true,
    unique: true,
  },
 
  password: {
    type: String,
    required: true,
  },
  
    refreshToken: {
        type: String
    }

}, { timestamps: true });

warehouseschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    try {
     
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (err) {
      next(err);
    }
  });

warehouseschema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

warehouseschema.methods.generateAccessToken = function() {
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


warehouseschema.methods.generateRefreshToken = function() {
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
function generateAvatar(email) {
    const hash = crypto.createHash("md5").update(email.trim().toLowerCase()).digest("hex");
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
  }

export const WarehouseOwner = mongoose.model("WarehouseOwner", warehouseschema);
