import axios from 'axios';
import cloudinary from '../config/cloudinary.js';


export const generateImageHuggingFace = async (prompt) => {
    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
            {
                inputs: prompt,
                options: { wait_for_model: true }
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                responseType: 'arraybuffer'
            }
        );

        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        return `data:image/jpeg;base64,${base64Image}`;
    } catch (error) {
        console.error('Hugging Face API Error:', error.response?.data || error.message);
        throw error;
    }
};

// Alternative: Pollinations AI - Completely FREE, No API Key Required
export const generateImagePollinations = async (prompt) => {
    try {
        const encodedPrompt = encodeURIComponent(prompt);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&seed=${Math.floor(Math.random() * 1000000)}`;
        
        // Fetch the image and convert to base64
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer'
        });
        
        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        return `data:image/jpeg;base64,${base64Image}`;
    } catch (error) {
        console.error('Pollinations AI Error:', error.response?.data || error.message);
        throw error;
    }
};

// Stability AI Free Tier
export const generateImageStability = async (prompt) => {
    try {
        const response = await axios.post(
            'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
            {
                text_prompts: [{ text: prompt }],
                cfg_scale: 7,
                height: 512,
                width: 512,
                steps: 30,
                samples: 1,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
                }
            }
        );

        return `data:image/png;base64,${response.data.artifacts[0].base64}`;
    } catch (error) {
        console.error('Stability AI Error:', error.response?.data || error.message);
        throw error;
    }
};

// Upload base64 image to Cloudinary
export const uploadToCloudinary = async (base64Image, prompt) => {
    try {
        const response = await cloudinary.uploader.upload(base64Image, {
            folder: 'interior-designs',
            resource_type: 'image',
            public_id: `design_${Date.now()}`,
            context: `prompt=${prompt}`
        });

        return {
            url: response.secure_url,
            publicId: response.public_id
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
};

// Main function that tries multiple services
export const generateInteriorDesign = async (prompt, roomType = 'living room') => {
    const enhancedPrompt = `Modern ${roomType} interior design, ${prompt}, photorealistic, high quality, architectural photography, well-lit, contemporary furniture`;

    try {
        console.log('Trying Pollinations AI...');
        const image = await generateImagePollinations(enhancedPrompt);
        return image;
    } catch (error) {
        console.log('Pollinations failed, trying Hugging Face...');
        try {
            const image = await generateImageHuggingFace(enhancedPrompt);
            return image;
        } catch (hfError) {
            console.log('Hugging Face failed, trying Stability AI...');
            try {
                const image = await generateImageStability(enhancedPrompt);
                return image;
            } catch (stabilityError) {
                throw new Error('All AI services failed');
            }
        }
    }
};
