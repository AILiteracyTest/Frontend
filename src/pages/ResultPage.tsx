import { useLocation, useNavigate } from "react-router-dom";
import WhiteCard from "../components/WhiteCard";
import Button from "../components/Button";
import FontToggle from "../components/FontToggle";
import { Trophy } from "lucide-react";

type QuestionResult = {
  questionIndex: number;
  images: {
    type: "ai" | "real";
    url: string;
  }[];
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
    scoreStats,
  }: {
    correctCount: number;
    totalQuestions: number;
    results: QuestionResult[];
    scoreStats?: {
      rank: number;
      total: number;
    };
  } = location.state || {};

  const handleShare = async () => {
    const url = window.location.origin;
    if (navigator.share) {
      await navigator.share({
        title: "AI 리터러시 테스트",
        text: "AI 이미지 구별 테스트 해보세요!",
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="bg-app-bg min-h-screen p-4 w-screen flex justify-center">
      <FontToggle className="absolute top-4 right-10" />
      <WhiteCard>
        <div className="space-y-10">
          <div className="flex gap-8">
            <div className="w-1/2 p-6 rounded-2xl border bg-gray-50 text-center">
              <p className="font-bold text-gray-800">
                총 <span className="text-2xl">{totalQuestions}</span>문제 중{" "}
                <span className="text-2xl text-red-500">{correctCount}</span>개
                정답
              </p>
            </div>

            <div className="relative w-1/2 p-6 rounded-2xl border bg-gray-50 text-center">
              <Trophy className="absolute top-3 right-3 opacity-20" size={20} />
              <p className="text-xs font-bold text-blue-500 mb-1">전체 순위</p>
              {scoreStats ? (
                <p className="text-3xl font-extrabold text-blue-600">
                  {scoreStats.rank}위
                  <span className="text-sm text-gray-400">
                    {" "}
                    / {scoreStats.total}명
                  </span>
                </p>
              ) : (
                <p>-</p>
              )}
            </div>
          </div>

          <h2 className="font-bold text-black text-lg">문제별 결과 해설</h2>

          {results.map((item) => (
            <div
              key={item.questionIndex}
              className="border p-4 rounded-lg bg-white"
            >
              <p className="font-semibold mb-3 text-black">
                문제 {item.questionIndex} ·{" "}
                <span
                  className={item.isCorrect ? "text-blue-600" : "text-red-600"}
                >
                  {item.isCorrect ? "정답" : "오답"}
                </span>
              </p>

              <div className="flex gap-4 mb-4">
                {item.images.map((img, idx) => {
                  const isSelected = img.type === item.selectedType;
                  const isAnswer = img.type === "ai";

                  return (
                    <div
                      key={idx}
                      className={`w-1/2 border-2 rounded ${
                        isSelected
                          ? "border-blue-500"
                          : isAnswer
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={img.url}
                        className="w-full h-64 object-cover rounded"
                      />
                    </div>
                  );
                })}
              </div>

              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {item.explanation}
              </p>
            </div>
          ))}

          <div className="flex flex-col items-center gap-3">
            <Button onClick={handleShare}>친구에게 공유하기</Button>
            <Button onClick={() => navigate("/")}>다시 하기</Button>
          </div>
        </div>
      </WhiteCard>
    </div>
  );
}
