import axios from "axios";

export interface LoadImagesResponse {
  sample_id: number;
  real_url: string;
  fake_url: string;
  explanation: string;
}

export const fetchDatasetImage = async (): Promise<LoadImagesResponse> => {
  const res = await axios.get(
    `https://aivideocheckservice.onrender.com/load_images`
  );
  return res.data;
};
