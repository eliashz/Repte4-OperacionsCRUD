module.exports = mongoose => {
    const User = mongoose.model(
        'user',
        mongoose.Schema(
            {
                username: String,
                email: String,
            },
            { timestamps: false }
        )
    );
    return User;
}