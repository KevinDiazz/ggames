import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import FilterForm from "@/components/gameFiltersForm";
describe("Formulario filtros test", () => {
  const user = userEvent.setup();
  const propsFilterForm = {
    platform: { plataformaPadre: "PlayStation", plataformaHija: "" },
    plataformaHija: "",
    onFilterSubmit: vi.fn(),
    setPlatform: vi.fn(),
    setCurrentPage: vi.fn(),
  };

  it("Comprobar texto Form", () => {
    render(
      <FilterForm
        platform={propsFilterForm.platform}
        onFilterSubmit={propsFilterForm.onFilterSubmit}
        setPlatform={propsFilterForm.setPlatform}
        setCurrentPage={propsFilterForm.setCurrentPage}
      />
    );
    const formTitle = screen.getByText("Plataforma:");
    expect(formTitle).toBeInTheDocument();
  });

  it("Comprobar options Select plataforma", () => {
    render(
      <FilterForm
        platform={propsFilterForm.platform}
        onFilterSubmit={propsFilterForm.onFilterSubmit}
        setPlatform={propsFilterForm.setPlatform}
        setCurrentPage={propsFilterForm.setCurrentPage}
      />
    );
    const selectPlatform = screen.getByLabelText("Plataforma:");
    const options = within(selectPlatform).getAllByRole("option");
    expect(options).toHaveLength(8);
  });

  it("Comprobar options Select genres", () => {
    render(
      <FilterForm
        platform={propsFilterForm.platform}
        onFilterSubmit={propsFilterForm.onFilterSubmit}
        setPlatform={propsFilterForm.setPlatform}
        setCurrentPage={propsFilterForm.setCurrentPage}
      />
    );
    const selectGenres = screen.getByLabelText("Género:");
    const options = within(selectGenres).getAllByRole("option");
    expect(options).toHaveLength(16);
  });
  it("Comprobar select selecionados", async () => {
    render(
      <FilterForm
        platform={propsFilterForm.platform}
        onFilterSubmit={propsFilterForm.onFilterSubmit}
        setPlatform={propsFilterForm.setPlatform}
        setCurrentPage={propsFilterForm.setCurrentPage}
      />
    );
    const select = screen.getByLabelText(/plataforma/i);
    await user.selectOptions(select, "PlayStation 5"); // ID de opción
    const button = screen.getByRole("button");
    expect(select).toHaveValue("187"); //ID de PlayStation 5;
    await user.click(button);
    expect(propsFilterForm.setCurrentPage).toHaveBeenCalled();
  });
  it("Comprobar que se llama a la funcion al hacer submit", async () => {
    render(
      <FilterForm
        platform={propsFilterForm.platform}
        onFilterSubmit={propsFilterForm.onFilterSubmit}
        setPlatform={propsFilterForm.setPlatform}
        setCurrentPage={propsFilterForm.setCurrentPage}
      />
    );
    const button = screen.getByRole("button");
    await user.click(button);
    expect(propsFilterForm.setCurrentPage).toHaveBeenCalled();
  });
});
