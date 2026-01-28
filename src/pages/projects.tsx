// src/pages/GithubDashboardPage.tsx
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

export default function Projects() {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const username = "kc878"; // Replace with your GitHub username

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, [username]);

  if (loading) return <div>Loading GitHub dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img
          src={user?.avatar_url}
          alt="avatar"
          width={80}
          style={{ borderRadius: "50%" }}
        />
        <div>
          <h1>{user?.name || user?.login}</h1>
          <p>
            <a href={user?.html_url} target="_blank" rel="noreferrer">
              @{user?.login}
            </a>
          </p>
        </div>
      </header>

      <section style={{ marginTop: "2rem" }}>
        <h2>Account Metrics</h2>
        <ul>
          <li>Public Repos: {user?.public_repos}</li>
          <li>Public Gists: {user?.public_gists}</li>
          <li>Followers: {user?.followers}</li>
          <li>Following: {user?.following}</li>
          <li>Total Stars Across Repos: {totalStars}</li>
          <li>
            Account Created:{" "}
            {new Date(user?.created_at || "").toLocaleDateString()}
          </li>
          <li>
            Last Updated:{" "}
            {new Date(user?.updated_at || "").toLocaleDateString()}
          </li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Repositories</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
                Name
              </th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Stars</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Forks</th>
              <th style={{ borderBottom: "1px solid #ccc" }}>Language</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo) => (
              <tr key={repo.name}>
                <td style={{ padding: "0.5rem 0" }}>
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.name}
                  </a>
                </td>
                <td style={{ textAlign: "center" }}>{repo.stargazers_count}</td>
                <td style={{ textAlign: "center" }}>{repo.forks_count}</td>
                <td style={{ textAlign: "center" }}>
                  {repo.language || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Raw JSON Data</h2>
        <pre style={{ background: "#f0f0f0", padding: "1rem" }}>
          {JSON.stringify({ user, repos }, null, 2)}
        </pre>
      </section>
    </div>
  );
}
