<script setup>
import { ref } from "vue";
import { useBlogs } from "../composables/useBlogs";

const { blogs, addItem, deleteItem } = useBlogs();
const newBlogTitle = ref("");
const newBlogContent = ref("");

const addBlog = () => {
  if (!newBlogTitle.value || !newBlogContent.value) return;
  addItem({
    id: Date.now().toString(),
    title: newBlogTitle.value,
    description: newBlogContent.value, 
    heroImage: "https://via.placeholder.com/150", 
    publishDate: new Date().toISOString().split("T")[0], 
  });
  newBlogTitle.value = "";
  newBlogContent.value = "";
};
</script>

<template>
  <div class="blog-container">
    <h1>Blogs</h1>
    
    <div class="blog-form">
      <input v-model="newBlogTitle" placeholder="Title" />
      <textarea v-model="newBlogContent" placeholder="Description"></textarea>
      <button @click="addBlog">Додади блог</button>
    </div>

    <div v-if="blogs.length > 0" class="blog-list">
      <div v-for="blog in blogs" :key="blog.id" class="blog-item">
        <img v-if="blog.heroImage" :src="blog.heroImage" alt="Blog Image" class="blog-image"/>
        <h2>{{ blog.title }}</h2>
        <p>{{ blog.description }}</p>
        <small>Published: {{ blog.publishDate }}</small>
        <button @click="deleteItem(blog.id)">Delete</button>
      </div>
    </div>

    <p v-else>No Blogs to show</p>
  </div>
</template>

<style scoped>
.blog-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.blog-form input, .blog-form textarea {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}

button {
  background-color: #42b983;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  margin-top: 5px;
}

button:hover {
  background-color: #369870;
}

.blog-list {
  margin-top: 20px;
}

.blog-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  text-align: left;
}

.blog-image {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
