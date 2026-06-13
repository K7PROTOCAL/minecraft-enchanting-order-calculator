# Minecraft Enchanting Order Calculator Design

Date: 2026-06-13

## Goal

Build a local Windows desktop tool for calculating the lowest-cost Minecraft Java Edition anvil enchanting order.

The tool lets users choose an enchantable item, choose desired enchantments and levels, then calculates a survival-valid order with the lowest total anvil level cost. This is the sum of the levels shown by the anvil UI for each operation, not the real XP point cost. The app is intended for public distribution as a downloadable Windows desktop application, not as a website or WeChat mini program.

## Confirmed Scope

- Target rules: Minecraft Java Edition latest stable release rules, currently Java Edition 26.1.2.
- Platform: Windows desktop first.
- App form: Tauri desktop app with React, Vite, and TypeScript.
- User input model: one fresh target item plus one fresh single-enchantment book for each selected enchantment.
- Search model: the algorithm may create intermediate mixed-enchantment books while searching for the optimal order.
- Prior work state: the target item and all books start with no prior anvil work.
- Survival limit: every single anvil operation must cost 39 levels or less; total anvil level cost may exceed 39.
- Language: Chinese UI and Chinese item/enchantment names.
- Enchantments: include all vanilla Java enchantments that can be applied through an anvil, including treasure enchantments and curses.
- Conflicts: mutually exclusive enchantments are disabled in the UI as soon as a conflicting choice is selected.
- Results: show detailed steps, per-step anvil level cost, cumulative anvil level cost, and whether each step satisfies the 39-level per-step limit.
- Icons: use self-designed high-contrast minimal item icons with recognizable silhouettes. Do not bundle, import, or redistribute official Minecraft textures.

## Out Of Scope For The First Version

- Website deployment.
- WeChat mini program.
- macOS and Linux packaging.
- Accounts, cloud sync, telemetry, or server-side calculation.
- User-entered mixed-enchantment books, such as one input book containing multiple enchantments.
- User-entered prior work penalty values.
- Multilingual UI.
- Importing official game textures from local Minecraft files or resource packs.
- Directly bundling official Minecraft item textures.
- Showing multiple alternative valid orders.

## Product Shape

The first screen is the calculator itself. There is no landing page.

On wider windows, the app uses a two-pane layout:

- Left pane: item selection and enchantment selection.
- Right pane: result summary and ordered steps.

On narrow windows, the panes stack vertically.

The visual style should feel like a practical desktop utility with clean, high-recognition item icons. It should not mimic official Minecraft branding or use official logos/textures.

## User Flow

1. The user chooses an item from a list or grid.
2. Each item entry shows a self-designed high-contrast minimal icon and Chinese item name.
3. After an item is selected, the app lists enchantments that can be applied to that item.
4. Each enchantment row has a checkbox and a level selector.
5. The level selector is disabled until its enchantment is selected.
6. When an enchantment is selected, incompatible enchantments become disabled and display a short Chinese explanation.
7. The user clicks the calculate button.
8. The app searches for the valid order with the lowest total anvil level cost where every single operation costs 39 levels or less.
9. If a valid order exists, the app displays total anvil level cost and detailed steps.
10. If no valid order exists, the app explains that the selected combination cannot be completed while keeping every single operation at 39 levels or less.

## Result Display

The result area shows:

- Total anvil level cost.
- Numbered operation steps.
- Left operand and right operand for each operation.
- Current operation anvil level cost.
- Cumulative anvil level cost after the operation.
- 39-level per-step limit status for each step.

Example step content should include the step number, operands, operation anvil level cost, and cumulative anvil level cost in Chinese UI copy.

The app should make invalid or impossible states clear without overwhelming the user with implementation details.

## Architecture

Tauri is used for the desktop shell, native window, and Windows packaging. The calculation, data model, and UI state live in the TypeScript frontend so they are easy to test and can be reused later.

Core modules:

- `enchantment-data`: structured data for items, enchantments, levels, compatibility, conflicts, and anvil cost metadata.
- `selection-state`: UI-facing state for the selected item, selected enchantments, selected levels, and disabled conflict reasons.
- `anvil-calculator`: pure TypeScript calculation engine for finding the lowest-cost valid order.
- `result-presenter`: transforms calculator output into Chinese UI labels and step descriptions.
- `item-icons`: self-designed high-contrast minimal icons mapped to item identifiers.

The calculation engine must not depend on React components or browser DOM APIs.

## Data Model

Each enchantable item should have:

- Stable item id.
- Chinese display name.
- Category, such as sword, bow, armor, tool, book, or trident.
- Icon id.
- Allowed enchantment ids.

Each enchantment should have:

