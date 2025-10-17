import Image from "next/image";
import Game from "./component/Game";

export default function Home() {
  return (
    <div className="flex justify-center h-full p-10">
      <Game />
    </div>
  );
}
