import React from "react";
import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import GameList from "@/components/gameList";
const mockData = {
  results: [
    {
      id: 3498,
      name: "Grand Theft Auto V",
      background_image:
        "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
      rating: 4.47,
      genres: [{ name: "Action" }, { name: "Adventure" }],
      parent_platforms: [
        { platform: { name: "PC" } },
        { platform: { name: "PlayStation" } },
        { platform: { name: "Xbox" } },
      ],
      short_screenshots: [
        { image: "https://media.rawg.io/media/screenshots/1.jpg" },
        { image: "https://media.rawg.io/media/screenshots/2.jpg" },
      ],
    },
  ],
};
const mockFunction = vi.fn();
describe("Test del componente GameList", async () => {
  it("Probar que mapea los datos", async () => {
    const { container } = render(
      <GameList
        setMyGameList={mockFunction}
        data={mockData}
        loading={false}
        error={null}
      ></GameList>
    );
    const accordionItem = container.querySelector(
      '[data-slot="accordion-item"]'
    );
    expect(accordionItem).toBeInTheDocument();
  });
  it("Probar que ela acordeon se abre", async () => {
    const { container } = render(
      <GameList
        setMyGameList={mockFunction}
        data={mockData}
        loading={false}
        error={null}
      ></GameList>
    );
    const accordionItemButton = container.querySelector(
      '[data-slot="accordion-trigger"]'
    );
    await userEvent.click(accordionItemButton);
    const accordionContainer = container.querySelector(
      '[data-slot="accordion-content"]'
    );
    expect(accordionContainer).toBeInTheDocument();
  });

  it("Probar boton para añadir juegos", async () => {
    const { container } = render(
      <GameList
        setMyGameList={mockFunction}
        data={mockData}
        loading={false}
        error={null}
      ></GameList>
    );
    const accordionItemButton = container.querySelector(
      '[data-slot="accordion-trigger"]'
    );
    await userEvent.click(accordionItemButton);
    const boton = screen.getByLabelText(/Marcar como jugado/i);
    await userEvent.click(boton);
    expect(mockFunction).toHaveBeenCalled();
  });
});
