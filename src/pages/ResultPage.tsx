import { useLocation, useNavigate } from "react-router-dom";
import WhiteCard from "../components/WhiteCard";
import GrayCard from "../components/GrayCard";
import Button from "../components/Button";
import FontToggle from "../components/FontToggle";
export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { correctCount = 0, totalQuestions = 0 } = location.state || {};

  const handleShare = async () => {
    const mainPageUrl = window.location.origin; // 메인 페이지 URL
    if (navigator.share) {
      try {
        await navigator.share({
          title: "AI 리터러시 테스트",
          text: "이 테스트 해보세요!",
          url: mainPageUrl,
        });
      } catch (err) {
        console.error("공유 실패:", err);
      }
    } else {
      try {
        console.log("메인 페이지 URL이 복사되었습니다!");
        await navigator.clipboard.writeText(mainPageUrl);
      } catch {
        console.error("복사 실패, 수동으로 공유해주세요.");
      }
    }
  };

  return (
    <div className="bg-app-bg flex items-center justify-center min-h-screen p-4 w-screen">
      <FontToggle className="absolute top-4 right-10" />
      <WhiteCard>
        <div className="text-center space-y-8">
          <h1 className="font-bold mb-4 mt-4">테스트 결과</h1>
          <p className="text-gray-600 font-bold">
            AI 리터러시 테스트를 완료하셨습니다.
          </p>
          <GrayCard className="font-bold p-6 shadow-md border-b-4 border-gray-300">
            <p className="font-bold text-gray-800 mb-2">
              총{" "}
              <span className="font-extrabold text-2xl">
                {totalQuestions}개
              </span>{" "}
              문항 중{" "}
              <span className={`text-red-500 text-2xl font-extrabold`}>
                {correctCount}개
              </span>{" "}
              정답!
            </p>
          </GrayCard>
          <div className="flex gap-8 mb-6 mt-8">
            <GrayCard className=" h-40 w-1/2 rounded-md flex items-center justify-center">
              {" "}
              그래프
            </GrayCard>
            <GrayCard className=" h-40 w-1/2 rounded-md flex items-center justify-center">
              n명 중 n위
            </GrayCard>
          </div>
          <div className="flex flex-col gap-3 items-center justify-center">
            <Button onClick={handleShare}>친구에게 공유하기</Button>
            <Button onClick={() => navigate("/")}>테스트 다시하기</Button>
          </div>
        </div>
      </WhiteCard>
    </div>
  );
}
