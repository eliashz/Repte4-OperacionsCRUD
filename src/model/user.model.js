module.exports = mongoose => {
    const User = mongoose.model(
        'user',
        mongoose.Schema(
            {
                username: String,
                email: String,
            },
            {
                versionKey: false
            }
        )
    );
    return User;
};