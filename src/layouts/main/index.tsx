import { useRouter } from "next/router";
import { v4 } from "uuid";
import { Divider } from "@mui/material";
import { BiHomeAlt2 } from "react-icons/bi";

interface Props {
  children: React.ReactNode;
  className?: string;
  NO_PADDING?: boolean;
}

const MainLayout: React.FC<Props> = ({ children, className = "", NO_PADDING = false }) => {
  const router = useRouter();
  const checkActivePage = (_: string) => {
    if (router.asPath.includes(_.toLowerCase())) return true;
    return false;
  };
  const users = [
    { id: v4(), title: "Алтанхуяг", link: "/altanhuyag" },
    { id: v4(), title: "Алтаншагай", link: "/altanshagai" },
    { id: v4(), title: "Батшугар", link: "/batshugar" },
    { id: v4(), title: "Баярсайхан", link: "/bayarsaikhan" },
    { id: v4(), title: "Бүрэнбат", link: "/burenbat" },
    { id: v4(), title: "Майцэцэг", link: "/maitsetseg" },
    { id: v4(), title: "Уянга", link: "/uyanga" },
    { id: v4(), title: "Отгонтуяа", link: "/otgontuya" },
    { id: v4(), title: "Төмөрхуяг", link: "/tomorhuyag" },
    { id: v4(), title: "Галиндэв", link: "/galindev" },
    { id: v4(), title: "Очир", link: "/ochir" },
    { id: v4(), title: "Батбаяр", link: "/batbayar" },
    { id: v4(), title: "Бээжин", link: "/beejin" },
    { id: v4(), title: "Номин", link: "/nomin" },
    { id: v4(), title: "Хүрэлбаатар", link: "/hurelbaatar" },
    { id: v4(), title: "Батзориг", link: "/batzorig" },
    { id: v4(), title: "Нармандах", link: "/narmandakh" },
    { id: v4(), title: "Энхнаран", link: "/enkhnaran" },
    { id: v4(), title: "Болортуяа", link: "/bolortuya" },
    { id: v4(), title: "Сайнзориг", link: "/sainzorig" },
    { id: v4(), title: "Амаржин", link: "/amarjin" },
    { id: v4(), title: "Баярсайхан", link: "/bayarsaikhan" },
    { id: v4(), title: "Тунгалагхараа", link: "/tungalagkharaa" },
  ];
  return (
    <>
      <div className={`flex bg-[#F3FAFB] h-full w-full ${className}`}>
        <div className="flex flex-col gap-6 py-6 px-6 bg-white">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
            <BiHomeAlt2 size={20} />
            <span className="font-medium font-exo text-[#384454]">Нүүр хуудас</span>
          </div>
          <Divider flexItem />
          {users.map((it) => (
            <div className={`hover:cursor-pointer rounded-xl py-2 px-5 ${checkActivePage(it.link) ? "bg-[#c6d6eb]" : ""}`} key={it.id} onClick={() => router.push(it.link)}>
              <span className={`font-exo font-medium ${checkActivePage(it.link) ? "text-[#044BE7]" : "text-[#384454]"}`}>{it.title}</span>
            </div>
          ))}
        </div>
        <Divider orientation="vertical" flexItem />
        <main className="px-10 py-10">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
