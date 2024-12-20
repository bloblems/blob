import ASCIIAnimation from '../components/ASCIIAnimation';
import SocialLinks from '../components/SocialLinks';
import AlphabetNavigation from '../components/AlphabetNavigation';
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#222323] text-[#f0f6f0] font-mono text-base leading-base font-normal cursor-crosshair">
      <ASCIIAnimation />
      <div className="relative z-10 w-full h-full flex flex-col">
        <AlphabetNavigation />
        <div className="flex-grow flex items-center justify-center ">
          <Card className="bg-transparent border-none shadow-none">
            <CardContent className="text-center">
              <h1 className="mb-8">[ ḂLOBLEMS ]</h1>
              <SocialLinks />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

