import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const newPassword = await bcrypt.hash(password, saltRounds);
        return newPassword;
    } catch (error) {
        console.log(error);
    }
};


export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}