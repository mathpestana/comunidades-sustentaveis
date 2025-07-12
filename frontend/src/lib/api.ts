import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",  //temporario, necessario hospedar o back e colocar ele no env e chamar aqui
  withCredentials: true, 
});