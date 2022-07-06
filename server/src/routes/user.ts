import {Router} from "express";
import {getUserData} from "../controller/user";

const router = Router();

router.get("/",getUserData);

export default router;