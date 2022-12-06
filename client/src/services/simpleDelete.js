import axios from 'axios';

export const simpleDelete = async (url) =>{
  try {
    const response = await axios.delete(url)
    return response
  } catch (err) {
    console.log(err)
  }
}