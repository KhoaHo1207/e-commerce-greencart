import CategoryGrid from "@/features/categories/components/category-grid";
import BestSeller from "@/features/home/components/best-seller";
import BottomBanner from "@/features/home/components/bottom-banner";
import MainBanner from "@/features/home/components/main-banner";
import NewsLetter from "@/features/home/components/news-letter";

export default function HomeView() {
  return (
    <div className="mt-10">
      <MainBanner />
      <CategoryGrid />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
}
