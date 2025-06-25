import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar.jsx";
import { AppSidebar } from "../components/app-sidebar";

export default function AsideMenu({
  setUrlGames,
  setPlatform,
  setCurrentPage,
  visible,
}) {
  return (
    <SidebarProvider className="w-auto absolute">
      <AppSidebar
        setUrlGames={setUrlGames}
        setPlatform={setPlatform}
        setCurrentPage={setCurrentPage}
      />
      <SidebarTrigger visible={visible} />
    </SidebarProvider>
  );
}
