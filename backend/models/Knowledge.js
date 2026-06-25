import mongoose from 'mongoose';

const knowledgeSchema = new mongoose.Schema({
    section: {
        type: String,
        required: [true, 'Section is required'],
        unique: true,
        trim: true,
        // No enum — sections are open-ended so new ones (cryptosavers, etc.)
        // can be added via the admin API without a code change.
        validate: {
            validator: function(v) {
                return typeof v === 'string' && v.trim().length > 0;
            },
            message: 'Section must be a non-empty string'
        }
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, 'Data is required'],
        validate: {
            validator: function(v) {
                return v !== null && typeof v === 'object' && Object.keys(v).length > 0;
            },
            message: 'Data must be a non-empty object'
        }
    },
    lastUpdatedBy: {
        type: String,
        default: 'system'
    }
}, {
    timestamps: true
});

knowledgeSchema.index({ section: 1 });
knowledgeSchema.index({ createdAt: -1 });
knowledgeSchema.index({ section: 'text', 'data': 'text' });

knowledgeSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Accepts any non-empty string — no fixed whitelist
knowledgeSchema.statics.isValidSection = function(section) {
    return typeof section === 'string' && section.trim().length > 0;
};

export const Knowledge = mongoose.model('Knowledge', knowledgeSchema);