- Stable enchantment id.
- Chinese display name.
- Maximum level.
- Applicable item categories or item ids.
- Whether it is a treasure enchantment.
- Whether it is a curse.
- Mutually exclusive enchantment ids.
- Java anvil item cost multiplier data for item and book application.

The data should be centralized in dedicated files and covered by tests. UI code should consume the data instead of duplicating rules.

## Calculation Rules

The first version assumes:

- The target item is fresh.
- Every selected enchantment is represented by one fresh enchanted book.
- Each selected enchanted book contains exactly one enchantment at the chosen level.
- All initial prior work penalties are zero.
- Users cannot enter a mixed-enchantment book as an input.
- The calculator may create mixed-enchantment books as intermediate objects, because optimal orders often combine books before applying them to the target item.

The calculator applies Java anvil mechanics:

- Each merge operation has an anvil level cost.
- Prior work penalty contributes to the anvil level cost.
- Each merge has a left slot object and a right slot object. The operation is directional, so `left + right` and `right + left` must be evaluated separately when both directions are valid.
- Each object state tracks `anvilUseCount` and `priorWorkPenalty`.
- Combining objects increases the resulting object's anvil use count, generally as `max(left.anvilUseCount, right.anvilUseCount) + 1`.
- The resulting object's prior work penalty is derived from its anvil use count according to Java anvil rules.
- Any single operation costing 40 levels or more is invalid for survival mode.
- Total anvil level cost is the sum of valid per-operation anvil level costs and may exceed 39.

The tool should calculate the lowest total anvil level cost among valid orders, not merely use the order selected by the user.

## Algorithm

Use a dynamic programming/search approach over possible directional binary merge orders.

Conceptual process:

1. Represent the target item and selected single-enchantment books as mergeable objects.
2. Explore valid combinations of these objects, including intermediate mixed-enchantment books.
3. For each candidate pair, evaluate both slot directions where meaningful: `tryMerge(left, right)` and `tryMerge(right, left)`.
4. For each intermediate object, track contained enchantments, item/book kind, `anvilUseCount`, `priorWorkPenalty`, cumulative anvil level cost, and the step path.
5. Compute anvil level cost for candidate merges using the left-slot and right-slot semantics.
6. Reject candidate merges that violate enchantment compatibility or exceed the 39-level per-step operation limit.
7. Prune paths whose cumulative anvil level cost is already worse than a known equivalent state.
8. Return the complete state with the lowest cumulative anvil level cost.

The UI may cap the number of selected enchantments to a practical value, around 12, to keep exhaustive search responsive while still covering normal survival equipment builds.

## Error Handling

Expected user-facing states:

- No item selected: prompt the user to choose an item.
- No enchantments selected: prompt the user to select at least one enchantment.
- Conflict blocked: disable incompatible enchantments and show a concise reason.
- No valid order: explain that the current combination cannot be completed when every single anvil operation must stay within the 39-level survival limit.
- Internal data error: show a generic calculation failure message and keep the app usable.

Errors should be handled in the UI without crashing the desktop window.

## Testing Strategy

Data tests:

- Every listed item has a Chinese name, icon id, and allowed enchantments.
- Every enchantment has a Chinese name, valid max level, and cost metadata.
- Conflict relationships are reciprocal where Java rules require reciprocity.
- Level selectors expose only valid levels.

Algorithm tests:

- Simple one-book merges produce expected costs.
- Different merge orders can produce different total anvil level costs.
- Directional merge tests cover cases where `tryMerge(left, right)` and `tryMerge(right, left)` differ.
- Intermediate mixed-enchantment book states can be generated and used in the optimal path.
- Resulting objects store and update `anvilUseCount` and `priorWorkPenalty`.
- The calculator chooses the valid order with the lowest total anvil level cost.
- Candidate steps costing 40 or more are excluded.
- No-order cases return a clear impossible result.

UI tests:

- Selecting an item shows only applicable enchantments.
- Selecting an enchantment disables conflicting choices.
- The calculate button produces a detailed step list for valid input.
- Invalid input and impossible combinations display clear Chinese messages.

## Legal And Branding Notes

The app should avoid official Minecraft branding assets. It should use self-designed icons and include a disclaimer in the app's about area and release description:

`NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.`

Chinese UI copy should use:

`本工具不是 Minecraft 官方产品，未获得 Mojang 或 Microsoft 的批准，也与 Mojang 或 Microsoft 无关联。`

The app name must not imply that it is official or endorsed, such as "Minecraft Official Enchanting Calculator".

The app may use the Minecraft name only descriptively to explain what the tool is for.

## Release Notes

The first public release should target Windows only. Distribution can happen through GitHub Releases or another download channel. The app should show a Chinese rules version label for Java Edition 26.1.2.

Future updates can refresh the rules data when Minecraft Java Edition changes enchantable items, enchantments, conflicts, or anvil behavior.
