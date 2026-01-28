// src/pages/GithubHeatmap.tsx
import { useEffect, useState } from "react";

type Repo = {
  name: string;
  commits_url: string;
};

type DailyCount = { [date: string]: number };

export default function ActivityBoilerPlate() {
  const username = "kentchristian"; // replace with your username
  const [dailyCounts, setDailyCounts] = useState<DailyCount>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRepos = async () => {
      try {
        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );
        const repos: Repo[] = await repoRes.json();

        const counts: DailyCount = {};

        for (const repo of repos) {
          const commitsRes = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=100`
          );
          const commits = await commitsRes.json();

          commits.forEach((commit: any) => {
            const date = commit.commit.author.date.split("T")[0];
            counts[date] = (counts[date] || 0) + 1;
          });
        }

        setDailyCounts(counts);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchAllRepos();
  }, [username]);

  if (loading) return <div>Loading heatmap...</div>;

  // Prepare days (last 30 days)
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split("T")[0];
  });

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>GitHub Heatmap for {username}</h1>
      <div style={{ display: "flex", gap: "2px", flexWrap: "wrap", maxWidth: "700px" }}>
        {dates.map((date) => {
          const count = dailyCounts[date] || 0;
          const color = count
            ? `rgba(34, 197, 94, ${Math.min(count / 5, 1)})` // scale intensity
            : "#ebedf0";

          return (
            <div
              key={date}
              title={`${date}: ${count} commits`}
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: color,
                borderRadius: "2px",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
