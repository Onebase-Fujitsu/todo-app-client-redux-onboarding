import {cleanup, render, screen} from "@testing-library/react"
import IndexPage from "../../pages/IndexPage"

describe("Index Page", () => {
  afterEach(() => {
    cleanup();
  })

  it("Indexの画面構成", () => {
    render(<IndexPage/>)
    expect(screen.getByTestId("HeaderComponent")).toBeTruthy()
  })
})