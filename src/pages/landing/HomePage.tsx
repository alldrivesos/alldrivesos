import Assistance from "../../lib/components/landing/homepage/Assistance";
import BlogPage from "../../lib/components/landing/homepage/Blogs";
import DownloadApp from "../../lib/components/landing/homepage/DownloadApp";
import HeroBanner from "../../lib/components/landing/homepage/HeroBanner";
import Stranded from "../../lib/components/landing/homepage/Stranded";
import Works from "../../lib/components/landing/homepage/Works";
import LandingLayout from "../../lib/components/layout/landing";

const HomePage = () => {
  return (
    <>
      <LandingLayout>
        <div>
          <HeroBanner />
          <Assistance />
          <Stranded />
          <Works />
          <BlogPage />
          <DownloadApp />
        </div>
      </LandingLayout>
    </>
  );
};

export default HomePage;
