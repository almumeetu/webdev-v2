import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, Image as ImageIcon, X, Link as LinkIcon, RefreshCw } from 'lucide-react';

interface ImageDropZoneProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'auto';
  helperText?: string;
  required?: boolean;
}

export const ImageDropZone: React.FC<ImageDropZoneProps> = ({
  label,
  value,
  onChange,
  placeholder = 'https://images.unsplash.com/... or /images/...',
  aspectRatio = 'auto',
  helperText,
  required = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress & convert file to data URL
  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WEBP, SVG).');
      return;
    }

    // If SVG or small file (< 400KB), read directly as data URL
    if (file.type === 'image/svg+xml' || file.size < 400 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          onChange(e.target.result);
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    // For larger raster images, resize using HTML5 Canvas to keep state lean
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1600;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          onChange(compressedDataUrl);
        } else {
          onChange(event.target?.result as string);
        }
        setIsProcessing(false);
      };
      img.onerror = () => {
        setIsProcessing(false);
        alert('Failed to load the image.');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
      // reset so the same file can be re-selected if needed
      e.target.value = '';
    }
  }, [processFile]);

  const aspectClass = {
    square: 'aspect-square max-h-48',
    video: 'aspect-video max-h-48',
    wide: 'aspect-[21/9] max-h-48',
    auto: 'min-h-[120px] max-h-56',
  }[aspectRatio];

  return (
    <div className="space-y-2">
      {/* Label and Actions */}
      <div className="flex items-center justify-between">
        {label && (
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            {label} {required && <span className="text-rose-400">*</span>}
          </label>
        )}
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          {showUrlInput ? 'Hide URL field' : 'Enter URL / path'}
        </button>
      </div>

      {/* Direct URL / Path input fallback */}
      {showUrlInput && (
        <div className="animate-fadeIn">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 bg-[#0c0d12] border border-white/10 rounded-md text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#9cd5e2] transition-all text-xs font-mono"
          />
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Preview or Drop Zone */}
      {value && value.trim() !== '' ? (
        <div className="relative rounded-md border border-white/10 bg-[#0c0d12] p-2.5 flex flex-col sm:flex-row items-center gap-3 group transition-all hover:border-white/20">
          <div className={`relative overflow-hidden rounded-md bg-zinc-900 border border-white/10 shrink-0 w-28 h-20 sm:w-32 sm:h-24 flex items-center justify-center`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.trim()}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 pointer-events-none">
              <span className="text-[10px] text-white font-medium bg-black/60 px-1.5 py-0.5 rounded">Preview</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 w-full space-y-1 text-left">
            <p className="text-xs font-semibold text-zinc-200 truncate">
              {value.startsWith('data:') ? 'Custom Uploaded Image' : value}
            </p>
            <p className="text-[11px] text-zinc-400">
              {value.startsWith('data:') ? 'Stored as Data URL' : 'External / Static Asset'}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="px-2.5 py-1 text-xs font-semibold text-zinc-200 bg-white/[0.06] hover:bg-white/[0.12] rounded-md border border-white/10 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isProcessing ? 'animate-spin' : ''}`} />
                Replace Image
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-2.5 py-1 text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-md border border-rose-500/20 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragEnter={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-md p-4 sm:p-6 transition-all cursor-pointer flex flex-col items-center justify-center text-center ${aspectClass} ${
            isDragging
              ? 'border-[#9cd5e2] bg-[#BBE7F1]/10 scale-[1.01]'
              : 'border-white/15 bg-[#0c0d12]/60 hover:border-[#9cd5e2]/60 hover:bg-white/[0.02]'
          }`}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
              <span className="text-xs text-zinc-400">Processing image...</span>
            </div>
          ) : (
            <>
              <div className={`p-2.5 rounded-md mb-2 transition-colors ${isDragging ? 'bg-[#BBE7F1]/20 text-cyan-300' : 'bg-white/[0.05] text-zinc-400 group-hover:text-white'}`}>
                <UploadCloud className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-zinc-200">
                <span className="text-cyan-400 font-bold">Click to upload</span> or drag and drop
              </p>
              <p className="text-[11px] text-zinc-500 mt-1">
                {helperText || 'PNG, JPG, WEBP, SVG up to 5MB'}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageDropZone;
