import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MyGames from "@/components/myGames";

const mockSetMyGameList = vi.fn();
const mockSetVisible = vi.fn();

const mockMyGamesList = {
  jugados: ["Game A", "Game B"],
  pendientes: ["Game C"],
  jugando: ["Game D"],
};

describe("MyGames Component", () => {
  beforeEach(() => {
    mockSetMyGameList.mockClear();
    mockSetVisible.mockClear();
  });

  it('renderiza correctamente y muestra la pestaña "jugado" por defecto', () => {
    render(
      <MyGames
        myGamesList={mockMyGamesList}
        setMyGameList={mockSetMyGameList}
        setVisible={mockSetVisible}
      />
    );

    expect(screen.getByText("Mi GGames")).toBeInTheDocument();
    expect(screen.getByText("Jugado")).toHaveClass("ring-2");
    expect(screen.getByText("Game A")).toBeInTheDocument();
    expect(screen.getByText("Game B")).toBeInTheDocument();
  });

  it('cambia a la pestaña "Pendiente" y muestra los juegos pendientes', async () => {
    render(
      <MyGames
        myGamesList={mockMyGamesList}
        setMyGameList={mockSetMyGameList}
        setVisible={mockSetVisible}
      />
    );

    const pendienteTab = screen.getByText("Pendiente");
    await userEvent.click(pendienteTab);

    expect(pendienteTab).toHaveClass("ring-2");
    expect(screen.getByText("Game C")).toBeInTheDocument();
  });

  it('elimina un juego de la lista "jugado" cuando se clickea el botón eliminar', async () => {
    render(
      <MyGames
        myGamesList={mockMyGamesList}
        setMyGameList={mockSetMyGameList}
        setVisible={mockSetVisible}
      />
    );

    // Encontrar el botón eliminar para 'Game A'
    const deleteButtons = screen.getAllByTitle(/Eliminar Juego de jugado/i);
    expect(deleteButtons.length).toBeGreaterThan(0);

    await userEvent.click(deleteButtons[0]);

    expect(mockSetMyGameList).toHaveBeenCalledWith(expect.any(Function));
  });
});
