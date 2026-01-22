'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadForm from '@/components/UploadForm'; // ← Copy จาก V0
import { uploadTender, analyzeTender } from '@/lib/api';

export default function UploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (files: File[], companyDetails: any) => {
    setLoading(true);

    try {
      // Upload files
      const uploadResult = await uploadTender(files, companyDetails);
      console.log('Upload success:', uploadResult);

      // Analyze tender
      const analysisResult = await analyzeTender(uploadResult.analysisId);
      console.log('Analysis success:', analysisResult);

      // Navigate to analysis page
      router.push(`/analysis?id=${uploadResult.analysisId}`);

    } catch (error) {
      console.error('Error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Upload Tender Documents
        </h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Analyzing tender...</p>
          </div>
        ) : (
          <UploadForm onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}