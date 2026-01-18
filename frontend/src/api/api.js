import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Porta padrão do Spring Boot da Isabela
});

export default api;