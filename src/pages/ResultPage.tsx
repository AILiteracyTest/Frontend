import { useLocation, useNavigate } from "react-router-dom";
import WhiteCard from "../components/WhiteCard";
import GrayCard from "../components/GrayCard";
import Button from "../components/Button";
export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { correctCount = 0, totalQuestions = 0 } = location.state || {};
  return (
    <div className="bg-app-bg flex items-center justify-center min-h-screen p-4 w-screen">
      <WhiteCard>
        <h1 className="text-3xl font-bold mb-4 mt-4">테스트 결과</h1>
        <GrayCard className="text-xl font-bold ">
          {totalQuestions}개 중 {correctCount}개를 맞추셨습니다
        </GrayCard>
        <div className="flex gap-8 mb-6 mt-8">
          <GrayCard className=" h-64 w-1/2 rounded-md flex items-center justify-center">
            {" "}
            그래프
          </GrayCard>
          <GrayCard className=" h-64 w-1/2 rounded-md flex items-center justify-center">
            n명 중 n위
          </GrayCard>
        </div>
        <div className="flex flex-col gap-3 items-center justify-center">
          <Button>친구에게 공유하기</Button>
          <Button onClick={() => navigate("/")}>테스트 다시하기</Button>
        </div>
      </WhiteCard>
    </div>
  );
}
