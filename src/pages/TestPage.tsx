import WhiteCard from "../components/WhiteCard";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import { useState } from "react";
import GrayCard from "../components/GrayCard";
import { useNavigate } from "react-router-dom";

export default function TestPage() {
  const totalQuestions = 2;
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const navigate = useNavigate();

  const progressPercent = (currentQuestion + 1 / totalQuestions) * 100;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleImageClick = (index: number) => {
    if (selectedImage !== null) return;
    setSelectedImage(index);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion + 1 === totalQuestions) {
      navigate("/result");
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedImage(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="bg-app-bg flex items-center justify-center min-h-screen p-4 w-screen">
      <WhiteCard className="w-full max-w-3xl p-8">
        <div className="text-left">
          <p className="text-sm font-semibold text-primary-blue mb-2">
            문제 {currentQuestion + 1}/{totalQuestions}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight mb-4">
            다음 중 AI로 제작된 이미지는 어느 것일까요?
          </h1>
          <ProgressBar progress={progressPercent} />
          <div className="border-b border-gray-300 my-4"></div>
          <div className="flex gap-4 mb-6 mt-4">
            {[0, 1].map((idx) => (
              <div
                key={idx}
                className={`bg-neutral-light h-64 w-1/2 rounded-md flex items-center justify-center border-4 hover:shadow-lg hover:border-accent-blue cursor-pointer ${
                  selectedImage === idx
                    ? "border-accent-blue shadow-lg"
                    : "border-transparent"
                }`}
                onClick={() => handleImageClick(idx)}
              >
                <p className="text-gray-400">이미지 {idx + 1}</p>
              </div>
            ))}
          </div>

          {/* GrayCard 설명 */}
          {showExplanation && (
            <GrayCard className="mb-4">
              <p>이 이미지는 AI로 생성된 이미지입니다. 이유 설명 예시...</p>
            </GrayCard>
          )}

          <Button onClick={handleNext} disabled={selectedImage === null}>
            {currentQuestion + 1 === totalQuestions
              ? "결과 확인하기"
              : "다음 문제로 이동"}
          </Button>
        </div>
      </WhiteCard>
    </div>
  );
}
