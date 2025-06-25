import { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import GameList from "./components/gameList";
import AsideMenu from "./components/asideMenu";
import Header from "./components/header";
import FilterForm from "./components/gameFiltersForm";
import PaginationComp from "./components/pagination";
import MyGames from "./components/myGames";
import Loader from "./components/loader";
import SonnerDemo from "./components/sonner";
import { Toaster } from "@/components/ui/sonner";
function App() {
  const [platform, setPlatform] = useState({
    //estado para el titulo de la pagina
    plataformaPadre: "PlayStation",
    plataformaHija: "",
  });

  const [visible, setVisible] = useState(false); //Estado para controlar la carpeta GGames

  const [urlGames, setUrlGames] = useState(
    "https://api.rawg.io/api/games?key=262909af656240cbb2409c0d608f1b0c&page=40&page_size=20" //URL para el fecth de datos
  );

  const [myGamesList, setMyGameList] = useState({
    //Estado para guardar info en carpeta GGames
    jugados: [],
    pendientes: [],
    jugando: [],
  });
  const [currentPage, setCurrentPage] = useState(1); //Estado para controlar las Paginas

  const { data, loading, error } = useFetch(urlGames);

  const [showLoader, setShowLoader] = useState(true); //Estado para el control del loader

  const handleClick = () => {
    visible ? setVisible(false) : setVisible(true); // al hacer clic, ocultamos
  };

  useEffect(() => {
    setShowLoader(true);
    let minTime = setTimeout(() => {
      if (!loading) setShowLoader(false); // si la carga terminó, ocultar el loader
    }, 2000);

    if (!loading) {
      // si ya dejó de cargar, esperar a que pasen los 3 segundos antes de ocultar
      minTime = setTimeout(() => {
        setShowLoader(false);
      }, 3000);
    }
    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(minTime);
    };
  }, [loading, urlGames]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden"; //para controlador la capeta GGames
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  return (
    <div className="bg-[#FAFAFA]">
      {visible ? (
        <MyGames
          myGamesList={myGamesList}
          setMyGameList={setMyGameList}
          visible={visible}
          setVisible={setVisible}
        ></MyGames>
      ) : (
        <AsideMenu
          className="w-64 bg-gray-800 text-white"
          setUrlGames={setUrlGames}
          setPlatform={setPlatform}
          setCurrentPage={setCurrentPage}
          visible={visible}
        ></AsideMenu>
      )}

      <div className="flex flex-col items-center">
        <Header
          consola={platform}
          handleClick={handleClick}
          visible={visible}
        ></Header>
        <FilterForm
          onFilterSubmit={setUrlGames}
          platform={platform}
          setPlatform={setPlatform}
          setCurrentPage={setCurrentPage}
        ></FilterForm>

        <main className="flex mt-10 mb-10 min-h-screen">
          {showLoader && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <Loader />
            </div>
          )}
          {!showLoader ? (
            <GameList
              visible={visible}
              setVisible={setVisible}
              url={urlGames}
              setUrlGames={setUrlGames}
              myGamesList={myGamesList}
              setMyGameList={setMyGameList}
              data={data}
              loading={loading}
              error={error}
            ></GameList>
          ) : null}
        </main>
        {data && !showLoader ? (
          <PaginationComp
            currentPage={currentPage}
            setUrlGames={setUrlGames}
            setCurrentPage={setCurrentPage}
            data={data}
          ></PaginationComp>
        ) : null}
        <Toaster></Toaster>
      </div>
    </div>
  );
}

export default App;
