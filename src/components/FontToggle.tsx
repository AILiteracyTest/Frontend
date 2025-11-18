import { useFontStore } from "../store/useFontStore";

export default function FontToggle({ className = "" }) {
  const { fontSize, setFontSize } = useFontStore();

  const isLarge = fontSize === "large";

  const buttonText = isLarge ? "글자 기본" : "글자 크게";

  return (
    <button
      onClick={() => setFontSize(isLarge ? "normal" : "large")}
      className={`
        flex items-center space-x-2 
        p-2 px-3 rounded-full 
        shadow-lg 
        bg-primary-blue text-white hover:bg-blue-600 
        transition-colors duration-200 
        border-1
        ${className}
      `}
      title={buttonText}
    >
      <span className=" font-medium">{buttonText}</span>
    </button>
  );
}
