module.exports = mongoose => {
    const Job = mongoose.model(
        'job',
        mongoose.Schema(
            {
                department: String,
                startDate: {type: Date, default: Date.now}
            },
            {
                versionKey: false
            }
        )
    );
    return User;
};