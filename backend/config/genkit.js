import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import dotenv from 'dotenv';
import { KnowledgeModel } from '../models/knowledgeModel.js';
import { ENV } from './env.js';

dotenv.config();

export const ai = genkit({
    plugins: [googleAI({ apiKey: ENV.GOOGLE_API_KEY })],
    enableTracingAndMetrics: ENV.NODE_ENV === 'development',
});


let knowledgeCache = null;
let cacheTimestamp = null;
let cacheVersion = 0;
const CACHE_TTL = ENV.CACHE_TTL || 60000;


export const loadKnowledgeFromDB = async () => {
    try {
        const knowledge = await KnowledgeModel.getAsObject();
        
        knowledgeCache = knowledge;
        cacheTimestamp = new Date();
        cacheVersion++;

        console.log('Knowledge loaded from MongoDB');
        console.log(`Sections loaded: ${Object.keys(knowledge).join(', ') || 'None'}`);
        return knowledge;
    } catch (error) {
        console.error('Failed to load knowledge from MongoDB:', error);
        return {};
    }
};


export const getKnowledge = async () => {
    if (knowledgeCache && cacheTimestamp) {
        const now = new Date();
        const age = now - cacheTimestamp;
        if (age < CACHE_TTL) {
            return knowledgeCache;
        }
    }

    return await loadKnowledgeFromDB();
};


export const retrieveContext = async (query) => {
    const results = [];

    try {
        const knowledgeBase = await getKnowledge();

        if (!knowledgeBase || Object.keys(knowledgeBase).length === 0) {
            console.warn('No knowledge found in database');
            return results;
        }

        const sections = [
            { data: knowledgeBase.company, key: 'company' },
            { data: knowledgeBase.internship, key: 'internship' },
            { data: knowledgeBase.faq, key: 'faq' }
        ];

        const queryWords = query.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(' ')
            .filter(word => word.length > 2);

        if (queryWords.length === 0) {
            return results;
        }

        for (const section of sections) {
            if (!section.data) continue;

            const sectionStr = JSON.stringify(section.data).toLowerCase();
            let relevance = 0;
            
            for (const word of queryWords) {
                if (sectionStr.includes(word)) {
                    relevance++;
                }
            }

            if (relevance > 0) {
                results.push({
                    section: section.key,
                    relevance,
                    data: section.data
                });
            }
        }

        results.sort((a, b) => b.relevance - a.relevance);
        return results.slice(0, 3);
    } catch (error) {
        console.error('Error retrieving context:', error);
        return results;
    }
};


export const getRelevantContext = async (query) => {
    try {
        const context = await retrieveContext(query);

        if (context.length === 0) {
            return null;
        }

        let contextString = 'Here is relevant info from our knowledge base:\n\n';

        for (const item of context) {
            contextString += `### ${item.section.toUpperCase()} ###\n`;
            contextString += JSON.stringify(item.data, null, 2);
            contextString += '\n\n';
        }

        return contextString;
    } catch (error) {
        console.error('Error getting relevant context:', error);
        return null;
    }
};


export const refreshKnowledgeCache = async () => {
    const oldVersion = cacheVersion;
    await loadKnowledgeFromDB();
    console.log(`🔄 Cache refreshed from version ${oldVersion} to ${cacheVersion}`);
    return { 
        success: true, 
        oldVersion, 
        newVersion: cacheVersion,
        sections: Object.keys(knowledgeCache || {})
    };
};


export const getCacheStatus = () => {
    const now = new Date();
    return {
        isCached: knowledgeCache !== null,
        timestamp: cacheTimestamp,
        age: cacheTimestamp ? now - cacheTimestamp : null,
        sections: knowledgeCache ? Object.keys(knowledgeCache) : [],
        version: cacheVersion,
        isFresh: cacheTimestamp ? (now - cacheTimestamp) < CACHE_TTL : false
    };
};

    // DOUBLE CHECK TO MAKE SURE FUCKIN SHI BE USING GEMINI AND GENKIT BRUH
export const getAIStatus = () => {
    return {
        isInitialized: !!ai,
        provider: 'Google AI',
        model: 'gemini-2.5-flash',
        hasApiKey: !!ENV.GOOGLE_API_KEY,
        apiKeyPrefix: ENV.GOOGLE_API_KEY ? ENV.GOOGLE_API_KEY.substring(0, 10) + '...' : null
    };
};
