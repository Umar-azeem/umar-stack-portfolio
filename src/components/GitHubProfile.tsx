"use client";

import { useEffect, useState } from "react";
import { Instagram, Linkedin, Youtube } from "../../public/assets/icons/icons";

interface GitHubUser {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
  name: string;
  html_url: string;
  twitter_username?: string;
}

interface Repository {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  fork: boolean;
  parent?: {
    full_name: string;
  };
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  size: number;
}

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

const GITHUB_TOKEN =
  process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.GITHUB_TOKEN;

async function fetchRealContributions(
  username: string,
  year: string,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const startDate = `${year}-01-01T00:00:00Z`;
  const endDate = `${year}-12-31T23:59:59Z`;

  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection(from: "${startDate}", to: "${endDate}") {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      return null;
    }

    return (
      result.data?.user?.contributionsCollection?.contributionCalendar || null
    );
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return null;
  }
}

async function fetchAllRepositories(
  username: string,
  token?: string,
): Promise<Repository[]> {
  let allRepos: Repository[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=${page}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      if (!response.ok) break;

      const repos = await response.json();
      if (repos.length === 0) {
        hasMore = false;
      } else {
        allRepos = [...allRepos, ...repos];
        page++;
      }
    } catch (error) {
      console.error("Error fetching repos:", error);
      hasMore = false;
    }
  }

  return allRepos;
}

