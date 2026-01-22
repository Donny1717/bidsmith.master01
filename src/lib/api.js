const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function uploadTender(files, companyDetails) {
    const formData = new FormData();

    files.forEach(file => {
        formData.append('files', file);
    });

    Object.keys(companyDetails).forEach(key => {
        formData.append(key, companyDetails[key]);
    });

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData
    });

    return response.json();
}

export async function analyzeTender(analysisId) {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysisId })
    });

    return response.json();
}

// ... ฟังก์ชันอื่นๆ
