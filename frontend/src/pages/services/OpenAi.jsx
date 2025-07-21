import { useState } from "react";

function OpenAi() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse("");

        try {
            const res = await fetch(`http://localhost:8080/api/ai/generate?prompt=${encodeURIComponent(prompt)}`);
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            setResponse("Error generating response");
            console.error("Error: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>AI Playground</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows={4}
                    cols={60}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Type your prompt here..."
                    required
                />
                <br />
                <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
                    {loading ? 'Thinking...' : 'Ask AI'}
                </button>
            </form>
            {response && (
                <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '1rem' }}>
                    <strong>AI Response:</strong>
                    <div>{response}</div>
                </div>
            )}
        </div>
    );
}

export default OpenAi;