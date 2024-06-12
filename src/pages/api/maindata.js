// pages/api/fetchData.js

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { candidate, date } = req.query;
      const response = await fetch(
        `https://kiuhwqca87.execute-api.ap-southeast-1.amazonaws.com/api/maindata?date=2024-06-12`
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
