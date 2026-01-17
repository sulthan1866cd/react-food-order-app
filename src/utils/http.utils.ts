import axios, { type AxiosResponse } from "axios";
import type { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

interface Options<T> {
  setter?: Dispatch<SetStateAction<T>>;
  authorization?: string;
}

export class HttpUtils {
  static async get<T>(
    path: string,
    { setter, authorization }: Options<T> = {}
  ) {
    try {
      const result = await axios.get<T>(
        `${import.meta.env.VITE_BASE_API_URL}/${path}`,
        { headers: { authorization: `Bearer ${authorization}` } }
      );
      setter?.(result.data);
      toast.success(`Data fetched successfully from /${path}`);
      return result;
    } catch (error) {
      toast.error(`Error fetching data! on path /${path} => ${error}`);
    }
    return {} as AxiosResponse;
  }

  static async put<T>(
    path: string,
    body: Partial<T>,
    { setter, authorization }: Options<T> = {}
  ) {
    try {
      const result = await axios.put<T>(
        `${import.meta.env.VITE_BASE_API_URL}/${path}`,
        body,
        { headers: { authorization: `Bearer ${authorization}` } }
      );
      setter?.(result.data);
      toast.success(`Data put successfully to /${path}`);
      return result;
    } catch (error) {
      toast.error(`Error puting data! on path /${path} => ${error}`);
    }
    return {} as AxiosResponse;
  }

  static async post<T>(
    path: string,
    body: T,
    { setter, authorization }: Options<T> = {}
  ) {
    try {
      const result = await axios.post<T>(
        `${import.meta.env.VITE_BASE_API_URL}/${path}`,
        body,
        {
          headers: {
            authorization: `Bearer ${authorization}`,
          },
        }
      );
      setter?.(result.data);
      toast.success(`Data posted successfully to /${path}`);
      return result;
    } catch (error) {
      toast.error(`Error posting data! on path /${path} => ${error}`);
    }
    return {} as AxiosResponse;
  }

  static async delete<T>(
    path: string,
    { setter, authorization }: Options<T> = {}
  ) {
    try {
      const result = await axios.delete<T>(
        `${import.meta.env.VITE_BASE_API_URL}/${path}`,
        { headers: { authorization: `Bearer ${authorization}` } }
      );
      setter?.(result.data);
      toast.success(`Data deleted successfully from /${path}`);
      return result;
    } catch (error) {
      toast.error(`Error deleting data! on path /${path} => ${error}`);
    }
    return {} as AxiosResponse;
  }
}
