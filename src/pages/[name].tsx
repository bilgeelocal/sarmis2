import { MainLayout } from "layouts";
import { NextPage } from "next";
import { useRouter } from "next/router";

const LandingPage: NextPage<unknown> = (): React.ReactElement => {
  const router = useRouter();
  const username = router.query.name;
  return (
    <MainLayout>
      <div className="flex justify-center">
        <h1>{username}</h1>
      </div>
    </MainLayout>
  );
};

export default LandingPage;
