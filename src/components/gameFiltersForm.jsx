import { genres, plataformas } from "@/utils/variables";
import { useState } from "react";
const FilterForm = ({
  platform,
  onFilterSubmit,
  setPlatform,
  setCurrentPage,
}) => {
  const platformSelected = platform.plataformaPadre;

  const [filters, setFilters] = useState({
    platformId: "",
    genre: "",
    ordering: "",
    platformName: "",
  });

  const handleChange = (e) => {
    //funcion para guardar los cambios de los selects
    const { name, value } = e.target;
    if (name == "platform") {
      const selectedText = e.target.options[e.target.selectedIndex].text;
      setFilters((prev) => ({
        ...prev,
        [name]: value,
        platformName: selectedText,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    //funcion para crear la URL de la APi a traves de los datos de los select
    e.preventDefault();
    let url = `https://api.rawg.io/api/games?key=262909af656240cbb2409c0d608f1b0c`;
    console.log(filters.platform);
    if (filters.platform) url += `&platforms=${filters.platform}`;
    if (filters.genre) url += `&genres=${filters.genre}`;
    if (filters.ordering) url += `&ordering=${filters.ordering}`;
    setPlatform((prev) => ({ ...prev, plataformaHija: filters.platformName }));
    setFilters({
      platform: "",
      genre: "",
      ordering: "",
    });
    setCurrentPage(1);
    onFilterSubmit(url);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-22 mx-auto p-6 bg-gray-100 rounded-lg shadow-md md:mt-22">
      <form
        onSubmit={handleSubmit}
        className="text-[#757575] font-light w-xs flex flex-col items-center space-y-4 md:w-xl md:flex-row md:gap-4"
      >
        {/* Filtro por plataforma */}
        <div className="w-xs">
          <label
            htmlFor="platform"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Plataforma:
          </label>
          <select
            id="platform"
            name="platform"
            value={filters.platform}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecionar Plataforma</option>
            {plataformas[platformSelected].map((val) => (
              <option key={val.id} value={val.id}>
                {val.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por género */}
        <div className="w-xs">
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Género:
          </label>
          <select
            id="genre"
            name="genre"
            value={filters.genre}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Todos los géneros</option>
            {genres.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        {/* Ordenamiento */}
        <div className="w-xs">
          <label
            htmlFor="ordering"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Ordenar por:
          </label>
          <select
            id="ordering"
            name="ordering"
            value={filters.ordering}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Por defecto</option>
            <option value="-rating">Mejor valorados</option>
            <option value="name">Nombre (A-Z)</option>
          </select>
        </div>

        {/* Botón de envío */}
        <button
          name="aplicar filtros"
          type="submit"
          className="w-32 bg-[#F44336] text-white py-2 px-4 rounded-md hover:bg-[#ff8077] transition-colors"
          disabled={!filters.platform}
        >
          Aplicar Filtros
        </button>
      </form>
      {!filters.platform && (
        <p className="text-sm text-center text-red-500 mt-2">
          Selecciona una plataforma para porder filtrar.
        </p>
      )}
    </div>
  );
};

export default FilterForm;
