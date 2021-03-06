import axios from "axios";
import withSession from "../../../app/utils/session";

export default withSession(async (req, res) => {
    const url = `${process.env.API_URL}/auth/login`;

    try {
        const data = await axios.post(url, req.body);

        if (data.data.code != 200) {
            const result = {isLoggedIn: false, data: data.data};
            res.json(result);
            return;
        }

        axios.defaults.headers.common["Authorization"] = data.data.token;

        const user = {isLoggedIn: true, data: data.data};
        req.session.set("user", user);
        await req.session.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
