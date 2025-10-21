// 백엔드에서 AI 이미지와 실제 이미지를 가져오는 함수
export async function fetchImagePair() {
  try {
    const response = await fetch(
      "https://aivideocheckservice.onrender.com/image_analysis?mode=ques"
    );

    if (!response.ok) {
      throw new Error("이미지 데이터를 불러오지 못했습니다.");
    }

    const data = await response.json();

    // 필요한 데이터만 정리해서 반환
    return {
      runId: data.run_id,
      real: data.unsplash.images[0], // 네추럴 이미지
      ai: data.synthetic.generated_image_url, // AI 생성 이미지
    };
  } catch (error) {
    console.error("fetchImagePair 오류:", error);
    throw error;
  }
}
