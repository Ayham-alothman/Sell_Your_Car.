import { Router } from "express";
import { ValditionDataSignupViewer } from "../middleware/valdition_data/valdition.data.signup.viewer";

const router=Router();

router.post(`/viewer`,ValditionDataSignupViewer);

export default router;