import { async } from "regenerator-runtime";
import { timeout } from "./Controller";

export const getJson = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(10)]);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data
  }

  catch (err) {
    throw err
  }

};

export const sendJson = async function (url, uploaddate) {
  try {
    const fetchpro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploaddate)
    });
    const response = await Promise.race([fetchpro, timeout(10)])
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} (${response.status})`)
    return data
  }


  catch (err) {
    throw err
  }
}