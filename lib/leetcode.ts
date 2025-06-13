export const getLeetcodeData = async (username: string) => {
    try {
      const res = await fetch(`/api/leetcode/${username}`)

      if (!res.ok) {
        console.error("❌ Failed to fetch from API route")
        return null
      }

      const data = await res.json()
      console.log(data)
      return data
    } catch (err) {
      console.error("⚠️ Error fetching data from /api/leetcode:", err)
      return null
    }
}
