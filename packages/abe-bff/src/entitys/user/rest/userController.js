import userService from "../userService";

const getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default { getUser };
