import { Router } from "restify-router";
import { profileController } from "../controllers/profile.controller";

const ProfileRouter = new Router();

//http://localhost:5000/api/profiles/getAllProfiles
ProfileRouter.get("/getAllProfiles", async (req, res) => {
  try {
    const data = await profileController.getAllProfileFromMongoDB();
    const elementos = data.length;

    return res.json({ elements: elementos, profiles: data });
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

//http://localhost:5000/api/profiles/getProfileById?idRef=xxxx
ProfileRouter.get("/getProfileById", async (req, res) => {
  try {
    const { idRef } = req.query;
    const data = await profileController.getProfileByIdFromMongo(idRef);
    return res.json(data);
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

//http://localhost:5000/api/profiles/addProfile
ProfileRouter.post("/addProfile", async (req, res) => {
  try {
    const response = await profileController.addProfileToMongoDB(req.body);
    return res.json(response);
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

//http://localhost:5000/api/profiles/addMultipleProfiles
ProfileRouter.post("/addMultipleProfiles", async (req, res) => {
  try {
    const profiles = req.body;
    const response = await profileController.addMultipleProfilesToMongoDB(
      profiles
    );
    return res.json(response);
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

//TODO: modify Updagte endpoint -> Now is not working
//http://localhost:5000/api/profiles/updateMultiplesIds
ProfileRouter.post("/updateMultiplesIds", async (req, res) => {
  try {
    const { profileIds } = req.body;
    const data = await profileController.updateProfilesByBulkOperator(
      profileIds
    );
    return res.json(data);
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

export default ProfileRouter;
