module.exports = mongoose => {
    const Job = mongoose.model(
        'job',
        mongoose.Schema(
            {
                name: String,
                department: String,
            },
            {
                versionKey: false
            }
        )
    );
    return User;
};