export const GitHubProfile = ({
  username = "Umar-azeem",
}: {
  username?: string;
}) => {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [allRepos, setAllRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [contributionCalendar, setContributionCalendar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2026");
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [sortBy, setSortBy] = useState<"updated" | "stars" | "name">("updated");
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const languages = [
    ...new Set(allRepos.map((repo) => repo.language).filter((lang): lang is string => lang !== null)),
  ];

  useEffect(() => {
    const loadContributions = async () => {
      const calendar = await fetchRealContributions(username, selectedYear);
      setContributionCalendar(calendar);
    };

    loadContributions();
  }, [selectedYear, username]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const userResponse = await fetch(
          `https://api.github.com/users/${username}`,
          {
            headers: GITHUB_TOKEN
              ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
              : {},
          },
        );

        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const user = await userResponse.json();
        setUserData(user);

        const repos = await fetchAllRepositories(username, GITHUB_TOKEN);
        setAllRepos(repos);
        setFilteredRepos(repos);

        const calendar = await fetchRealContributions(username, selectedYear);
        setContributionCalendar(calendar);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        setLoading(false);
      }
    };

    fetchAllData();
  }, [username, selectedYear]);

  useEffect(() => {
    let filtered = [...allRepos];

    if (searchTerm) {
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (repo.description &&
            repo.description.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    if (languageFilter) {
      filtered = filtered.filter((repo) => repo.language === languageFilter);
    }

    switch (sortBy) {
      case "stars":
        filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "updated":
        filtered.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        );
        break;
    }

    setFilteredRepos(filtered);
  }, [searchTerm, languageFilter, sortBy, allRepos]);

  const totalContributions = contributionCalendar?.totalContributions || 0;
  const weeks = contributionCalendar?.weeks || [];

  const getSquareColor = (count: number) => {
    if (count === 0) return "bg-[#161b22]";
    if (count <= 3) return "bg-[#0e4429]";
    if (count <= 6) return "bg-[#006d32]";
    if (count <= 9) return "bg-[#26a641]";
    return "bg-[#39d353]";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p>Loading real GitHub data...</p>
          <p className="text-sm text-gray-400 mt-2">
            Fetching ALL repositories...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center text-red-400">
          <p>Error: {error}</p>
          <p className="text-sm mt-2">Make sure your GitHub token is valid</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header Section with Avatar */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between mb-6 sm:mb-8 pb-4 border-b border-gray-800 gap-4">
          {/* Left side - Avatar and Name */}
          <div className="flex flex-row md:flex-col items-center gap-4">
            {/* Avatar Image */}
            <div className="relative w-16 h-16 md:w-38 md:h-38 rounded-full overflow-hidden border-2 border-green-500">
              {userData?.avatar_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={userData.avatar_url}
                  alt={userData?.name || username}
                  
                  className="object-cover"
                  sizes="(max-width: 640px) 64px, 80px"
                />
              )}
            </div>
            
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                {userData?.name || username}
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                {username} - he/him
              </p>
            </div>
          </div>
         
          
          <button className="text-sm text-gray-400 hover:text-white transition-colors border border-gray-700 px-3 py-1 rounded w-full sm:w-auto">
           <a href="https://github.com/Umar-azeem" target="_blank" rel="noopener noreferrer">
              GitHub profile
            </a>
          </button>
        </div>

        {/* Profile Info - Mobile Responsive */}
        <div className="mb-6 space-y-2 flex flex-col items-start text-xs sm:text-sm ">
          <p className="text-gray-300">front end developer</p>
          <div className="flex flex-col flex-row sm:items-center gap-2 text-gray-400">
            <span className="flex gap-2 justify-center items-center">
              <a
                href="https://www.linkedin.com/in/umar-azeem-9a24b9386/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center gap-2 items-center text-gray-500 hover:text-cyan-500"
              >
                <Linkedin className="w-3.5 h-3.5" />
                Umar Azeem
              </a>
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-400">
            <span>
              <a
                href="https://www.instagram.com/umar_azeem.64/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center gap-2 items-center text-gray-500 hover:text-cyan-500"
              >
                <Instagram className="w-3.5 h-3.5" />
                umar_azeem.64
              </a>
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-400">
            <span>
              <a
                href="https://www.youtube.com/@code-64-bit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center gap-2 items-center text-gray-500 hover:text-cyan-500"
              >
                <Youtube className="w-3.5 h-3.5 text-gray-500 hover:text-cyan-500" />
                @code-64-bit
              </a>
            </span>
          </div>
          <div className="text-blue-400 hover:underline break-all">
            <a
              href={userData?.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://{username}-portfolio.netlify.app/
            </a>
          </div>
        </div>

        {/* Stats Overview - Mobile Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="border border-gray-800 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-400">
              {allRepos.length}
            </div>
            <div className="text-xs text-gray-400">Total Repos</div>
          </div>
          <div className="border border-gray-800 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-400">
              {userData?.public_repos}
            </div>
            <div className="text-xs text-gray-400">Public Repos</div>
          </div>
          <div className="border border-gray-800 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-400">
              {userData?.followers}
            </div>
            <div className="text-xs text-gray-400">Followers</div>
          </div>
          <div className="border border-gray-800 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-400">
              {userData?.following}
            </div>
            <div className="text-xs text-gray-400">Following</div>
          </div>
        </div>

        {/* Total Contributions - Mobile Responsive */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">
            {totalContributions.toLocaleString()} contributions in{" "}
            {selectedYear}
          </h2>
        </div>

        {/* Contribution Graph - Mobile Responsive with Horizontal Scroll */}
        <div className="border border-gray-800 rounded-lg p-3 sm:p-6 mb-6 overflow-x-auto custom-scrollbar">
          <div className="min-w-[650px] sm:min-w-full">
            <div className="flex text-xs text-gray-500 mb-2 pl-8">
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((month) => (
                <div
                  key={month}
                  className="flex-1 text-center text-[10px] sm:text-xs"
                >
                  {month}
                </div>
              ))}
            </div>

            <div className="flex gap-1">
              <div className="flex flex-col gap-1 text-[10px] sm:text-xs text-gray-500 pr-2">
                <div className="h-3">Mon</div>
                <div className="h-3">Wed</div>
                <div className="h-3">Fri</div>
              </div>

              <div className="flex gap-1 flex-1">
                {weeks.map((week: ContributionWeek, weekIndex: number) => (
                  <div key={weekIndex} className="flex flex-col gap-1 flex-1">
                    {week.contributionDays.map(
                      (day: ContributionDay, dayIndex: number) => (
                        <div
                          key={dayIndex}
                          className={`w-full aspect-square rounded-sm ${getSquareColor(day.contributionCount)} hover:ring-1 hover:ring-green-400 transition-all cursor-pointer`}
                          title={`${day.contributionCount} contributions on ${day.date}`}
                        />
                      ),
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-1 sm:gap-2 mt-4 text-[10px] sm:text-xs text-gray-500">
              <span>Less</span>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-[#161b22]"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-[#0e4429]"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-[#006d32]"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-[#26a641]"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm bg-[#39d353]"></div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Year Selector - Mobile Responsive */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <button className="text-gray-300 font-medium flex items-center gap-2 text-sm sm:text-base">
              Contribution settings ▼
            </button>
            <button className="text-xs text-blue-400 hover:underline">
              Learn how we count contributions
            </button>
          </div>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-gray-900 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-green-500 w-full sm:w-auto"
          >
            <option value="2026">2026 ▼</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>

        {/* ALL REPOSITORIES Section - Mobile Responsive */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold">
              All Repositories ({filteredRepos.length} / {allRepos.length})
            </h2>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-sm"
            >
              {showFilters ? "Hide Filters" : "Show Filters"} 🔍
            </button>

            {/* Filters - Desktop always visible, Mobile toggleable */}
            <div
              className={`${showFilters ? "flex" : "hidden"} sm:flex flex-col sm:flex-row gap-3 w-full sm:w-auto`}
            >
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500 w-full sm:w-auto"
              />

              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500 w-full sm:w-auto"
              >
                <option value="">All Languages</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500 w-full sm:w-auto"
              >
                <option value="updated">Recently Updated</option>
                <option value="stars">Most Stars</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {/* Repositories List - Mobile Responsive */}
          <div className="space-y-3 sm:space-y-4">
            {filteredRepos.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No repositories found matching your criteria
              </div>
            ) : (
              filteredRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="border border-gray-700 rounded-lg p-3 sm:p-4 hover:border-gray-600 transition-all hover:bg-gray-900/50"
                >
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-start gap-2 mb-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline font-medium text-base sm:text-lg break-all"
                      >
                        {repo.name}
                      </a>
                      {repo.fork && (
                        <span className="text-xs text-gray-500 border border-gray-700 px-2 py-0.5 rounded">
                          Forked
                        </span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="text-xs text-yellow-500">
                          ⭐ {repo.stargazers_count}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-400 text-xs sm:text-sm mb-3 break-words">
                      {repo.description || "No description provided"}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-gray-500">
                      {repo.language && (
                        <div className="flex items-center gap-1">
                          <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500"></span>
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <span>🔄 {repo.forks_count} forks</span>
                      <span className="hidden sm:inline">
                        📅 Updated:{" "}
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                      <span className="sm:hidden">
                        📅 {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                      <span>💾 {Math.round(repo.size / 1024)} MB</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};