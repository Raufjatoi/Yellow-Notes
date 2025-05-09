
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { NoteTypeSelector, type NoteType } from "@/components/note-type-selector";
import { NoteLengthToggle } from "@/components/note-length-toggle";
import { PromptSuggestions } from "@/components/prompt-suggestions";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { generateNotes } from "@/services/note-generator";
import { exportToPdf } from "@/services/pdf-exporter";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [noteType, setNoteType] = useState<NoteType>("theory");
  const [isDetailed, setIsDetailed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const handleGenerateNotes = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a topic or question to generate notes",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const content = await generateNotes({
        prompt: prompt.trim(),
        type: noteType,
        isDetailed,
      });
      setGeneratedContent(content);
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was a problem generating your notes. Please try again.",
        variant: "destructive",
      });
      console.error("Note generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportToPdf = async () => {
    if (!generatedContent || !contentRef.current) {
      toast({
        title: "Nothing to export",
        description: "Please generate notes first before exporting to PDF.",
        variant: "destructive",
      });
      return;
    }

    try {
      await exportToPdf(contentRef.current, {
        title: prompt,
        filename: `${prompt.substring(0, 30).replace(/\s+/g, "-")}-notes.pdf`,
      });
      toast({
        title: "Export successful",
        description: "Your notes have been exported to PDF",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was a problem exporting your notes. Please try again.",
        variant: "destructive",
      });
      console.error("PDF export error:", error);
    }
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen">
        <div className="container py-6 px-4 sm:px-6">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-yellow-300 dark:bg-yellow-400 w-8 h-8 flex items-center justify-center rounded-lg mr-3">
                <span className="text-xl">📝</span>
              </div>
              <h1 className="text-2xl font-bold">Yellow Notes</h1>
            </div>
            <ThemeToggle />
          </header>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <Card className="border-yellow-200 dark:border-yellow-900/30">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-medium mb-4">Generate Notes</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="prompt">
                        What do you want to learn about?
                      </label>
                      <Textarea
                        id="prompt"
                        placeholder="Enter a topic, question, or specific subject you want notes on..."
                        value={prompt}
                        onChange={handlePromptChange}
                        className="h-24 bg-yellow-50/50 dark:bg-yellow-900/10"
                      />
                      <PromptSuggestions onSelect={handleSuggestionSelect} />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Note Type</label>
                      <NoteTypeSelector selectedType={noteType} onChange={setNoteType} />
                    </div>

                    <NoteLengthToggle isDetailed={isDetailed} onChange={setIsDetailed} />

                    <Button
                      onClick={handleGenerateNotes}
                      disabled={isGenerating || !prompt.trim()}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-950"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate Notes"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Output Section */}
            <div>
              <Card className="border-yellow-200 dark:border-yellow-900/30">
                <CardContent className="relative pt-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-medium">Your Notes</h2>
                    {generatedContent && (
                      <Button
                        onClick={handleExportToPdf}
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <FileDown className="h-4 w-4" />
                        <span>Export PDF</span>
                      </Button>
                    )}
                  </div>

                  <div className="bg-yellow-50/70 dark:bg-yellow-900/5 rounded-md min-h-[400px] p-4 overflow-auto">
                    <div ref={contentRef} className="prose dark:prose-invert max-w-none">
                      {generatedContent ? (
                        <MarkdownRenderer content={generatedContent} />
                      ) : (
                        <div className="flex items-center justify-center h-full min-h-[300px] text-center text-muted-foreground">
                          {isGenerating ? (
                            <div className="flex flex-col items-center">
                              <Loader2 className="h-8 w-8 animate-spin mb-4" />
                              <p>Crafting your notes...</p>
                            </div>
                          ) : (
                            <div className="p-6">
                              <p className="mb-2">Your generated notes will appear here</p>
                              <p className="text-sm">
                                Enter a prompt and select options on the left to get started
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer */}
          <footer className="py-6 mt-12 border-t border-yellow-200 dark:border-yellow-900/30 text-center">
            <p className="text-sm text-muted-foreground">
              By{" "}
              <a
                href="https://raufjatoi.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-yellow-700 dark:hover:text-yellow-300"
              >
                Abdul Rauf Jatoi
              </a>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              🧠 Powered by Compound-Beta (Groq API)
            </p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
