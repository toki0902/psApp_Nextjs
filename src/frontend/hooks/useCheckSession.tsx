import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type props = { userId: string };

const useCheckSession = ({ userId }: props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const loginData = session?.user;

  console.log(loginData);

  const check = () => {
    //ログイン情報を取得、ない場合ログインページへ
    if (!loginData) {
      router.push("/login");
      return;
    }
    //urlのIdとログイン情報を照合、合わない場合notFoundページへ
    if (userId !== loginData.name) {
      router.push("/notFound");
      return;
    }

    return;
  };

  return { check };
};

export default useCheckSession;
