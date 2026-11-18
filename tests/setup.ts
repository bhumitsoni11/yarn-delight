import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

// Mock server-only barrier for unit testing server-only modules
vi.mock("server-only", () => {
  return {}
})
