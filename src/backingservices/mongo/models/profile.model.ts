import mongoose, { Schema, Types } from "mongoose";
import { ProfileMongoDB } from "../connection";

const ExperienceSchema = new Schema({
  position: { type: String },
  company: { type: String },
  description: { type: String },
  date: { type: String },
});

const EducationSchema = new Schema({
  institution: { type: String },
  career: { type: String },
  description: { type: String },
  date: { type: String },
});

const ProfileSchema = new Schema(
  {
    name: { type: String, trim: true },
    title: { type: String, trim: true },
    country: { type: String, trim: true },
    resume: { type: String, trim: true },
    email: { type: String, trim: true },
    webSite: { type: String, trim: true },
    urlLinkedin: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    experiences: [ExperienceSchema],
    educations: [EducationSchema],
  },
  {
    timestamps: true,
  }
);

const ProfileModel = ProfileMongoDB.model("Profile", ProfileSchema);

export { ProfileModel };
