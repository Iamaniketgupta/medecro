import express from "express";
import { 
    createBranch, 
    getAllBranches, 
    getBranchById, 
    updateBranch, 
    deleteBranch, 
    getBranchesByFromChapter 
} from "../controllers/branch.controller.js";

const router = express.Router();

router.post("/create", createBranch);
router.get("/getall", getAllBranches);
router.get("/get/:id", getBranchById);
router.get("/fromChapter/:fromChapter", getBranchesByFromChapter);  
router.post("/update/:id", updateBranch);
router.get("/delete/:id", deleteBranch);

export default router;
