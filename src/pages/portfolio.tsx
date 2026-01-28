// src/pages/GithubFullMetricsPage.tsx
import { useEffect, useState } from "react";

type GithubUser = {
  login: string;
  name: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  html_url: string;
  avatar_url: string;
};

type GithubRepo = {
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
};

export default function Portfolio() {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const username = "kentchristian"; // replace with your GitHub username

  useEffect(() => {
    const fetchUserAndRepos = async () => {
      try {
        // Fetch user info
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error("Failed to fetch user info");
        const userData: GithubUser = await userRes.json();
        setUser(userData);

        // Fetch repos
        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );
        if (!reposRes.ok) throw new Error("Failed to fetch repos");
        const reposData: GithubRepo[] = await reposRes.json();
        setRepos(reposData);

        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserAndRepos();
  }, [username]);

  if (loading) return <div>Loading GitHub data...</div>;
  if (error) return <div>Error: {error}</div>;

  // Calculate total stars
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>GitHub Metrics for {user?.login}</h1>

      <img
        src={user?.avatar_url}
        alt="avatar"
        width={100}
        style={{ borderRadius: "50%", marginBottom: "1rem" }}
      />

      <p>Name: {user?.name || "N/A"}</p>
      <p>Public Repos: {user?.public_repos}</p>
      <p>Public Gists: {user?.public_gists}</p>
      <p>Followers: {user?.followers}</p>
      <p>Following: {user?.following}</p>
      <p>Total Stars Across Repos: {totalStars}</p>
      <p>
        Profile: <a href={user?.html_url}>{user?.html_url}</a>
      </p>
      <p>
        Account Created: {new Date(user?.created_at || "").toLocaleDateString()}
      </p>
      <p>
        Last Updated: {new Date(user?.updated_at || "").toLocaleDateString()}
      </p>

      <h2>Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.name}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>{" "}
            - ⭐ {repo.stargazers_count} - Forks: {repo.forks_count} - Language:{" "}
            {repo.language || "N/A"}
          </li>
        ))}
      </ul>

      <h2>Raw JSON (for debugging)</h2>
      <pre style={{ background: "#f0f0f0", padding: "1rem" }}>
        {JSON.stringify({ user, repos }, null, 2)}
      </pre>
    </div>
  );
}
