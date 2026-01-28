// src/pages/GithubRepoCards.tsx
import { useEffect, useState } from "react";

// Type for GitHub repository
type Repo = {
  name: string;
  html_url: string;
  language: string | null;
};

export default function ProjectsBoilerPlage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const username = "kc878"; // Replace with your GitHub username

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );
        if (!res.ok) throw new Error("Failed to fetch repositories");
        const data: Repo[] = await res.json();

        // Sort alphabetically by name
        const sorted = data.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );

        setRepos(sorted);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  if (loading) return <div>Loading repositories...</div>;
  if (error) return <div>Error: {error}</div>;

  // Helper: capitalize repo name
  const capitalize = (s: string) =>
    s.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Projects for {username}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          marginTop: "1rem",
        }}
      >
        {repos.map((repo) => (
          <div
            key={repo.name}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(-5px)";
              el.style.boxShadow = "0 5px 15px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
            }}
          >
            <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              {capitalize(repo.name)}
            </h2>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#555",
                fontWeight: "500",
              }}
            >
              Language:{" "}
              <span style={{ fontWeight: "700" }}>
                {repo.language || "Unknown"}
              </span>
            </p>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              style={{
                marginTop: "0.5rem",
                display: "inline-block",
                color: "#0070f3",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              View Repo
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
