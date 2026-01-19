import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';

export default function SignaturePad({ onSave, initialSignature = null }) {
  const sigCanvas = useRef(null);
  const [signatureMode, setSignatureMode] = useState('draw'); // 'draw', 'upload', 'type'
  const [signatureData, setSignatureData] = useState(initialSignature);
  const [signatoryName, setSignatoryName] = useState('');
  const [signatoryPosition, setSignatoryPosition] = useState('Director');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [typedName, setTypedName] = useState('');

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
    setSignatureData(null);
    setUploadedImage(null);
  };

  const saveDrawnSignature = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const dataUrl = sigCanvas.current.toDataURL('image/png');
      setSignatureData(dataUrl);
      return dataUrl;
    }
    return null;
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG)');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be smaller than 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
      const dataUrl = event.target.result;
      setUploadedImage(dataUrl);
      setSignatureData(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const generateTypedSignature = () => {
    if (!typedName.trim()) return;
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 150;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.font = '48px "Brush Script MT", cursive';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(typedName, canvas.width / 2, canvas.height / 2);
    const dataUrl = canvas.toDataURL('image/png');
    setSignatureData(dataUrl);
  };

  useEffect(() => {
    if (signatureMode === 'type' && typedName) {
      generateTypedSignature();
    }
  }, [typedName, signatureMode]);

  const handleSave = async () => {
    if (!signatoryName.trim()) {
      alert('Please enter signatory name');
      return;
    }

    let finalSignature = signatureData;
    if (signatureMode === 'draw' && !signatureData) {
      finalSignature = saveDrawnSignature();
    }

    if (!finalSignature) {
      alert('Please add a signature');
      return;
    }

    const signaturePayload = {
      signatureData: finalSignature,
      signatoryName,
      signatoryPosition,
      signatureMode,
      timestamp: new Date().toISOString()
    };

    if (onSave) {
      await onSave(signaturePayload);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Add Your Signature</h2>

      <p className="text-slate-600 mb-6">
        Your bid document is ready for submission. Add your authorised signatory&apos;s signature below.
      </p>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSignatureMode('draw')}
          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
            signatureMode === 'draw'
              ? 'border-blue-600 bg-blue-50 text-blue-600'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          ✍️ Draw Signature
        </button>
        <button
          onClick={() => setSignatureMode('upload')}
          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
            signatureMode === 'upload'
              ? 'border-blue-600 bg-blue-50 text-blue-600'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          📤 Upload Image
        </button>
        <button
          onClick={() => setSignatureMode('type')}
          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
            signatureMode === 'type'
              ? 'border-blue-600 bg-blue-50 text-blue-600'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          ⌨️ Type Name
        </button>
      </div>

      {signatureMode === 'draw' && (
        <div className="mb-6">
          <div className="border-2 border-slate-300 rounded-lg bg-white">
            <SignatureCanvas
              ref={sigCanvas}
              canvasProps={{
                className: 'w-full h-48 cursor-crosshair'
              }}
              backgroundColor="white"
              penColor="black"
              minWidth={1}
              maxWidth={3}
            />
          </div>
          <div className="flex gap-3 mt-3">
            <button
              onClick={clearSignature}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700"
            >
              Clear
            </button>
            <button
              onClick={saveDrawnSignature}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Save Drawing
            </button>
          </div>
        </div>
      )}

      {signatureMode === 'upload' && (
        <div className="mb-6">
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
            <input type="file" accept="image/png,image/jpeg" onChange={handleImageUpload} className="hidden" id="signature-upload" />
            <label htmlFor="signature-upload" className="cursor-pointer block">
              {uploadedImage ? (
                <img src={uploadedImage} alt="Uploaded signature" className="max-h-48 mx-auto" />
              ) : (
                <div>
                  <div className="text-4xl mb-3">📁</div>
                  <p className="text-slate-600">Click to upload signature image</p>
                  <p className="text-sm text-slate-500 mt-2">PNG or JPG, max 2MB</p>
                </div>
              )}
            </label>
          </div>
          {uploadedImage && (
            <button
              onClick={() => {
                setUploadedImage(null);
                setSignatureData(null);
              }}
              className="mt-3 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700"
            >
              Remove Image
            </button>
          )}
        </div>
      )}

      {signatureMode === 'type' && (
        <div className="mb-6">
          <input
            type="text"
            value={typedName}
            onChange={e => setTypedName(e.target.value)}
            placeholder="Type your full name"
            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg text-lg focus:outline-none focus:border-blue-600"
          />
          {signatureData && (
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <img src={signatureData} alt="Typed signature" className="max-h-32 mx-auto" />
            </div>
          )}
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
          <input
            type="text"
            value={signatoryName}
            onChange={e => setSignatoryName(e.target.value)}
            placeholder="e.g., John Smith"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Position *</label>
          <select
            value={signatoryPosition}
            onChange={e => setSignatoryPosition(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
          >
            <option value="Director">Director</option>
            <option value="Managing Director">Managing Director</option>
            <option value="CEO">Chief Executive Officer</option>
            <option value="CFO">Chief Financial Officer</option>
            <option value="Authorized Signatory">Authorized Signatory</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
          <input
            type="text"
            value={new Date().toLocaleDateString('en-GB')}
            disabled
            className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <div className="text-blue-600 text-xl">ℹ️</div>
          <div className="text-sm text-slate-700">
            <strong>UK Electronic Signature Compliance</strong>
            <p className="mt-1">
              This signature is legally binding under the Electronic Communications Act 2000 and meets eIDAS equivalent standards. A full audit
              trail (timestamp, IP address, device information) will be embedded in your PDF document.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={() => window.history.back()} className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700">
          ← Back
        </button>
        <button
          onClick={handleSave}
          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
        >
          Continue to Payment →
        </button>
      </div>
    </div>
  );
}
