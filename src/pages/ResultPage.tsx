import WhiteCard from "../components/WhiteCard";
import GrayCard from "../components/GrayCard";
import Button from "../components/Button";
export default function ResultPage() {
  return (
    <div className="bg-app-bg flex items-center justify-center min-h-screen p-4 w-screen">
      <WhiteCard>
        <h1 className="text-3xl font-bold mb-4 mt-4">테스트 결과</h1>
        <GrayCard className="text-xl font-bold ">
          10개 중 7개를 맞추셨습니다
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
        <Button>친구에게 공유하기</Button>
      </WhiteCard>
    </div>
  );
}
