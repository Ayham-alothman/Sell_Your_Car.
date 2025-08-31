import { Router } from "express";
import { ValditionDataSignupViewer } from "../middleware/valdition_data/valdition.data.signup.viewer";
import { HandelImagToStore } from "../middleware/handel_image/handel.image.middleware";
import { AuthoriztionAdmin } from "../middleware/authorization/authorization.admin.middleware";
import { SignupViewerControllar } from "../controllar/signup/signup.controllar.viewer";
const router=Router();

router.post(`/viewer`,AuthoriztionAdmin,ValditionDataSignupViewer,HandelImagToStore,SignupViewerControllar);

export default router;