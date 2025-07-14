import { generateInteriorDesign, uploadToCloudinary } from '../services/aiImageService.js';
import Design from '../models/design.model.js';
import cloudinary from '../config/cloudinary.js';

export const generateDesign = async (req, res) => {
  try {
    const { prompt, roomType } = req.body;
    const userId = req.user; // From auth middleware

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    console.log('Generating design for prompt:', prompt);
    
    // Generate image using free AI service
    const imageBase64 = await generateInteriorDesign(prompt, roomType);
    
    // Upload to Cloudinary
    console.log('Uploading to Cloudinary...');
    const cloudinaryResult = await uploadToCloudinary(imageBase64, prompt);
    
    // Save to database
    const newDesign = new Design({
      userId,
      prompt,
      roomType: roomType || 'living room',
      imageUrl: cloudinaryResult.url,
      cloudinaryPublicId: cloudinaryResult.publicId,
      aiService: 'pollinations' // Since it tries Pollinations first
    });

    const savedDesign = await newDesign.save();
    
    res.json({ 
      designId: savedDesign._id,
      imageUrl: cloudinaryResult.url,
      prompt,
      roomType: roomType || 'living room',
      message: "Design generated and saved successfully"
    });

  } catch (error) {
    console.error('Design generation error:', error);
    res.status(500).json({ 
      message: "Failed to generate image", 
      error: error.message 
    });
  }
};

// Get user's designs
export const getUserDesigns = async (req, res) => {
  try {
    const userId = req.user;
    const { page = 1, limit = 10 } = req.query;

    const designs = await Design.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Design.countDocuments({ userId });

    res.json({
      designs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Get designs error:', error);
    res.status(500).json({ 
      message: "Failed to fetch designs", 
      error: error.message 
    });
  }
};

// Delete a design
export const deleteDesign = async (req, res) => {
  try {
    const { designId } = req.params;
    const userId = req.user;

    const design = await Design.findOne({ _id: designId, userId });
    
    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(design.cloudinaryPublicId);
    
    // Delete from database
    await Design.findByIdAndDelete(designId);

    res.json({ message: "Design deleted successfully" });

  } catch (error) {
    console.error('Delete design error:', error);
    res.status(500).json({ 
      message: "Failed to delete design", 
      error: error.message 
    });
  }
};
