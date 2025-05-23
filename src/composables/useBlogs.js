import { ref, onMounted } from "vue";
import { createClient } from "contentful";
import { useListAction } from "./useListAction";

export function useBlogs() {
  const blogs = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const client = createClient({
    space: "c3srbb6osn8s",
    accessToken: "XZKs229DjCrz0Iv10YLIymItHqWCnosH_AMCvRIhKo4",
  });


  const fetchBlogs = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await client.getEntries({ content_type: "blogPost" });

      blogs.value = response.items.map((item) => ({
        id: item.fields.slug, 
        title: item.fields.title,
        description: item.fields.description,
        heroImage: item.fields.heroImage?.fields?.file?.url || "",
        publishDate: item.fields.publishDate,
      }));
    } catch (err) {
      error.value = "Error!";
      console.error("error:", err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchBlogs);

  const { addItem, deleteItem } = useListAction(blogs);

  return { blogs, loading, error, addItem, deleteItem };
}
