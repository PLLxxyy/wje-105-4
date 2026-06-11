import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/storage';

export const useInventoryStore = defineStore('inventory', () => {
  const inventoryIds = useLocalStorage<string[]>(STORAGE_KEYS.inventory, []);

  const inventorySet = computed(() => new Set(inventoryIds.value));

  function hasIngredient(id: string): boolean {
    return inventorySet.value.has(id);
  }

  function addIngredient(id: string): void {
    if (inventorySet.value.has(id)) {
      return;
    }
    inventoryIds.value = [...inventoryIds.value, id];
  }

  function removeIngredient(id: string): void {
    if (!inventorySet.value.has(id)) {
      return;
    }
    inventoryIds.value = inventoryIds.value.filter((inventoryId) => inventoryId !== id);
  }

  function toggleIngredient(id: string): void {
    if (inventorySet.value.has(id)) {
      removeIngredient(id);
    } else {
      addIngredient(id);
    }
  }

  function clearInventory(): void {
    inventoryIds.value = [];
  }

  return {
    inventoryIds,
    hasIngredient,
    addIngredient,
    removeIngredient,
    toggleIngredient,
    clearInventory
  };
});
