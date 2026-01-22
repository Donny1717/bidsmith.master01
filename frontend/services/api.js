const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function deleteProposal(id) {
    const res = await fetch(`${API_BASE_URL}/api/proposals/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("API error");
    }

    return res.json();
}
