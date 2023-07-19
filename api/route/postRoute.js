import express from "express";
import { getAllController, getController, createController, deleteController, updateController } from "../controller/postController.js";
import { authentication, verifyUser } from '../middleware/authentication.js'
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", 
    authentication, 
    getAllController
);

router.get("/:id", 
    authentication, 
    getController
);

router.post("/create", 
    authentication, 
    upload.single('file'),
    createController
);

router.delete("/delete/:id",  
    verifyUser,
    deleteController
);

router.put("/update/", 
    verifyUser, 
    upload.single('file'),
    updateController
);

export default router;