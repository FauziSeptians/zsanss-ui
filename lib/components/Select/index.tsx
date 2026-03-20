// --- Object Assign Export ---

import { SelectInput, SelectList, SelectLoader, SelectOption, SelectRoot } from "./select"

/**
 * Compound Component Select
 * Membungkus Headless UI Combobox dengan pola yang lebih terstruktur.
 */
export const Select = Object.assign(SelectRoot, {
  Input: SelectInput,
  List: SelectList,
  Option: SelectOption,
  Loader: SelectLoader,
})

export default Select