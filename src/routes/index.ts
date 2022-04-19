import { Router } from "express";
import userApi from "./UserRoutes/userApi";


const router = Router()

router.use('/user',userApi.router)


export default router