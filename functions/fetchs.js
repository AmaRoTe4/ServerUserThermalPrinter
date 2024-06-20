export async function fetchGetAsync(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
}
