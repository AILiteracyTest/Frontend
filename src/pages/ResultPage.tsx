import { useLocation, useNavigate } from "react-router-dom";
import WhiteCard from "../components/WhiteCard";
import GrayCard from "../components/GrayCard";
import Button from "../components/Button";
import FontToggle from "../components/FontToggle";

type QuestionResult = {
  questionIndex: number;
  realImage: string;
  aiImage: string;
  selectedType: "ai" | "real";
  isCorrect: boolean;
  explanation: string;
};

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    correctCount = 0,
    totalQuestions = 0,
    results = [],
  }: {
    correctCount: number;
    totalQuestions: number;
    results: QuestionResult[];
  } = location.state || {};

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
          <h1 className="font-bold mb-4 mt-4 text-black">테스트 결과</h1>
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
          <div className="flex gap-8 mb-6 mt-6">
            <GrayCard className="text-gray-800 h-40 w-1/2 rounded-md flex items-center justify-center">
              그래프
            </GrayCard>
            <GrayCard className="text-gray-800 h-40 w-1/2 rounded-md flex items-center justify-center">
              n명 중 n위
            </GrayCard>
          </div>
          <h2 className="font-bold text-black mt-12 leading-tight">
            문제별 결과 해설
          </h2>
          <div className="mt-6 text-left space-y-10">
            {results.length === 0 ? (
              <p className="text-gray-500">저장된 결과가 없습니다.</p>
            ) : (
              results.map((item) => (
                <div
                  key={item.questionIndex}
                  className="border rounded-lg p-4 bg-white"
                >
                  <p className="font-semibold mb-2 text-black">
                    문제 {item.questionIndex} ·{" "}
                    <span
                      className={
                        item.isCorrect ? "text-blue-600" : "text-red-600"
                      }
                    >
                      {item.isCorrect ? "정답" : "오답"}
                    </span>
                  </p>

                  <div className="flex gap-4 mb-3">
                    <div
                      className={`w-1/2 border-2 rounded ${
                        item.selectedType === "real"
                          ? "border-blue-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={item.realImage}
                        alt="real"
                        className="w-full h-72 object-cover rounded block"
                      />
                    </div>

                    <div
                      className={`w-1/2 border-2 rounded ${
                        item.selectedType === "ai"
                          ? "border-blue-500"
                          : "border-red-500"
                      }`}
                    >
                      <img
                        src={item.aiImage}
                        alt="ai"
                        className="w-full h-72 object-cover rounded block"
                      />
                    </div>
                  </div>

                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {item.explanation}
                  </p>
                </div>
              ))
            )}
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
