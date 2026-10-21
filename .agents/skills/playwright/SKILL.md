---
name: playwright
description: End-to-end testing, browser automation, visual regression, and web inspection using Playwright CLI and Playwright MCP server.
---

# Playwright Skill

This skill teaches the agent how to run tests, inspect live web pages, capture visual regressions, and execute browser automation with Playwright.

---

## 1. Quick Start Commands

### Running Playwright Tests
```bash
# Run all tests
npx playwright test

# Run tests in headed browser
npx playwright test --headed

# Run specific test file
npx playwright test tests/example.spec.ts

# Show HTML report
npx playwright show-report
```

### Code Generation & Interactive Debugging
```bash
# Generate test code by clicking in browser
npx playwright codegen http://localhost:3000

# Open Inspector / Debug mode
npx playwright test --debug
```

### Screenshots & PDF
```bash
# Capture full page screenshot
npx playwright screenshot --full-page http://localhost:3000 screenshot.png

# Emulate mobile device
npx playwright screenshot --device="iPhone 15" http://localhost:3000 mobile.png
```

---

## 2. Playwright MCP Server Integration

The Playwright Model Context Protocol (MCP) server enables live browser automation directly through AI tool calls:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "cmd.exe",
      "args": ["/c", "npx", "-y", "@playwright/mcp@latest"]
    }
  }
}
```

### Capabilities via MCP:
- Navigating to URLs and taking DOM snapshots
- Interacting with elements (click, fill, type, hover)
- Capturing screenshots and video recordings
- Testing responsive breakpoints and mobile emulation
- Validating accessibility and network request assertions
