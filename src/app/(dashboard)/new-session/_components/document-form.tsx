"use client";

import * as React from "react";
import {
  Upload,
  X,
  FileText,
  ImageIcon,
  ClipboardList,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  files: z
    .array(z.any())
    .min(1, "Please upload at least one document or paste raw text."),
  rawText: z.string().optional(),
});

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
}

export function DocumentForm() {
  const [files, setFiles] = React.useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [showRawText, setShowRawText] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: files,
      rawText: "",
    },
  });

  React.useEffect(() => {
    form.setValue("files", files);
  }, [files, form]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: formatBytes(file.size),
        type: file.type,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsProcessing(true);
    console.log("[v0] Processing with values:", values);
    setTimeout(() => {
      setIsProcessing(false);
      form.reset();
      setFiles([]);
    }, 3000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Upload Dropzone */}
        <div className="bg-white p-4 rounded-xl border border-gray-200/75">
          <div className="space-y-4">
            <div
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="border-2 border-dashed border-slate-300 rounded-xl bg-white p-12 transition-all duration-200 group-hover:border-slate-400 group-hover:bg-slate-50/50">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="text-slate-700">
                    <Upload className="w-8 h-8" strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-semibold text-slate-800 tracking-tight">
                      Drag & drop files here or click to browse
                    </h3>
                    <p className="text-sm text-slate-400">
                      Files are processed securely and deleted after analysis.
                    </p>
                    <p className="text-sm text-slate-400">
                      Supports : PDF, DOCX, TXT, JPG, PNG (Max 20 MB)
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    className="mt-4 bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold px-6 rounded-lg"
                  >
                    Browse Files
                  </Button>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                onChange={onFileChange}
                accept=".pdf,.docx,.txt,.jpg,.jpeg,.png"
              />
            </div>
          </div>
        </div>

        {/* OR Divider */}
        <div className="relative flex items-center px-4">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-6 text-sm font-medium text-slate-500 uppercase tracking-widest">
            OR
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Uploaded Files Section */}
        <div className="space-y-5 px-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">
              Uploaded Content
            </h2>
            <FormField
              control={form.control}
              name="files"
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-3">
            {files.length > 0 ? (
              files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-200/60 group hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-slate-200/50 p-2.5 rounded-lg text-slate-600">
                      {file.type.startsWith("image/") ? (
                        <ImageIcon className="w-5 h-5" />
                      ) : (
                        <FileText className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-semibold text-slate-700 leading-none mb-1">
                        {file.name}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {file.size}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    className="p-1 rounded-full border border-slate-300 text-slate-500 hover:text-slate-800 hover:bg-white transition-all shadow-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div>
                <h1 className="mb-4 opacity-50 font-medium">No Files Uploaded</h1>
              </div>
            )}

            {/* Manual Input Entry */}
            {showRawText ? (
              <FormField
                control={form.control}
                name="rawText"
                render={({ field }) => (
                  <FormItem className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder="Paste your notes here..."
                          className="min-h-[150px] bg-white border-slate-200 rounded-xl p-4 focus:ring-slate-400 shadow-sm"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setShowRawText(false);
                            form.setValue("rawText", "");
                          }}
                          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <button
                type="button"
                onClick={() => setShowRawText(true)}
                className="w-full flex items-center space-x-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
              >
                <div className="bg-slate-100 p-2.5 rounded-lg text-slate-600">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <span className="text-[15px] font-semibold text-slate-700">
                  Paste raw text notes manually
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Process Button & Loading */}
        <div className="space-y-6 pt-4">
          <Button
            type="submit"
            className="w-full h-[50px] text-lg font-bold bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-xl shadow-lg transition-all active:scale-[0.98]"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Process Documents"}
          </Button>

          <div
            className={cn(
              "flex flex-col items-center justify-center space-y-4 transition-all duration-500",
              isProcessing
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none"
            )}
          >
            <div className="relative">
              <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
            <p className="text-[15px] font-semibold text-slate-500 text-center">
              Processing documents - this may take up to 20 seconds
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
}

function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  );
}
