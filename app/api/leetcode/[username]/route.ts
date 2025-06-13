export async function GET(request: Request, { params }: { params: { username: string } }) {
    const { username } = await params;
  
    try {
      const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query getUserProfile($username: String!) {
              matchedUser(username: $username) {
                username
                profile {
                  realName
                  userAvatar
                  reputation
                  ranking
                  starRating
                }
                submitStats {
                  acSubmissionNum {
                    difficulty
                    count
                  }
                }
              }
              userContestRanking(username: $username) {
                rating
                globalRanking
              }
              userContestRankingHistory(username: $username) {
                attended
                trendDirection
                rating
                contest {
                  title
                }
              }
              recentSubmissionList(username: $username, limit: 10) {
                title
                titleSlug
                timestamp
                statusDisplay
                lang
              }
            }
          `,
          variables: {
            username,
          },
        }),
      });
  
      const data = await response.json();
  
      if (!data.data?.matchedUser) {
        console.error("❌ User not found");
        return new Response("User not found", { status: 404 });
      }
  
      const user = data.data;
      const profile = user.matchedUser.profile;
      const contest = user.userContestRanking;
      const recent = user.recentSubmissionList;
  
      // Extract problem stats
      const problemStats = user.matchedUser.submitStats.acSubmissionNum.reduce(
        (acc: any, curr: any) => {
          if (curr.difficulty === "Easy") acc.easy = curr.count;
          if (curr.difficulty === "Medium") acc.medium = curr.count;
          if (curr.difficulty === "Hard") acc.hard = curr.count;
          if (curr.difficulty === "All") acc.total = curr.count;
          return acc;
        },
        { easy: 0, medium: 0, hard: 0, total: 0 }
      );
  
      // Only include attended contests
      const attendedContests = (user.userContestRankingHistory || []).filter(
        (c: any) => c.attended
      );


      const responseData = {
        leetcodeID: user.matchedUser.username,
        realName: profile.realName,
        leetcodeRank: profile.ranking,
        reputation: profile.reputation,
        starRating: profile.starRating,
        avatar: profile.userAvatar,
        contestRating: contest?.rating ?? "N/A",
        contestRank: contest?.globalRanking ?? "N/A",
        ratingGraph: attendedContests.map((c: any) => ({
            rating: c.rating,
            trendDirection: c.trendDirection,
            contestName: c.contest?.title ?? "Unknown Contest",
          })),
        questionStats: {
          total: problemStats.total,
          easy: problemStats.easy,
          medium: problemStats.medium,
          hard: problemStats.hard,
        },
        recentSubmissions: recent.map((sub: any) => ({
          title: sub.title,
          titleSlug: sub.titleSlug,
          status: sub.statusDisplay,
          lang: sub.lang,
          time: new Date(+sub.timestamp * 1000).toLocaleString(),
        })),
      };
  
      return new Response(JSON.stringify(responseData), { status: 200 });
    } catch (error) {
      console.error("⚠️ Error fetching data from LeetCode GraphQL:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
  