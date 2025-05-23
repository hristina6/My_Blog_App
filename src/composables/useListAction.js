import { ref } from "vue";

export function useListAction(list) {  
  const addItem = (item) => {
    list.value.push(item);
  };

  const deleteItem = (id) => {
    list.value = list.value.filter((item) => item.id !== id);
  };

  return { addItem, deleteItem };
}

