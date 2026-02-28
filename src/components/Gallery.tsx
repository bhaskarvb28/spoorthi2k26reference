import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Upload, X, Loader2 } from 'lucide-react';

interface GalleryImage {
  id: number;
  imageData: string;
  caption: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error('Failed to fetch images', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview) return;

    setIsUploading(true);
    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData: preview, caption }),
      });

      if (response.ok) {
        setCaption('');
        setSelectedFile(null);
        setPreview(null);
        setShowUploadModal(false);
        fetchImages();
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-900">Gallery</h2>
            <p className="text-gray-600 mt-2">Memories from Spoorthi 2026</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-bright-sky-600 hover:bg-bright-sky-700 text-white px-6 py-3 rounded-full shadow-md transition-all"
          >
            <Upload size={20} />
            Upload Photo
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No photos yet. Be the first to upload!
            </div>
          ) : (
            images.map((img) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-xl shadow-md aspect-square bg-gray-200"
              >
                <img
                  src={img.imageData}
                  alt={img.caption || 'Event photo'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm truncate">{img.caption}</p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Upload Photo</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-bright-sky-500 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {preview ? (
                  <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg shadow-sm" />
                ) : (
                  <div className="text-gray-500">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p>Click to select an image</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-bright-sky-500 focus:ring-bright-sky-500 px-4 py-2 border"
                  placeholder="Enter a caption..."
                />
              </div>

              <button
                type="submit"
                disabled={!preview || isUploading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bright-sky-600 hover:bg-bright-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Uploading...
                  </>
                ) : (
                  'Upload'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
