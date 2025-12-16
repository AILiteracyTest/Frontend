export async function postScore(score: number) {
  const response = await fetch(
    "https://aivideocheckservice.onrender.com/score",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score }),
    }
  );

  if (!response.ok) {
    throw new Error("점수 전송 실패");
  }

  return response.json();
  // { rank, total, percentile }
}
