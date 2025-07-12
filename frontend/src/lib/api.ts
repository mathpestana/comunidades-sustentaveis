import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,  //temporario, necessario hospedar o back e colocar ele no env e chamar aqui
  withCredentials: true, 
});


//adicionar os tipos das respostas da api 



//funcoes para consumir a api