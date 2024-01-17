import { React } from "react";
import User from "../models/dbschema";
const queryData = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            const { firstName, lastName } = user;
            console.log("User Info from queryData:", { firstName, lastName });
            return Promise.resolve({ firstName, lastName });
        }
        return Promise.resolve({});
    } catch (err) {
        console.error("Error in queryData:", err);
        return Promise.resolve({});
    }
};

export default queryData;