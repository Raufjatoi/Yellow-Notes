import { NoteType } from "@/components/note-type-selector";

// This is a mock service that simulates API calls to an AI service
// In a real application, this would call the Groq API

export interface NoteGenerationRequest {
  prompt: string;
  type: NoteType;
  isDetailed: boolean;
}

// Sample templates based on note types
const templates: Record<NoteType, { concise: string; detailed: string }> = {
  theory: {
    concise: `# {topic} - Key Concepts\n\n## Overview\n\n{topic} is an important subject in {field}. Here are the key points:\n\n- Point 1\n- Point 2\n- Point 3\n\n## Summary\n\nThese concepts form the foundation of {topic}.`,
    detailed: `# {topic} - Comprehensive Notes\n\n## Introduction\n\n{topic} is a fundamental concept in {field} that helps us understand how {brief_explanation}.\n\n## Key Concepts\n\n### First Concept\nDetailed explanation of the first important aspect...\n\n### Second Concept\nIn-depth analysis of another critical component...\n\n## Examples\n\nHere are some practical examples:\n\n1. Example one with explanation\n2. Example two with explanation\n\n## Applications\n\n- Application 1\n- Application 2\n- Application 3\n\n## Summary\n\n{topic} represents an essential area of study with widespread implications for {field}.`
  },
  code: {
    concise: `# {topic} - Code Reference\n\n## Basic Implementation\n\n\`\`\`javascript\n// Simple implementation\nfunction example() {\n  // Code here\n  return result;\n}\n\`\`\`\n\n## Usage\n\n\`\`\`javascript\n// How to use the code\nconst result = example();\n\`\`\``,
    detailed: `# {topic} - Detailed Code Guide\n\n## Introduction\n\n{topic} is a programming concept used for {purpose}.\n\n## Implementation\n\n### Basic Structure\n\n\`\`\`javascript\n// Detailed implementation\nfunction complexExample(param1, param2) {\n  // Step 1: Initialize variables\n  let result = [];\n  \n  // Step 2: Process inputs\n  for (const item of param1) {\n    // Processing logic\n    result.push(item * param2);\n  }\n  \n  // Step 3: Return result\n  return result;\n}\n\`\`\`\n\n### Advanced Usage\n\n\`\`\`javascript\n// Complex example with error handling\ntry {\n  const output = complexExample([1, 2, 3], 5);\n  console.log(output);\n} catch (error) {\n  console.error('An error occurred:', error.message);\n}\n\`\`\`\n\n## Common Pitfalls\n\n- Pitfall 1 and how to avoid it\n- Pitfall 2 and best practices\n\n## Optimization Tips\n\n1. First optimization technique\n2. Second optimization technique`
  },
  logic: {
    concise: `# {topic} - Logical Framework\n\n## Core Principle\n\nThe fundamental principle of {topic} is based on {core_concept}.\n\n## Logical Steps\n\n1. First step in the process\n2. Second step in the process\n3. Final step and conclusion\n\n## Key Relationships\n\n- Relationship 1 leads to Outcome A\n- Relationship 2 creates Result B`,
    detailed: `# {topic} - Comprehensive Logical Analysis\n\n## First Principles\n\n{topic} can be understood by examining its foundational principles:\n\n1. Primary axiom and its implications\n2. Secondary principles derived from the primary axiom\n\n## Logical Flow\n\n### Initial Conditions\nThe starting point for understanding {topic} involves setting up these conditions...\n\n### Transformation Process\nThrough a series of logical steps, we can see how these conditions evolve:\n\n1. First transformation with explanation of logical necessity\n2. Second transformation showing cause and effect\n3. Third transformation demonstrating the pattern\n\n### Resultant State\nAfter the transformations, we arrive at the following conclusions...\n\n## Visual Representation\n\n\`\`\`\nInitial State -> Process 1 -> Intermediate State -> Process 2 -> Final State\n\`\`\`\n\n## Practical Applications\n\n1. First application scenario with logical analysis\n2. Second application with step-by-step breakdown\n\n## Common Misconceptions\n\n- Misconception 1 and logical correction\n- Misconception 2 and proper understanding`
  }
};

// Mock data for sample returns
const sampleTopics: Record<string, { field: string, explanation: string }> = {
  "Python basics": { 
    field: "programming", 
    explanation: "creating applications and automating tasks using a simple, readable syntax"
  },
  "Binary Search": { 
    field: "algorithms", 
    explanation: "efficiently finding items in sorted datasets by repeatedly dividing the search space"
  },
  "CNN architecture": { 
    field: "machine learning", 
    explanation: "processing visual data through specialized neural network layers"
  },
  "JavaScript promises": { 
    field: "web development", 
    explanation: "handling asynchronous operations in a more manageable way"
  },
  "SQL joins": { 
    field: "database management", 
    explanation: "combining data from multiple tables based on related columns"
  },
  "Graph theory": { 
    field: "discrete mathematics", 
    explanation: "studying relationships between objects using vertices and edges"
  }
};

export async function generateNotes(request: NoteGenerationRequest): Promise<string> {
  const { prompt, type, isDetailed } = request;
  
  try {
    // Call the Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "compound-beta",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant that generates ${isDetailed ? 'detailed' : 'concise'} ${type} notes.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: isDetailed ? 2048 : 1024
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate notes');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw error;
  }
}

