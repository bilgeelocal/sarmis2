// pages/api/fetchData.js

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { candidate, date } = req.query;
      const response = await fetch(
        `https://8d5jof9z6i.execute-api.ap-southeast-1.amazonaws.com/api/posts?candidate=${candidate}&date=2024-06-13`
      );
      if (!response.ok) {
        throw new Error("Алдаа гарлаа");
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
