import mongoose from 'mongoose';

const designSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        default: 'living room'
    },
    imageUrl: {
        type: String,
        required: true
    },
    cloudinaryPublicId: {
        type: String,
        required: true
    },
    aiService: {
        type: String,
        enum: ['pollinations', 'huggingface', 'stability'],
        default: 'pollinations'
    }
}, {
    timestamps: true
});

const Design = mongoose.model('Design', designSchema);

export default Design;
