import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "@/components/header";
import MyGames from "@/components/myGames";

describe("Header Test", () => {
  it("muestra un texto", () => {
    const consolaMock = {
      plataformaHija: "PlayStation",
      plataformaPadre: "Playstation",
    };
    const mockClick = vi.fn();
    render(<Header consola={consolaMock} onClick={mockClick} />);

    // Busca elemento con texto (usando getByText)
    const h1 = screen.getByText("Top mejores Juegos");
    expect(h1).toBeInTheDocument();
  });

  it("Imagen header presente", () => {
    const consolaMock = {
      plataformaHija: "PlayStation",
      plataformaPadre: "Playstation",
    };
    const mockClick = vi.fn();
    render(<Header consola={consolaMock} handleClick={mockClick} />);

    // Busca elemento con texto (usando getByText)
    const img = screen.getByRole("img", { name: /Carpeta GGames/i });
    expect(img).toBeInTheDocument();
  });

  it("probar onclick en img", async () => {
    const consolaMock = {
      plataformaHija: "PlayStation",
      plataformaPadre: "Playstation",
    };
    const mockClick = vi.fn();
    render(<Header consola={consolaMock} handleClick={mockClick} />);

    // Busca elemento con texto (usando getByText)
    const img = screen.getByRole("img", { name: /Carpeta GGames/i });
    fireEvent.click(img);
    expect(mockClick).toHaveBeenCalled();
  });
});
