export default function Header({ consola, handleClick }) {
  return (
    <div className="font-lora bg-[#383939] fixed w-screen flex items-center gap-6 z-9 xl:max-w-8xl">
      <div className="w-full flex justify-center">
        <h1 className="text-2xl text-white text-center p-2 sm:text-3xl">
          Top mejores Juegos<br></br>{" "}
          <span className="text-[#38c958]">
            {consola.plataformaHija
              ? consola.plataformaHija
              : consola.plataformaPadre}
          </span>
        </h1>
        <img
          onClick={handleClick}
          className="absolute w-10 object-contain right-1  mt-3 me-2 xl:me-50 hover:saturate-50 hover:cursor-pointer"
          src="/assets/icons8-carpeta-de-juegos-100.png"
          title="Carpeta GGames"
        ></img>
      </div>
    </div>
  );
}
