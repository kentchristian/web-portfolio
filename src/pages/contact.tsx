// src/pages/GithubLanguagesCard.tsx
import { useEffect, useState } from "react";

type Repo = {
  name: string;
  language: string | null;
};

type LanguageStats = {
  [repoName: string]: number;
};

export default function Contact() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const username = "kc878"; // replace with your GitHub username

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );
        if (!res.ok) throw new Error("Failed to fetch repos");
        const data: Repo[] = await res.json();
        setRepos(data);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchRepos();
  }, [username]);

  if (loading) return <div>Loading language stats...</div>;
  if (error) return <div>Error: {error}</div>;

  // Aggregate languages
  const languageStats: LanguageStats = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
    }
  });

  // Calculate percentages
  const total = Object.values(languageStats).reduce((a, b) => a + b, 0);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 600 }}>
      <h1>Language Overview for {username}</h1>

      {Object.entries(languageStats).map(([lang, count]) => {
        const percentage = ((count / total) * 100).toFixed(1);
        return (
          <div key={lang} style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{lang}</span>
              <span>{percentage}%</span>
            </div>
            <div
              style={{
                background: "#e0e0e0",
                borderRadius: "4px",
                height: "10px",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${percentage}%`,
                  height: "100%",
                  background:
                    lang === "JavaScript"
                      ? "#f1e05a"
                      : lang === "TypeScript"
                      ? "#2b7489"
                      : lang === "Python"
                      ? "#3572A5"
                      : "#ccc",
                  borderRadius: "4px",
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>
        );
      })}

      {total === 0 && <p>No language data available.</p>}
    </div>
  );
}
