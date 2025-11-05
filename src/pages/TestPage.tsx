import WhiteCard from "../components/WhiteCard";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import { useState, useEffect, useRef } from "react";
import GrayCard from "../components/GrayCard";
import { useNavigate } from "react-router-dom";
import { fetchImagePair, fetchImageExplanation } from "../api/imageApi";

export default function TestPage() {
  const totalQuestions = 3;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const navigate = useNavigate();

  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answerResult, setAnswerResult] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);

  const [imagePair, setImagePair] = useState<{
    ai: string;
    real: string;
    runId: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [shuffledImages, setShuffledImages] = useState<
    { url: string; type: "ai" | "real" }[]
  >([]);

  const fetchInProgress = useRef(false);

  useEffect(() => {
    if (fetchInProgress.current) return; // prevent duplicate fetch
    fetchInProgress.current = true;

    const loadImages = async () => {
      setLoading(true);
      setShuffledImages([]);
      try {
        const data = await fetchImagePair();
        setImagePair(data);
        const list: { url: string; type: "ai" | "real" }[] = [
          { url: data.ai, type: "ai" },
          { url: data.real, type: "real" },
        ];
        const randomized = [...list].sort(() => Math.random() - 0.5);
        setShuffledImages(randomized);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        fetchInProgress.current = false;
      }
    };

    loadImages();
  }, [currentQuestion]);

  const handleImageClick = async (index: number) => {
    if (selectedImage !== null) return;
    setSelectedImage(index);
    setShowExplanation(true);
    const isCorrect = shuffledImages[index].type === "ai";
    setAnswerResult(isCorrect ? "정답입니다!" : "틀렸습니다.");
    if (isCorrect) setCorrectCount((prev) => prev + 1);

    if (imagePair?.runId) {
      try {
        const explanationText = await fetchImageExplanation(imagePair.runId);
        setExplanation(explanationText);
      } catch (err) {
        console.error(err);
        setExplanation("해설을 불러오는 중 오류가 발생했습니다.");
      }
    }
  };

  const handleNext = () => {
    setSelectedImage(null);
    setShowExplanation(false);
    setAnswerResult(null);
    if (currentQuestion + 1 === totalQuestions) {
      navigate("/result", { state: { correctCount, totalQuestions } });
    } else {
      setCurrentQuestion((prev) => prev + 1);
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
            {loading
              ? [0, 1].map((idx) => (
                  <div
                    key={idx}
                    className="h-64 w-1/2 rounded-md flex items-center justify-center border-4 border-gray-200"
                  >
                    <div className="w-12 h-12 border-4 border-t-primary-blue border-gray-200 rounded-full animate-spin"></div>
                  </div>
                ))
              : shuffledImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`h-64 w-1/2 rounded-md flex items-center justify-center border-4 hover:shadow-lg hover:border-accent-blue cursor-pointer overflow-hidden ${
                      selectedImage === idx
                        ? "border-accent-blue shadow-lg"
                        : "border-transparent"
                    }`}
                    onClick={() => handleImageClick(idx)}
                  >
                    <img
                      src={img.url}
                      alt={img.type}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
          </div>

          {/* GrayCard 설명 */}
          {showExplanation && (
            <GrayCard className="mb-4">
              <p
                className={
                  answerResult === "정답입니다!"
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {answerResult}
              </p>
              {explanation && (
                <p className="text-gray-700 mt-2 whitespace-pre-line">
                  {explanation}
                </p>
              )}
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
