import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useInstagramRefresh } from "./use-instagram-refresh";

afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });

describe("Instagram refresh", () => {
  it("refreshes once each minute, not before", () => {
    vi.useFakeTimers();
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    const { result, unmount } = renderHook(useInstagramRefresh);
    act(() => vi.advanceTimersByTime(59_999));
    expect(result.current).toBe(0);
    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe(1);
    act(() => vi.advanceTimersByTime(60_000));
    expect(result.current).toBe(2);
    unmount();
  });

  it("waits while the tab is hidden and refreshes when returning", () => {
    vi.useFakeTimers();
    const visibility = vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    const { result, unmount } = renderHook(useInstagramRefresh);
    act(() => vi.advanceTimersByTime(120_000));
    expect(result.current).toBe(0);
    visibility.mockReturnValue("visible");
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(result.current).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});