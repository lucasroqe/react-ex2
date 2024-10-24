import { ErrorProps, RGBProps } from ".."
import { api } from "./api";

class RGB {
  async get(id: number | undefined): Promise<RGBProps | ErrorProps> {
    const params = {
      id,
    };

    try {
      const { data } = await api.get("/get", { params });
      return data;
    } catch (error: any) {
      return error;
    }
  }

  async save(r: number, g: number, b: number): Promise<RGBProps | ErrorProps> {
    try {
      const { data } = await api.post("/save", { r, g, b });
      return data;
    } catch (error: any) {
      return error;
    }
  }
}

const rgb = new RGB();
export default rgb;