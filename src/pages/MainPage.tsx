import WhiteCard from "../components/WhiteCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ai_logo.png";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-app-bg flex items-center justify-center min-h-screen p-4 w-screen">
      <WhiteCard>
        <img
          src={logo}
          alt="ai 리터러시 테스트"
          className="w-32 h-32 mx-auto"
        />
        <h1 className="text-4xl font-bold mb-12 mt-4">AI 리터러시 테스트</h1>
        <Button onClick={() => navigate("test")}>시작하기</Button>
      </WhiteCard>
    </div>
  );
}
