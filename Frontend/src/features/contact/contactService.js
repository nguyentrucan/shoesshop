import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const postQuery = async (contactData) => {
  const response = await axios.post(`${base_url}enquiry`, contactData, {
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  });
  if (response.data) {
    return response.data;
  }
};

export const contactService = {
  postQuery,
};
