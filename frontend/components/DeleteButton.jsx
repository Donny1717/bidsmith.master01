"use client";

export default function DeleteButton() {
    const handleDelete = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/proposals/123`,
            {
                method: "DELETE",
            }
        );

        const data = await res.json();
        console.log("DELETE RESULT:", data);
        alert("Deleted proposal " + data.id);
    };

    return (
        <button
            onClick={handleDelete}
            style={{
                padding: "10px 16px",
                background: "red",
                color: "white",
                borderRadius: "6px",
            }}
        >
            Delete Proposal
        </button>
    );
}
