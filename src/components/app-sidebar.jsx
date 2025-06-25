import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { items } from "@/utils/variables";

export function AppSidebar({ setUrlGames, setPlatform, setCurrentPage }) {
  return (
    <Sidebar className="!bg-[#383939]">
      <SidebarContent className="!bg-[#383939] text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl mt-10 text-white">
            <p className="text-center w-full">GGames</p>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="my-3">
                  <div className="flex justify-center gap-2 items-center">
                    <div className="w-20 ml-6">
                      <img
                        className={`${item.width} object-contain ${item.background}`}
                        src={item.url}
                      ></img>
                    </div>
                    <SidebarMenuButton
                      onClick={() => {
                        setUrlGames(
                          "https://api.rawg.io/api/games?key=262909af656240cbb2409c0d608f1b0c&platforms=" +
                            `${item.id}` +
                            "&page=1&page_size=20&ordering=-rating"
                        );
                        setPlatform({
                          plataformaPadre: item.title,
                          plataformaHija: "",
                        });
                        setCurrentPage(1);
                      }}
                      className="w-full"
                    >
                      <p className="w-full mr-5 text-end font-lora">
                        {item.title}
                      </p>
                    </SidebarMenuButton>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
