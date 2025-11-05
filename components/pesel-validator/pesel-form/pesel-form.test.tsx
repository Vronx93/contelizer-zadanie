import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PESELForm from "./pesel-form";
import { addToast } from "@heroui/react";

jest.mock("@heroui/react", () => ({
  addToast: jest.fn(),
}));

describe("PESELForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("pokazuje toast o poprawnym PESELu", async () => {
    render(<PESELForm />);

    const input = screen.getByLabelText(/wpisz pesel/i);
    fireEvent.change(input, { target: { value: "44051401359" } }); // poprawny PESEL
    fireEvent.click(screen.getByRole("button", { name: /sprawdź/i }));

    await waitFor(() => {
      expect(addToast).toHaveBeenCalledWith(
        expect.objectContaining({ color: "success" })
      );
    });
  });

  test.each(["123", "abcdefghijk", "99999999999", "1234567890", "00000000000"])(
    "pokazuje toast o błędnym PESELu: %s",
    async (invalidPesel) => {
      render(<PESELForm />);

      const input = screen.getByLabelText(/wpisz pesel/i);
      fireEvent.change(input, { target: { value: invalidPesel } });
      fireEvent.click(screen.getByRole("button", { name: /sprawdź/i }));

      await waitFor(() => {
        expect(addToast).toHaveBeenCalledWith(
          expect.objectContaining({ color: "danger" })
        );
      });
    }
  );
});
