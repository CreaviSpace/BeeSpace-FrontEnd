import Banner from '@/components/banner/Banner';
import DeadLineRecruitment from '@/components/DeadLineRecruitment';
import PopularProject from '@/components/PopularProject';

export default function Home() {
  return (
    <main className="mx-auto overflow-hidden">
      <Banner />
      <section className="max_w h-fit flex justify-between items-center mx-auto">
        <PopularProject />
        <DeadLineRecruitment />
      </section>
    </main>
  );
}
