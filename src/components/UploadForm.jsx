import React, { useState } from 'react';

/**
 * UploadForm handles PDF/Word uploads with company details and guards against oversize files.
 */
export function UploadForm({ onUploaded }) {
  const [company, setCompany] = useState({
    name: '',
    email: '',
    location: 'London',
    contact: ''
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');

  const maxSize = 50 * 1024 * 1024;

  const handleFile = event => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    if (!/\.pdf$|\.docx?$/.test(selected.name.toLowerCase())) {
      setError('Only PDF or Word files are allowed.');
      return;
    }
    if (selected.size > maxSize) {
      setError('File must be under 50MB.');
      return;
    }
    setError('');
    setFile(selected);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setCompany(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!file) {
      setError('Please select a PDF or Word file.');
      return;
    }
    setStatus('uploading');
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('companyName', company.name);
      formData.append('location', company.location);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      const result = await response.json();
      if (!response.ok || !result?.success) {
        throw new Error(result?.error || 'Upload failed');
      }

      setStatus('uploaded');
      if (typeof onUploaded === 'function') {
        onUploaded({
          tenderId: result.tenderId,
          parsed: result.parsed,
          company
        });
      }
    } catch (err) {
      setError(err.message || 'Upload failed');
      setStatus('idle');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-gray-200 rounded-md p-4">
      <div>
        <label className="block text-sm font-semibold">Company name</label>
        <input
          name="name"
          value={company.name}
          onChange={handleChange}
          required
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold">Contact email</label>
          <input
            name="email"
            type="email"
            value={company.email}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Location</label>
          <input
            name="location"
            value={company.location}
            onChange={handleChange}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold">Upload tender (PDF/Word)</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFile}
          className="mt-1 w-full"
        />
        <p className="text-xs text-gray-500">Max 50MB. Files stay server-side.</p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === 'uploading'}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
      >
        {status === 'uploading' ? 'Uploading…' : 'Upload and parse'}
      </button>
    </form>
  );
}
