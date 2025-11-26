import WhiteCard from "../components/WhiteCard";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ai_logo.png";
import FontToggle from "../components/FontToggle";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <div
      className={`bg-app-bg flex items-center justify-center min-h-screen p-4 w-screen relative`}
    >
      <FontToggle className="absolute top-4 right-10" />
      <WhiteCard>
        <img
          src={logo}
          alt="ai 리터러시 테스트"
          className="w-32 h-32 mx-auto"
        />
        <h1 className="font-bold mb-12 mt-4 text-black">AI 리터러시 테스트</h1>
        <Button onClick={() => navigate("test")}>시작하기</Button>
      </WhiteCard>
    </div>
  );
}
