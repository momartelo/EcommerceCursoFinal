import { UserModel } from "../models/User.js"
import * as bcrypt from "bcrypt"
import { createJWT } from "../utils/jwt.js";



export const crtlCreaterUser = async (req, res) => {
    try {
        const user = new UserModel (req.body);
        await user.save();
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({
            error:"No se pudo crear el usuario"
        });
    }

};

export const crtlLoginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne ({email})
        if (!user) 
        return res.status(404).json({ error: "Usuario no encontrado" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        return res.status(400).json({ error: "credencial Invalida"});

        const token = await createJWT({ userId:user._id });
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: "No se puede loguear el usuario"});
    }
};