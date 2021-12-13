import mongoose from "mongoose";
import { ProfileModel } from "../backingservices/mongo/models/profile.model";

const { Types } = mongoose;

class PROFILE {
  async getAllProfileFromMongoDB() {
    try {
      const data = await ProfileModel.find({}).lean();
      //console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getProfileByIdFromMongo(idRef) {
    try {
      const matchProfileByIdByFinOne = await ProfileModel.findOne({
        _id: Types.ObjectId(idRef),
      }).lean();

      return {
        ...(matchProfileByIdByFinOne
          ? { profile: matchProfileByIdByFinOne }
          : {}),
      };
    } catch (error) {
      throw error;
    }
  }

  async addProfileToMongoDB(profile) {
    try {
      const data = await ProfileModel.insertMany(profile);
      return { success: true, data };
    } catch (error) {
      throw error;
    }
  }

  async addMultipleProfilesToMongoDB(profiles) {
    try {
      const newElements = [];
      for (const [index, profile] of Object.entries(profiles)) {
        // console.time(`${Number(index) + 1} entry`)
        // console.log(`Procesando :[${Number(index) + 1}] de un total de : [${profiles.length}]`)
        // console.log('🚀 ~ file: profile.controller.ts ~ line 32 ~ PROFILE ~ addMultipleProfilesToMongoDB ~ profile', profile)
        const newProfile = new ProfileModel(profile);
        const responseSave = await newProfile.save();
        // console.log('🚀 ~ file: profile.controller.ts ~ line 36 ~ PROFILE ~ addMultipleProfilesToMongoDB ~ responseSave', responseSave)
        // console.timeEnd(`${Number(index) + 1} entry`)
        newElements.push(responseSave._id);
      }

      return { success: true, newElements };
    } catch (error) {
      throw error;
    }
  }

  // TODO: validate endPoint -> now is not working well
  async updateProfilesByBulkOperator(profilesIds) {
    try {
      const profileBulkOperator =
        ProfileModel.collection.initializeUnorderedBulkOp();

      for (const profileId of profilesIds) {
        profileBulkOperator
          .find({
            _id: Types.ObjectId(profileId),
          })
          .updateOne({
            $set: { firstName: "Bootcamp" },
          });
      }
      if (profileBulkOperator) {
        const dataOperator = await profileBulkOperator.execute();
        console.log(dataOperator);
      }
    } catch (error) {
      throw error;
    }
  }
}

const profileController = new PROFILE();

export { profileController };
