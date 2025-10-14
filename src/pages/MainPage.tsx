import WhiteCard from "../components/WhiteCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-app-bg flex items-center justify-center min-h-screen p-4 w-screen">
      <WhiteCard>
        <h1 className="text-4xl font-bold mb-16 mt-8">AI 리터러시 테스트</h1>
        <Button onClick={() => navigate("test")}>시작하기</Button>
      </WhiteCard>
    </div>
  );
}
