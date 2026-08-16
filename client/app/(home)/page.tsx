import BestSeller from "./_components/best-seller";
import BottomBanner from "./_components/bottom-banner";
import Categories from "./_components/categories";
import Mainbanner from "./_components/main-banner";

export default function HomePage() {
  return (
    <div className="mt-10">
      <Mainbanner />
      <Categories />
      <BestSeller />
      <BottomBanner />
    </div>
  );
}
