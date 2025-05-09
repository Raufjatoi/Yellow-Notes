# Yellow Notes

A modern note-taking application that uses AI to help generate and organize your notes.

## Features

- Create and manage notes with a clean, intuitive interface
- AI-powered note generation using Groq's LLM API
- Support for different note types (theory, logic, etc.)
- Adjustable detail level for generated content
- Responsive design that works on desktop and mobile
- Dark mode support

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Raufjatoi/Yellow-Notes.git
   cd Yellow-Notes
   ```

2. Install dependencies
   ```
   npm i
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your Groq API key
   ```
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. Start the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:8080`

## Environment Variables

- `VITE_GROQ_API_KEY`: Your Groq API key for AI note generation

## Technologies Used    

- React with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- shadcn/ui component library
- Markdown rendering with syntax highlighting
- Groq API for AI capabilities

## Features in Detail    

- **Note Generation**: Enter a topic and get AI-generated notes
- **Note Types**: Choose from different note formats based on your needs
- **Detail Level**: Toggle between concise and detailed notes
- **Responsive Design**: Works on both desktop and mobile devices
- **Theme Support**: Light and dark mode for comfortable viewing
- **Export Options**: Save your notes for later reference

## By    

[Abdul Rauf Jatoi](https:raufjatoi.vercel.app)     